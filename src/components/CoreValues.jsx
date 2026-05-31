import { Shield, BookOpen, Clock } from 'lucide-react';

export default function CoreValues({ theme }) {
  const isDark = theme === 'dark';

  const pillars = [
    {
      icon: BookOpen,
      title: 'Kërkim Semantik',
      desc: 'Përtej fjalëve të thjeshta shabllon. Sistemi ynë kupton kontekstin juridik, sinonimet ligjore dhe qëllimin e pyetjes tuaj për të gjetur saktësisht neni përkatës.',
      metric: 'Recall@5 > 99.4%'
    },
    {
      icon: Clock,
      title: 'Monitorim i Shfuqizimeve',
      desc: 'Legjislacioni ndryshon vazhdimisht. Avokati AI zbulon automatikisht nëse një ligj apo nen specifik është plotësuar, ndryshuar apo shfuqizuar tërësisht.',
      metric: 'Përditësim në Kohë Reale'
    },
    {
      icon: Shield,
      title: 'Integriteti i Burimit',
      desc: 'Çdo përgjigje që merrni është e pajisur me citim të plotë ligjor (numri i ligjit, neni, paragrafi dhe gazeta zyrtare) duke ju lejuar verifikim të menjëhershëm.',
      metric: 'Burime 100% të Verifikuara'
    }
  ];

  return (
    <section id="values" className={`relative py-24 px-6 md:px-12 transition-colors duration-500 ${isDark ? 'bg-[#0A0A0C]' : 'bg-[#FCFBF9]'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className={`text-[10px] uppercase tracking-widest font-bold block mb-4 ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>
            Syllabus i Performancës
          </span>
          <h2 className={`text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-[#111115]'}`}>
            Tre shtyllat e inteligjencës sonë juridike.
          </h2>
          <p className={`text-sm md:text-base font-light leading-relaxed max-w-2xl ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Avokati AI nuk improvizon. Çdo kalkulim, krahasim dhe gjenerim mbështetet në tre mekanizma rigorozë të projektuar për siguri absolute.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx} 
                className={`editorial-card p-8 border rounded-[4px] flex flex-col justify-between min-h-[320px] ${isDark ? 'border-white/5 bg-[#111113]' : 'border-[#C5A880]/20 bg-white shadow-sm shadow-[#C5A880]/5'}`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-[2px] border flex items-center justify-center mb-8 ${isDark ? 'bg-[#C5A880]/5 border-[#C5A880]/15 text-[#C5A880]' : 'bg-[#8C6E4A]/5 border-[#8C6E4A]/15 text-[#8C6E4A]'}`}>
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className={`text-xl font-serif font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#111115]'}`}>
                    {p.title}
                  </h3>
                  <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {p.desc}
                  </p>
                </div>
                <div className={`border-t pt-4 flex items-center justify-between ${isDark ? 'border-white/5' : 'border-zinc-150'}`}>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold">Parametri Teknik</span>
                  <span className={`text-[10px] font-bold ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>{p.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
