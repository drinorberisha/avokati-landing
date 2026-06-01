import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StickyCallBar from './components/StickyCallBar';
import IntakeForm from './components/IntakeForm';
import PracticeSuite from './components/PracticeSuite';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light'); // Defaults to Light Mode as requested!
  const [lang, setLang] = useState('sq'); // Defaults to Albanian!

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync theme changes with the root html class for full tailwind theme support
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 font-sans ${theme === 'dark' ? 'dark bg-[#0c0c0e] text-[#f3f4f6]' : 'bg-[#fafafa] text-[#111115]'}`}>
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero lang={lang} theme={theme} />
        <IntakeForm lang={lang} theme={theme} />
        <PracticeSuite lang={lang} theme={theme} />
      </main>

      <StickyCallBar lang={lang} />
      
      <Footer lang={lang} theme={theme} />
    </div>
  );
}

export default App;
