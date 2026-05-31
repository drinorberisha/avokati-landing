export default function Footer({ theme }) {
  const isDark = theme === 'dark';

  return (
    <footer className={`py-16 px-6 md:px-12 border-t transition-colors duration-500 ${isDark ? 'bg-[#0A0A0C] border-white/5' : 'bg-[#FCFBF9] border-zinc-200/80'}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left Side: Brand Wordmark */}
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-1.5">
            <span className={`font-serif text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#111115]'}`}>
              Avokati
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#C5A880]' : 'bg-[#8C6E4A]'}`}></span>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500 font-light">
            Sistem i Inteligjencës Juridike bazuar në RAG (Retrieval-Augmented Generation) të specializuar në legjislacionin dhe rregulloret zyrtare të Republikës së Kosovës.
          </p>
        </div>

        {/* Right Side: Links & Disclaimer */}
        <div className="flex flex-col md:items-end gap-4">
          <div className="flex flex-wrap gap-8">
            <a href="#" className={`text-[10px] uppercase tracking-widest transition-colors ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-500 hover:text-[#111115]'}`}>
              Kushtet e Përdorimit
            </a>
            <a href="#" className={`text-[10px] uppercase tracking-widest transition-colors ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-500 hover:text-[#111115]'}`}>
              Privatësia
            </a>
            <a href="#" className={`text-[10px] uppercase tracking-widest transition-colors ${isDark ? 'text-zinc-500 hover:text-white' : 'text-zinc-500 hover:text-[#111115]'}`}>
              Na Kontaktoni
            </a>
          </div>
          
          <p className="text-[10px] text-zinc-500 font-light max-w-md md:text-right leading-relaxed">
            Vërejtje: Avokati AI është një asistent digjital dhe nuk zëvendëson këshillimin e licencuar ligjor nga një avokat i certifikuar i Odës së Avokatëve të Kosovës.
          </p>
        </div>

      </div>
    </footer>
  );
}
