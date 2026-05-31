import { useState } from 'react';

export default function Playground({ theme }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showSources, setShowSources] = useState(true);
  const isDark = theme === 'dark';

  const prompts = [
    {
      label: 'Kushtetueshmëria e Ligjit',
      question: 'A mund të shpallet një ligj i pavlefshëm nëse shkel parimet e decentralizimit?',
      answer: 'Po. Gjykata Kushtetuese e Kosovës ka autoritet të vlerësojë përputhshmërinë e ligjeve me Kushtetutën. Sipas Nenit 113.5 të Kushtetutës, deputetët e Kuvendit dhe komunat mund të kontestojnë kushtetueshmërinë e një ligji ose akti, veçanërisht nëse shkelen kompetencat komunale apo parimet e decentralizimit të garantuara med Kapitullin X.',
      citation: 'Kushtetuta e Republikës së Kosovës, Neni 113.5 dhe Kapitulli X (Neni 123-124).'
    },
    {
      label: 'Taksat & ODA',
      question: 'Cilat janë normat e tatimit në të ardhura të korporatave në Kosovë?',
      answer: 'Tatimi në të Ardhurat e Korporatave (TAK) në Kosovë paguhet me një normë standarde prej 10% të të ardhurave të tatueshme. Për tatimpaguesit me qarkullim vjetor nën 50,000 €, zbatohen rregulla të veçanta të deklarimit të thjeshtësuar sipas Ligjit nr. 06/L-105.',
      citation: 'Ligji nr. 06/L-105 për Tatimin në të Ardhurat e Korporatave, Neni 7.'
    }
  ];

  const current = prompts[activeTab];

  return (
    <section id="playground" className={`relative py-24 px-6 md:px-12 border-t border-b transition-colors duration-500 ${isDark ? 'bg-[#0C0C0E] border-white/5' : 'bg-[#F5F5F3] border-zinc-200/80'}`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-[10px] uppercase tracking-widest font-bold block mb-4 ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>
            Simulo Konsultën Ligjore
          </span>
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-6 ${isDark ? 'text-white' : 'text-[#111115]'}`}>
            Përjetoni saktësinë e Avokati AI.
          </h2>
          <p className={`text-sm md:text-base font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Zgjidhni një tematikë ligjore më poshtë për të parë se si modeli strukturon përgjigjet dhe verifikon citimet me saktësi absolute.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`text-[11px] uppercase tracking-widest px-6 py-2.5 rounded-[2px] transition-all duration-300 border ${activeTab === idx ? (isDark ? 'bg-[#C5A880] text-[#0A0A0C] border-[#C5A880] font-bold' : 'bg-[#8C6E4A] text-white border-[#8C6E4A] font-bold') : (isDark ? 'border-white/5 text-zinc-400 hover:text-white hover:border-white/10 bg-transparent' : 'border-zinc-200 text-zinc-500 hover:text-[#111115] hover:border-zinc-300 bg-transparent')}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Console Card */}
        <div className={`editorial-card border p-6 md:p-8 rounded-[4px] ${isDark ? 'border-white/5 bg-[#111113]' : 'border-[#C5A880]/20 bg-white shadow-md'}`}>
          
          <div className={`flex items-center justify-between border-b pb-4 mb-6 ${isDark ? 'border-white/5' : 'border-zinc-150'}`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Terminali i Konsultës</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-400">KOS-LAW MODEL V3</span>
          </div>

          <div className="space-y-6">
            
            {/* User Message */}
            <div className="flex flex-col items-end">
              <div className={`max-w-xl border p-4 rounded-[2px] ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
                <span className={`text-[9px] uppercase tracking-wider block mb-1 ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>Pyetja e Juristit</span>
                <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-white' : 'text-zinc-800'}`}>
                  "{current.question}"
                </p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex flex-col items-start">
              <div className={`max-w-2xl border p-5 rounded-[2px] w-full ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-[#C5A880]/15'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-bold">Përgjigjja e Verifikuar</span>
                  <span className="text-[9px] text-zinc-400 font-mono">Generimi: 0.4s</span>
                </div>
                <p className={`text-sm font-light leading-relaxed mb-6 ${isDark ? 'text-zinc-355' : 'text-zinc-700'}`}>
                  {current.answer}
                </p>

                {/* Sources Accordion */}
                <div className={`border-t ${isDark ? 'border-white/5' : 'border-zinc-200'}`}>
                  <button 
                    onClick={() => setShowSources(!showSources)}
                    className="flex items-center justify-between w-full text-[10px] text-zinc-450 uppercase tracking-widest font-semibold hover:text-zinc-800 transition-colors pt-4"
                  >
                    <span>Burimet dhe Citimet Ligjore</span>
                    <span>{showSources ? 'Fsheh [-]' : 'Shfaq [+]'}</span>
                  </button>
                  
                  {showSources && (
                    <div className={`mt-3 p-3 border rounded-[2px] flex items-center justify-between ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-zinc-100/50 border-zinc-200'}`}>
                      <p className={`text-xs font-mono ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>
                        {current.citation}
                      </p>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-[2px] font-bold">
                        AKTIV
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
