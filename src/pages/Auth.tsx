import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useProgress } from '../hooks/useProgress';
import { LogIn, UserPlus, Mail, Lock, AlertCircle } from 'lucide-react';

const Auth: React.FC = () => {
  const { theme } = useProgress();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl relative border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 mb-4">
            {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
          </div>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {isLogin ? 'Log in to save your vocabulary progress.' : 'Sign up to start tracking your learning journey.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-4 p-4 rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex items-center gap-2">
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-3.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 p-3 rounded-xl border outline-none focus:border-indigo-500 transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white focus:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'}`}
                placeholder="you@example.com"
              />
            </div>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-3.5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 p-3 rounded-xl border outline-none focus:border-indigo-500 transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white focus:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'}`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2 mt-6"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setMessage(null);
            }}
            className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
