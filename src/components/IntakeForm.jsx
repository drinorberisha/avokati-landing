import { useState } from 'react';
import { ArrowLeft, ArrowRight, Shield, Award, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';

const regionalData = {
  prishtine: {
    name: { sq: 'Prishtinë', sr: 'Priština', en: 'Pristina' },
    court: { sq: 'Gjykata Themelore e Prishtinës', sr: 'Osnovni Sud u Prištini', en: 'Basic Court of Pristina' },
    practices: [
      { id: 'corporate', sq: 'E drejtë Korporative (SH.P.K.)', sr: 'Korporativno pravo', en: 'Corporate Law (LLC)' },
      { id: 'investment', sq: 'Investime të Huaja', sr: 'Strane investicije', en: 'Foreign Investments' },
      { id: 'ip', sq: 'Pronësi Intelektuale (IP)', sr: 'Intelektualna svojina', en: 'Intellectual Property' }
    ]
  },
  prizren: {
    name: { sq: 'Prizren', sr: 'Prizren', en: 'Prizren' },
    court: { sq: 'Gjykata Themelore e Prizrenit', sr: 'Osnovni Sud u Prizrenu', en: 'Basic Court of Prizren' },
    practices: [
      { id: 'contracts', sq: 'Kontrata & LMD', sr: 'Ugovori', en: 'Contracts & Obligations' },
      { id: 'procurement', sq: 'Prokurim Publik', sr: 'Javne nabavke', en: 'Public Procurement' }
    ]
  },
  peje: {
    name: { sq: 'Pejë', sr: 'Peć', en: 'Peja' },
    court: { sq: 'Gjykata Themelore e Pejës', sr: 'Osnovni Sud u Peći', en: 'Basic Court of Peja' },
    practices: [
      { id: 'property', sq: 'Pronësi & Kadastër', sr: 'Imovinsko pravo', en: 'Property & Real Estate' },
      { id: 'civil_disputes', sq: 'Konteste Civile', sr: 'Građanske parnice', en: 'Civil Disputes' }
    ]
  },
  gjakove: {
    name: { sq: 'Gjakovë', sr: 'Đakovica', en: 'Gjakova' },
    court: { sq: 'Gjykata Themelore e Gjakovës', sr: 'Osnovni Sud u Đakovici', en: 'Basic Court of Gjakova' },
    practices: [
      { id: 'family', sq: 'E drejtë Familjare', sr: 'Porodično pravo', en: 'Family Law' },
      { id: 'administrative', sq: 'Procedurë Administrative', sr: 'Upravni postupak', en: 'Administrative Procedure' }
    ]
  },
  ferizaj: {
    name: { sq: 'Ferizaj', sr: 'Uroševac', en: 'Ferizaj' },
    court: { sq: 'Gjykata Themelore e Ferizajt', sr: 'Osnovni Sud u Uroševcu', en: 'Basic Court of Ferizaj' },
    practices: [
      { id: 'labor', sq: 'E drejtë e Punës', sr: 'Radno pravo', en: 'Labor Relations' },
      { id: 'civil_claims', sq: 'Kërkesa Civile', sr: 'Građanska potraživanja', en: 'Civil Claims' }
    ]
  },
  gjilan: {
    name: { sq: 'Gjilan', sr: 'Gnjilane', en: 'Gjilan' },
    court: { sq: 'Gjykata Themelore e Gjilanit', sr: 'Osnovni Sud u Gnjilanu', en: 'Basic Court of Gjilan' },
    practices: [
      { id: 'real_estate', sq: 'Patundshmëri & Kadastër', sr: 'Nekretnine', en: 'Real Estate' },
      { id: 'accidents', sq: 'Aksidente Komunikacioni', sr: 'Saobraćajne nesreće', en: 'Auto Accidents' }
    ]
  },
  mitrovice: {
    name: { sq: 'Mitrovicë', sr: 'Mitrovica', en: 'Mitrovica' },
    court: { sq: 'Gjykata Themelore e Mitrovicës', sr: 'Osnovni Sud u Mitrovici', en: 'Basic Court of Mitrovica' },
    practices: [
      { id: 'commercial', sq: 'Çështje Komerciale', sr: 'Komercijalni sporovi', en: 'Commercial Matters' },
      { id: 'criminal', sq: 'Mbrojtje Penale', sr: 'Krivična odbrana', en: 'Criminal Defense' }
    ]
  }
};

export default function IntakeForm({ lang, theme }) {
  const isDark = theme === 'dark';
  const t = translations[lang];

  const [step, setStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPractice, setSelectedPractice] = useState('');
  const [contactData, setContactData] = useState({
    fullName: '',
    phone: '',
    email: '',
    description: ''
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleNextStep = () => {
    if (step === 1 && !selectedRegion) {
      setFormError(lang === 'sq' ? 'Ju lutem zgjidhni rajonin.' : lang === 'sr' ? 'Molimo izaberite region.' : 'Please select a region.');
      return;
    }
    if (step === 2 && !selectedPractice) {
      setFormError(lang === 'sq' ? 'Ju lutem zgjidhni fushën ligjore.' : lang === 'sr' ? 'Molimo izaberite pravnu oblast.' : 'Please select a legal area.');
      return;
    }
    if (step === 3) {
      if (!contactData.fullName || !contactData.phone) {
        setFormError(lang === 'sq' ? 'Ju lutem plotësoni fushat e detyrueshme.' : lang === 'sr' ? 'Molimo popunite obavezna polja.' : 'Please fill in required fields.');
        return;
      }
    }
    setFormError('');
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setFormError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!privacyConsent) {
      setFormError(lang === 'sq' ? 'Duhet të pranoni rregullat e privatësisë.' : lang === 'sr' ? 'Morate prihvatiti pravila o privatnosti.' : 'You must accept the privacy policy.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const currentRegionInfo = regionalData[selectedRegion];

  return (
    <section id="intake-section" className={`relative py-24 px-6 md:px-12 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0c0c0e]/95 border-t border-white/5' : 'bg-[#f5f5f4] border-t border-zinc-200'}`}>
      
      {/* Decorative Ambient Glow */}
      <div className="ambient-glow bottom-0 left-10"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] uppercase tracking-wider font-bold mb-4 ${isDark ? 'border-accent/30 bg-accent/5 text-[#8b9287]' : 'border-accent/40 bg-accent/5 text-accent'}`}>
            <Award className="w-3.5 h-3.5" />
            <span>{t.tariffText}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
            {t.intakeHeader}
          </h2>
          <p className={`text-sm font-light leading-relaxed max-w-lg mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            {t.intakeSub}
          </p>
        </div>

        {/* Progress Bar Indicators */}
        <div className="flex items-center justify-between mb-8 max-w-xs mx-auto">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step === num 
                    ? 'bg-accent text-white scale-110 shadow-md shadow-accent/10' 
                    : step > num 
                      ? 'bg-primary text-primary-foreground' 
                      : (isDark ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-200 text-zinc-500')
                }`}
              >
                {num}
              </div>
              {num < 4 && (
                <div className={`w-10 sm:w-16 h-0.5 transition-all duration-300 ${step > num ? 'bg-primary' : (isDark ? 'bg-zinc-800' : 'bg-zinc-200')}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className={`premium-card border p-6 sm:p-10 overflow-hidden ${isDark ? 'border-zinc-800 bg-[#121214]' : 'border-zinc-200 bg-white shadow-xl'}`}>
          {submitted ? (
            /* Success Response State */
            <div className="text-center py-10 flex flex-col items-center animate-entrance">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 font-bold text-xl ${isDark ? 'bg-accent/10 text-accent' : 'bg-accent/10 text-accent'}`}>
                ✓
              </div>
              <h3 className={`text-2xl font-serif font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {t.btnSubmitted}
              </h3>
              <p className={`text-sm font-light leading-relaxed max-w-md mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {t.successMsg}
              </p>
              
              <div className={`p-4 border rounded-custom text-left max-w-sm w-full mb-8 text-xs leading-relaxed ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <p className="font-bold uppercase tracking-wider mb-2 font-mono text-[10px] text-accent">Matching Protocol Details:</p>
                <p><strong>Branch:</strong> Basic Court of {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Branch</p>
                <p><strong>Practice:</strong> {selectedPractice.toUpperCase()}</p>
                <p><strong>Authority Check:</strong> OAK Tariff compliance pre-validated</p>
              </div>

              <button 
                onClick={() => {
                  setStep(1);
                  setSelectedRegion('');
                  setSelectedPractice('');
                  setContactData({ fullName: '', phone: '', email: '', description: '' });
                  setPrivacyConsent(false);
                  setSubmitted(false);
                }}
                className="hover-scale px-6 py-2.5 rounded-custom text-[11px] font-bold uppercase tracking-widest bg-primary text-primary-foreground transition-all duration-300"
              >
                Match Another Case
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Error Alert */}
              {formError && (
                <div className="p-4 rounded-custom bg-red-500/10 border border-red-500/35 text-red-500 text-xs font-semibold">
                  ⚠️ {formError}
                </div>
              )}

              {/* STEP 1: REGION SELECTION (OAK BRANCHES) */}
              {step === 1 && (
                <div className="space-y-6 animate-entrance">
                  <div>
                    <h3 className={`text-lg font-serif font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{t.step1Title}</h3>
                    <p className={`text-xs font-light ${isDark ? 'text-zinc-450' : 'text-zinc-500'}`}>{t.step1Sub}</p>
                  </div>
                  
                  <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0">
                    {Object.keys(regionalData).map((regKey) => {
                      const active = selectedRegion === regKey;
                      return (
                        <button
                          key={regKey}
                          type="button"
                          onClick={() => {
                            setSelectedRegion(regKey);
                            setSelectedPractice('');
                            setFormError('');
                          }}
                          className={`hover-scale p-4 border text-left rounded-custom transition-all duration-300 flex flex-col justify-between aspect-video w-[260px] sm:w-auto shrink-0 snap-start snap-always ${
                            active 
                              ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                              : (isDark ? 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700' : 'border-zinc-200 bg-stone-50/50 hover:border-zinc-300')
                          }`}
                        >
                          <MapPin className={`w-4 h-4 mb-2 ${active ? 'text-accent' : 'text-zinc-400'}`} />
                          <div>
                            <p className={`text-sm font-bold ${active ? (isDark ? 'text-white' : 'text-[#1a1a1a]') : 'text-zinc-650 dark:text-zinc-300'}`}>
                              {regionalData[regKey].name[lang]}
                            </p>
                            <p className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase font-mono font-bold mt-1">
                              {regionalData[regKey].court[lang]}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile Swipe Indicators */}
                  <div className="flex sm:hidden items-center justify-between mt-2 text-[9px] uppercase font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 select-none">
                    <span>← {lang === 'sq' ? 'Rrëshqit' : lang === 'sr' ? 'Prevucite' : 'Swipe'}</span>
                    <div className="flex gap-1.5">
                      {Object.keys(regionalData).map((regKey) => (
                        <span 
                          key={regKey} 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            selectedRegion === regKey 
                              ? 'bg-accent scale-125' 
                              : 'bg-zinc-300 dark:bg-zinc-800'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{lang === 'sq' ? 'Rrëshqit' : lang === 'sr' ? 'Prevucite' : 'Swipe'} →</span>
                  </div>
                </div>
              )}

              {/* STEP 2: PRACTICE SPECIALTIES DYNAMIC FILTER */}
              {step === 2 && currentRegionInfo && (
                <div className="space-y-6 animate-entrance">
                  <div>
                    <h3 className={`text-lg font-serif font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{t.step2Title}</h3>
                    <p className={`text-xs font-light ${isDark ? 'text-zinc-450' : 'text-zinc-500'}`}>{t.step2Sub} ({currentRegionInfo.name[lang]})</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentRegionInfo.practices.map((practice) => {
                      const active = selectedPractice === practice.id;
                      return (
                        <button
                          key={practice.id}
                          type="button"
                          onClick={() => {
                            setSelectedPractice(practice.id);
                            setFormError('');
                          }}
                          className={`hover-scale p-5 border text-left rounded-custom transition-all duration-300 ${
                            active 
                              ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                              : (isDark ? 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700' : 'border-zinc-200 bg-stone-50/50 hover:border-zinc-300')
                          }`}
                        >
                          <p className={`text-sm font-bold ${active ? (isDark ? 'text-white' : 'text-[#1a1a1a]') : 'text-zinc-650 dark:text-zinc-300'}`}>
                            {practice[lang]}
                          </p>
                          <p className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase font-mono mt-2">
                            OAK Certified matching enabled
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT INFORMATION */}
              {step === 3 && (
                <div className="space-y-6 animate-entrance">
                  <div>
                    <h3 className={`text-lg font-serif font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{t.step3Title}</h3>
                    <p className={`text-xs font-light ${isDark ? 'text-zinc-450' : 'text-zinc-500'}`}>{t.step3Sub}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="fullName" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                        {t.labelFullName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={contactData.fullName}
                        onChange={(e) => setContactData({ ...contactData, fullName: e.target.value })}
                        className={`w-full text-sm px-4 py-3 rounded-custom border outline-none transition-all ${
                          isDark 
                            ? 'bg-zinc-900 border-zinc-800 text-white focus:border-accent' 
                            : 'bg-zinc-50 border-zinc-200 text-zinc-800 focus:border-accent'
                        }`}
                        placeholder={t.placeholderName}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                        {t.labelPhone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className={`w-full text-sm px-4 py-3 rounded-custom border outline-none transition-all ${
                          isDark 
                            ? 'bg-zinc-900 border-zinc-800 text-white focus:border-accent' 
                            : 'bg-zinc-50 border-zinc-200 text-zinc-800 focus:border-accent'
                        }`}
                        placeholder={t.placeholderPhone}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                        {t.labelEmail}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className={`w-full text-sm px-4 py-3 rounded-custom border outline-none transition-all ${
                          isDark 
                            ? 'bg-zinc-900 border-zinc-800 text-white focus:border-accent' 
                            : 'bg-zinc-50 border-zinc-200 text-zinc-800 focus:border-accent'
                        }`}
                        placeholder={t.placeholderEmail}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CASE DETAILS & LEGAL COMPLIANCE */}
              {step === 4 && (
                <div className="space-y-6 animate-entrance">
                  <div>
                    <h3 className={`text-lg font-serif font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{t.step4Title}</h3>
                    <p className={`text-xs font-light ${isDark ? 'text-zinc-450' : 'text-zinc-500'}`}>{t.step4Sub}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="description" className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                        {t.labelDesc}
                      </label>
                      <textarea
                        id="description"
                        rows="3"
                        value={contactData.description}
                        onChange={(e) => setContactData({ ...contactData, description: e.target.value })}
                        className={`w-full text-sm px-4 py-3 rounded-custom border outline-none transition-all ${
                          isDark 
                            ? 'bg-zinc-900 border-zinc-800 text-white focus:border-accent' 
                            : 'bg-zinc-50 border-zinc-200 text-zinc-800 focus:border-accent'
                        }`}
                        placeholder={t.placeholderDesc}
                      />
                    </div>

                    {/* Active Consent Checkbox (MUST NOT BE PRE-CHECKED) */}
                    <div className="flex items-start gap-3 p-3 border rounded-custom border-dashed border-zinc-200 dark:border-zinc-800 bg-stone-50/20">
                      <input
                        type="checkbox"
                        id="privacyConsent"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-1 cursor-pointer accent-accent"
                      />
                      <label htmlFor="privacyConsent" className="text-[11px] font-light leading-relaxed cursor-pointer text-zinc-650 dark:text-zinc-400">
                        {t.privacyLabel} <span className="text-red-500">*</span>
                      </label>
                    </div>

                    {/* Independent practice disclaimer */}
                    <div className="p-4 rounded-custom bg-accent/5 border border-accent/20 text-zinc-650 dark:text-zinc-450 text-[10px] leading-relaxed flex gap-2">
                      <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <p>{t.disclaimerText}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Navigation Bar */}
              <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className={`hover-scale flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-widest border rounded-custom transition-all ${
                      isDark ? 'border-zinc-800 hover:border-zinc-600 text-white' : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.btnBack}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="hover-scale flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-custom transition-all"
                  >
                    <span>{t.btnNext}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="hover-scale flex items-center gap-1.5 px-8 py-3 text-xs font-bold uppercase tracking-widest bg-accent text-white rounded-custom transition-all shadow-md shadow-accent/15"
                  >
                    <span>{t.btnSubmit}</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
