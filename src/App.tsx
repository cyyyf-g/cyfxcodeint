import React, { useState, useEffect } from 'react';
import {
  Layers3,
  Code,
  Terminal,
  ShieldAlert,
  Layers,
  Lock,
  Check,
  CheckCircle2,
  Copy,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  ArrowRight,
  School,
  Sparkles,
  Cpu
} from 'lucide-react';
import { SYSTEM_PHASES_INITIAL, SCHOOL_CASE_STUDY_PHASES } from './data';
import { SystemPhase } from './types';

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<'pipeline' | 'school'>('pipeline');
  const [activeStageId, setActiveStageId] = useState<string>('p1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string | null>(null);

  // Get current active list of phases based on active study
  const currentPhases = activeCaseStudy === 'pipeline' ? SYSTEM_PHASES_INITIAL : SCHOOL_CASE_STUDY_PHASES;

  // Sync active stage when changing case study
  useEffect(() => {
    setActiveStageId(currentPhases[0].id);
    setIsPlaying(false);
  }, [activeCaseStudy]);

  // Slideshow auto-advance effect safely using currentPhases
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStageId((current) => {
          const currentIndex = currentPhases.findIndex((p) => p.id === current);
          if (currentIndex === -1) return currentPhases[0].id;
          const nextIndex = (currentIndex + 1) % currentPhases.length;
          return currentPhases[nextIndex].id;
        });
      }, 8000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentPhases]);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => {
      setToastText(null);
    }, 2500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`Copied ${label} to clipboard!`);
  };

  const currentStageIndex = currentPhases.findIndex((p) => p.id === activeStageId);
  const activeStage = currentPhases[currentStageIndex === -1 ? 0 : currentStageIndex];

  const handleNext = () => {
    const nextIndex = (currentStageIndex + 1) % currentPhases.length;
    setActiveStageId(currentPhases[nextIndex].id);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    const prevIndex = (currentStageIndex - 1 + currentPhases.length) % currentPhases.length;
    setActiveStageId(currentPhases[prevIndex].id);
    setIsPlaying(false);
  };

  const getStageIcon = (iconName: string, sizeClass: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Layers3':
        return <Layers3 className={sizeClass} />;
      case 'Code':
        return <Code className={sizeClass} />;
      case 'Terminal':
        return <Terminal className={sizeClass} />;
      case 'ShieldAlert':
        return <ShieldAlert className={sizeClass} />;
      case 'Layers':
        return <Layers className={sizeClass} />;
      default:
        return <Layers3 className={sizeClass} />;
    }
  };

  return (
    <div id="app-container" className="min-h-screen bg-[#f8fafc] text-[#334155] antialiased font-sans flex flex-col justify-between selection:bg-[#cbd5e1]/40">
      
      {/* HEADER BAR */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f1f5f9] rounded-lg border border-[#e2e8f0] text-slate-800">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                PROVEN ENGINEERING INVARIANT
              </span>
              <h1 className="text-base font-black text-slate-900 tracking-tight mt-0.5">
                Deterministic Context Isolation Showcase
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto Play Indicator */}
            {isPlaying && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                isPlaying
                  ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-sm'
                  : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800 shadow-sm'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Slideshow</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto-Play Slides</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* TOAST SYSTEM */}
      {toastText && (
        <div id="system-toast" className="fixed bottom-6 right-6 bg-slate-950 text-white border border-slate-800 font-mono text-xs py-3.5 px-5 rounded-lg shadow-xl z-50 flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastText}</span>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1 flex flex-col gap-8">
        
        {/* HERO INTRO CARD WITH THE THESIS FOR RECRUITERS */}
        <section className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-xs">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9.5px] font-mono text-slate-600 uppercase font-black mb-3">
              Core Technical Thesis
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 mb-2.5 font-sans">
              Absolute Context Isolation &gt; Automation Loops
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
              Brittle, automated multi-agent scripts often mask system drift behind recursive loops. True engineering judgment requires human-driven context management. By manually steering specific model profiles, strictly partitioning chat windows, and forcing adversarial validation, we eliminate model laziness and confirmation bias entirely.
            </p>
          </div>
        </section>

        {/* STUDY SWITCHER TABS */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black">
            Select Presentation Model Case
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* TAB 1 */}
            <button
              onClick={() => {
                setActiveCaseStudy('pipeline');
                triggerToast('Switched to: Model Validation Pipeline');
              }}
              className={`p-5 rounded-xl border text-left transition-all duration-250 cursor-pointer ${
                activeCaseStudy === 'pipeline'
                  ? 'border-slate-900 bg-white ring-2 ring-slate-950/5 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Cpu className={`w-4 h-4 ${activeCaseStudy === 'pipeline' ? 'text-slate-900' : 'text-slate-400'}`} />
                <span className="text-xs font-mono font-bold text-slate-400">CASE STUDY A</span>
              </div>
              <h3 className="text-sm font-black text-slate-905 tracking-tight leading-tight">
                Model Validation Pipeline
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 font-sans leading-relaxed">
                Generic 5-stage secure execution matrix ensuring architectural trade-offs, schemas, logic, zero-praise hostile reviews, and handoff docs.
              </p>
            </button>

            {/* TAB 2 */}
            <button
              onClick={() => {
                setActiveCaseStudy('school');
                triggerToast('Switched to: School Management System');
              }}
              className={`p-5 rounded-xl border text-left transition-all duration-250 cursor-pointer ${
                activeCaseStudy === 'school'
                  ? 'border-slate-900 bg-white ring-2 ring-slate-950/5 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <School className={`w-4 h-4 ${activeCaseStudy === 'school' ? 'text-slate-900' : 'text-slate-400'}`} />
                <span className="text-xs font-mono font-bold text-slate-400">CASE STUDY B</span>
              </div>
              <h3 className="text-sm font-black text-slate-905 tracking-tight leading-tight">
                Exemplary Case Study: School Management Portal
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 font-sans leading-relaxed">
                Multi-Role (Admin, Teacher, Student) Portal demonstrating strict Row-Level Security (RLS) policies and transaction validation.
              </p>
            </button>
          </div>
        </div>

        {/* METRIC-FREE SEQUENTIAL TRACK (THE PIPELINE VIEW) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              Sequential Process Steps &middot; {activeCaseStudy === 'pipeline' ? 'Model Validation' : 'School Portal Isolation'}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-400">
                Stage {currentStageIndex + 1} of {currentPhases.length}
              </span>
            </div>
          </div>

          <div id="pipeline-nodes-track" className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {currentPhases.map((phase, idx) => {
              const isSelected = activeStageId === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    setActiveStageId(phase.id);
                    setIsPlaying(false);
                    triggerToast(`Viewing Stage 0${idx + 1}`);
                  }}
                  className={`border p-4 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-white ring-2 ring-slate-950/5'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-400 block mb-1">
                    STAGE 0{idx + 1}
                  </span>
                  <div className="text-xs font-bold text-slate-900 font-mono truncate">
                    {phase.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DOCK VIEW OF ACTIVE STAGE CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SECTION (5 Columns) - Stage Definition and Invariants */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* INVARIANT DEEP DATA */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 uppercase font-black">
                      STAGE 0{currentStageIndex + 1} SPECIFICATION
                    </span>
                    <h3 className="text-base font-bold text-slate-905 font-mono mt-2 tracking-tight">
                      {activeStage?.name.split(': ')[1] || activeStage?.name}
                    </h3>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-slate-800">
                    {activeStage && getStageIcon(activeStage.icon, 'w-5 h-5')}
                  </div>
                </div>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans mb-5">
                  {activeStage?.subtitle}
                </p>

                {/* BOUNDARY CONDITIONS METADATA */}
                <div className="space-y-3.5 text-xs font-mono">
                  <div className="bg-[#f8fafc] border border-slate-200 p-3 rounded-lg">
                    <span className="text-[8px] text-slate-400 block font-bold uppercase tracking-wider mb-1">
                      TARGET MODEL PROFILE
                    </span>
                    <span className="text-slate-800 font-bold block">
                      {activeStage?.model}
                    </span>
                  </div>

                  <div className="bg-[#f8fafc] border border-slate-200 p-3 rounded-lg">
                    <span className="text-[8px] text-slate-400 block font-bold uppercase tracking-wider mb-1">
                      CONTEXT ISOLATION STRATEGY
                    </span>
                    <p className="text-slate-705 font-sans font-medium text-xs leading-normal">
                      {activeStage?.role}
                    </p>
                  </div>

                  <div className="bg-[#f8fafc] border border-slate-200 p-3 rounded-lg">
                    <span className="text-[8px] text-slate-400 block font-bold uppercase tracking-wider mb-1">
                      CORE ENGINEERING INVARIANT
                    </span>
                    <p className="text-slate-650 font-sans italic text-xs leading-relaxed">
                      {activeStage?.details}
                    </p>
                  </div>
                </div>
              </div>

              {/* STAGE NAVIGATION CONTROLS */}
              <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-4 mt-6">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-650 font-mono text-[11px] flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                
                <span className="text-[10px] font-mono text-slate-400">
                  {currentStageIndex + 1} / {currentPhases.length}
                </span>

                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-650 font-mono text-[11px] flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION (7 Columns) - Strict Prompts & Verified Artifact Product */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* THE STRICT PROMPT USED */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black">
                    PROMPT INJECTED TO THIS SESSION
                  </span>
                  <button
                    onClick={() => copyToClipboard(activeStage?.promptUsed || '', 'Prompt')}
                    className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono text-slate-600 border border-slate-200 bg-slate-50 rounded hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Prompt</span>
                  </button>
                </div>
                
                <div className="bg-[#f8fafc] border border-slate-200 rounded-lg p-4 font-mono text-xs text-slate-705 leading-relaxed selection:bg-slate-200">
                  <span className="text-slate-400 block text-[9px] font-bold tracking-widest mb-1 select-none">
                    [PROMPT_USED &gt;]
                  </span>
                  <div className="whitespace-pre-line italic text-slate-755 font-medium">
                    {activeStage?.promptUsed}
                  </div>
                </div>
              </div>
            </div>

            {/* THE GENERATED VERIFIED ARTIFACT */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex-1 flex flex-col justify-between animate-fade-in">
              <div className="p-6">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block font-bold tracking-widest uppercase">
                      STATE CONTROLLED DELIVERABLE ARTIFACT
                    </span>
                    <span className="text-xs font-black text-slate-800 font-mono block">
                      {activeStage?.artifactTitle}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(activeStage?.artifactDoc || '', 'Artifact')}
                    className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono text-slate-600 border border-slate-200 bg-slate-50 rounded hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Artifact</span>
                  </button>
                </div>

                {/* THE RAW CONTENT OUTPUT SCROLL-FIELD */}
                <div className="bg-slate-900 border border-slate-950 p-4 rounded-lg font-mono text-[11.5px] text-slate-200 leading-relaxed max-h-80 overflow-y-auto select-all shadow-inner">
                  <pre className="whitespace-pre text-wrap sm:text-nowrap select-text">
                    {activeStage?.artifactDoc}
                  </pre>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="bg-slate-50 border-t border-[#e2e8f0] px-6 py-3 flex text-[10.5px] items-center justify-between text-slate-650 font-mono">
                <span>Verified Invariant Correctness</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Checked Safe
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* SPECIFIC RECRUITER HOOK BY SELECTED ACTIVE CASE STUDY */}
        {activeCaseStudy === 'pipeline' ? (
          <section className="bg-slate-900 text-white rounded-xl p-8 relative overflow-hidden shadow-md mt-4">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-750 rounded text-[9px] font-mono uppercase font-black mb-4">
                💡 THE STRATEGIC INTERVIEWER HOOK
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white mb-3 font-sans">
                Why I Do This Manually
              </h3>
              <p className="text-xs sm:text-[14px] text-slate-200 leading-relaxed font-sans font-medium">
                "Anyone can run an API script that burns tokens to write bugs faster. The real skill is knowing when to slow down. By manually managing context windows, I act as the ultimate runtime guardrail. I ensure that the models work for the architecture, rather than the architecture falling victim to model hallucination."
              </p>
            </div>
          </section>
        ) : (
          <section className="bg-slate-900 text-white rounded-xl p-8 relative overflow-hidden shadow-md mt-4 border border-slate-700/50">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-900 rounded text-[9px] font-mono uppercase font-black mb-4">
                🎓 THE SCHOLASTIC RECRUITER HOOK
              </span>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-3 font-sans">
                Why this concrete workflow matters
              </h3>
              <p className="text-xs sm:text-[14px] text-slate-200 leading-relaxed font-sans font-medium">
                "When dealing with real-world applications like a school management system, a simple AI hallucination inside an authorization script could accidentally expose private student data or allow privilege escalation. By treating every step—from the initial RBAC schema setup to the independent adversarial audit—as an isolated, manual context sandbox, the system is designed defensively against bugs before deployment ever happens."
              </p>
            </div>
          </section>
        )}

      </main>

      {/* COMPACT CLEAN FOOTER */}
      <footer className="bg-white border-t border-[#e2e8f0] py-6 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[11px] font-mono text-slate-400">
            Context Isolation Showcase &copy; {new Date().getFullYear()} &middot; Designed with Architectural Discipline &middot; Built purely in React
          </p>
        </div>
      </footer>

    </div>
  );
}
