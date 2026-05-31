import { useState } from 'react';

export default function LegislationSearch({ theme }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const isDark = theme === 'dark';

  const samples = [
    {
      query: 'Afati i parashkrimit për borxhe sipas Ligjit të Marrëdhënieve të Detyrimeve (LMD)',
      parsed: {
        domain: 'E Drejta Civile (Kontratat & Detyrimet)',
        source: 'Gazeta Zyrtare e Kosovës',
        tokens: ['Parashkrim', 'Afat', 'Kërkesë e borxhit', 'Neni 360', 'Neni 361'],
        scoreSemantic: 91,
        scoreKeyword: 9
      },
      answer: 'Afati i përgjithshëm i parashkrimit të kërkesave është pesë (5) vjet, përveç nëse me ligj është përcaktuar ndryshe. Megjithatë, kërkesat e borxheve për shërbime komunale apo furnizime vjetore parashkruhen për një (1) vit.'
    },
    {
      query: 'Cilat janë procedurat ligjore për ndërprerjen e kontratës së punës nga punëdhënësi?',
      parsed: {
        domain: 'E Drejta e Punës',
        source: 'Ligji nr. 03/L-212 i Punës',
        tokens: ['Ndërprerje', 'Kontratë pune', 'Njoftim paraprak', 'Neni 70', 'Shkelje e detyrave'],
        scoreSemantic: 85,
        scoreKeyword: 15
      },
      answer: 'Ndërprerja e kontratës nga punëdhënësi kërkon njoftim paraprak prej së paku një (1) deri në tre (3) muaj, varësisht nga përvoja e punës, si dhe ekzistencën e një arsyeje të bazuar (ekonomike, teknologjike ose sjellje e keqe e rëndë).'
    },
    {
      query: 'Kushtet dhe kapitali minimal për themelimin e një Shoqërie me Përgjegjësi të Kufizuar (SH.P.K.)',
      parsed: {
        domain: 'E Drejta Tregtare & Korporative',
        source: 'Ligji për Shoqëritë Tregtare',
        tokens: ['SH.P.K.', 'Themelim', 'Kapital minimal', 'Aksionarë', 'Neni 84'],
        scoreSemantic: 88,
        scoreKeyword: 12
      },
      answer: 'Kapitali minimal për themelimin e një SH.P.K. në Kosovë nuk është i limituar me ligj (mund të jetë nga 1 €). Shoqëria themelohet me nënshkrimin e aktit të themelimit dhe statutit të regjistruar në ARBK.'
    }
  ];

  const current = samples[selectedIdx];

  return (
    <section id="search" className={`relative py-24 px-6 md:px-12 border-t border-b transition-colors duration-500 ${isDark ? 'bg-[#0C0C0E] border-white/5' : 'bg-[#F5F5F3] border-zinc-200/80'}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-[10px] uppercase tracking-widest font-bold block mb-4 ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>
            Kërkimi Hybrid Ligjor
          </span>
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-6 ${isDark ? 'text-white' : 'text-[#111115]'}`}>
            Më shumë se kërkim me fjalëkyç. Inteligjencë semantike.
          </h2>
          <p className={`text-sm md:text-base font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Avokati AI përdor kërkimin hybrid për të lidhur konceptet ligjore me kontekstin e duhur, duke shmangur gabimet e thjeshta të fjalëkyçeve.
          </p>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Sample Queries Selector (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-450 font-semibold mb-2 block">
              Zgjidhni një shembull kërkimi:
            </span>
            {samples.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`text-left p-5 rounded-[4px] border transition-all duration-300 ${selectedIdx === idx ? (isDark ? 'bg-[#111113] border-[#C5A880]/30 text-white' : 'bg-white border-[#8C6E4A]/30 text-[#8C6E4A] shadow-sm') : (isDark ? 'bg-black/20 border-white/5 text-zinc-400 hover:text-white hover:border-white/10' : 'bg-zinc-100/50 border-zinc-200/80 text-zinc-500 hover:text-zinc-800 hover:border-zinc-300')}`}
              >
                <p className="text-xs md:text-sm font-light leading-relaxed">
                  "{s.query}"
                </p>
              </button>
            ))}
          </div>

          {/* Interactive Parser Output (Right) */}
          <div className="lg:col-span-7">
            <div className={`editorial-card border p-6 md:p-8 rounded-[4px] h-full flex flex-col justify-between ${isDark ? 'border-white/5 bg-[#111113]' : 'border-[#C5A880]/20 bg-white shadow-md'}`}>
              
              {/* Parse Meta */}
              <div>
                <div className={`flex justify-between items-center border-b pb-4 mb-6 ${isDark ? 'border-white/5' : 'border-zinc-150'}`}>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>
                    Segmentimi Semantik i Pyetjes
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {current.parsed.domain}
                  </span>
                </div>

                {/* Token Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {current.parsed.tokens.map((token, tIdx) => (
                    <span 
                      key={tIdx}
                      className={`text-[10px] px-2.5 py-1 rounded-[2px] border font-light ${isDark ? 'bg-white/[0.03] border-white/5 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-650'}`}
                    >
                      {token}
                    </span>
                  ))}
                </div>

                {/* Scoring Bars */}
                <div className="space-y-4 mb-8">
                  <div>
                    <div className={`flex justify-between text-[10px] mb-1.5 uppercase tracking-wider ${isDark ? 'text-zinc-450' : 'text-zinc-500'}`}>
                      <span>Kërkimi Vektorial (Semantikë / Kontekst)</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-zinc-800'}`}>{current.parsed.scoreSemantic}%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/[0.03]' : 'bg-zinc-150'}`}>
                      <div 
                        className={`h-full transition-all duration-500 ${isDark ? 'bg-[#C5A880]' : 'bg-[#8C6E4A]'}`} 
                        style={{ width: `${current.parsed.scoreSemantic}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className={`flex justify-between text-[10px] mb-1.5 uppercase tracking-wider ${isDark ? 'text-zinc-450' : 'text-zinc-500'}`}>
                      <span>BM25 Kërkimi Fjalëkyç (Nenet & Referencat)</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-zinc-800'}`}>{current.parsed.scoreKeyword}%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/[0.03]' : 'bg-zinc-150'}`}>
                      <div 
                        className="h-full bg-zinc-400 transition-all duration-500" 
                        style={{ width: `${current.parsed.scoreKeyword}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAG Preview */}
              <div className={`p-4 border rounded-[2px] ${isDark ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-zinc-200/80'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>Përgjigjja e Audituar</span>
                  <span className="text-[9px] text-zinc-400">{current.parsed.source}</span>
                </div>
                <p className={`text-xs md:text-sm font-light leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {current.answer}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
