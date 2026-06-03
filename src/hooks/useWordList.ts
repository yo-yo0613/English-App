import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabaseClient';
import { defaultWordList, type WordItem } from '../data/wordList';

export interface WordListState {
  wordList: WordItem[];
  isLoading: boolean;
  error: string | null;
  lastFetched: string | null;
  fetchSupabaseWords: () => Promise<void>;
}

export const useWordList = create<WordListState>()(
  persist(
    (set) => ({
      wordList: defaultWordList,
      isLoading: false,
      error: null,
      lastFetched: null,
      fetchSupabaseWords: async () => {
        set({ isLoading: true, error: null });
        try {
          let allWords: WordItem[] = [];
          let from = 0;
          const limit = 1000;
          let hasMore = true;

          while (hasMore) {
            const { data, error } = await supabase
              .from('words')
              .select('id, word, translation, category, example, exampleTranslation')
              .range(from, from + limit - 1)
              .order('id', { ascending: true });

            if (error) {
              throw error;
            }

            if (data && data.length > 0) {
              allWords = [...allWords, ...(data as WordItem[])];
              if (data.length < limit) {
                hasMore = false;
              } else {
                from += limit;
              }
            } else {
              hasMore = false;
            }
          }

          if (allWords.length > 0) {
            set({
              wordList: allWords,
              lastFetched: new Date().toISOString(),
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (err: any) {
          console.error('Failed to fetch words from Supabase:', err);
          set({
            error: err.message || 'Failed to fetch words from Supabase',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'english-app-wordlist-cache',
    }
  )
);
