import { Sun, Moon, Globe, Briefcase } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Navbar({ lang, setLang, theme, toggleTheme }) {
  const isDark = theme === 'dark';
  const t = translations[lang];

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-12 ${isDark ? 'bg-[#0c0c0e]/90 border-b border-white/5 backdrop-blur-md' : 'bg-white/90 border-b border-zinc-200/80 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Wordmark logo - clean, typographic */}
        <a href="#" className="flex items-center gap-1 group">
          <span className={`font-serif text-lg sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {t.wordmark}
          </span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent"></span>
        </a>

        {/* Action Group: Multi-Language Selector + Theme Toggle + High-Contrast B2B Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Multi-language Selector (SQ | SR | EN) */}
          <div className="flex items-center gap-1 border-r pr-2 sm:pr-4 border-zinc-200 dark:border-zinc-800">
            <Globe className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 hidden sm:inline" />
            <div className="flex gap-1 text-[10px] sm:text-xs font-semibold">
              {['sq', 'sr', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`px-1 py-0.5 rounded transition-all uppercase ${lang === l ? 'text-accent font-bold scale-105' : 'text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isDark ? 'border-white/10 hover:border-white/30 text-accent hover:bg-white/[0.02]' : 'border-zinc-200 hover:border-zinc-400 text-[#73796f] hover:bg-zinc-100'}`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.5]" />
            ) : (
              <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.5]" />
            )}
          </button>

          {/* B2B persistent access button - upper right, highly visible */}
          <a 
            href="#b2b-suite" 
            className="hover-scale flex items-center gap-1.5 text-[9px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-custom font-semibold transition-all duration-300 bg-primary text-primary-foreground border border-transparent shadow hover:opacity-90 active:scale-95 shrink-0"
            title={t.partnerBtn}
          >
            <Briefcase className="w-3 h-3 stroke-[2]" />
            <span className="hidden sm:inline">{t.partnerBtn}</span>
          </a>

        </div>

      </div>
    </nav>
  );
}
