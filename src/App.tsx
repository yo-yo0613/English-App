
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuizReading from './pages/QuizReading';
import QuizListening from './pages/QuizListening';
import QuizWriting from './pages/QuizWriting';
import QuizSpeaking from './pages/QuizSpeaking';
import QuizSentence from './pages/QuizSentence';
import Settings from './pages/Settings';
import { useProgress } from './hooks/useProgress';

function App() {
  const { theme } = useProgress();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="reading" element={<QuizReading />} />
          <Route path="listening" element={<QuizListening />} />
          <Route path="writing" element={<QuizWriting />} />
          <Route path="speaking" element={<QuizSpeaking />} />
          <Route path="sentence" element={<QuizSentence />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
