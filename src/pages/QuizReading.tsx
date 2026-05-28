import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWordList, type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';

import { shuffleArray, pickRandomWordWeighted } from '../utils/algorithms';

const QuizReading: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned, theme, score, selectedCategory = 'General' } = useProgress();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const generateQuiz = () => {
    setSelectedStatus('idle');
    
    const wordsSource = selectedCategory === 'General' || selectedCategory === 'All' 
      ? defaultWordList 
      : defaultWordList.filter(w => w.category === selectedCategory);
    
    const activeWordList = wordsSource.length > 0 ? wordsSource : defaultWordList;
    const target = pickRandomWordWeighted(activeWordList, wordsLearned);
    setCurrentWord(target);
    
    // Pick 3 random wrong options using Fisher-Yates shuffle
    const wrongOptions = shuffleArray(activeWordList.filter(w => w.id !== target.id)).slice(0, 3);
    const allOptions = shuffleArray([...wrongOptions, target]);
    setOptions(allOptions);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleSelect = (option: WordItem) => {
    if (selectedStatus !== 'idle' || !currentWord) return;

    if (option.id === currentWord.id) {
      setSelectedStatus('correct');
      incrementScore(10);
      markWordAsLearned(currentWord.id, 'reading');
      setTimeout(generateQuiz, 1500);
    } else {
      setSelectedStatus('incorrect');
      setTimeout(() => setSelectedStatus('idle'), 1000);
    }
  };

  if (!currentWord) return null;

  const getTagColor = (category: string) => {
    if (category.includes('GEPT')) return theme === 'dark' ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600';
    if (category.includes('TOEIC')) return theme === 'dark' ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-100 text-orange-600';
    if (category.includes('TOEFL')) return theme === 'dark' ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-600';
    if (category.includes('Business')) return theme === 'dark' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600';
    return theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="py-6 flex flex-col gap-6 max-w-md mx-auto h-full">
      <div className="flex justify-between items-center px-2">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Reading Quiz</h1>
        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          Score: {score}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={`w-full aspect-square rounded-3xl p-8 flex flex-col items-center justify-center mb-8 border shadow-xl relative ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
          >
            <span className={`absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-bold ${getTagColor(currentWord.category)}`}>
              {currentWord.category}
            </span>
            <h2 className={`text-5xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{currentWord.word}</h2>
          </motion.div>
        </AnimatePresence>

      <div className="grid grid-cols-2 gap-4 w-full">
        <AnimatePresence mode="popLayout">
          {options.map((option, idx) => (
            <motion.button
              key={option.id + idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(option)}
              className={`p-6 rounded-2xl text-lg font-bold transition-colors ${
                selectedStatus === 'correct' && option.id === currentWord.id
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/40'
                  : selectedStatus === 'incorrect' && option.id !== currentWord.id
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'bg-white text-slate-700 shadow-md hover:shadow-lg border border-slate-100'
              }`}
            >
              {option.translation}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

        {selectedStatus === 'correct' && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-8 text-green-600 font-bold text-xl text-center"
          >
            Excellent! 🎉
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizReading;
