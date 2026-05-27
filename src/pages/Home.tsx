import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { BookOpen, Headphones, Edit3, Mic, Trophy, Type } from 'lucide-react';

const Home: React.FC = () => {
  const { score, dailyGoal, dailyProgress } = useProgress();

  const features = [
    { name: '看單字 (Reading)', path: '/reading', icon: BookOpen, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400', progress: dailyProgress.reading },
    { name: '聽單字 (Listening)', path: '/listening', icon: Headphones, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400', progress: dailyProgress.listening },
    { name: '說單字 (Speaking)', path: '/speaking', icon: Mic, color: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400', progress: dailyProgress.speaking },
    { name: '拼寫單字 (Writing)', path: '/writing', icon: Edit3, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400', progress: dailyProgress.writing },
    { name: '配對句子 (Sentence)', path: '/sentence', icon: Type, color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400', progress: 0 },
  ];

  return (
    <div className="flex flex-col gap-6 py-6">
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
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={feature.path} className="block h-full">
                <div className="glass-panel p-5 h-full flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer dark:bg-slate-800/80 dark:border-slate-700">
                  <div className={`p-4 rounded-full ${feature.color}`}>
                    <Icon size={28} />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-center text-sm">{feature.name}</span>
                  
                  {feature.path !== '/sentence' && (
                    <div className="w-full mt-2">
                      <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                        <span>{feature.progress}</span>
                        <span>{dailyGoal}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div className="bg-indigo-600 h-1.5 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>
                  )}
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
