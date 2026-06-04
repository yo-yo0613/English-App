import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';
import { useWordList } from '../hooks/useWordList';
import { shuffleArray, pickRandomWordWeighted } from '../utils/algorithms';

const QuizSentence: React.FC = () => {
  const { incrementScore, markWordAsLearned, selectedCategory = 'General', theme, selectedLevels = {}, wordProficiency = {}, markWordAsIncorrect } = useProgress();
  const { wordList } = useWordList();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [sentenceParts, setSentenceParts] = useState<{ before: string, after: string }>({ before: '', after: '' });

  const activeLevel = selectedLevels[selectedCategory] || 1;

  const generateQuiz = () => {
    setSelectedStatus('idle');
    
    const wordsSource = selectedCategory === 'General' || selectedCategory === 'All' 
      ? wordList 
      : wordList.filter(w => w.category === selectedCategory);
    
    const activeWordList = wordsSource.length > 0 ? wordsSource : wordList;

    const startIdx = (activeLevel - 1) * 20;
    const wordsInLevel = activeWordList.slice(startIdx, startIdx + 20);
    const levelWords = wordsInLevel.length > 0 ? wordsInLevel : activeWordList.slice(0, 20);

    // Filter words in level to only those containing an example sentence
    const wordsWithExample = levelWords.filter(w => w.example);
    // Fallback to active list if no example found in chunk
    const searchPool = wordsWithExample.length > 0 ? wordsWithExample : activeWordList.filter(w => w.example);

    const target = pickRandomWordWeighted(searchPool, wordProficiency);
    setCurrentWord(target);
    
    // Split the example sentence around the word (case insensitive)
    const regex = new RegExp(`(${target.word})`, 'i');
    const parts = target.example.split(regex);
    
    if (parts.length >= 3) {
      setSentenceParts({ before: parts[0], after: parts[2] });
    } else {
      setSentenceParts({ before: target.example + ' (', after: ')' });
    }

    // Pick 3 random wrong options from activeWordList
    const wrongOptions = shuffleArray(activeWordList.filter(w => w.id !== target.id)).slice(0, 3).map(w => w.word);
    const allOptions = shuffleArray([...wrongOptions, target.word]);
    setOptions(allOptions);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleSelect = (option: string) => {
    if (selectedStatus !== 'idle' || !currentWord) return;

    if (option === currentWord.word) {
      setSelectedStatus('correct');
      incrementScore(30);
      markWordAsLearned(currentWord.id, 'sentence');
      setTimeout(generateQuiz, 2000);
    } else {
      setSelectedStatus('incorrect');
      markWordAsIncorrect(currentWord.id);
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
    <div className="py-8 flex flex-col items-center h-full max-w-md mx-auto px-4">
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-8">配對句子 (Sentence Matching)</h2>
      
      <motion.div 
        key={currentWord.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel w-full p-8 flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-teal-500 to-cyan-600 shadow-teal-500/30 min-h-[200px] relative"
      >
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${getTagColor(currentWord.category)}`}>
          {currentWord.category}
        </span>
        <div className="text-white text-lg opacity-80 uppercase tracking-widest mb-4 mt-4">
          Fill in the blank
        </div>
        <div className="text-2xl font-medium text-white text-center leading-relaxed">
          {sentenceParts.before} 
          <span className="inline-block w-24 h-8 border-b-2 border-white mx-2 align-bottom"></span> 
          {sentenceParts.after}
        </div>
      </motion.div>

      <div className="w-full flex flex-col gap-3">
        <AnimatePresence>
          {options.map((option, idx) => (
            <motion.button
              key={option + idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(option)}
              className={`p-5 rounded-xl text-lg font-bold transition-colors w-full text-center ${
                selectedStatus === 'correct' && option === currentWord.word
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/40'
                  : selectedStatus === 'incorrect' && option !== currentWord.word
                  ? 'bg-red-50 text-red-500 border border-red-200 dark:bg-red-900/50 dark:border-red-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-md hover:shadow-lg border border-slate-100 dark:border-slate-700'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {selectedStatus === 'correct' && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-6 text-green-600 dark:text-green-400 font-bold text-xl text-center"
        >
          Excellent Job! 🎉<br/>
          <span className="text-sm font-normal text-slate-500 dark:text-slate-400 mt-2 block">
            {currentWord.word} means: {currentWord.translation}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default QuizSentence;
