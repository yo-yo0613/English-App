import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';
import { useWordList } from '../hooks/useWordList';
import { Mic, MicOff, AlertCircle, Volume2, CheckCircle2 } from 'lucide-react';
import { pickRandomWordWeighted } from '../utils/algorithms';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const QuizSpeaking: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned, selectedCategory = 'General', theme } = useProgress();
  const { wordList } = useWordList();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [error, setError] = useState('');
  
  const [isSupported, setIsSupported] = useState(true);
  const [useSelfCheck, setUseSelfCheck] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  const playSpeechSynthesis = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateQuiz = () => {
    setStatus('idle');
    setTranscript('');
    setError('');
    
    const wordsSource = selectedCategory === 'General' || selectedCategory === 'All' 
      ? wordList 
      : wordList.filter(w => w.category === selectedCategory);
    
    const activeWordList = wordsSource.length > 0 ? wordsSource : wordList;
    const target = pickRandomWordWeighted(activeWordList, wordsLearned);
    setCurrentWord(target);

    // Auto-play the English pronunciation so the user hears how it's said
    setTimeout(() => {
      playSpeechSynthesis(target.word);
    }, 300);
  };

  useEffect(() => {
    generateQuiz();
    
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
        checkAnswer(result);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        
        // Silent ignore for 'aborted' error which is triggered when manually stopping or on standard mobile sleep/timeout
        if (event.error === 'aborted') {
          return;
        }
        
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          setError('No speech detected. Please speak clearly and closer to the microphone.');
        } else {
          setError(`Speech recognition error: ${event.error}. Please try again.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      setUseSelfCheck(true);
      setError('Speech recognition is not supported in this browser. Try Chrome or Safari.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const checkAnswer = (spokenText: string) => {
    if (!currentWord) return;
    
    // Clean up punctuation and convert to lower case for comparison
    const cleanSpoken = spokenText.replace(/[.,!?]/g, '').trim().toLowerCase();
    const cleanTarget = currentWord.word.toLowerCase();

    if (cleanSpoken.includes(cleanTarget) || cleanSpoken === cleanTarget) {
      setStatus('correct');
      incrementScore(25);
      markWordAsLearned(currentWord.id, 'speaking');
      setTimeout(generateQuiz, 2000);
    } else {
      setStatus('incorrect');
      setTimeout(() => {
        setStatus('idle');
        setTranscript('');
      }, 2000);
    }
  };

  const handleManualCorrect = () => {
    if (!currentWord) return;
    setStatus('correct');
    incrementScore(25);
    markWordAsLearned(currentWord.id, 'speaking');
    setTimeout(generateQuiz, 2000);
  };

  const toggleListening = () => {
    setError(''); // Clear error on retry
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e: any) {
        console.error(e);
        setError('Failed to start speech recognition. Please try again.');
      }
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
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-8">說單字 (Speaking)</h2>
      
      <motion.div 
        key={currentWord.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel w-full p-10 flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-green-400 to-emerald-600 shadow-green-500/30 text-white min-h-[220px] relative"
      >
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${getTagColor(currentWord.category)}`}>
          {currentWord.category}
        </span>

        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playSpeechSynthesis(currentWord.word);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/35 rounded-full text-white backdrop-blur-sm border border-white/25 transition-all shadow-md active:scale-95 flex items-center justify-center"
        >
          <Volume2 size={18} className={isPlaying ? "animate-pulse" : ""} />
        </button>

        <span className="text-4xl font-black tracking-wider mb-2 mt-4">{currentWord.word}</span>
        <span className="text-lg opacity-80">{currentWord.translation}</span>
      </motion.div>

      {useSelfCheck ? (
        <div className="flex flex-col items-center w-full gap-5 mt-4">
          <p className="text-slate-500 dark:text-slate-400 font-semibold text-center px-4 leading-relaxed text-sm">
            📢 進入自主跟讀練習模式<br />
            請點擊卡片右上角發音，跟著大聲唸出來！
          </p>

          <div className="flex gap-4 w-full mt-2">
            <button
              onClick={() => playSpeechSynthesis(currentWord.word)}
              className="flex-1 py-4 bg-indigo-50 border border-indigo-200 dark:bg-slate-800 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl shadow-sm transition-all hover:bg-indigo-100 flex items-center justify-center gap-2 active:scale-95"
            >
              <Volume2 size={20} className={isPlaying ? "animate-pulse" : ""} /> 播放發音
            </button>
            
            <button
              onClick={handleManualCorrect}
              className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 size={20} /> 我已完成跟讀
            </button>
          </div>

          {isSupported && (
            <button
              onClick={() => {
                setUseSelfCheck(false);
                setError('');
              }}
              className="text-sm font-medium text-slate-400 hover:text-indigo-500 transition-colors mt-2"
            >
              ← 切換回麥克風語音辨識
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-red-500/50' 
                : 'bg-white text-emerald-500 border-2 border-emerald-100 hover:border-emerald-300 dark:bg-slate-800 dark:border-slate-700 dark:text-emerald-400'
            }`}
          >
            {isListening ? <MicOff size={40} /> : <Mic size={40} />}
          </motion.button>
          
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {isListening ? 'Listening... Speak now!' : 'Tap the microphone and speak'}
          </p>

          <button
            onClick={() => {
              setUseSelfCheck(true);
              setError('');
            }}
            className="text-sm font-medium text-slate-400 hover:text-indigo-500 transition-colors mt-2"
          >
            無法語音？切換至自主跟讀練習模式
          </button>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-950/30 dark:border-red-900/50 p-4 rounded-xl w-full border border-red-200 mt-2"
            >
              <AlertCircle size={20} className="shrink-0" />
              <span className="text-sm text-left leading-relaxed">{error}</span>
            </motion.div>
          )}
        </div>
      )}

      {!isSupported && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400 text-xs rounded-xl w-full text-left leading-relaxed">
          <strong>⚠️ 蘋果 iOS 裝置重要提示：</strong><br />
          若您使用 LINE、Facebook、Instagram 等 App 內建瀏覽器開啟，iOS 系統因隱私限制會**封鎖麥克風語音辨識**。
          <br /><br />
          <strong>解決方法：</strong><br />
          1. 請點擊螢幕右下角/右上角的分享圖示，選擇 <strong>「以 Safari 瀏覽器開啟」</strong>。<br />
          2. 或在 Safari 瀏覽器中點選「分享」按鈕，並選擇 <strong>「加入主畫面」</strong> 安裝為應用程式即可完美執行麥克風辨識！
        </div>
      )}

      <AnimatePresence>
        {status === 'correct' && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-green-600 dark:text-green-400 font-bold text-xl text-center"
          >
            Great Pronunciation! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      {transcript && !useSelfCheck && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mt-4 p-4 rounded-xl w-full text-center font-medium border ${
            status === 'correct' 
              ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900/40 dark:text-green-400' 
              : status === 'incorrect'
              ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-400'
              : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
          }`}
        >
          You said: <span className="font-bold text-lg ml-1">"{transcript}"</span>
          {status === 'incorrect' && <div className="text-red-500 dark:text-red-400 mt-2 text-sm">Try again!</div>}
        </motion.div>
      )}
    </div>
  );
};

export default QuizSpeaking;
