import { Phone, Star, ShieldCheck } from 'lucide-react';
import { translations } from '../utils/translations';
import officeImg from '../assets/kosova_law_office.png';

export default function Hero({ lang, theme }) {
  const isDark = theme === 'dark';
  const t = translations[lang];

  return (
    <section className={`relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0c0c0e]' : 'bg-white'}`}>
      
      {/* Premium Ambient Background Glows */}
      <div className="ambient-glow -top-40 -left-40"></div>
      <div className="ambient-glow top-1/2 -right-40"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Authoritative B2C Headline & Trust Badges */}
        <div className="lg:col-span-7 flex flex-col items-start text-left animate-entrance stagger-1">
          
          {/* Trust Badges Bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            
            {/* OAK Licensing Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] uppercase tracking-wider font-bold ${isDark ? 'border-accent/30 bg-accent/5 text-[#8b9287]' : 'border-accent/40 bg-accent/5 text-accent'}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.trustBadgeOAK}</span>
            </div>

            {/* Google Rating Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] uppercase tracking-wider font-bold ${isDark ? 'border-zinc-800 bg-zinc-900/40 text-zinc-350' : 'border-zinc-200 bg-zinc-50 text-zinc-600'}`}>
              <div className="flex text-amber-500">
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span>{t.trustBadgeGBP}</span>
            </div>

          </div>

          {/* Primary B2C Headline */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.15] mb-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {t.heroHeadline}
          </h1>

          {/* Empathy/Authority Reassuring Subheadline */}
          <p className={`text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            {t.heroSubheadline}
          </p>

          {/* Click-to-Call Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-6">
            
            {/* High-Contrast Click-to-Call */}
            <a 
              href="tel:+38338200200"
              className="hover-scale flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-custom transition-all bg-accent text-white shadow-lg active:scale-95 text-center"
            >
              <Phone className="w-4 h-4" />
              <span>{t.heroCtaCall} (+383 38 200 200)</span>
            </a>

            {/* Intake Form Smooth Scroll */}
            <a 
              href="#intake-section" 
              className={`hover-scale flex items-center justify-center px-8 py-4 border font-bold text-xs uppercase tracking-widest rounded-custom transition-all active:scale-95 text-center ${isDark ? 'border-zinc-800 hover:border-zinc-600 text-white bg-zinc-900/40' : 'border-zinc-300 hover:border-zinc-400 text-zinc-700 bg-zinc-50'}`}
            >
              {t.heroCtaForm}
            </a>

          </div>

          {/* Regional Matches Reassurance */}
          <p className="text-[11px] font-semibold text-zinc-450 dark:text-zinc-500 italic max-w-md">
            ✓ {t.matchesText}
          </p>

        </div>

        {/* Right Column: Real Professional Office Visual */}
        <div className="lg:col-span-5 w-full animate-entrance stagger-2">
          <div className={`premium-card p-2 border overflow-hidden ${isDark ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200/80 bg-stone-50/50 shadow-md'}`}>
            <div className="relative rounded-custom overflow-hidden aspect-square">
              <img 
                src={officeImg} 
                alt="Avokati AI - Real Licensed Legal Offices in Pristina, Kosova" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-custom bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold font-serif">Pixellent Solutions LLC</p>
                  <p className="text-[9px] text-zinc-300 uppercase tracking-widest font-mono">Pristina HQ, Kosova</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-accent uppercase tracking-widest font-bold font-mono">OAK Verified</p>
                  <p className="text-[9px] text-zinc-400 font-mono">Basic Court aligned</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
