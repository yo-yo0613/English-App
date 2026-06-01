import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWordList, type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';
import { Check, X, Volume2, Loader } from 'lucide-react';
import { pickRandomWordWeighted } from '../utils/algorithms';
import { fetchWordData } from '../services/dictionaryApi';

const QuizWriting: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned, selectedCategory = 'General', theme } = useProgress();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSpeechSynthesis = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      } else {
        audioRef.current.src = audioUrl;
      }
      setIsPlaying(true);
      audioRef.current.play()
        .then(() => {
          setTimeout(() => setIsPlaying(false), 800);
        })
        .catch(err => {
          console.error("Audio error, falling back to TTS:", err);
          playSpeechSynthesis(currentWord?.word || '');
          setIsPlaying(false);
        });
    } else if (currentWord) {
      playSpeechSynthesis(currentWord.word);
    }
  };

  const generateQuiz = async () => {
    setStatus('idle');
    setInput('');
    setAudioUrl(null);
    setLoadingAudio(true);
    
    const wordsSource = selectedCategory === 'General' || selectedCategory === 'All' 
      ? defaultWordList 
      : defaultWordList.filter(w => w.category === selectedCategory);
    
    const activeWordList = wordsSource.length > 0 ? wordsSource : defaultWordList;
    const target = pickRandomWordWeighted(activeWordList, wordsLearned);
    setCurrentWord(target);
    
    // Fetch audio from Dictionary API
    const data = await fetchWordData(target.word);
    let url = null;
    if (data && data.phonetics) {
      const phoneticWithAudio = data.phonetics.find(p => p.audio && p.audio.length > 0);
      if (phoneticWithAudio) url = phoneticWithAudio.audio || null;
    }
    setAudioUrl(url);
    setLoadingAudio(false);

    // Auto play audio
    if (url) {
      const audio = new Audio(url);
      audio.play().catch((_) => {
        // Fallback to TTS if autoplay blocked or fails
        playSpeechSynthesis(target.word);
      });
    } else {
      playSpeechSynthesis(target.word);
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  useEffect(() => {
    generateQuiz();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord || status !== 'idle' || !input.trim()) return;

    if (input.trim().toLowerCase() === currentWord.word.toLowerCase()) {
      setStatus('correct');
      incrementScore(20);
      markWordAsLearned(currentWord.id, 'writing');
      playAudio();
      setTimeout(generateQuiz, 1800);
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

  const getTagColor = (category: string) => {
    if (category.includes('GEPT')) return theme === 'dark' ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600';
    if (category.includes('TOEIC')) return theme === 'dark' ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-100 text-orange-600';
    if (category.includes('TOEFL')) return theme === 'dark' ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-600';
    if (category.includes('Business')) return theme === 'dark' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600';
    return theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="py-8 flex flex-col items-center h-full max-w-md mx-auto px-4">
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-8">拼寫單字 (Writing)</h2>
      
      <motion.div 
        key={currentWord.id}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel w-full p-8 flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/30 text-white relative min-h-[160px]"
      >
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${getTagColor(currentWord.category)}`}>
          {currentWord.category}
        </span>

        <button 
          type="button"
          onClick={() => playAudio()}
          className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/35 rounded-full text-white backdrop-blur-sm border border-white/25 transition-all shadow-md active:scale-95 flex items-center justify-center"
        >
          {loadingAudio ? (
            <Loader size={18} className="animate-spin text-white" />
          ) : (
            <Volume2 size={18} className={isPlaying ? "animate-pulse" : ""} />
          )}
        </button>

        <span className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2 mt-4">Translate to English</span>
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
                ? 'bg-green-50 border-2 border-green-500 text-green-700 dark:bg-green-950/30 dark:border-green-500 dark:text-green-400'
                : status === 'incorrect'
                ? 'bg-red-50 border-2 border-red-500 text-red-700 dark:bg-red-950/30 dark:border-red-500 dark:text-red-400'
                : 'bg-white border-2 border-slate-200 focus:border-orange-500 text-slate-800 shadow-md dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:border-orange-500'
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
