import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWordList, type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';
import { Check, X } from 'lucide-react';
import { pickRandomWordWeighted } from '../utils/algorithms';

const QuizWriting: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned, selectedCategory = 'General' } = useProgress();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuiz = () => {
    setStatus('idle');
    setInput('');
    
    const wordsSource = selectedCategory === 'General' || selectedCategory === 'All' 
      ? defaultWordList 
      : defaultWordList.filter(w => w.category === selectedCategory);
    
    const activeWordList = wordsSource.length > 0 ? wordsSource : defaultWordList;
    const target = pickRandomWordWeighted(activeWordList, wordsLearned);
    setCurrentWord(target);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || status !== 'idle' || !input.trim()) return;

    if (input.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      setStatus('correct');
      incrementScore(20);
      markWordAsLearned(currentWord.id, 'writing');
      setTimeout(generateQuiz, 1500);
    } else {
      setStatus('incorrect');
      setTimeout(() => {
        setStatus('idle');
        setInput('');
        inputRef.current?.focus();
      }, 1000);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="py-8 flex flex-col items-center h-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-slate-700 mb-8">拼寫單字 (Writing)</h2>
      
      <motion.div 
        key={currentWord.id}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel w-full p-8 flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/30 text-white"
      >
        <span className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Translate to English</span>
        <span className="text-4xl font-black">{currentWord.translation}</span>
      </motion.div>

      <form onSubmit={handleSubmit} className="w-full relative">
        <motion.div
          animate={status === 'incorrect' ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status !== 'idle'}
            placeholder="Type the word here..."
            className={`w-full p-5 rounded-2xl text-2xl text-center font-bold outline-none transition-all ${
              status === 'correct'
                ? 'bg-green-50 border-2 border-green-500 text-green-700'
                : status === 'incorrect'
                ? 'bg-red-50 border-2 border-red-500 text-red-700'
                : 'bg-white border-2 border-slate-200 focus:border-orange-500 text-slate-800 shadow-md'
            }`}
          />
          <AnimatePresence>
            {status === 'correct' && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
              >
                <Check size={32} strokeWidth={3} />
              </motion.div>
            )}
            {status === 'incorrect' && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
              >
                <X size={32} strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <button 
          type="submit" 
          disabled={status !== 'idle' || !input.trim()}
          className="w-full mt-6 btn-primary bg-orange-500 hover:bg-orange-600 shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
      </form>
    </div>
  );
};

export default QuizWriting;
