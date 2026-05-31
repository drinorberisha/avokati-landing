import { useState } from 'react';

export default function IntakeForm({ theme }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    field: 'civil',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const isDark = theme === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="intake" className={`relative py-24 px-6 md:px-12 transition-colors duration-500 ${isDark ? 'bg-[#0A0A0C]' : 'bg-[#FCFBF9]'}`}>
      
      {/* Soft Decorative Ambient Glow */}
      <div className="ambient-glow bottom-0 left-10"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`text-[10px] uppercase tracking-widest font-bold block mb-4 ${isDark ? 'text-[#C5A880]' : 'text-[#8C6E4A]'}`}>
            Filloni Rishikimin e Parë
          </span>
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${isDark ? 'text-white' : 'text-[#111115]'}`}>
            Regjistroni Çështjen Tuaj Ligjore
          </h2>
          <p className={`text-sm font-light leading-relaxed max-w-md mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Dërgoni detajet kryesore të problematikës suaj për të marrë një rishikim paraprak të shpejtë të mbështetur në RAG.
          </p>
        </div>

        {/* Dynamic State Container */}
        <div className={`editorial-card border p-8 rounded-[4px] ${isDark ? 'border-white/5 bg-[#111113]' : 'border-[#C5A880]/20 bg-white shadow-md'}`}>
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-lg ${isDark ? 'bg-[#C5A880]/10 text-[#C5A880]' : 'bg-[#8C6E4A]/10 text-[#8C6E4A]'}`}>
                ✓
              </div>
              <h3 className={`text-xl font-serif font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#111115]'}`}>
                Rasti U Regjistrua me Sukses
              </h3>
              <p className={`text-xs font-light leading-relaxed max-w-sm mb-8 ${isDark ? 'text-zinc-450' : 'text-zinc-600'}`}>
                Rasti juaj është alokuar për analizë të thelluar ligjore. Brenda pak sekondave, drafti juaj do të jetë gati për shqyrtim në portalin e Avokati AI.
              </p>
              <button 
                onClick={() => {
                  setFormData({ name: '', email: '', field: 'civil', description: '' });
                  setSubmitted(false);
                }}
                className={`text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-[2px] font-bold border transition-colors ${isDark ? 'border-white/10 hover:border-white/30 text-white' : 'border-zinc-200 hover:border-zinc-400 text-zinc-800'}`}
              >
                Regjistro një Çështje tjetër
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Emri & Mbiemri
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full text-sm font-light px-4 py-3 rounded-[2px] border outline-none transition-all ${isDark ? 'bg-black/35 border-white/10 text-white focus:border-[#C5A880]' : 'bg-zinc-50 border-zinc-250 text-zinc-800 focus:border-[#8C6E4A]'}`}
                    placeholder="Filan Fisteku"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    E-mail Adresa
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full text-sm font-light px-4 py-3 rounded-[2px] border outline-none transition-all ${isDark ? 'bg-black/35 border-white/10 text-white focus:border-[#C5A880]' : 'bg-zinc-50 border-zinc-250 text-zinc-800 focus:border-[#8C6E4A]'}`}
                    placeholder="shembull@avokati.ai"
                  />
                </div>

              </div>

              {/* Legal field selection */}
              <div className="flex flex-col gap-2">
                <label htmlFor="field" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  Fusha Legjislative
                </label>
                <select
                  id="field"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  className={`w-full text-sm font-light px-4 py-3 rounded-[2px] border outline-none transition-all ${isDark ? 'bg-black/35 border-white/10 text-white focus:border-[#C5A880]' : 'bg-zinc-50 border-zinc-250 text-zinc-800 focus:border-[#8C6E4A]'}`}
                >
                  <option value="civil">E Drejta Civile & LMD</option>
                  <option value="corporate">E Drejta Tregtare / SH.P.K.</option>
                  <option value="labor">E Drejta e Punës</option>
                  <option value="administrative">Procedurë Administrative</option>
                </select>
              </div>

              {/* Case Description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  Përshkrimi i Shkurtër i Rasti
                </label>
                <textarea
                  id="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full text-sm font-light px-4 py-3 rounded-[2px] border outline-none transition-all ${isDark ? 'bg-black/35 border-white/10 text-white focus:border-[#C5A880]' : 'bg-zinc-50 border-zinc-250 text-zinc-800 focus:border-[#8C6E4A]'}`}
                  placeholder="Përshkruani sfidën apo kërkesën ligjore, duke referuar rrethanat apo kontratat përkatëse..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-4 rounded-[2px] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md ${isDark ? 'bg-[#C5A880] hover:bg-[#B3966E] text-[#0A0A0C]' : 'bg-[#8C6E4A] hover:bg-[#735839] text-white'}`}
              >
                Regjistro Çështjen
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
