import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';

export interface ProgressState {
  score: number;
  wordsLearned: string[];
  
  // Daily goals
  dailyGoal: number;
  dailyProgress: {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
    lastUpdated: string;
  };
  
  // History: Record of 'YYYY-MM-DD' to number of words learned that day
  history: Record<string, number>;
  
  // Settings
  notificationTime: string;
  theme: 'light' | 'dark';

  // Actions
  incrementScore: (points: number) => void;
  markWordAsLearned: (wordId: string, type: 'listening' | 'speaking' | 'reading' | 'writing') => void;
  setDailyGoal: (goal: number) => void;
  setNotificationTime: (time: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  resetProgress: () => void;
  syncWithSupabase: (userId: string) => Promise<void>;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      score: 0,
      wordsLearned: [],
      dailyGoal: 200,
      dailyProgress: {
        listening: 0,
        speaking: 0,
        reading: 0,
        writing: 0,
        lastUpdated: getTodayDateString(),
      },
      history: {},
      notificationTime: '20:00',
      theme: 'light',

      incrementScore: (points) => set((state) => {
        const newScore = state.score + points;
        return { score: newScore };
      }),

      markWordAsLearned: (wordId, type) => set((state) => {
        const today = getTodayDateString();
        const isNewDay = state.dailyProgress.lastUpdated !== today;
        
        const newDailyProgress = isNewDay ? {
          listening: 0,
          speaking: 0,
          reading: 0,
          writing: 0,
          lastUpdated: today,
        } : { ...state.dailyProgress };

        newDailyProgress[type] += 1;

        const newWordsLearned = state.wordsLearned.includes(wordId) 
          ? state.wordsLearned 
          : [...state.wordsLearned, wordId];

        // Update history
        const newHistory = { ...state.history };
        newHistory[today] = (newHistory[today] || 0) + 1;

        return {
          wordsLearned: newWordsLearned,
          dailyProgress: newDailyProgress,
          history: newHistory,
        };
      }),

      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      setNotificationTime: (time) => set({ notificationTime: time }),
      setTheme: (theme) => set({ theme }),
      resetProgress: () => set({ 
        score: 0, 
        wordsLearned: [], 
        dailyProgress: {
          listening: 0, speaking: 0, reading: 0, writing: 0, lastUpdated: getTodayDateString()
        },
        history: {}
      }),

      syncWithSupabase: async (userId) => {
        const state = get();
        // Upload local state to Supabase
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: userId,
            score: state.score,
            words_learned: state.wordsLearned,
            daily_goal: state.dailyGoal,
            daily_progress: state.dailyProgress,
          });
        
        if (error) {
          console.error('Error syncing to Supabase:', error);
        }
      }
    }),
    {
      name: 'english-app-progress',
    }
  )
);
