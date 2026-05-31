import { useState } from 'react';

export default function Hero({ theme }) {
  const [activeDoc, setActiveDoc] = useState('doc1');
  const isDark = theme === 'dark';

  const docs = {
    doc1: {
      title: 'Prapësim Kundër Vendimit Përmbarimor',
      date: 'Nëntor 2025',
      content: `Kjo prapësi paraqitet ndaj urdhrit për përmbarim të lëshuar nga Përmbaruesi Privat sipas nenit 12 të ligjit në fuqi. I autorizuari pretendon se afati ligjor prej 7 ditëve për paraqitjen e prapësimit sipas nenit 139 të ligjit të vjetër është respektuar plotësisht, duke u bazuar në datën e pranimit fizik të lëndës më datë 12 Tetor.`,
      analysis: [
        {
          target: 'nenit 139 të ligjit të vjetër',
          status: 'amended',
          label: 'I ndryshuar',
          explanation: 'Neni 139 i Ligjit nr. 04/L-139 është riformuluar plotësisht nga Ligji nr. 05/L-118. Afatet e prapësimit janë përditësuar.',
          citation: 'Ligji nr. 05/L-118, Neni 2'
        },
        {
          target: 'afati ligjor prej 7 ditëve',
          status: 'alert',
          label: 'Rrezik Afati',
          explanation: 'Kujdes: Në përputhje me reformën e fundit ligjore, afati i ri për prapësim është reduktuar në 5 ditë pune për kategori të caktuara lëndësh.',
          citation: 'Ligji nr. 08/L-234, Neni 14'
        }
      ]
    },
    doc2: {
      title: 'Aneks Kontratë për Qira Komerciale',
      date: 'Dhjetor 2025',
      content: `Sipas nenit 18 të Ligjit të Detyrimeve, palët kontraktuese pajtohen për rritjen e njëanshme të qirasë në rast të ndryshimit të kushteve makroekonomike, duke përjashtuar zbatimin e nenit 525 mbi rrethanat e jashtëzakonshme të paparashikuara.`,
      analysis: [
        {
          target: 'nenit 525',
          status: 'warning',
          label: 'Kusht i Pavlefshëm',
          explanation: 'Neni 525 (Klauzolat e Pavlefshmërisë) përcakton se dispozitat që shkelin parimin e ndershmërisë dhe të mirëbesimit janë të ndaluara dhe konsiderohen absolutisht të pavlefshme.',
          citation: 'Kodi Civil i Kosovës, Neni 525'
        }
      ]
    }
  };

  const currentDoc = docs[activeDoc];

  const renderHighlightedContent = (text, analysisList) => {
    let result = text;
    analysisList.forEach((item) => {
      const index = result.indexOf(item.target);
      if (index !== -1) {
        // Highlighting styles shifting appropriately between dark and light modes
        const highlightClass = isDark 
          ? 'underline decoration-2 decoration-[#C5A880]/60 bg-[#C5A880]/10 text-white'
          : 'underline decoration-2 decoration-[#8C6E4A]/60 bg-[#8C6E4A]/10 text-[#5C462B]';

        result = result.replace(
          item.target,
          `<span class="${highlightClass} font-medium px-1 rounded-[2px] cursor-pointer">${item.target}</span>`
        );
      }
    });
    return <p className={`leading-relaxed text-sm md:text-base font-light ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`} dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section className={`relative min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0A0A0C]' : 'bg-[#FCFBF9]'}`}>
      
      {/* Luxurious Atmospheric Glows */}
      <div className="ambient-glow -top-40 -left-40"></div>
      <div className="ambient-glow top-1/2 -right-40"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Copywriting */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full mb-8 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-200 bg-zinc-100/50'}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-[#C5A880]' : 'bg-[#8C6E4A]'}`}></span>
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Kërkim Ligjor & RAG i Gjeneratës së Re
            </span>
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 ${isDark ? 'text-white' : 'text-[#111115]'}`}>
            Saktësi absolute në çdo neni të ligjit.
          </h1>

          <p className={`text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Një platformë inteligjente e ndërtuar për avokatë dhe konsulentë ligjorë që kërkojnë saktësi absolute. Analizoni marrëveshjet, draftet dhe prapësimet me ndihmën e RAG-ut të specializuar në legjislacionin kosovar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href="#intake" 
              className={`px-8 py-3.5 font-semibold text-xs uppercase tracking-widest rounded-[2px] text-center transition-all duration-300 shadow-lg ${isDark ? 'bg-[#C5A880] hover:bg-[#B3966E] text-[#0A0A0C] shadow-[#C5A880]/10' : 'bg-[#8C6E4A] hover:bg-[#735839] text-white shadow-[#8C6E4A]/10'}`}
            >
              Fillo Provën Falas
            </a>
            <a 
              href="#search" 
              className={`px-8 py-3.5 border font-semibold text-xs uppercase tracking-widest rounded-[2px] text-center transition-all duration-300 ${isDark ? 'border-white/10 hover:border-white/30 text-white' : 'border-zinc-300 hover:border-zinc-500 text-zinc-800'}`}
            >
              Simulo Kërkimin
            </a>
          </div>

        </div>

        {/* Right Side: Legal Audit Interface */}
        <div className="lg:col-span-6 w-full">
          <div className={`editorial-card border p-6 md:p-8 rounded-[4px] ${isDark ? 'border-white/5 bg-[#111113]' : 'border-[#C5A880]/20 bg-white shadow-md'}`}>
            
            {/* Control Bar */}
            <div className={`flex items-center justify-between border-b pb-4 mb-6 ${isDark ? 'border-white/5' : 'border-zinc-150'}`}>
              <span className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>
                Mjedisi i Auditimit të Dokumenteve
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveDoc('doc1')}
                  className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-[2px] transition-all ${activeDoc === 'doc1' ? (isDark ? 'bg-[#C5A880] text-[#0A0A0C] font-bold' : 'bg-[#8C6E4A] text-white font-bold') : (isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-[#111115]')}`}
                >
                  Prapësim Ligjor
                </button>
                <button 
                  onClick={() => setActiveDoc('doc2')}
                  className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-[2px] transition-all ${activeDoc === 'doc2' ? (isDark ? 'bg-[#C5A880] text-[#0A0A0C] font-bold' : 'bg-[#8C6E4A] text-white font-bold') : (isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-[#111115]')}`}
                >
                  Aneks Kontratë
                </button>
              </div>
            </div>

            {/* Main Preview Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Editable Document Preview */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400">Drafti i Dokumentit</span>
                  <span className="text-[10px] text-zinc-400">{currentDoc.date}</span>
                </div>
                <div className={`p-4 border rounded-[2px] min-h-[160px] flex flex-col justify-between ${isDark ? 'bg-black/30 border-white/5' : 'bg-zinc-50 border-zinc-200/80'}`}>
                  {renderHighlightedContent(currentDoc.content, currentDoc.analysis)}
                  <div className={`mt-4 border-t pt-2 flex items-center justify-between text-[9px] ${isDark ? 'border-white/5 text-zinc-500' : 'border-zinc-200/80 text-zinc-400'}`}>
                    <span>Draft Status: Duke U Rishikuar</span>
                    <span>Kosovo Legal Core v2.4</span>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Analysis Inspector */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Analiza e Avokati.AI</span>
                
                <div className="flex flex-col gap-4 h-full justify-between">
                  {currentDoc.analysis.map((analysisItem, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 border rounded-[2px] flex flex-col gap-2 transition-all ${isDark ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.02]' : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-zinc-100/50'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[2px] ${isDark ? 'bg-[#C5A880]/10 text-[#C5A880]' : 'bg-[#8C6E4A]/10 text-[#8C6E4A]'}`}>
                          {analysisItem.label}
                        </span>
                        <span className="text-[9px] text-zinc-400 font-mono">{analysisItem.citation}</span>
                      </div>
                      <p className={`text-xs font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {analysisItem.explanation}
                      </p>
                    </div>
                  ))}
                  <div className="mt-2 text-[10px] text-emerald-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Citime të verifikuara me Gazetën Zyrtare</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
