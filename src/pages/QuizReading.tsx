import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWordList, type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';

import { shuffleArray, pickRandomWordWeighted } from '../utils/algorithms';

const QuizReading: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned } = useProgress();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const generateQuiz = () => {
    setSelectedStatus('idle');
    const target = pickRandomWordWeighted(defaultWordList, wordsLearned);
    setCurrentWord(target);
    
    // Pick 3 random wrong options using Fisher-Yates shuffle
    const wrongOptions = shuffleArray(defaultWordList.filter(w => w.id !== target.id)).slice(0, 3);
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

  return (
    <div className="py-8 flex flex-col items-center h-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-slate-700 mb-8">看單字 (Reading)</h2>
      
      <motion.div 
        key={currentWord.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel w-full p-10 flex items-center justify-center mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30"
      >
        <span className="text-5xl font-black text-white tracking-wider">{currentWord.word}</span>
      </motion.div>

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
          className="mt-8 text-green-600 font-bold text-xl"
        >
          Excellent! 🎉
        </motion.div>
      )}
    </div>
  );
};

export default QuizReading;
