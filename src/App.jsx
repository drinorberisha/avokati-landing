import { useState, useEffect } from 'react'

/* ── Pipeline Diagram ── */
function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState(-1)
  const [animating, setAnimating] = useState(false)

  const steps = [
    { id: 'query', label: 'Pyetja', sub: 'Query', x: 40, y: 160, w: 75, h: 38, color: '#818cf8' },
    { id: 'router', label: 'Ruteri', sub: 'Router', x: 145, y: 160, w: 75, h: 38, color: '#6366f1' },
    { id: 'citation', label: 'Citimi', sub: 'Citation', x: 270, y: 65, w: 75, h: 38, color: '#34d399' },
    { id: 'status', label: 'Statusi', sub: 'Status', x: 270, y: 255, w: 75, h: 38, color: '#fbbf24' },
    { id: 'semantic', label: 'Semantika', sub: 'Semantic', x: 270, y: 160, w: 75, h: 38, color: '#a78bfa' },
    { id: 'pinecone', label: 'Pinecone', sub: 'Vector DB', x: 405, y: 110, w: 75, h: 38, color: '#f59e0b' },
    { id: 'bm25', label: 'BM25', sub: 'Hybrid', x: 405, y: 210, w: 75, h: 38, color: '#fb923c' },
    { id: 'llm', label: 'DeepSeek', sub: 'V4-Pro', x: 540, y: 160, w: 75, h: 38, color: '#ef4444' },
    { id: 'validate', label: 'Validimi', sub: 'Verify', x: 660, y: 160, w: 75, h: 38, color: '#22d3ee' },
    { id: 'answer', label: 'Përgjigjja', sub: 'Answer', x: 780, y: 160, w: 75, h: 38, color: '#4ade80' },
  ]

  const paths = [
    { from: 'query', to: 'router' },
    { from: 'router', to: 'citation', label: 'Neni N', dashed: true },
    { from: 'router', to: 'status', label: 'aktiv?', dashed: true },
    { from: 'router', to: 'semantic', label: 'topic' },
    { from: 'citation', to: 'pinecone', label: 'filter' },
    { from: 'semantic', to: 'pinecone', label: 'embed' },
    { from: 'pinecone', to: 'bm25', label: 'top-200' },
    { from: 'status', to: 'llm', label: 'synth', dashed: true },
    { from: 'bm25', to: 'llm', label: 'top-5' },
    { from: 'citation', to: 'llm', label: 'N±1', dashed: true },
    { from: 'llm', to: 'validate' },
    { from: 'validate', to: 'answer' },
  ]

  const get = (id) => steps.find(s => s.id === id)

  const cx = (s) => s.x + s.w / 2
  const cy = (s) => s.y + s.h / 2

  const runAnimation = () => {
    setAnimating(true)
    setActiveStep(-1)
    let i = 0
    const iv = setInterval(() => {
      setActiveStep(i); i++
      if (i >= steps.length) { clearInterval(iv); setTimeout(() => { setAnimating(false); setActiveStep(-1) }, 2500) }
    }, 300)
  }

  useEffect(() => { runAnimation() }, [])

  return (
    <div className="w-full">
      <button
        onClick={runAnimation}
        disabled={animating}
        className="mb-4 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg
          bg-indigo-500/10 border border-indigo-500/20 text-indigo-300
          hover:bg-indigo-500/20 transition-colors disabled:opacity-50"
      >
        {animating ? 'Duke u animuar...' : '▶️ Rishiko animacionin'}
      </button>

      <div className="overflow-x-auto -mx-4 px-4">
        <svg viewBox="0 0 890 350" className="w-full h-auto min-w-[700px] max-w-full">
          <defs>
            <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.05)" strokeWidth="0.5"/>
            </pattern>
            <marker id="ah" viewBox="0 0 10 7" refX="8" refY="3.5" markerWidth="5" markerHeight="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
            </marker>
            <marker id="ah-g" viewBox="0 0 10 7" refX="8" refY="3.5" markerWidth="5" markerHeight="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
            </marker>
            <marker id="ah-a" viewBox="0 0 10 7" refX="8" refY="3.5" markerWidth="5" markerHeight="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
            </marker>
            <marker id="ah-p" viewBox="0 0 10 7" refX="8" refY="3.5" markerWidth="5" markerHeight="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa"/>
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5"/>
              <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <rect width="890" height="350" fill="url(#g)" rx="10"/>

          {/* Paths */}
          {paths.map((p, i) => {
            const f = get(p.from), t = get(p.to)
            if (!f || !t) return null
            const ma = { citation: 'url(#ah-g)', status: 'url(#ah-a)', semantic: 'url(#ah-p)' }
            return (
              <g key={i}>
                <path
                  d={`M ${cx(f)} ${cy(f)} C ${(cx(f)+cx(t))/2} ${cy(f)}, ${(cx(f)+cx(t))/2} ${cy(t)}, ${cx(t)} ${cy(t)}`}
                  fill="none" stroke={p.dashed ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.35)'}
                  strokeWidth={p.dashed ? 1.2 : 1.8} strokeDasharray={p.dashed ? '5 4' : 'none'}
                  markerEnd={ma[p.from] || 'url(#ah)'}
                  className={activeStep>=0 && steps[activeStep]?.id===p.to ? 'flow-line' : ''}
                />
                {p.label && (
                  <text x={(cx(f)+cx(t))/2} y={f.y<t.y ? f.y+8 : t.y+8} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter,sans-serif">{p.label}</text>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {steps.map((s, i) => {
            const active = activeStep === i
            return (
              <g key={s.id} transform={`translate(${s.x},${s.y})`} style={{cursor:'pointer',opacity: activeStep===-1||active?1:0.35,transition:'opacity 0.25s'}} onClick={() => setActiveStep(i)}>
                {active && <rect x={-3} y={-3} width={s.w+6} height={s.h+6} rx="9" fill="none" stroke={s.color} strokeWidth="1.5" opacity="0.5" filter="url(#glow)"/>}
                <rect x="0" y="0" width={s.w} height={s.h} rx="7" fill={`${s.color}12`} stroke={active?s.color:`${s.color}35`} strokeWidth={active?1.5:1}/>
                <text x={s.w/2} y="15" textAnchor="middle" fill={s.color} fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">{s.label}</text>
                <text x={s.w/2} y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">{s.sub}</text>
                {active && <circle cx={s.w-2} cy="3" r="3.5" fill={s.color} className="pulse-dot"/>}
              </g>
            )
          })}

          {/* Legend */}
          <g transform="translate(14, 332)">
            <rect x="0" y="0" width="7" height="7" rx="2" fill="#34d399" opacity="0.7"/>
            <text x="12" y="7" fill="#64748b" fontSize="9" fontFamily="Inter,sans-serif">Citim</text>
            <rect x="65" y="0" width="7" height="7" rx="2" fill="#fbbf24" opacity="0.7"/>
            <text x="77" y="7" fill="#64748b" fontSize="9" fontFamily="Inter,sans-serif">Status</text>
            <rect x="140" y="0" width="7" height="7" rx="2" fill="#a78bfa" opacity="0.7"/>
            <text x="152" y="7" fill="#64748b" fontSize="9" fontFamily="Inter,sans-serif">Semantik</text>
          </g>
        </svg>
      </div>

      {activeStep >= 0 && (
        <div className="mt-5 p-4 sm:p-5 glass-card">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            <span className="font-semibold" style={{color:steps[activeStep].color}}>{steps[activeStep].label}</span>
            <span className="text-slate-500"> — {steps[activeStep].sub}: </span>
            <span className="text-slate-400">
              {['Përdoruesi shkruan pyetjen në shqip — p.sh. "Çfarë thotë Neni 5 i Ligjit 02/L-10?"',
                'Klasifikuesi regex rrugëzon pyetjen: përshëndetje / citim / status / temë — 5 shtigje të ndara',
                'Parser-i nxjerr numrin e ligjit dhe nenit. Pinecone filtron me metadata. 100% i saktë për citime direkte.',
                'Regjistri i shfuqizimeve kontrollon nëse ligji është aktiv. 262 ligje të monitoruara.',
                'Embedding + BM25 hibrid për pyetje tematike. α=0.2 blend. Pool 200 → top-5.',
                'Pinecone serverless, 42,037 copëza të indeksuara, 3072-dim, cosine similarity.',
                'BM25 shqip-folës me stopwords lokale. Ripozicionon termat e rralla si "digjitalë".',
                'DeepSeek-V4-Pro gjeneron përgjigjen në shqip me citime. 1M token kontekst.',
                'Validatori kontrollon çdo citim [Neni N, Ligji X] kundrejt burimeve. 98.2% verifikim.',
                'Përgjigjja përmban: tekst të cituar, burime, paralajmërime për shfuqizime.'
              ][activeStep]}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

/* ── Section Header ── */
function SectionHeader({ overline, overlineColor, title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-20">
      <p className={`${overlineColor || 'text-indigo-400'} font-semibold text-xs sm:text-sm mb-4 tracking-[0.15em] uppercase`}>{overline}</p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">{title}</h2>
      {subtitle && <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  )
}

/* ── App ── */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => { setFormStatus('sent'); setForm({ name: '', email: '', company: '', message: '' }) }, 1000)
  }

  const navLinks = [
    { href: '#pipeline', label: 'Si funksionon' },
    { href: '#metrics', label: 'Rezultatet' },
    { href: '#features', label: 'Veçoritë' },
    { href: '#demo', label: 'Provo' },
  ]

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-navy-950/85 backdrop-blur-xl border-b border-indigo-500/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">A</div>
            <span className="font-bold text-lg text-white">Avokati <span className="text-indigo-400">AI</span></span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{l.label}</a>
            ))}
            <a href="#contact" className="ml-2 px-5 py-2.5 rounded-lg bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/25">Kërko Demo</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-400 hover:text-white" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18"/>
                : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mobile-nav-backdrop border-t border-indigo-500/8">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-base text-slate-300 hover:text-white transition-colors font-medium py-2">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-400 transition-colors">Kërko Demo</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] via-transparent to-navy-950 pointer-events-none"/>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/8 border border-indigo-500/15 text-indigo-300 text-xs sm:text-sm mb-8 sm:mb-10 animate-in stagger-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"/>
            Në production — Cloud Run EU
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.08] animate-in stagger-2">
            Ligji i Kosovës,<br/>
            <span className="gradient-text">në çast.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed animate-in stagger-3">
            Avokati AI është asistenti i parë ligjor i pajisur me inteligjencë artificiale për legjislacionin shqip të Kosovës. Bëj pyetje në gjuhën tënde dhe merr përgjigje të sakta, me citime — nga 994 ligje të indeksuara në kohë reale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-in stagger-4">
            <a href="https://avokati.vercel.app" target="_blank" rel="noopener"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-indigo-500 text-white font-bold text-base sm:text-lg
                hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5">
              Provo AvokAI → falas
            </a>
            <a href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/[0.04] border border-indigo-500/20 text-white font-bold text-base sm:text-lg
                hover:bg-white/[0.08] transition-all hover:-translate-y-0.5">
              Kërko Demo
            </a>
          </div>

          <p className="mt-8 sm:mt-10 text-sm text-slate-500 animate-in stagger-5">
            <a href="#pipeline" className="hover:text-slate-300 transition-colors inline-flex items-center gap-1.5">
              Shiko si funksionon
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M19 9l-7 7-7-7"/></svg>
            </a>
          </p>
        </div>
      </section>

      {/* ── Pipeline ── */}
      <section id="pipeline" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader overline="Arkitektura" overlineColor="text-indigo-400" title="Si funksionon AvokAI" subtitle="Një pipeline deterministik me 5 shtigje — jo thjesht një chatbot. Kliko mbi çdo hap për të parë detajet."/>
          <PipelineDiagram />
        </div>
      </section>

      {/* ── Metrics ── */}
      <section id="metrics" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-navy-900/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader overline="Rezultatet" overlineColor="text-amber-400" title={<><span className="gradient-text-amber">4.6×</span> më i mirë se baseline</>} subtitle="Të matura kundrejt një seti prej 40 pyetjesh standarde. Rindërtimi i plotë i pipeline-it e rriti saktësinë nga 17.5% në 80%."/>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
            {[
              { v: '80', s: '%', l: 'Recall@5' },
              { v: '100', s: '%', l: 'Citim i drejtpërdrejtë' },
              { v: '100', s: '%', l: 'Status i ligjeve' },
              { v: '98.2', s: '%', l: 'Verifikim citimesh' },
            ].map((m, i) => (
              <div key={i} className={`glass-card p-5 sm:p-7 text-center animate-in stagger-${i+1}`}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text mb-1">{m.v}<span className="text-xl sm:text-2xl">{m.s}</span></div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">{m.l}</div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
              {[{v:'994',l:'ligje të indeksuara'},{v:'42K',l:'copëza (chunks)'},{v:'$0.0012',l:'kosto/pyetje'},{v:'<4s',l:'latencë retrieval'}].map((m,i)=>(
                <div key={i}>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{m.v}</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-1.5">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader overline="Veçoritë" overlineColor="text-emerald-400" title="Ndërtuar për saktësi" subtitle="Jo thjesht një tjetër chatbot ligjor. Çdo pretendim i gjurmohet një neni specifik."/>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon:'🎯', title:'Citim i drejtpërdrejtë', desc:'Shkruaj "Neni 5 i Ligjit 02/L-10" dhe merr artikullin e saktë — jo rezultate të përafërta.' },
              { icon:'⚠️', title:'Zbulim i shfuqizimeve', desc:'262 ligje të monitoruara. Nëse një ligj është shfuqizuar, do ta shihni të shënuar me të kuqe.' },
              { icon:'🔍', title:'Kërkim hibrid', desc:'Embedding semantik + BM25 shqip-folës. Termat e rralla gjenden edhe kur embedding-u humbet.' },
              { icon:'✅', title:'Validim citimesh', desc:'Çdo [Neni N, Ligji X] verifikohet kundrejt burimeve. Të paverifikuarat shënohen.' },
              { icon:'🇦🇱', title:'Shqip amtare', desc:'Prompt dhe përgjigje tërësisht në shqip. Trajton të gjitha deklinacionet.' },
              { icon:'⚡', title:'I shpejtë & ekonomik', desc:'Latencë retrieval nën 4 sekonda. Kosto $0.0012/pyetje — 4× nën target.' },
            ].map((f, i) => (
              <div key={i} className={`glass-card p-5 sm:p-7 hover:border-indigo-500/25 transition-all group animate-in stagger-${i+1}`}>
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-5">{f.icon}</div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2 sm:mb-3">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo ── */}
      <section id="demo" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-navy-900/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader overline="Demo" overlineColor="text-cyan-400" title="Pyetje reale, përgjigje reale" subtitle="Këto janë pyetje që AvokAI i përgjigjet sot në production. Provoji në aplikacionin live."/>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {[
              { q:'Çfarë thotë Neni 5 i Ligjit 02/L-10?', t:'Citim i drejtpërdrejtë', c:'emerald' },
              { q:'A është aktiv Ligji 03/L-094?', t:'Status / Shfuqizim', c:'amber' },
              { q:'Cili ligj rregullon prokurimin publik?', t:'Kërkim tematik', c:'purple' },
              { q:'Cilat janë të drejtat e punëtorëve?', t:'Përmbajtje ligjore', c:'indigo' },
              { q:'Çfarë thotë Kodi Penal për vjedhjen?', t:'Kod Penal', c:'cyan' },
              { q:'Cilat ligje flasin për mbrojtjen e të dhënave?', t:'Kërkim semantik', c:'slate' },
            ].map((item, i) => (
              <a key={i} href="https://avokati.vercel.app" target="_blank" rel="noopener"
                className={`glass-card p-5 hover:border-indigo-500/35 transition-all group block animate-in stagger-${i+1}`}>
                <span className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold mb-3 bg-indigo-500/10 text-indigo-400">{item.t}</span>
                <p className="text-sm sm:text-base text-slate-300 group-hover:text-white transition-colors leading-relaxed mb-3">"{item.q}"</p>
                <span className="text-xs text-indigo-400 group-hover:text-indigo-300 transition-colors">Provo në AvokAI →</span>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a href="https://avokati.vercel.app" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/25">
              Hap AvokAI në shfletues
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <SectionHeader overline="Teknologjia" overlineColor="text-indigo-400" title="Stack modern, i menduar për shkallëzim" subtitle="Çdo komponent është zgjedhur për performancë, kosto, dhe besueshmëri."/>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { n:'DeepSeek V4-Pro', r:'LLM', d:'Gjenerim në shqip' },
              { n:'Pinecone', r:'Vector DB', d:'42K vektorë' },
              { n:'OpenAI', r:'Embeddings', d:'text-3-large' },
              { n:'PyMuPDF', r:'PDF', d:'Zero korrupsion' },
              { n:'FastAPI', r:'Backend', d:'Python 3.11' },
              { n:'Cloud Run', r:'Hosting', d:'GCP EU west-1' },
              { n:'React+Vite', r:'Frontend', d:'Tailwind CSS' },
              { n:'Supabase', r:'Auth+DB', d:'PostgreSQL' },
            ].map((t, i) => (
              <div key={i} className={`p-4 sm:p-5 rounded-xl bg-navy-800/60 border border-indigo-500/10 text-left animate-in stagger-${i+1}`}>
                <div className="text-[10px] sm:text-xs text-slate-500 mb-1.5 font-semibold uppercase tracking-wider">{t.r}</div>
                <div className="font-bold text-white text-sm mb-1">{t.n}</div>
                <div className="text-[11px] sm:text-xs text-slate-400">{t.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-navy-900/40">
        <div className="max-w-2xl mx-auto">
          <SectionHeader overline="Kontakti" overlineColor="text-amber-400" title="Kërko një demo" subtitle="Të interesuar për Avokati AI në zyrën apo institucionin tuaj? Na shkruani dhe do t'ju kontaktojmë brenda 24 orëve."/>

          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Emri *</label>
                <input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl bg-navy-900 border border-indigo-500/15 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15 transition-all text-base"
                  placeholder="Emri Mbiemri"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email *</label>
                <input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                  className="w-full px-4 py-3.5 rounded-xl bg-navy-900 border border-indigo-500/15 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15 transition-all text-base"
                  placeholder="email@example.com"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Institucioni / Kompania</label>
              <input type="text" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-navy-900 border border-indigo-500/15 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15 transition-all text-base"
                placeholder="Emri i kompanisë ose institucionit"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Mesazhi (opsionale)</label>
              <textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                className="w-full px-4 py-3.5 rounded-xl bg-navy-900 border border-indigo-500/15 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15 transition-all text-base resize-none"
                placeholder="Na tregoni çfarë ju intereson..."/>
            </div>
            <button type="submit" disabled={formStatus==='sending'}
              className="w-full py-4 rounded-xl bg-indigo-500 text-white font-bold text-lg hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
              {formStatus==='idle'?'Dërgo kërkesën':formStatus==='sending'?'Duke dërguar...':'✅ Kërkesa u dërgua! Do t\'ju kontaktojmë së shpejti.'}
            </button>
            {formStatus==='sent' && <p className="text-emerald-400 text-sm text-center font-medium">Faleminderit! Do të merrni një përgjigje brenda 24 orëve.</p>}
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-indigo-500/8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="font-bold text-slate-300">Avokati <span className="text-indigo-400">AI</span></span>
          </div>
          <div className="flex items-center gap-5 sm:gap-8 text-sm text-slate-500">
            <a href="https://avokati.vercel.app" target="_blank" rel="noopener" className="hover:text-slate-300 transition-colors">Aplikacioni</a>
            <a href="#pipeline" className="hover:text-slate-300 transition-colors">Arkitektura</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Kontakti</a>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">© {new Date().getFullYear()} Pixellent Solutions LLC</p>
        </div>
      </footer>
    </div>
  )
}
