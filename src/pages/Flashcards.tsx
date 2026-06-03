import React, { useState, useEffect, useRef } from 'react';
import { motion, } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { useWordList } from '../hooks/useWordList';
import { fetchWordData } from '../services/dictionaryApi';
import { Volume2, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

const Flashcards: React.FC = () => {
  const { theme, markWordAsLearned, selectedCategory = 'General' } = useProgress();
  const { wordList } = useWordList();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredWords = React.useMemo(() => {
    if (selectedCategory === 'General' || selectedCategory === 'All') {
      return wordList;
    }
    const filtered = wordList.filter(w => w.category === selectedCategory);
    return filtered.length > 0 ? filtered : wordList;
  }, [selectedCategory, wordList]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const word = filteredWords[currentIndex] || filteredWords[0] || wordList[0];

  const playSpeechSynthesis = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Reset state when word changes
    setIsFlipped(false);
    setAudioUrl(null);
    
    // Fetch audio from API
    const getAudio = async () => {
      const data = await fetchWordData(word.word);
      let url = null;
      if (data && data.phonetics) {
        url = data.phonetics.find(p => p.audio && p.audio.length > 0)?.audio || null;
      }
      setAudioUrl(url);

      // Auto play audio
      if (url) {
        const audio = new Audio(url);
        audio.play().catch((_) => {
          // Fallback to TTS if autoplay blocked or fails
          playSpeechSynthesis(word.word);
        });
      } else {
        playSpeechSynthesis(word.word);
      }
    };
    getAudio();
  }, [currentIndex, word.word]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          console.error("Audio playback error, falling back to TTS:", err);
          playSpeechSynthesis(word.word);
          setIsPlaying(false);
        });
    } else {
      playSpeechSynthesis(word.word);
    }
  };

  const handleNext = () => {
    // Mark word as learned under flashcards progress
    markWordAsLearned(word.id, 'flashcards');
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  const getTagColor = (category: string) => {
    if (category.includes('GEPT')) return theme === 'dark' ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-100 text-blue-600';
    if (category.includes('TOEIC')) return theme === 'dark' ? 'bg-orange-900/40 text-orange-400' : 'bg-orange-100 text-orange-600';
    if (category.includes('TOEFL')) return theme === 'dark' ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-600';
    if (category.includes('Business')) return theme === 'dark' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600';
    return theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="py-6 flex flex-col gap-6 max-w-md mx-auto items-center justify-center min-h-[70vh]">
      <div className="w-full flex justify-between items-center mb-2 px-4">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Flashcards</h1>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          {currentIndex + 1} / {filteredWords.length}
        </span>
      </div>

      {/* The 3D Flip Card */}
      <div 
        className="w-full aspect-[4/5] relative perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full absolute preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Front of Card */}
          <div className={`absolute w-full h-full backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center border shadow-xl ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <span className={`absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-bold ${getTagColor(word.category)}`}>
              {word.category}
            </span>
            
            <button 
              onClick={playAudio}
              className={`absolute top-6 right-6 p-3 rounded-full transition-colors ${theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'}`}
            >
              <Volume2 size={24} className={isPlaying ? "animate-pulse" : ""} />
            </button>

            <h2 className={`text-5xl font-black mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              {word.word}
            </h2>
            <p className={`text-sm font-medium flex items-center gap-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <RefreshCw size={16} /> Tap to flip
            </p>
          </div>

          {/* Back of Card */}
          <div 
            className={`absolute w-full h-full backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center border shadow-xl ${theme === 'dark' ? 'bg-indigo-900/40 border-indigo-500/30' : 'bg-indigo-50 border-indigo-100'}`}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <h2 className={`text-4xl font-black mb-2 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}>
              {word.translation}
            </h2>
            
            <div className="w-full h-px bg-current opacity-20 my-6"></div>
            
            <div className="w-full text-left space-y-3">
              <p className={`text-lg font-medium leading-snug ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                "{word.example}"
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {word.exampleTranslation}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="w-full flex justify-between px-4 mt-4">
        <button 
          onClick={handlePrev}
          className={`p-4 rounded-2xl flex items-center gap-2 font-bold transition-all active:scale-95 ${theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-white text-slate-600 shadow-sm hover:shadow-md border border-slate-100'}`}
        >
          <ArrowLeft size={20} /> Prev
        </button>
        <button 
          onClick={handleNext}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
          Next <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
