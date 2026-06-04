import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { useWordList } from '../hooks/useWordList';
import { BookOpen, Headphones, Edit3, Mic, Trophy, Type, Check } from 'lucide-react';

const Home: React.FC = () => {
  const { score, dailyGoal, dailyProgress, selectedCategory, setSelectedCategory, selectedLevels = {}, setSelectedLevel, wordProficiency = {} } = useProgress();
  const { wordList } = useWordList();

  const activeLevel = selectedLevels[selectedCategory] || 1;

  // Filter words by current category to calculate levels
  const filteredCategoryWords = useMemo(() => {
    if (selectedCategory === 'General' || selectedCategory === 'All') {
      return wordList;
    }
    return wordList.filter(w => w.category === selectedCategory);
  }, [wordList, selectedCategory]);

  const totalWords = filteredCategoryWords.length;
  const totalLevels = Math.ceil(totalWords / 20);

  const features = [
    { name: '背單字 (Flashcards)', path: '/flashcards', icon: BookOpen, color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400', progress: dailyProgress.flashcards || 0 },
    { name: '讀單字 (Reading)', path: '/reading', icon: BookOpen, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400', progress: dailyProgress.reading || 0 },
    { name: '聽單字 (Listening)', path: '/listening', icon: Headphones, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400', progress: dailyProgress.listening || 0 },
    { name: '說單字 (Speaking)', path: '/speaking', icon: Mic, color: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400', progress: dailyProgress.speaking || 0 },
    { name: '寫單字 (Writing)', path: '/writing', icon: Edit3, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400', progress: dailyProgress.writing || 0 },
    { name: '配對句子 (Sentence)', path: '/sentence', icon: Type, color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400', progress: dailyProgress.sentence || 0 },
  ];

  return (
    <div className="flex flex-col gap-6 py-6 animate-fade-in">
      {/* Dashboard Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-6 relative overflow-hidden dark:bg-slate-800/80 dark:border-slate-700"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <h1 className="text-2xl font-bold mb-2 dark:text-white">Welcome Back! 🚀</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-6">Ready to master your English vocabulary?</p>
        
        <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 rounded-xl p-4 border border-white dark:border-slate-600">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg text-yellow-600 dark:text-yellow-500">
              <Trophy size={24} />
            </div>
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Score</div>
              <div className="text-2xl font-black text-slate-800 dark:text-white">{score}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Daily Goal</div>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">{dailyGoal} <span className="text-sm font-normal text-slate-400">words/type</span></div>
          </div>
        </div>
      </motion.div>

      {/* Category Selector */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-5 dark:bg-slate-800/80 dark:border-slate-700"
      >
        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 px-1">選擇學習範圍 (Category)</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {['General', 'GEPT-Beginner', 'GEPT-Intermediate', 'GEPT-Advanced', 'TOEIC', 'TOEFL', 'Business'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                (selectedCategory || 'General') === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 border border-transparent dark:border-slate-800'
              }`}
            >
              {cat === 'General' ? 'General (全部)' : cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Level Selector */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="glass-panel p-5 dark:bg-slate-800/80 dark:border-slate-700"
      >
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400">選擇闖關關卡 (Level)</h2>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full">
            目前所選: L{activeLevel}
          </span>
        </div>
        
        {totalLevels === 0 ? (
          <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-sm">
            載入單字庫中...
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3 max-h-[220px] overflow-y-auto pr-1 select-none scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-200">
            {Array.from({ length: totalLevels }, (_, idx) => {
              const levelNum = idx + 1;
              const startIdx = idx * 20;
              const levelWords = filteredCategoryWords.slice(startIdx, startIdx + 20);
              
              // Count words in this level that have been started (proficiency >= 1)
              const startedCount = levelWords.filter(w => (wordProficiency[w.id] || 0) >= 1).length;
              // Count words in this level that are mastered (proficiency >= 3)
              const masteredCount = levelWords.filter(w => (wordProficiency[w.id] || 0) >= 3).length;
              
              const isCurrent = activeLevel === levelNum;
              const isCompleted = masteredCount === levelWords.length && levelWords.length > 0;
              
              return (
                <button
                  key={levelNum}
                  onClick={() => setSelectedLevel(selectedCategory, levelNum)}
                  className={`relative p-2.5 rounded-2xl flex flex-col items-center justify-center border transition-all active:scale-95 ${
                    isCurrent
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : isCompleted
                      ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-300'
                      : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 hover:dark:border-slate-600'
                  }`}
                >
                  <span className="text-sm font-black">L{levelNum}</span>
                  <span className="text-[10px] opacity-75 mt-0.5">{startedCount}/{levelWords.length}</span>
                  {isCompleted && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white rounded-full p-0.5 shadow-sm flex items-center justify-center">
                      <Check size={8} strokeWidth={4} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Quiz Options */}
      <div className="grid grid-cols-2 gap-4 pb-12">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          const progressPercent = Math.min((feature.progress / dailyGoal) * 100, 100);
          
          return (
            <motion.div
              key={feature.path}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: (idx + 4) * 0.08 }}
            >
              <Link to={feature.path} className="block h-full">
                <div className="glass-panel p-5 h-full flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer dark:bg-slate-800/80 dark:border-slate-700">
                  <div className={`p-4 rounded-full ${feature.color}`}>
                    <Icon size={28} />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-center text-sm">{feature.name}</span>
                  
                  <div className="w-full mt-2">
                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                      <span>{feature.progress}</span>
                      <span>{dailyGoal}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                      <div className="bg-indigo-600 h-1.5 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
