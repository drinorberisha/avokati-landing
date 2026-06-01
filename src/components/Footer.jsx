import { ShieldAlert, Scale, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Footer({ lang, theme }) {
  const isDark = theme === 'dark';
  const t = translations[lang];

  return (
    <footer className={`relative py-16 px-6 md:px-12 transition-colors duration-500 border-t ${
      isDark ? 'bg-[#0c0c0e] border-zinc-900 text-zinc-400' : 'bg-[#fafafa] border-zinc-200 text-zinc-655'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Segment: Local Court Alignment Jurisdictions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-zinc-200 dark:border-zinc-900">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-accent" />
              <span className={`text-xs font-bold uppercase tracking-widest font-serif ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {t.footerAuthTitle}
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed">
              {t.footerAuthDesc}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className={`text-xs font-bold uppercase tracking-widest font-serif ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {t.footerCourtsTitle}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider font-semibold font-mono">
              <span className={`px-2.5 py-1 border rounded-sm ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>Prishtinë</span>
              <span className={`px-2.5 py-1 border rounded-sm ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>Prizren</span>
              <span className={`px-2.5 py-1 border rounded-sm ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>Pejë</span>
              <span className={`px-2.5 py-1 border rounded-sm ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>Gjakovë</span>
              <span className={`px-2.5 py-1 border rounded-sm ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>Ferizaj</span>
              <span className={`px-2.5 py-1 border rounded-sm ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>Gjilan</span>
              <span className={`px-2.5 py-1 border rounded-sm ${isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>Mitrovicë</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4.5 h-4.5 text-accent" />
              <span className={`text-xs font-bold uppercase tracking-widest font-serif ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {t.footerPrivacyTitle}
              </span>
            </div>
            <p className="text-xs font-light leading-relaxed">
              {t.footerPrivacyDesc}
            </p>
          </div>

        </div>

        {/* Bottom Segment: Disclaimers, Credits and Strict OAK Regulations */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[11px] leading-relaxed font-light">
          
          <div className="max-w-2xl">
            <p className="mb-3">
              <strong>{t.footerCopyright}</strong>
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-[10px] uppercase tracking-wider font-semibold font-mono">
              <a href="https://oda-avokateve.org" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-accent dark:text-zinc-450 dark:hover:text-[#8b9287] transition-colors duration-300">
                {t.footerLinkTariff}
              </a>
              <span className="text-zinc-300 dark:text-zinc-800 select-none">/</span>
              <a href="#privacy-rules" className="text-zinc-500 hover:text-accent dark:text-zinc-450 dark:hover:text-[#8b9287] transition-colors duration-300">
                {t.footerLinkPrivacy}
              </a>
              <span className="text-zinc-300 dark:text-zinc-800 select-none">/</span>
              <a href="#terms-of-service" className="text-zinc-500 hover:text-accent dark:text-zinc-450 dark:hover:text-[#8b9287] transition-colors duration-300">
                {t.footerLinkTerms}
              </a>
            </div>
            <p className="text-zinc-500 dark:text-zinc-550 text-[10px] leading-relaxed">
              {t.footerDisclaimers}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">
              Pixellent Solutions LLC
            </p>
            <p className="text-zinc-500 text-[9px] font-mono mt-0.5">
              Pristina, Kosova
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
