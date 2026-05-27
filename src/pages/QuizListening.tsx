import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultWordList, type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';
import { fetchWordData } from '../services/dictionaryApi';
import { Volume2, Loader } from 'lucide-react';
import { shuffleArray, pickRandomWordWeighted } from '../utils/algorithms';

const QuizListening: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned } = useProgress();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const generateQuiz = async () => {
    setSelectedStatus('idle');
    setAudioUrl(null);
    setLoadingAudio(true);

    const target = pickRandomWordWeighted(defaultWordList, wordsLearned);
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

    // Pick 3 random wrong options using Fisher-Yates
    const wrongOptions = shuffleArray(defaultWordList.filter(w => w.id !== target.id)).slice(0, 3);
    const allOptions = shuffleArray([...wrongOptions, target]);
    setOptions(allOptions);

    if (url) {
      const audio = new Audio(url);
      audio.play().catch((_) => console.log('Audio autoplay prevented'));
    } else {
       // fallback to speech synthesis
       playSpeechSynthesis(target.word);
    }
  };

  const playSpeechSynthesis = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    } else if (currentWord) {
      playSpeechSynthesis(currentWord.word);
    }
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleSelect = (option: WordItem) => {
    if (selectedStatus !== 'idle' || !currentWord) return;

    if (option.id === currentWord.id) {
      setSelectedStatus('correct');
      incrementScore(15);
      markWordAsLearned(currentWord.id, 'listening');
      setTimeout(generateQuiz, 1500);
    } else {
      setSelectedStatus('incorrect');
      setTimeout(() => setSelectedStatus('idle'), 1000);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="py-8 flex flex-col items-center h-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-slate-700 mb-8">聽單字 (Listening)</h2>
      
      <motion.div 
        className="glass-panel w-full p-10 flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/30 min-h-[200px]"
      >
        {loadingAudio ? (
          <Loader className="animate-spin text-white w-12 h-12" />
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playAudio}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/40 shadow-xl"
          >
            <Volume2 className="text-white w-12 h-12" />
          </motion.button>
        )}
      </motion.div>

      <div className="w-full flex flex-col gap-3">
        <AnimatePresence>
          {options.map((option, idx) => (
            <motion.button
              key={option.id + idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(option)}
              className={`p-4 rounded-xl text-lg font-bold transition-colors w-full text-left px-6 ${
                selectedStatus === 'correct' && option.id === currentWord.id
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/40'
                  : selectedStatus === 'incorrect' && option.id !== currentWord.id
                  ? 'bg-red-50 text-red-500 border border-red-200'
                  : 'bg-white text-slate-700 shadow-md hover:shadow-lg border border-slate-100'
              }`}
            >
              {option.word} <span className="text-sm font-normal opacity-60 ml-2">({option.translation})</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {selectedStatus === 'correct' && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-6 text-green-600 font-bold text-xl"
        >
          Perfect Listening! 🎧
        </motion.div>
      )}
    </div>
  );
};

export default QuizListening;
