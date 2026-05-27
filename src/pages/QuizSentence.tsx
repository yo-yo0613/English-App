import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWordList, type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';
import { shuffleArray, pickRandomWordWeighted } from '../utils/algorithms';

const QuizSentence: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned } = useProgress();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [sentenceParts, setSentenceParts] = useState<{ before: string, after: string }>({ before: '', after: '' });

  const generateQuiz = () => {
    setSelectedStatus('idle');
    const target = pickRandomWordWeighted(defaultWordList.filter(w => w.example), wordsLearned);
    setCurrentWord(target);
    
    // Split the example sentence around the word (case insensitive)
    const regex = new RegExp(`(${target.word})`, 'i');
    const parts = target.example.split(regex);
    
    if (parts.length >= 3) {
      setSentenceParts({ before: parts[0], after: parts[2] });
    } else {
      setSentenceParts({ before: target.example + ' (', after: ')' });
    }

    // Pick 3 random wrong options
    const wrongOptions = shuffleArray(defaultWordList.filter(w => w.id !== target.id)).slice(0, 3).map(w => w.word);
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
      // We categorize this under 'reading' for progress tracking
      markWordAsLearned(currentWord.id, 'reading');
      setTimeout(generateQuiz, 2000);
    } else {
      setSelectedStatus('incorrect');
      setTimeout(() => setSelectedStatus('idle'), 1000);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="py-8 flex flex-col items-center h-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-8">配對句子 (Sentence Matching)</h2>
      
      <motion.div 
        key={currentWord.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel w-full p-8 flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-teal-500 to-cyan-600 shadow-teal-500/30 min-h-[200px]"
      >
        <div className="text-white text-lg opacity-80 uppercase tracking-widest mb-4">
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
