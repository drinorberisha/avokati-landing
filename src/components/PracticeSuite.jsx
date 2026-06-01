import { useState } from 'react';
import { Search, Edit3, FileCode, CheckCircle, HelpCircle, Layers, Cpu, Server, Lock, AlertTriangle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function PracticeSuite({ lang, theme }) {
  const isDark = theme === 'dark';
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('rag'); // 'rag' | 'editor' | 'deepseek'
  const [ragQuery, setRagQuery] = useState('Neni 139 prapësimi përmbarimor');
  const [ragSimulating, setRagSimulating] = useState(false);
  const [ragResults, setRagResults] = useState(null);
  
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', office: '', phone: '' });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // RAG simulation handler
  const handleRagSimulate = () => {
    setRagSimulating(true);
    setRagResults(null);
    setTimeout(() => {
      setRagResults({
        denseScore: 0.912,
        bm25Score: 0.884,
        alpha: 0.3,
        blendedScore: 0.892,
        citations: 'Ligji nr. 05/L-118, Neni 2',
        status: 'amended',
        abolishedWarning: 'Neni 139 i Ligjit nr. 04/L-139 është riformuluar plotësisht nga Ligji nr. 05/L-118. Afatet e prapësimit janë përditësuar.',
        extractionTech: 'PyMuPDF (fitz) Clean characters verified.'
      });
      setRagSimulating(false);
    }, 1200);
  };

  // Demo submit handler
  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setShowDemoModal(false);
      setDemoForm({ name: '', office: '', phone: '' });
    }, 2000);
  };

  return (
    <section id="b2b-suite" className={`relative py-24 px-6 md:px-12 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0c0c0e] border-t border-white/5' : 'bg-white border-t border-zinc-200'}`}>
      
      {/* Decorative ambient flows */}
      <div className="ambient-glow top-1/4 left-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className={`text-[10px] uppercase tracking-widest font-bold block mb-4 ${isDark ? 'text-accent' : 'text-accent'}`}>
            {t.b2bTag}
          </span>
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {t.b2bHeadline}
          </h2>
          <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            {t.b2bSub}
          </p>
        </div>

        {/* Dynamic Interactive Platform Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Interactive Nav Controls */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4">
            
            {/* RAG TAB BTN */}
            <button
              onClick={() => setActiveTab('rag')}
              className={`hover-scale p-5 text-left border rounded-custom transition-all flex items-start gap-4 ${
                activeTab === 'rag' 
                  ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                  : (isDark ? 'border-zinc-800 bg-[#121214] hover:border-zinc-700' : 'border-zinc-200 bg-stone-50/50 hover:border-zinc-300')
              }`}
            >
              <Search className={`w-5 h-5 shrink-0 mt-0.5 ${activeTab === 'rag' ? 'text-accent' : 'text-zinc-400'}`} />
              <div>
                <h4 className={`text-sm font-bold ${activeTab === 'rag' ? (isDark ? 'text-white' : 'text-[#1a1a1a]') : 'text-zinc-650 dark:text-zinc-350'}`}>
                  {t.ragTitle}
                </h4>
                <p className="text-[11px] text-zinc-450 dark:text-zinc-500 font-light mt-1.5 leading-relaxed">
                  {t.ragBM25}
                </p>
              </div>
            </button>

            {/* TIPTAP EDITOR TAB BTN */}
            <button
              onClick={() => setActiveTab('editor')}
              className={`hover-scale p-5 text-left border rounded-custom transition-all flex items-start gap-4 ${
                activeTab === 'editor' 
                  ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                  : (isDark ? 'border-zinc-800 bg-[#121214] hover:border-zinc-700' : 'border-zinc-200 bg-stone-50/50 hover:border-zinc-300')
              }`}
            >
              <Edit3 className={`w-5 h-5 shrink-0 mt-0.5 ${activeTab === 'editor' ? 'text-accent' : 'text-zinc-400'}`} />
              <div>
                <h4 className={`text-sm font-bold ${activeTab === 'editor' ? (isDark ? 'text-white' : 'text-[#1a1a1a]') : 'text-zinc-650 dark:text-zinc-350'}`}>
                  {t.suiteEditorTitle}
                </h4>
                <p className="text-[11px] text-zinc-450 dark:text-zinc-500 font-light mt-1.5 leading-relaxed">
                  {t.suiteEditorDesc}
                </p>
              </div>
            </button>

            {/* DEEPSEEK TEMPLATE TAB BTN */}
            <button
              onClick={() => setActiveTab('deepseek')}
              className={`hover-scale p-5 text-left border rounded-custom transition-all flex items-start gap-4 ${
                activeTab === 'deepseek' 
                  ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                  : (isDark ? 'border-zinc-800 bg-[#121214] hover:border-zinc-700' : 'border-zinc-200 bg-stone-50/50 hover:border-zinc-300')
              }`}
            >
              <FileCode className={`w-5 h-5 shrink-0 mt-0.5 ${activeTab === 'deepseek' ? 'text-accent' : 'text-zinc-400'}`} />
              <div>
                <h4 className={`text-sm font-bold ${activeTab === 'deepseek' ? (isDark ? 'text-white' : 'text-[#1a1a1a]') : 'text-zinc-650 dark:text-zinc-350'}`}>
                  {t.suiteUploadTitle}
                </h4>
                <p className="text-[11px] text-zinc-450 dark:text-zinc-500 font-light mt-1.5 leading-relaxed">
                  {t.suiteUploadDesc}
                </p>
              </div>
            </button>

            {/* High-Contrast B2B Demom Request Button */}
            <button
              onClick={() => setShowDemoModal(true)}
              className="hover-scale w-full mt-6 bg-primary text-primary-foreground py-3.5 rounded-custom font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-md"
            >
              {t.b2bCta}
            </button>

          </div>

          {/* Right Column: Dynamic Interactive Environment Preview */}
          <div className="lg:col-span-8 w-full flex">
            <div className={`premium-card border p-6 sm:p-8 flex flex-col justify-between w-full min-h-[380px] ${isDark ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200 bg-[#FCFBF9]'}`}>
              
              {/* RAG SIMULATOR PREVIEW */}
              {activeTab === 'rag' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between animate-entrance">
                  <div className="flex items-center justify-between border-b pb-3 border-zinc-250 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-accent flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> default_v2 Hybrid RAG Index Simulator
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400">text-embedding-3-large + BM25</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ragQuery}
                        onChange={(e) => setRagQuery(e.target.value)}
                        className={`flex-1 text-xs px-3 py-2 border rounded-custom outline-none ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-800'}`}
                      />
                      <button
                        onClick={handleRagSimulate}
                        disabled={ragSimulating}
                        className="px-4 py-2 bg-accent text-white font-bold text-xs uppercase tracking-wider rounded-custom transition-all hover:opacity-90 disabled:opacity-50"
                      >
                        {ragSimulating ? 'Querying...' : 'Query Index'}
                      </button>
                    </div>

                    {/* Simulation logs */}
                    {ragSimulating && (
                      <div className="p-4 border rounded-custom border-dashed border-accent/20 bg-accent/5 text-[11px] font-mono space-y-1 text-accent">
                        <p>&gt; Initializing pyMuPDF clean extraction parser fallback checks...</p>
                        <p>&gt; Computing text-embedding-3-large dense search vectors (1536 dimensions)...</p>
                        <p>&gt; Initiating BM25 Hybrid blending layer (alpha weight: 0.3)...</p>
                        <p>&gt; Querying active abolishment database cache namespaces...</p>
                      </div>
                    )}

                    {ragResults && !ragSimulating && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-[10px]">
                          <div className={`p-2 border rounded-custom ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-150'}`}>
                            <p className="text-zinc-400 uppercase">Dense Score</p>
                            <p className="font-bold text-accent">{ragResults.denseScore}</p>
                          </div>
                          <div className={`p-2 border rounded-custom ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-150'}`}>
                            <p className="text-zinc-400 uppercase">BM25 Score</p>
                            <p className="font-bold text-accent">{ragResults.bm25Score}</p>
                          </div>
                          <div className={`p-2 border rounded-custom ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-150'}`}>
                            <p className="text-zinc-400 uppercase">Weight (α)</p>
                            <p className="font-bold text-accent">{ragResults.alpha}</p>
                          </div>
                          <div className={`p-2 border rounded-custom ${isDark ? 'bg-accent/10 border-accent/20' : 'bg-accent/5 border-accent/25'}`}>
                            <p className="text-accent uppercase">Blended Rank</p>
                            <p className="font-bold text-accent">{ragResults.blendedScore}</p>
                          </div>
                        </div>

                        {/* Citation & Abolishment warning */}
                        <div className={`p-4 border rounded-custom text-xs ${isDark ? 'bg-zinc-900 border-zinc-850' : 'bg-white border-zinc-200'}`}>
                          <div className="flex items-center justify-between border-b pb-2 mb-2 border-zinc-200 dark:border-zinc-800">
                            <span className="font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                              <CheckCircle className="w-4 h-4 text-emerald-500" /> Citation Match: {ragResults.citations}
                            </span>
                            <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Amended</span>
                          </div>
                          <p className="text-zinc-650 dark:text-zinc-405 mb-2 font-light leading-relaxed">{ragResults.abolishedWarning}</p>
                          <p className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 font-bold italic border-t pt-2 mt-2 border-dashed border-zinc-200 dark:border-zinc-850">
                            ✓ {ragResults.extractionTech}
                          </p>
                        </div>
                      </div>
                    )}

                    {!ragResults && !ragSimulating && (
                      <div className="p-10 text-center text-zinc-450 dark:text-zinc-500 text-xs">
                        Type a query and press "Query Index" to see default_v2 hybrid blending rescoring and compliance check mechanics in real-time.
                      </div>
                    )}
                  </div>

                  {/* Structural descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-light leading-relaxed border-t pt-4 border-zinc-250 dark:border-zinc-800">
                    <p>✓ <strong>PyMuPDF Extraction:</strong> {t.ragPyMuPDF}</p>
                    <p>✓ <strong>Mistral OCR Fallback:</strong> {t.ragOCR}</p>
                    <p>✓ <strong>BM25 Blending:</strong> {t.ragBM25}</p>
                    <p>✓ <strong>Abolishment Registry:</strong> {t.ragAbolish}</p>
                  </div>
                </div>
              )}

              {/* TIPTAP EDITOR PREVIEW */}
              {activeTab === 'editor' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between animate-entrance">
                  <div className="flex items-center justify-between border-b pb-3 border-zinc-250 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-accent flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> TipTap Interactive Inline Token Editor
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400">React first, zero API key deps</span>
                  </div>

                  <div className={`flex-1 p-4 border rounded-custom text-xs min-h-[140px] leading-relaxed font-light ${isDark ? 'bg-zinc-950 border-zinc-850 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}>
                    <p className="mb-2"><strong>PRO-MEMORIE MBI DRAFT-KONTRATËN E QIRASË KOMERCIALE</strong></p>
                    <p className="mb-3">
                      Sipas nenit 18 të Ligjit të Detyrimeve, palët kontraktuese 
                      <span className="mx-1 px-2 py-0.5 border rounded-full bg-accent/15 border-accent text-accent font-bold font-mono text-[10px] inline-block select-none cursor-pointer">
                        Client_Name
                      </span> 
                      dhe 
                      <span className="mx-1 px-2 py-0.5 border rounded-full bg-accent/15 border-accent text-accent font-bold font-mono text-[10px] inline-block select-none cursor-pointer">
                        Lessor_Name
                      </span> 
                      pajtohen për marrjen me qira të objektit komercial në komunën 
                      <span className="mx-1 px-2 py-0.5 border rounded-full bg-accent/15 border-accent text-accent font-bold font-mono text-[10px] inline-block select-none cursor-pointer">
                        Municipal_Branch
                      </span>
                      për çmimin fillestar prej 
                      <span className="mx-1 px-2 py-0.5 border rounded-full bg-accent/15 border-accent text-accent font-bold font-mono text-[10px] inline-block select-none cursor-pointer">
                        Monthly_Tariff
                      </span> 
                      në muaj.
                    </p>
                    <p className="text-[10px] text-zinc-400 font-mono border-t pt-2 border-dashed border-zinc-200 dark:border-zinc-850 mt-4">
                      * Variable chips display as beautiful non-editable pills on-screen but serialize directly to standard standard <code className="bg-zinc-200 dark:bg-zinc-800 p-0.5 rounded text-accent">&#123;&#123;variable&#125;&#125;</code> string tokens on storage save.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-light leading-relaxed border-t pt-4 border-zinc-250 dark:border-zinc-800">
                    <p>✓ <strong>Zero Dependency:</strong> Built directly within local React configurations, removing slow iframe overlays.</p>
                    <p>✓ <strong>Standard Tokens:</strong> Serializes as clean standard JSON templates safe for database mapping.</p>
                  </div>
                </div>
              )}

              {/* DEEPSEEK TEMPLATE PREVIEW */}
              {activeTab === 'deepseek' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between animate-entrance">
                  <div className="flex items-center justify-between border-b pb-3 border-zinc-250 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-accent flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5" /> DeepSeek-V4-Pro Upload-to-Template Pipeline
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400">DOCX / PDF Schema Mapper</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Left drop zone mock */}
                    <div className={`p-6 border border-dashed rounded-custom flex flex-col items-center justify-center text-center aspect-video ${isDark ? 'border-zinc-800 bg-zinc-900/30' : 'border-zinc-300 bg-zinc-50'}`}>
                      <FileCode className="w-8 h-8 text-accent mb-3 animate-pulse" />
                      <p className="text-xs font-bold mb-1">kontrate_komerciale_v2.docx</p>
                      <p className="text-[10px] text-zinc-400">34.5 KB • Drag-and-drop parsed</p>
                    </div>

                    {/* Right Extracted JSON schema */}
                    <div className={`p-4 border rounded-custom font-mono text-[9px] overflow-auto h-[120px] ${isDark ? 'bg-black/60 border-zinc-850 text-emerald-400' : 'bg-zinc-100 border-zinc-250 text-emerald-700'}`}>
                      <p className="text-zinc-400 font-bold">// DeepSeek-V4-Pro schema output</p>
                      <p className="text-zinc-400">{"{"}</p>
                      <p className="pl-4">"template_name": "Qira Komerciale",</p>
                      <p className="pl-4">"variables": [</p>
                      <p className="pl-8">{"{ \"token\": \"Client_Name\", \"type\": \"string\" },"}</p>
                      <p className="pl-8">{"{ \"token\": \"Municipal_Branch\", \"type\": \"enum\" },"}</p>
                      <p className="pl-8">{"{ \"token\": \"Monthly_Tariff\", \"type\": \"number\" }"}</p>
                      <p className="pl-4">]</p>
                      <p className="text-zinc-400">{"}"}</p>
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-light leading-relaxed border-t pt-4 border-zinc-250 dark:border-zinc-800">
                    <p>✓ <strong>DeepSeek Parser:</strong> Replaces manual tag placements with 99.4% accurate automatic JSON mapping.</p>
                    <p>✓ <strong>Tenancy Scoping:</strong> Multi-tenant isolation scopes this template strictly to your office group.</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* B2B Demo Request Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-entrance">
          <div className={`premium-card border p-8 max-w-md w-full relative ${isDark ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200 bg-white shadow-2xl'}`}>
            
            <button 
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-650 text-lg font-bold"
            >
              ×
            </button>

            {demoSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 font-bold">✓</div>
                <h3 className={`text-lg font-bold font-serif mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Demo Request Sent</h3>
                <p className="text-xs text-zinc-450 dark:text-zinc-500 font-light">We will contact your law office within 24 hours with custom sandbox access credentials.</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <h3 className={`text-xl font-bold font-serif mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{t.b2bCta}</h3>
                  <p className="text-xs text-zinc-450 dark:text-zinc-500 font-light">Join the most advanced digital legal workspace in Kosova.</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demoName" className="text-[9px] uppercase tracking-wider font-bold text-zinc-400">Emri i Avokatit</label>
                  <input
                    type="text"
                    id="demoName"
                    required
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                    className={`text-xs px-3 py-2 border rounded-custom outline-none ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-stone-50 border-zinc-200'}`}
                    placeholder="Av. Filan Fisteku"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demoOffice" className="text-[9px] uppercase tracking-wider font-bold text-zinc-400">Zyra Ligjore / Law Office</label>
                  <input
                    type="text"
                    id="demoOffice"
                    required
                    value={demoForm.office}
                    onChange={(e) => setDemoForm({ ...demoForm, office: e.target.value })}
                    className={`text-xs px-3 py-2 border rounded-custom outline-none ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-stone-50 border-zinc-200'}`}
                    placeholder="p.sh. Fisteku & Partners LLC"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="demoPhone" className="text-[9px] uppercase tracking-wider font-bold text-zinc-400">Numri i Telefonit</label>
                  <input
                    type="tel"
                    id="demoPhone"
                    required
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    className={`text-xs px-3 py-2 border rounded-custom outline-none ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-stone-50 border-zinc-200'}`}
                    placeholder="+383 4X XXX XXX"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-accent text-white font-bold text-xs uppercase tracking-widest rounded-custom hover:opacity-90 transition-all"
                >
                  Send Sandbox Request
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
