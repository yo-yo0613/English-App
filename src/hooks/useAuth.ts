import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  initialize: async () => {
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, isLoading: false });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },
  signOut: async () => {
    await supabase.auth.signOut();
  }
}));
