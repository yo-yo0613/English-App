import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import QuizReading from './pages/QuizReading';
import QuizListening from './pages/QuizListening';
import QuizWriting from './pages/QuizWriting';
import QuizSpeaking from './pages/QuizSpeaking';
import QuizSentence from './pages/QuizSentence';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';

function App() {
  const { theme, syncWithSupabase } = useProgress();
  const { session, isLoading, initialize } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (session?.user) {
      // Attempt to sync when session changes
      syncWithSupabase(session.user.id);
    }
  }, [session, syncWithSupabase]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!session ? (
          <Route path="*" element={<Auth />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="reading" element={<QuizReading />} />
            <Route path="listening" element={<QuizListening />} />
            <Route path="writing" element={<QuizWriting />} />
            <Route path="speaking" element={<QuizSpeaking />} />
            <Route path="sentence" element={<QuizSentence />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
