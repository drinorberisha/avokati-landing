import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5 px-6 md:px-12 ${isDark ? 'bg-[#0A0A0C]/80 border-b border-white/5 backdrop-blur-md' : 'bg-[#FCFBF9]/80 border-b border-zinc-200/80 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Editorial Wordmark */}
        <a href="#" className="flex items-center gap-1.5 group">
          <span className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white group-hover:text-[#C5A880]' : 'text-[#111115] group-hover:text-[#8C6E4A]'}`}>
            Avokati
          </span>
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#C5A880]' : 'bg-[#8C6E4A]'}`}></span>
        </a>

        {/* Spacious links */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#search" className={`text-xs uppercase tracking-widest transition-colors duration-300 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-[#111115]'}`}>
            Kërkimi Hybrid
          </a>
          <a href="#values" className={`text-xs uppercase tracking-widest transition-colors duration-300 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-[#111115]'}`}>
            Autoriteti ynë
          </a>
          <a href="#playground" className={`text-xs uppercase tracking-widest transition-colors duration-300 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-[#111115]'}`}>
            Konsulta Simuluar
          </a>
          <a href="#intake" className={`text-xs uppercase tracking-widest transition-colors duration-300 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-[#111115]'}`}>
            Intake
          </a>
        </div>

        {/* Action Group: Theme Toggle + Gold Button */}
        <div className="flex items-center gap-6">
          
          {/* Circular Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${isDark ? 'border-white/10 hover:border-white/30 text-[#C5A880] hover:bg-white/[0.02]' : 'border-zinc-200 hover:border-zinc-400 text-[#8C6E4A] hover:bg-zinc-100'}`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 stroke-[1.5]" />
            ) : (
              <Moon className="w-4 h-4 stroke-[1.5]" />
            )}
          </button>

          <a 
            href="#intake" 
            className={`text-[11px] uppercase tracking-widest px-6 py-2.5 rounded-[2px] font-semibold transition-all duration-300 border ${isDark ? 'border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880]/5' : 'border-[#8C6E4A]/30 hover:border-[#8C6E4A] text-[#8C6E4A] hover:bg-[#8C6E4A]/5'}`}
          >
            Konsultë e Re
          </a>

        </div>

      </div>
    </nav>
  );
}
