import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';

export interface ProgressState {
  score: number;
  wordsLearned: string[];
  selectedCategory: string;
  selectedLevels: Record<string, number>; // key: category, value: level
  wordProficiency: Record<string, number>; // key: wordId, value: proficiency (0-5)
  
  // Daily goals
  dailyGoal: number;
  dailyProgress: {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
    flashcards: number;
    sentence: number;
    lastUpdated: string;
  };
  
  // History: Record of 'YYYY-MM-DD' to number of words learned that day
  history: Record<string, number>;
  
  // Settings
  notificationTime: string;
  theme: 'light' | 'dark';

  // Actions
  incrementScore: (points: number) => void;
  markWordAsLearned: (wordId: string, type: 'listening' | 'speaking' | 'reading' | 'writing' | 'flashcards' | 'sentence') => void;
  markWordAsIncorrect: (wordId: string) => void;
  setDailyGoal: (goal: number) => void;
  setNotificationTime: (time: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSelectedCategory: (category: string) => void;
  setSelectedLevel: (category: string, level: number) => void;
  resetProgress: () => void;
  syncWithSupabase: (userId: string) => Promise<void>;
}

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      score: 0,
      wordsLearned: [],
      selectedCategory: 'General',
      selectedLevels: {},
      wordProficiency: {},
      dailyGoal: 200,
      dailyProgress: {
        listening: 0,
        speaking: 0,
        reading: 0,
        writing: 0,
        flashcards: 0,
        sentence: 0,
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
          flashcards: 0,
          sentence: 0,
          lastUpdated: today,
        } : { 
          listening: state.dailyProgress.listening || 0,
          speaking: state.dailyProgress.speaking || 0,
          reading: state.dailyProgress.reading || 0,
          writing: state.dailyProgress.writing || 0,
          flashcards: state.dailyProgress.flashcards || 0,
          sentence: state.dailyProgress.sentence || 0,
          lastUpdated: state.dailyProgress.lastUpdated || today,
        };

        newDailyProgress[type] = (newDailyProgress[type] || 0) + 1;

        const newWordsLearned = state.wordsLearned.includes(wordId) 
          ? state.wordsLearned 
          : [...state.wordsLearned, wordId];

        // Spaced Repetition Lite: update proficiency
        const newWordProficiency = { ...state.wordProficiency };
        const currentProf = newWordProficiency[wordId] || 0;
        if (type === 'flashcards') {
          // Flashcards introduce the word, setting it to 1, but doesn't max it out
          newWordProficiency[wordId] = Math.max(currentProf, 1);
        } else {
          // Quizzes test recall, incrementing up to 5
          newWordProficiency[wordId] = Math.min(currentProf + 1, 5);
        }

        // Update history
        const newHistory = { ...state.history };
        newHistory[today] = (newHistory[today] || 0) + 1;

        return {
          wordsLearned: newWordsLearned,
          dailyProgress: newDailyProgress,
          history: newHistory,
          wordProficiency: newWordProficiency,
        };
      }),

      markWordAsIncorrect: (wordId) => set((state) => {
        const newWordProficiency = { ...state.wordProficiency };
        // Reset to 0 (spaced repetition penalty)
        newWordProficiency[wordId] = 0;
        return { wordProficiency: newWordProficiency };
      }),

      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      setNotificationTime: (time) => set({ notificationTime: time }),
      setTheme: (theme) => set({ theme }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      setSelectedLevel: (category, level) => set((state) => {
        const newSelectedLevels = { ...state.selectedLevels };
        newSelectedLevels[category] = level;
        return { selectedLevels: newSelectedLevels };
      }),

      resetProgress: () => set({ 
        score: 0, 
        wordsLearned: [], 
        selectedCategory: 'General',
        selectedLevels: {},
        wordProficiency: {},
        dailyProgress: {
          listening: 0, speaking: 0, reading: 0, writing: 0, flashcards: 0, sentence: 0, lastUpdated: getTodayDateString()
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
