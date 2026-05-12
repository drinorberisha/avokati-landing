import { useState, useEffect, useRef } from 'react'

/* ── Pipeline Visualization ── */
function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    { id: 'query', label: 'Pyetja', sub: 'Query', x: 60, y: 170, color: '#818cf8' },
    { id: 'router', label: 'Ruteri', sub: 'Intent Router', x: 200, y: 170, color: '#6366f1' },
    { id: 'citation', label: 'Citimi', sub: 'Citation Lookup', x: 360, y: 80, color: '#34d399' },
    { id: 'status', label: 'Statusi', sub: 'Abolishment', x: 360, y: 260, color: '#fbbf24' },
    { id: 'semantic', label: 'Semantika', sub: 'Semantic Search', x: 360, y: 170, color: '#a78bfa' },
    { id: 'pinecone', label: 'Pinecone', sub: 'Vector Store', x: 540, y: 120, color: '#f59e0b' },
    { id: 'bm25', label: 'BM25', sub: 'Hybrid Rerank', x: 540, y: 220, color: '#fb923c' },
    { id: 'llm', label: 'DeepSeek', sub: 'V4-Pro', x: 720, y: 170, color: '#ef4444' },
    { id: 'validate', label: 'Validimi', sub: 'Citation Check', x: 880, y: 170, color: '#22d3ee' },
    { id: 'answer', label: 'Përgjigjja', sub: 'Answer', x: 1020, y: 170, color: '#4ade80' },
  ]

  const paths = [
    { from: 'query', to: 'router', label: '' },
    { from: 'router', to: 'citation', label: 'Neni N', dashed: true },
    { from: 'router', to: 'status', label: 'aktiv?', dashed: true },
    { from: 'router', to: 'semantic', label: 'topic' },
    { from: 'citation', to: 'pinecone', label: 'filter' },
    { from: 'semantic', to: 'pinecone', label: 'embed' },
    { from: 'pinecone', to: 'bm25', label: 'top-200' },
    { from: 'status', to: 'llm', label: 'synthetic', dashed: true },
    { from: 'bm25', to: 'llm', label: 'top-5' },
    { from: 'citation', to: 'llm', label: 'N±1', dashed: true },
    { from: 'llm', to: 'validate', label: '' },
    { from: 'validate', to: 'answer', label: '' },
  ]

  const getStepPos = (id) => steps.find(s => s.id === id)

  const runAnimation = () => {
    setIsAnimating(true)
    setActiveStep(-1)
    let i = 0
    const interval = setInterval(() => {
      setActiveStep(i)
      i++
      if (i >= steps.length) {
        clearInterval(interval)
        setTimeout(() => { setIsAnimating(false); setActiveStep(-1) }, 2000)
      }
    }, 300)
  }

  useEffect(() => { runAnimation() }, [])

  return (
    <div className="relative w-full overflow-x-auto">
      <button
        onClick={runAnimation}
        disabled={isAnimating}
        className="absolute top-4 right-4 z-10 px-4 py-2 text-sm font-medium rounded-lg
          bg-indigo-500/10 border border-indigo-500/20 text-indigo-300
          hover:bg-indigo-500/20 transition-colors disabled:opacity-50"
      >
        {isAnimating ? 'Duke u animuar...' : '▶️ Rishiko animacionin'}
      </button>

      <svg viewBox="0 0 1120 360" className="w-full h-auto min-w-[800px]">
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.06)" strokeWidth="0.5"/>
          </pattern>
          <marker id="arrowhead" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="6" markerHeight="4" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
          </marker>
          <marker id="arrowhead-green" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="6" markerHeight="4" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
          </marker>
          <marker id="arrowhead-amber" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="6" markerHeight="4" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
          </marker>
          <marker id="arrowhead-purple" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="6" markerHeight="4" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa"/>
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="1120" height="360" fill="url(#grid)" rx="8"/>

        {/* Paths */}
        {paths.map((p, idx) => {
          const from = getStepPos(p.from)
          const to = getStepPos(p.to)
          if (!from || !to) return null
          const markerColors = { citation: 'url(#arrowhead-green)', status: 'url(#arrowhead-amber)', semantic: 'url(#arrowhead-purple)' }
          return (
            <g key={idx}>
              <path
                d={`M ${from.x + 80} ${from.y + 20} C ${(from.x + to.x) / 2} ${from.y + 20}, ${(from.x + to.x) / 2} ${to.y + 20}, ${to.x} ${to.y + 20}`}
                fill="none"
                stroke={p.dashed ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.4)'}
                strokeWidth={p.dashed ? 1.5 : 2}
                strokeDasharray={p.dashed ? '6 4' : 'none'}
                markerEnd={markerColors[p.from] || 'url(#arrowhead)'}
                className={activeStep >= 0 && steps[activeStep]?.id === p.to ? 'flow-line' : ''}
              />
              {p.label && (
                <text
                  x={(from.x + to.x) / 2}
                  y={from.y < to.y ? from.y + 8 : to.y + 8}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                >{p.label}</text>
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {steps.map((step, idx) => (
          <g
            key={step.id}
            transform={`translate(${step.x}, ${step.y})`}
            className="cursor-pointer"
            onClick={() => setActiveStep(idx)}
            style={{ opacity: activeStep === -1 || activeStep === idx ? 1 : 0.4, transition: 'opacity 0.3s' }}
          >
            {/* Glow for active step */}
            {activeStep === idx && (
              <rect x={-4} y={-4} width={88} height={48} rx="10" fill="none" stroke={step.color} strokeWidth="2" opacity="0.5" filter="url(#glow)"/>
            )}
            <rect
              x="0" y="0" width="80" height="40" rx="8"
              fill={`${step.color}15`}
              stroke={activeStep === idx ? step.color : `${step.color}40`}
              strokeWidth={activeStep === idx ? 2 : 1}
            />
            <text x="40" y="16" textAnchor="middle" fill={step.color} fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">
              {step.label}
            </text>
            <text x="40" y="30" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, sans-serif">
              {step.sub}
            </text>
            {/* Pulse dot on active */}
            {activeStep === idx && (
              <circle cx="76" cy="4" r="4" fill={step.color} className="pulse-dot"/>
            )}
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(20, 340)">
          <rect x="0" y="0" width="8" height="8" rx="2" fill="#34d399" opacity="0.7"/>
          <text x="14" y="8" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">Citim i drejtpërdrejtë</text>
          <rect x="140" y="0" width="8" height="8" rx="2" fill="#fbbf24" opacity="0.7"/>
          <text x="154" y="8" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">Status / Shfuqizim</text>
          <rect x="280" y="0" width="8" height="8" rx="2" fill="#a78bfa" opacity="0.7"/>
          <text x="294" y="8" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">Kërkim semantik</text>
        </g>
      </svg>

      {/* Active step detail */}
      {activeStep >= 0 && (
        <div className="mt-4 p-4 glass-card text-center">
          <p className="text-sm text-slate-300">
            <span className="font-semibold" style={{ color: steps[activeStep].color }}>{steps[activeStep].label}</span>
            <span className="text-slate-500"> — {steps[activeStep].sub}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {activeStep === 0 && 'Përdoruesi shkruan pyetjen në shqip — p.sh. "Çfarë thotë Neni 5 i Ligjit 02/L-10?"'}
            {activeStep === 1 && 'Klasifikuesi regex rrugëzon pyetjen: përshëndetje / citim / status / temë — 5 shtigje të ndara'}
            {activeStep === 2 && 'Parser-i nxjerr numrin e ligjit dhe nenit. Pinecone filtron me metadata. 100% i saktë për citime direkte.'}
            {activeStep === 3 && 'Regjistri i shfuqizimeve kontrollon nëse ligji është aktiv. 262 ligje të monitoruara.'}
            {activeStep === 4 && 'Embedding + BM25 hibrid për pyetje tematike. α=0.2 blend. Pool 200 → top-5.'}
            {activeStep === 5 && 'Pinecone serverless, 42,037 copëza të indeksuara, 3072-dim, cosine similarity.'}
            {activeStep === 6 && 'BM25 shqip-folës me stopwords lokale. Ripozicionon termat e rralla si "digjitalë".'}
            {activeStep === 7 && 'DeepSeek-V4-Pro gjeneron përgjigjen në shqip me citime. 1M token kontekst.'}
            {activeStep === 8 && 'Validatori kontrollon çdo citim [Neni N, Ligji X] kundrejt burimeve. 98.2% verifikim.'}
            {activeStep === 9 && 'Përgjigjja përmban: tekst të cituar, burime, paralajmërime për shfuqizime.'}
          </p>
        </div>
      )}
    </div>
  )
}

/* ── Metric Card ── */
function MetricCard({ value, label, suffix, delay = 0 }) {
  return (
    <div className="glass-card p-6 text-center stagger-child" style={{ animationDelay: `${delay}s` }}>
      <div className="text-4xl font-bold gradient-text mb-1">{value}<span className="text-2xl">{suffix}</span></div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  )
}

/* ── Feature Card ── */
function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="glass-card p-6 stagger-child hover:border-indigo-500/30 transition-colors group">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  )
}

/* ── Main App ── */
function App() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    // For now, simulate submission
    setTimeout(() => {
      setFormStatus('sent')
      setFormData({ name: '', email: '', company: '', message: '' })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full z-50 bg-navy-950/80 backdrop-blur-xl border-b border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-semibold text-lg text-white">Avokati <span className="text-indigo-400">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#pipeline" className="hover:text-white transition-colors">Si funksionon</a>
            <a href="#metrics" className="hover:text-white transition-colors">Rezultatet</a>
            <a href="#features" className="hover:text-white transition-colors">Veçoritë</a>
            <a href="#demo" className="hover:text-white transition-colors">Provo</a>
            <a href="#contact"
              className="px-5 py-2.5 rounded-lg bg-indigo-500 text-white font-medium
                hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Kërko Demo
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-navy-950 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            Në production — Cloud Run EU
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
            Ligji i Kosovës,<br/>
            <span className="gradient-text">në çast.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Avokati AI është asistenti i parë ligjor i pajisur me inteligjencë artificiale për legjislacionin
            shqip të Kosovës. Bëj pyetje në gjuhën tënde dhe merr përgjigje të sakta, me citime — nga 994 ligje
            të indeksuara në kohë reale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://avokati.vercel.app" target="_blank" rel="noopener"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-500 text-white font-semibold text-lg
                hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40
                hover:-translate-y-0.5 active:translate-y-0"
            >
              Provo AvokAI → falas
            </a>
            <a href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-indigo-500/25 text-white font-semibold text-lg
                hover:bg-white/10 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Kërko Demo
            </a>
            <a href="#pipeline"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-slate-400 font-medium text-lg
                hover:text-white transition-colors"
            >
              Shiko si funksionon →
            </a>
          </div>
        </div>
      </section>

      {/* ── Pipeline Section ── */}
      <section id="pipeline" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 font-medium text-sm mb-3 tracking-wider uppercase">Arkitektura</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Si funksionon AvokAI</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Një pipeline deterministik me 5 shtigje — jo thjesht një chatbot.
              Kliko mbi çdo hap për të parë detajet.
            </p>
          </div>
          <PipelineDiagram />
        </div>
      </section>

      {/* ── Metrics Section ── */}
      <section id="metrics" className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-400 font-medium text-sm mb-3 tracking-wider uppercase">Rezultatet</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-amber">4.6×</span> më i mirë se baseline
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Të matura kundrejt një seti prej 40 pyetjesh standarde. Rindërtimi i plotë i pipeline-it
              e rriti saktësinë nga 17.5% në 80%.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <MetricCard value="80" suffix="%" label="Recall@5 — çdo pyetje" delay={0.1} />
            <MetricCard value="100" suffix="%" label="Citim i drejtpërdrejtë" delay={0.2} />
            <MetricCard value="100" suffix="%" label="Status i ligjeve" delay={0.3} />
            <MetricCard value="98.2" suffix="%" label="Verifikim citimesh" delay={0.4} />
          </div>

          <div className="mt-12 glass-card p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-white">994</div>
                <div className="text-xs text-slate-500 mt-1">ligje të indeksuara</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">42K</div>
                <div className="text-xs text-slate-500 mt-1">copëza (chunks)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$0.0012</div>
                <div className="text-xs text-slate-500 mt-1">kosto/pyetje</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">&lt;4s</div>
                <div className="text-xs text-slate-500 mt-1">latencë retrieval</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-medium text-sm mb-3 tracking-wider uppercase">Veçoritë</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ndërtuar për saktësi</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Jo thjesht një tjetër chatbot ligjor. Çdo pretendim i gjurmohet një neni specifik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🎯"
              title="Citim i drejtpërdrejtë"
              desc='Shkruaj "Neni 5 i Ligjit 02/L-10" dhe merr artikullin e saktë — jo rezultate të përafërta. Parser dedikuar për shqip.'
              color="emerald"
            />
            <FeatureCard
              icon="⚠️"
              title="Zbulim i shfuqizimeve"
              desc="262 ligje të monitoruara automatikisht. Nëse një ligj është shfuqizuar, do ta shihni të shënuar me të kuqe."
              color="amber"
            />
            <FeatureCard
              icon="🔍"
              title="Kërkim hibrid"
              desc="Embedding semantik + BM25 shqip-folës. Termat e rralla si 'digjitalizim' gjenden edhe kur embedding-u humbet."
              color="purple"
            />
            <FeatureCard
              icon="✅"
              title="Validim citimesh"
              desc="Çdo [Neni N, Ligji X] verifikohet kundrejt burimeve të marra. Citimet e paverifikueshme shënohen ⚠️ i paverifikuar."
              color="cyan"
            />
            <FeatureCard
              icon="🇦🇱"
              title="Shqip amtare"
              desc="Prompt dhe përgjigje tërësisht në shqip. Trajton deklinacionet: Neni/Nenit/Nenin, Ligji/Ligjit/Ligjin."
              color="indigo"
            />
            <FeatureCard
              icon="⚡"
              title="I shpejtë & ekonomik"
              desc="Latencë retrieval nën 4 sekonda. Kosto mesatare $0.0012 për pyetje — 4× nën targetin tonë fillestar."
              color="slate"
            />
          </div>
        </div>
      </section>

      {/* ── Live Demo / Example Queries ── */}
      <section id="demo" className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 font-medium text-sm mb-3 tracking-wider uppercase">Demo</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pyetje reale, përgjigje reale</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Këto janë pyetje që AvokAI i përgjigjet sot në production. Provoji në aplikacionin live.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { q: 'Çfarë thotë Neni 5 i Ligjit 02/L-10?', type: 'Citim i drejtpërdrejtë', color: 'emerald' },
              { q: 'A është aktiv Ligji 03/L-094?', type: 'Status / Shfuqizim', color: 'amber' },
              { q: 'Cili ligj rregullon prokurimin publik?', type: 'Kërkim tematik', color: 'purple' },
              { q: 'Cilat janë të drejtat e punëtorëve?', type: 'Përmbajtje ligjore', color: 'indigo' },
              { q: 'Çfarë thotë Kodi Penal për vjedhjen?', type: 'Kod / Kod Penal', color: 'cyan' },
              { q: 'Cilat ligje flasin për mbrojtjen e të dhënave?', type: 'Kërkim semantik', color: 'slate' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={`https://avokati.vercel.app`}
                target="_blank" rel="noopener"
                className="glass-card p-5 hover:border-indigo-500/40 transition-all group cursor-pointer block"
              >
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-3 bg-${item.color}-500/15 text-${item.color}-400`}>
                  {item.type}
                </span>
                <p className="text-sm text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                  "{item.q}"
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-indigo-400">
                  <span>Provo në AvokAI</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a href="https://avokati.vercel.app" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-500 text-white font-semibold
                hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/30"
            >
              Hap AvokAI në shfletues
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-indigo-400 font-medium text-sm mb-3 tracking-wider uppercase">Teknologjia</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Stack modern, i menduar për shkallëzim</h2>
          <p className="text-slate-400 text-lg mb-12">
            Çdo komponent është zgjedhur për performancë, kosto, dhe besueshmëri.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'DeepSeek V4-Pro', role: 'LLM', desc: 'Gjenerim në shqip', color: 'from-red-500/20 to-red-600/5 border-red-500/20' },
              { name: 'Pinecone', role: 'Vector DB', desc: '42K vektorë', color: 'from-amber-500/20 to-amber-600/5 border-amber-500/20' },
              { name: 'OpenAI Embeddings', role: 'Embeddings', desc: 'text-3-large', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20' },
              { name: 'PyMuPDF', role: 'Ekstraktim PDF', desc: 'Zero korrupsion', color: 'from-blue-500/20 to-blue-600/5 border-blue-500/20' },
              { name: 'FastAPI', role: 'Backend', desc: 'Python 3.11', color: 'from-teal-500/20 to-teal-600/5 border-teal-500/20' },
              { name: 'GCP Cloud Run', role: 'Hosting', desc: 'EU west-1', color: 'from-sky-500/20 to-sky-600/5 border-sky-500/20' },
              { name: 'React + Vite', role: 'Frontend', desc: 'Tailwind CSS', color: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20' },
              { name: 'Supabase', role: 'Auth + DB', desc: 'PostgreSQL', color: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20' },
            ].map((tech, idx) => (
              <div key={idx}
                className={`p-5 rounded-xl bg-gradient-to-br ${tech.color} border backdrop-blur-sm stagger-child text-left`}
              >
                <div className="text-xs text-slate-500 mb-1">{tech.role}</div>
                <div className="font-semibold text-white text-sm mb-1">{tech.name}</div>
                <div className="text-xs text-slate-400">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Lead Capture ── */}
      <section id="contact" className="py-24 px-6 bg-navy-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-400 font-medium text-sm mb-3 tracking-wider uppercase">Kontakti</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Kërko një demo</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Të interesuar për Avokati AI në zyrën apo institucionin tuaj? Na shkruani dhe do t'ju kontaktojmë brenda 24 orëve.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Emri</label>
                <input
                  type="text" required value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-indigo-500/20 text-white
                    placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30
                    transition-all"
                  placeholder="Emri Mbiemri"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input
                  type="email" required value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-indigo-500/20 text-white
                    placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30
                    transition-all"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Institucioni / Kompania</label>
              <input
                type="text" value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-indigo-500/20 text-white
                  placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30
                  transition-all"
                placeholder="Emri i kompanisë ose institucionit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Mesazhi (opsionale)</label>
              <textarea
                rows={3} value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-indigo-500/20 text-white
                  placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30
                  transition-all resize-none"
                placeholder="Na tregoni çfarë ju intereson..."
              />
            </div>
            <button
              type="submit" disabled={formStatus === 'sending'}
              className="w-full py-4 rounded-xl bg-indigo-500 text-white font-semibold text-lg
                hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/30 disabled:opacity-50
                disabled:cursor-not-allowed"
            >
              {formStatus === 'idle' && 'Dërgo kërkesën'}
              {formStatus === 'sending' && 'Duke dërguar...'}
              {formStatus === 'sent' && '✅ Kërkesa u dërgua! Do t\'ju kontaktojmë së shpejti.'}
            </button>
            {formStatus === 'sent' && (
              <p className="text-emerald-400 text-sm text-center">
                Faleminderit! Do të merrni një përgjigje brenda 24 orëve.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-indigo-500/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="font-semibold text-slate-300">Avokati <span className="text-indigo-400">AI</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="https://avokati.vercel.app" target="_blank" rel="noopener" className="hover:text-slate-300 transition-colors">Aplikacioni</a>
            <a href="#pipeline" className="hover:text-slate-300 transition-colors">Arkitektura</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Kontakti</a>
          </div>
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} Pixellent Solutions LLC. Të gjitha të drejtat e rezervuara.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
