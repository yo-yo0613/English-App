import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Mic, Edit3, Headphones, Settings as SettingsIcon, Calendar as CalendarIcon } from 'lucide-react';
import CalendarModal from './CalendarModal';

const Layout: React.FC = () => {
  const location = useLocation();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/reading', label: '看單字', icon: BookOpen },
    { path: '/listening', label: '聽單字', icon: Headphones },
    { path: '/speaking', label: '說單字', icon: Mic },
    { path: '/writing', label: '拼寫', icon: Edit3 },
    { path: '/settings', label: '設定', icon: SettingsIcon }
  ];
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative sm:max-w-xl md:max-w-2xl">
      {/* Top Header */}
      <header className="px-6 py-4 flex justify-between items-center glass-panel m-4 mt-6 z-10">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          English Mastery
        </div>
        <button 
          onClick={() => setIsCalendarOpen(true)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors"
        >
          <CalendarIcon size={24} />
        </button>
      </header>

      {/* Calendar Modal */}
      <CalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 pb-24 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Friendly) */}
      <nav className="fixed bottom-0 left-0 right-0 glass-panel rounded-b-none border-b-0 border-x-0 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-[90%] sm:max-w-md sm:rounded-2xl sm:border z-50">
        <ul className="flex justify-around items-center p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative flex flex-col items-center"
                  >
                    <Icon size={24} />
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-2 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      />
                    )}
                  </motion.div>
                  <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
