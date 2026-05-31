import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LegislationSearch from './components/LegislationSearch';
import CoreValues from './components/CoreValues';
import Playground from './components/Playground';
import IntakeForm from './components/IntakeForm';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light'); // Defaults to Light Mode as requested!

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'dark bg-[#0A0A0C] text-[#F3F4F6]' : 'light bg-[#FCFBF9] text-[#111115]'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <LegislationSearch theme={theme} />
        <CoreValues theme={theme} />
        <Playground theme={theme} />
        <IntakeForm theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
