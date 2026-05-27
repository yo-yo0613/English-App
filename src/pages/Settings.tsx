import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { Moon, Sun, Bell, Target, Share2, X, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const Settings: React.FC = () => {
  const { dailyGoal, setDailyGoal, notificationTime, setNotificationTime, theme, setTheme } = useProgress();
  const [showQR, setShowQR] = useState(false);
  
  // Dummy URL for QR code, typically this would be window.location.origin
  const shareUrl = "https://english-mastery-app.vercel.app/"; 

  const handlePushNotificationTest = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('English Mastery', {
            body: 'It is time to practice your vocabulary!',
            icon: '/pwa-192x192.svg'
          });
        } else {
          alert('Notifications were blocked. Please enable them in your browser settings.');
        }
      });
    } else {
      alert('Your browser does not support Web Push Notifications.');
    }
  };

  return (
    <div className="py-6 flex flex-col gap-6 max-w-md mx-auto">
      <h1 className={`text-2xl font-bold px-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Settings</h1>
      
      {/* Theme Toggle */}
      <div className="glass-panel p-5 dark:bg-slate-800/80 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
            {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
            <span className="font-semibold">Appearance</span>
          </div>
          <button 
            onClick={() => {
              const newTheme = theme === 'light' ? 'dark' : 'light';
              setTheme(newTheme);
              if (newTheme === 'dark') document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            }}
            className="px-4 py-2 bg-slate-200 text-slate-800 dark:bg-slate-700 rounded-lg font-medium transition-colors dark:text-white"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="glass-panel p-5 dark:bg-slate-800/80 dark:border-slate-700">
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 mb-4">
          <Target size={24} />
          <span className="font-semibold">Daily Vocabulary Goal</span>
        </div>
        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-700">
          {[50, 100, 200, 300].map(val => (
            <button
              key={val}
              onClick={() => setDailyGoal(val)}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                dailyGoal === val 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">Your current target is to practice {dailyGoal} words per mode daily.</p>
      </div>

      {/* Notifications */}
      <div className="glass-panel p-5 dark:bg-slate-800/80 dark:border-slate-700">
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 mb-4">
          <Bell size={24} />
          <span className="font-semibold">Daily Reminders</span>
        </div>
        <div className="flex gap-4">
          <input 
            type="time" 
            value={notificationTime}
            onChange={(e) => setNotificationTime(e.target.value)}
            className={`flex-1 p-3 rounded-xl border outline-none focus:border-indigo-500 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
          />
          <button 
            onClick={handlePushNotificationTest}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white rounded-xl font-bold"
          >
            Test
          </button>
        </div>
      </div>

      {/* Share & Install */}
      <div className="glass-panel p-5 dark:bg-slate-800/80 dark:border-slate-700 cursor-pointer hover:bg-white/90 dark:hover:bg-slate-700/80 transition-colors"
           onClick={() => setShowQR(true)}>
        <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
          <div className="flex items-center gap-3">
            <Share2 size={24} />
            <span className="font-semibold">Share App (QR Code)</span>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-300 transition-colors"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-bold text-center mb-6 dark:text-white">Share App</h3>
              
              <div className="flex justify-center mb-6 bg-white p-4 rounded-xl">
                <QRCodeSVG value={shareUrl} size={200} level="H" includeMargin={true} />
              </div>
              
              <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold flex items-center gap-2 mb-2"><Download size={16}/> iOS (Safari)</h4>
                  <p>1. Open this link/scan QR with Safari.</p>
                  <p>2. Tap the <strong>Share</strong> icon at the bottom.</p>
                  <p>3. Select <strong>Add to Home Screen</strong>.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold flex items-center gap-2 mb-2"><Download size={16}/> Android (Chrome)</h4>
                  <p>1. Open this link/scan QR with Chrome.</p>
                  <p>2. A prompt to <strong>Install App</strong> should appear.</p>
                  <p>3. Or tap the menu (3 dots) and select <strong>Add to Home screen</strong>.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
