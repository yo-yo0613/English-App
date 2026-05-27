import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday 
} from 'date-fns';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const { history, theme } = useProgress();
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "yyyy-MM-dd";
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <AnimatePresence>
      {isOpen && (
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
            className={`w-full max-w-md rounded-3xl p-6 shadow-2xl relative border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
          >
            {/* Force Vite HMR update */}
            <button 
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center mb-6">
              <div className={`p-3 rounded-full mb-3 ${theme === 'dark' ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                <CalendarIcon size={28} />
              </div>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Learning Calendar</h3>
            </div>

            <div className="flex justify-between items-center mb-4">
              <button onClick={prevMonth} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-slate-700 text-white' : 'hover:bg-slate-100 text-slate-900'}`}>
                <ChevronLeft size={20} />
              </button>
              <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {format(currentDate, 'MMMM yyyy')}
              </h4>
              <button onClick={nextMonth} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-slate-700 text-white' : 'hover:bg-slate-100 text-slate-900'}`}>
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map(day => (
                <div key={day} className={`text-center text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map(day => {
                const dateKey = format(day, dateFormat);
                const wordsLearned = history[dateKey] || 0;
                
                // Color intensity based on words learned (max intensity around 200 words)
                const intensity = Math.min(wordsLearned / 200, 1);
                
                let bgColor = theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-50';
                let textColor = theme === 'dark' ? 'text-slate-300' : 'text-slate-700';
                
                if (wordsLearned > 0) {
                  bgColor = 'bg-indigo-500';
                  textColor = 'text-white font-bold';
                  if (intensity < 0.3) bgColor = theme === 'dark' ? 'bg-indigo-800/60' : 'bg-indigo-300';
                  else if (intensity < 0.7) bgColor = theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-400';
                }

                if (!isSameMonth(day, monthStart)) {
                  textColor = theme === 'dark' ? 'text-slate-600' : 'text-slate-300';
                  bgColor = 'bg-transparent';
                }

                return (
                  <div 
                    key={day.toString()} 
                    className={`relative flex flex-col items-center justify-center h-12 rounded-lg transition-colors ${bgColor}`}
                  >
                    <span className={`text-sm ${textColor} ${isToday(day) && wordsLearned === 0 ? 'font-black underline decoration-2 underline-offset-4 decoration-indigo-500' : ''}`}>
                      {format(day, 'd')}
                    </span>
                    {wordsLearned > 0 && isSameMonth(day, monthStart) && (
                      <span className="text-[9px] text-white/80 font-medium">
                        {wordsLearned}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className={`mt-6 flex items-center justify-center gap-2 text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>Less</span>
              <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-indigo-800/60' : 'bg-indigo-300'}`}></div>
              <div className={`w-4 h-4 rounded ${theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-400'}`}></div>
              <div className="w-4 h-4 rounded bg-indigo-500"></div>
              <span>More</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendarModal;
