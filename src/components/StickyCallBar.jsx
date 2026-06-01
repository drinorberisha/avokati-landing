import { Phone } from 'lucide-react';
import { translations } from '../utils/translations';

export default function StickyCallBar({ lang }) {
  const t = translations[lang];

  return (
    <div className="fixed bottom-0 left-0 w-full z-45 md:hidden px-4 pb-4 pt-2 bg-gradient-to-t from-white/95 via-white/80 to-transparent dark:from-[#0c0c0e]/95 dark:via-[#0c0c0e]/80 backdrop-blur-xs transition-transform duration-300">
      <a
        href="tel:+38338200200"
        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 font-bold text-xs uppercase tracking-widest rounded-custom text-white bg-accent shadow-xl hover:opacity-90 active:scale-95 transition-all"
      >
        <Phone className="w-4 h-4 fill-current" />
        <span>{t.stickyCallText}</span>
      </a>
    </div>
  );
}
