import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { defaultWordList, type WordItem } from '../data/wordList';
import { useProgress } from '../hooks/useProgress';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { pickRandomWordWeighted } from '../utils/algorithms';

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const QuizSpeaking: React.FC = () => {
  const { incrementScore, markWordAsLearned, wordsLearned } = useProgress();
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [error, setError] = useState('');
  
  const recognitionRef = useRef<any>(null);

  const generateQuiz = () => {
    setStatus('idle');
    setTranscript('');
    setError('');
    const target = pickRandomWordWeighted(defaultWordList, wordsLearned);
    setCurrentWord(target);
  };

  useEffect(() => {
    generateQuiz();
    
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
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
      setError('Speech recognition is not supported in this browser. Try Chrome or Safari.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
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

  return (
    <div className="py-8 flex flex-col items-center h-full max-w-md mx-auto px-4">
      <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-8">說單字 (Speaking)</h2>
      
      <motion.div 
        key={currentWord.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel w-full p-10 flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-green-400 to-emerald-600 shadow-green-500/30 text-white min-h-[220px]"
      >
        <span className="text-4xl font-black tracking-wider mb-2">{currentWord.word}</span>
        <span className="text-lg opacity-80">{currentWord.translation}</span>
      </motion.div>

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

      {transcript && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mt-8 p-4 rounded-xl w-full text-center font-medium border ${
            status === 'correct' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : status === 'incorrect'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          You said: <span className="font-bold text-lg ml-1">"{transcript}"</span>
          {status === 'correct' && <div className="text-green-600 mt-2 font-black">Great Pronunciation! 🎉</div>}
          {status === 'incorrect' && <div className="text-red-500 mt-2">Try again!</div>}
        </motion.div>
      )}
    </div>
  );
};

export default QuizSpeaking;
