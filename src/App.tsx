import React, { useState, useEffect } from 'react';
import {
  Layers3,
  Code,
  Terminal,
  ShieldAlert,
  Layers,
  Play,
  CheckCircle,
  RefreshCw,
  Sparkles,
  Server,
  HelpCircle,
  HardDrive,
  Cpu,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  User,
  ExternalLink
} from 'lucide-react';
import { SYSTEM_PHASES_INITIAL, ADR_PROFILES, AUDIT_POSTURES, METHODOLOGY_DIF } from './data';
import { SystemPhase } from './types';

// Simple interactive graph rendering to capture the State Decay comparison visually
const CHART_DATA = [
  { step: 'Brief', chat: 100, artifact: 100 },
  { step: 'Spec', chat: 82, artifact: 100 },
  { step: 'Code', chat: 55, artifact: 98 },
  { step: 'Test', chat: 34, artifact: 98 },
  { step: 'Audit', chat: 18, artifact: 95 },
  { step: 'Deploy', chat: 7, artifact: 95 }
];

export default function App() {
  // Simulator states
  const [phases, setPhases] = useState<SystemPhase[]>(SYSTEM_PHASES_INITIAL);
  const [activeStepId, setActiveStepId] = useState<string>('p1');
  const [isRunningSim, setIsRunningSim] = useState<boolean>(false);
  const [simMessage, setSimMessage] = useState<string>('System Idle. Click "Run Pipeline Simulation" to begin automated verification.');
  const [simProgress, setSimProgress] = useState<number>(0);
  
  // Custom Playground States
  const [selectedAdrOption, setSelectedAdrOption] = useState<string>('modular');
  const [activeAuditPosture, setActiveAuditPosture] = useState<string>('strict');
  const [playgroundProjectName, setPlaygroundProjectName] = useState<string>('');
  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [customApiPrefix, setCustomApiPrefix] = useState<string>('/api/v1');
  const [customMaxTimeout, setCustomMaxTimeout] = useState<number>(300);
  const [isTestHarnessExecuting, setIsTestHarnessExecuting] = useState<boolean>(false);
  const [testHarnessProgress, setTestHarnessProgress] = useState<number>(0);
  const [testCompletedLogs, setTestCompletedLogs] = useState<string[]>([]);
  
  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getPhaseIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Layers3': return <Layers3 className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Terminal': return <Terminal className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Layers': return <Layers className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  const currentPhase = phases.find(p => p.id === activeStepId) || phases[0];

  // Pipeline execution simulation
  const runPipelineSimulation = async () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setSimProgress(0);

    // Set all phases to pending
    setPhases(prev => prev.map(p => ({ ...p, status: 'idle' })));

    const stepIntervals = [
      { id: 'p1', msg: 'Formulating Immutable Architecture Spec Decisions...', duration: 1800 },
      { id: 'p2', msg: 'Synthesizing precision types & schema components inside sandbox boundaries...', duration: 2200 },
      { id: 'p3', msg: 'Initiating isolated build typechecks, compilation, & telemetry logging...', duration: 2000 },
      { id: 'p4', msg: 'Adversarial Auditor reviewing compiler outputs & type violations...', duration: 2500 },
      { id: 'p5', msg: 'Validating cryptographic safety signatures. Safe deployment approved!', duration: 1500 }
    ];

    let currentStepIdx = 0;

    const executeStep = () => {
      if (currentStepIdx >= stepIntervals.length) {
        setIsRunningSim(false);
        setSimProgress(100);
        setSimMessage('✅ Deterministic build cycle fully verified & delivered! Open interactive tabs above for deep audits.');
        triggerToast('Orchestration pipeline cycle complete and deployment delivered.');
        return;
      }

      const step = stepIntervals[currentStepIdx];
      setActiveStepId(step.id);
      setSimMessage(`[Phase 0${currentStepIdx + 1}] — ${step.msg}`);
      setSimProgress(((currentStepIdx + 1) / stepIntervals.length) * 100);

      // Set current phase to running
      setPhases(prev => prev.map(p => {
        if (p.id === step.id) return { ...p, status: 'running' };
        if (p.id === stepIntervals[currentStepIdx - 1]?.id) return { ...p, status: 'success' };
        return p;
      }));

      setTimeout(() => {
        setPhases(prev => prev.map(p => {
          if (p.id === step.id) return { ...p, status: 'success' };
          return p;
        }));
        currentStepIdx++;
        executeStep();
      }, step.duration);
    };

    executeStep();
  };

  const runTestHarnessVerification = () => {
    if (isTestHarnessExecuting) return;
    setIsTestHarnessExecuting(true);
    setTestHarnessProgress(0);
    setTestCompletedLogs([`$ npm run lint && tsc --noEmit`]);

    const logOutputs = [
      `[INFO] Ingesting schema types & environment variables...`,
      `[INFO] Scanning for ADR-001 boundary alignments: API prefix [${customApiPrefix}], maximum timeout [${customMaxTimeout}ms].`,
      `[SUCCESS] Zero illegal file-sharing operations or context escapes identified.`,
      `[SUCCESS] TypeScript compiler type signature integrity confirmed.`,
      `[SUCCESS] 0 linter errors inside source repository.`,
      `[SUCCESS] All unit test cases successfully passed. Coverage: 98.4%.`,
      `[INFO] Writing comprehensive runtime test suite report: /logs/test-harness-output.log`
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx >= logOutputs.length) {
        clearInterval(interval);
        setIsTestHarnessExecuting(false);
        setTestHarnessProgress(100);
        triggerToast('Test suite compiled successfully in 1.4s!');
        return;
      }

      setTestCompletedLogs(prev => [...prev, logOutputs[currentLogIdx]]);
      setTestHarnessProgress(Math.min(((currentLogIdx + 1) / logOutputs.length) * 100, 100));
      currentLogIdx++;
    }, 450);
  };

  const handleCreatePitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundProjectName.trim()) {
      triggerToast('Please type a descriptive system name');
      return;
    }

    const adrModeLabel = ADR_PROFILES[selectedAdrOption].title.split(':')[0];
    const auditStatusLabel = AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.name || 'Auditor';

    setGeneratedPitch(
      `For your proposed project "${playgroundProjectName}", our Artifact-Centric AI pipeline applies rigorous safeguards:
      
1. INITIAL SPECIFICATION: Instead of jumping directly into development, we generate an immutable state contract (ADR-001.md) focusing on custom parameters: Max Timeout of ${customMaxTimeout}ms and API Root configured to "${customApiPrefix}". This ensures AI stays within clear boundaries.

2. ENFORCED SCAFFOLD: The Feature Coder writes code under strict constraints, verifying state structures and payload signatures directly in the active build environment.

3. LOG-DRIVEN VERIFICATION: The automated sandbox runs isolated live tests, outputting real telemetry so the system is evaluated through dry execution statistics rather than model guesswork.

4. COLLABORATIVE AUDIT: The adversarial review panel acts as the final gate, applying the "${auditStatusLabel}" posture checks prior to release approval.

Result: You get a reliable, high-performance web structure with zero regression loops or context rot.`
    );
    triggerToast('Pipeline architecture strategy formulated!');
  };

  // Pre-generate a pitch based on common examples if empty
  useEffect(() => {
    if (!playgroundProjectName) {
      setPlaygroundProjectName('Smart Bank Transaction Analyzer');
    }
  }, []);

  useEffect(() => {
    if (playgroundProjectName) {
      // Auto-update summary text
      const name = playgroundProjectName.trim() || 'Custom Microservices';
      setGeneratedPitch(
        `For your proposed system "${name}", our Artifact-Centric AI pipeline applies rigorous safeguards:

1. INITIAL SPECIFICATION: Instead of jumping directly into development, we generate an immutable states contract (ADR-001.md using ${selectedAdrOption.toUpperCase()}_MODE) configuring the absolute API endpoints to "${customApiPrefix}" and maximum timeout bounds to ${customMaxTimeout}ms.

2. ISOLATED SCAFFOLD: The codebase is developed within a strictly typecheck-gated environment. Untrusted modifications are completely disabled.

3. DETERMINE LABS VERIFICATION: Run commands invoke a live typescript compiler that validates implementation files against type contracts.

4. ADVERSARIAL DISCIPLINE: The Adversarial reviewer conducts checking routines using the "${AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.name}" perspective, generating security clearances.`
      );
    }
  }, [playgroundProjectName, selectedAdrOption, activeAuditPosture, customApiPrefix, customMaxTimeout]);

  return (
    <div id="app-container" className="min-h-screen bg-[#070a13] text-[#abc4db] antialiased selection:bg-[#00d4ff]/20 selection:text-white font-sans relative">
      
      {/* Background with solid color for maximum reading comfort */}
      <div className="absolute inset-0 bg-[#070a13] pointer-events-none z-0" />

      {/* Toast Alert */}
      {toastMessage && (
        <div id="system-toast" className="fixed bottom-6 right-6 bg-[#0f192b] border-2 border-[#00d4ff]/50 text-white font-mono text-xs py-3 px-5 rounded-lg shadow-xl shadow-black/80 z-50 flex items-center gap-3 animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-6 py-12 relative z-10">
        
        {/* HERO BLOCK */}
        <div className="mb-14" id="hero-block">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Artifact-Centric <br />
              <span className="text-[#00d4ff]">
                AI Orchestration
              </span>
            </h1>
            <p className="text-base text-[#7c97b5] font-dm max-w-2xl leading-relaxed">
              Why rely on sequence-dependent, brittle chat models that forget context and produce erratic logic? 
              This interactive dashboard showcases a zero-touch pipeline that keeps AI structured using immutable design contracts, dynamic code testing loops, and a hostile auditor gate.
            </p>
          </div>
        </div>

        {/* ACTIVE RUNNING STATUS BAR BANNER */}
        <div id="sim-status-banner" className="mb-12 bg-[#0a101f] border border-[#182745] rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex-1">
            <div className="text-xs font-mono font-medium text-white break-all" id="sim-message-text">
              {simMessage}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="btn-trigger-sim"
              onClick={runPipelineSimulation}
              disabled={isRunningSim}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 border shadow-lg ${
                isRunningSim
                  ? 'bg-[#18112e] text-[#7b61ff] border-[#7b61ff]/30 cursor-not-allowed'
                  : 'bg-white hover:bg-neutral-100 text-[#070a13] border-white hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
              }`}
            >
              {isRunningSim ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Cycle ({Math.round(simProgress)}%)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Pipeline Simulation</span>
                </>
              )}
            </button>
            
            <button
              id="btn-reset"
              onClick={() => {
                setPhases(SYSTEM_PHASES_INITIAL);
                setActiveStepId('p1');
                setSimProgress(0);
                setSimMessage('System Idle. Click "Run Pipeline Simulation" to begin automated verification.');
                triggerToast('Simulation workflow reset successfully');
              }}
              className="px-3 py-2 rounded-lg border border-[#141f35] text-xs font-mono hover:bg-[#0c1221] hover:text-white transition-colors cursor-pointer"
              title="Reset state to initial idle values"
            >
              Reset
            </button>
          </div>
          {isRunningSim && (
            <div className="w-full md:w-32 bg-[#10192e] rounded-full h-1.5 overflow-hidden border border-[#1b2b4c]">
              <div 
                className="bg-[#00d4ff] h-full transition-all duration-300"
                style={{ width: `${simProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* INTERACTIVE TRACK NODES (THE TIMELINE) */}
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#5c7087] mb-4 flex items-center gap-2">
          <span>01 // Active Session Pipeline Track</span>
          <span className="flex-1 h-[1px] bg-[#141f35]" />
        </p>

        <div id="pipeline-nodes-track" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {phases.map((phase, idx) => {
            const isActive = activeStepId === phase.id;
            const isCompleted = phase.status === 'success';
            const isRunning = phase.status === 'running';

            let statusBorderColor = 'border-[#141f35]';
            let bgGlow = 'bg-transparent';
            if (isActive) {
              statusBorderColor = 'border-[#7b61ff] shadow-lg shadow-[#7b61ff]/10';
              bgGlow = 'bg-[#7b61ff]/5';
            } else if (isCompleted) {
              statusBorderColor = 'border-[#00ff9d]/30';
              bgGlow = 'bg-[#00ff9d]/2';
            } else if (isRunning) {
              statusBorderColor = 'border-[#ff6b35]/60';
              bgGlow = 'bg-[#ff6b35]/5';
            }

            return (
              <button
                key={phase.id}
                id={`track-node-${phase.id}`}
                onClick={() => {
                  setActiveStepId(phase.id);
                  triggerToast(`Selected Stage ${phase.name}`);
                }}
                className={`flex flex-col items-start text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${statusBorderColor} ${bgGlow} hover:scale-[1.01]`}
              >
                <div className="w-full flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-[#5c7087] font-bold">
                    STEP 0{idx + 1}
                  </span>
                  
                  {/* Status Indicator pill */}
                  <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${
                    isCompleted
                      ? 'bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30'
                      : isRunning
                      ? 'bg-[#ff6633]/15 text-[#ff6633] border border-[#ff6633]/30 animate-pulse'
                      : isActive
                      ? 'bg-[#7b61ff]/12 text-[#9a85ff] border border-[#7b61ff]/30'
                      : 'bg-neutral-900 text-neutral-500'
                  }`}>
                    {phase.status === 'idle' && !isActive ? 'idle' : phase.status}
                    {isActive && phase.status === 'idle' && 'focused'}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`${
                    isActive 
                      ? 'text-[#7b61ff]' 
                      : isCompleted 
                      ? 'text-[#00ff9d]' 
                      : 'text-[#5c7087]'
                  }`}>
                    {getPhaseIcon(phase.icon, 'w-4 h-4')}
                  </span>
                  <span className="font-mono text-xs font-bold text-white tracking-wide">
                    {phase.name}
                  </span>
                </div>

                <p className="text-[10px] text-[#5c7087] truncate w-full" title={phase.title}>
                  {phase.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* WORKSPACE GRID: PHASE DETAILS + INTERACTIVE PLAYGROUND COMPONENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16" id="workspace-grid">
          
          {/* LEFT PANEL: Selected Phase Specs (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="left-workspace-panel">
            
            <div className="bg-[#0a101f] border border-[#141f35] rounded-xl p-6 relative overflow-hidden flex-1 shadow-lg">
              
              {/* Highlight bar depending on selected index with solid color */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7b61ff]" />
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[11px] font-mono text-[#00d4ff] font-bold tracking-widest uppercase">
                    Stage Description
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {currentPhase.title}
                  </h3>
                </div>
                <div className="p-2.5 bg-[#101b33] text-[#00d4ff] rounded-lg">
                  {getPhaseIcon(currentPhase.icon, 'w-6 h-6')}
                </div>
              </div>

              <div className="text-xs text-[#738da7] font-dm leading-relaxed mb-6">
                {currentPhase.subtitle}
              </div>

              {/* Sub-Blocks */}
              <div className="space-y-4 font-mono text-xs" id="phase-metadata-group">
                <div className="bg-[#050810] border border-[#121c32] p-4 rounded-lg">
                  <div className="text-[#5c7087] uppercase text-[9px] mb-1 font-bold tracking-wider">
                    Model Workspace Boundary
                  </div>
                  <div className="text-white font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7b61ff]" />
                    {currentPhase.model}
                  </div>
                </div>

                <div className="bg-[#050810] border border-[#121c32] p-4 rounded-lg">
                  <div className="text-[#5c7087] uppercase text-[9px] mb-1 font-bold tracking-wider">
                    Operational Core Role
                  </div>
                  <p className="text-[#a1b8ce] leading-relaxed font-sans text-xs">
                    {currentPhase.role}
                  </p>
                </div>

                <div className="bg-[#050810] border border-[#121c32] p-4 rounded-lg">
                  <div className="text-[#5c7087] uppercase text-[9px] mb-1 font-bold tracking-wider">
                    Execution Details
                  </div>
                  <p className="text-[#7c97b5] font-sans text-xs">
                    {currentPhase.details}
                  </p>
                </div>
              </div>

            </div>



          </div>

          {/* RIGHT PANEL: Interactive State Playground (7 Cols) */}
          <div className="lg:col-span-7" id="right-workspace-panel">
            
            <div className="bg-[#090f1e] border-2 border-[#1a2948] rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
              
              {/* Header Tab */}
              <div className="bg-[#0c162b] border-b border-[#142340] px-6 py-4 flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-[#10203d] px-2 py-1 text-[#00d4ff] rounded font-mono font-bold">
                    {currentPhase.code}
                  </code>
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Playground Widget
                  </span>
                </div>
                

              </div>

              {/* Dynamic Content depending on currently active Step Index */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-6" id="playground-dynamic-content">
                
                {/* DYNAMIC VIEW FOR PHASE 01: SPEC */}
                {currentPhase.id === 'p1' && (
                  <div className="space-y-5 animate-fade-in" id="panel-interact-p1">
                    <div className="mb-2">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#7b61ff]" />
                        Architectural Specification Customizer
                      </h4>
                      <p className="text-xs text-[#5c7087] mt-1 font-sans">
                        Toggle high-integrity options below. Watch the immutable markdown specification adapt immediately to the decision.
                      </p>
                    </div>

                    {/* SELECTOR TOGGLES */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {Object.keys(ADR_PROFILES).map((key) => {
                        const profile = ADR_PROFILES[key];
                        const isSelected = selectedAdrOption === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setSelectedAdrOption(key);
                              triggerToast(`Switched ADR configuration to: ${key.toUpperCase()}`);
                            }}
                            className={`p-3 text-left rounded-lg border text-xs transition-all ${
                              isSelected
                                ? 'bg-[#7b61ff]/10 border-[#7b61ff]/70 text-white'
                                : 'bg-[#060912] border-[#131d33] hover:border-neutral-700 text-[#5c7087]'
                            }`}
                          >
                            <div className="font-bold mb-1 uppercase tracking-wide">
                              {key} Profile
                            </div>
                            <div className="text-[9px] line-clamp-2 leading-normal">
                              {profile.description}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* LIVE SPEC PREVIEW BOX */}
                    <div className="bg-[#05070e] border border-[#14213d] rounded-lg p-4 font-mono">
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#14213d]/60">
                        <span className="text-[10px] tracking-wider text-[#5c7087] font-bold">
                          GENERATED STATE FILE: ADR-001.md
                        </span>
                        <span className="text-[9px] text-[#00ff9d] bg-[#00ff9d]/5 px-1.5 py-0.5 rounded uppercase tracking-wide">
                          SPEC BOUND ACQUIRED
                        </span>
                      </div>
                      <pre className="text-[11px] text-[#abc4db] overflow-x-auto max-h-48 whitespace-pre-wrap leading-relaxed">
                        {ADR_PROFILES[selectedAdrOption].doc}
                      </pre>
                    </div>

                    <div className="text-[10px] font-mono text-[#5c7087] italic">
                      💡 Spec File serves as an engineering anchor, preventing next-stage LLMs from sliding or introducing security drift.
                    </div>
                  </div>
                )}


                {/* DYNAMIC VIEW FOR PHASE 02: BUILD */}
                {currentPhase.id === 'p2' && (
                  <div className="space-y-4 animate-fade-in" id="panel-interact-p2">
                    <div className="mb-2">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <Code className="w-4 h-4 text-[#00ff9d]" />
                        Interface Parameter Controller
                      </h4>
                      <p className="text-xs text-[#5c7087] mt-1 font-sans">
                        Let's simulate editing the schema properties. Adjusting the API endpoint constraints propagates safely down the testing cycle.
                      </p>
                    </div>

                    {/* EDITABLE FIELDS PANEL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#050811] p-4 rounded-lg border border-[#121c32]">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-[#5c7087] mb-2 font-bold">
                          Target API Route Prefix:
                        </label>
                        <input
                          type="text"
                          value={customApiPrefix}
                          onChange={(e) => setCustomApiPrefix(e.target.value)}
                          className="w-full bg-[#0a1122] border border-[#1c2c49] rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#00d4ff]"
                          placeholder="/api/v1"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-[#5c7087] mb-2 font-bold">
                          Absolute Maximum Host Timeout (ms):
                        </label>
                        <input
                          type="number"
                          value={customMaxTimeout}
                          step="10"
                          min="10"
                          max="5000"
                          onChange={(e) => setCustomMaxTimeout(Number(e.target.value))}
                          className="w-full bg-[#0a1122] border border-[#1c2c49] rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#00d4ff]"
                        />
                      </div>
                    </div>

                    {/* LIVE SCALABLE CODE BLOCK */}
                    <div className="bg-[#05070e] border border-[#14213d] rounded-lg p-4 font-mono">
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#14213d]/60">
                        <span className="text-[10px] tracking-wider text-[#5c7087] font-bold">
                          INTEGRATION PAYLOAD BINDING: src/payload.ts
                        </span>
                        <span className="text-[9px] text-[#7b61ff] bg-[#7b61ff]/10 px-1.5 py-0.5 rounded font-bold">
                          TYPES_DECLARED
                        </span>
                      </div>
                      <pre className="text-[11px] text-[#00ff9d] overflow-x-auto whitespace-pre-wrap leading-relaxed">
{`export interface PipelinePayload {
  apiPrefix: "${customApiPrefix}";
  timeoutLimit: ${customMaxTimeout}; // custom enforcement
  timestamp: number;
  cryptographicSignature: string; /* verified by adversarial phase */
}`}
                      </pre>
                    </div>

                    <p className="text-[10px] font-mono text-[#5c7087]">
                      Observe how the parameters you edit stay safely captured in the payload code interfaces!
                    </p>
                  </div>
                )}


                {/* DYNAMIC VIEW FOR PHASE 03: TEST */}
                {currentPhase.id === 'p3' && (
                  <div className="space-y-4 animate-fade-in" id="panel-interact-p3">
                    <div className="mb-2">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#ff6b35]" />
                        Isolated Test Harness Compile Sandbox
                      </h4>
                      <p className="text-xs text-[#5c7087] mt-1 font-sans">
                        Press the compile testing button below to execute automated validations in an environment completely segregated from LLM hallucination.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={runTestHarnessVerification}
                        disabled={isTestHarnessExecuting}
                        className={`px-4 py-2.5 rounded text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                          isTestHarnessExecuting
                            ? 'bg-[#1a110e] text-[#ff6b35] border border-[#ff6b35]/30 cursor-not-allowed'
                            : 'bg-[#ff6b35] text-[#070a13] hover:bg-[#ff8052] font-semibold active:scale-[0.98]'
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        {isTestHarnessExecuting ? 'Running Sandbox Checks...' : 'Execute Compile & Test Suite'}
                      </button>

                      {isTestHarnessExecuting && (
                        <div className="flex-1 bg-[#10192e] rounded-full h-1.5 overflow-hidden border border-[#1b2b4c]">
                          <div 
                            className="bg-[#ff6b35] h-full transition-all duration-300"
                            style={{ width: `${testHarnessProgress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* TERMINAL STATUS CODEBOARD */}
                    <div className="bg-[#03050a] border border-[#15233c] rounded-lg p-4 font-mono text-left">
                      <div className="flex items-center justify-between shadow pb-1.5 border-b border-[#14213d]/50 mb-2">
                        <span className="text-[10px] text-[#5c7087] font-bold">
                          SANDBOX LOG TERMINAL (LOCAL ENGINE)
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      </div>
                      
                      <div className="space-y-1.5 text-xs select-all text-neutral-300 max-h-40 overflow-y-auto">
                        {testCompletedLogs.length === 0 ? (
                          <div className="text-neutral-500 italic py-2">
                            No logs present. Run the compilation tests using the trigger button.
                          </div>
                        ) : (
                          testCompletedLogs.map((log, idx) => {
                            let color = 'text-[#abc4db]';
                            if (log.startsWith('[SUCCESS]')) color = 'text-[#00ff9d]';
                            if (log.startsWith('[INFO]')) color = 'text-[#00d4ff]';
                            if (log.startsWith('$')) color = 'text-white font-bold';

                            return (
                              <div key={idx} className={color}>
                                {log}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                )}


                {/* DYNAMIC VIEW FOR PHASE 04: AUDIT */}
                {currentPhase.id === 'p4' && (
                  <div className="space-y-4 animate-fade-in" id="panel-interact-p4">
                    <div className="mb-2">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-[#ff61d1]" />
                        Adversarial Auditor Custom Postures
                      </h4>
                      <p className="text-xs text-[#5c7087] mt-1 font-sans">
                        Rather than checking basic styling, this reviewer compares code outputs against the specifications to reject non-compliant blocks. Toggle postures below to view changes.
                      </p>
                    </div>

                    {/* SELECT POSTURE */}
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      {AUDIT_POSTURES.map((posture) => {
                        const isSel = activeAuditPosture === posture.id;
                        return (
                          <button
                            key={posture.id}
                            onClick={() => {
                              setActiveAuditPosture(posture.id);
                              triggerToast(`Auditor profile set to: ${posture.name}`);
                            }}
                            className={`flex-1 p-3 text-left border rounded-lg transition-all ${
                              isSel
                                ? 'bg-[#ff61d1]/8 border-[#ff61d1]/80 text-white'
                                : 'bg-[#060912] border-[#131d33] hover:border-neutral-700 text-[#5c7087]'
                            }`}
                          >
                            <div className="font-bold text-xs mb-0.5">{posture.name}</div>
                            <div className="text-[10px] text-[#5c7087] line-clamp-1">{posture.title}</div>
                          </button>
                        );
                      })}
                    </div>

                    {/* LIVE AUDIT VERDICT PREVIEW */}
                    <div className="bg-[#05070e] border border-[#14213d] rounded-lg p-4 font-mono">
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#14213d]/60">
                        <span className="text-[10px] tracking-wider text-[#5c7087] font-bold">
                          CRITICAL AUDIT EXPUT: VERDICT ANALYSIS
                        </span>
                        
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.verdict === 'VERIFIED_SAFE'
                            ? 'bg-[#00ff9d]/10 text-[#00ff9d]'
                            : AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.verdict === 'WARNINGS_PRESENT'
                            ? 'bg-[#ffbd2e]/10 text-[#ffbd2e]'
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.verdict}
                        </span>
                      </div>
                      
                      <pre className="text-[11px] font-dm text-[#abbfcb] whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
                        {AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.response}
                      </pre>
                    </div>
                  </div>
                )}


                {/* DYNAMIC VIEW FOR PHASE 05: DEPLOY */}
                {currentPhase.id === 'p5' && (
                  <div className="space-y-4 animate-fade-in" id="panel-interact-p5">
                    <div className="mb-2">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#ffc83b]" />
                        Continuous Safe Delivery verification
                      </h4>
                      <p className="text-xs text-[#5c7087] mt-1 font-sans">
                        Continuous Delivery is gated by the token signature generated in step 4. Toggle settings to observe security blockages.
                      </p>
                    </div>

                    {/* GATE CONDITIONAL VERIFIER */}
                    <div className="p-4 bg-[#0a1426] border border-[#14284d] rounded-xl font-mono text-xs text-left">
                      <div className="flex items-center gap-2 text-white mb-3">
                        <Server className="w-4 h-4 text-[#00ff9d]" />
                        <span className="font-bold">CD GATE KEEPER ANALYSIS:</span>
                      </div>

                      {AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.verdict === 'VERIFIED_SAFE' ? (
                        <div className="space-y-3">
                          <div className="text-[#00ff9d] bg-[#00ff9d]/5 p-2 rounded border border-[#00ff9d]/20 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00ff9d]" />
                            <span>Security signature verified. Deploy Token: verified_tok_adv_aud_674512</span>
                          </div>
                          
                          <div className="text-[#5c7087] text-[11px] leading-relaxed">
                            Continuous Delivery routes successfully verified live binaries to production servers under VERCEL_MCP_NODE protocols.
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="text-red-400 bg-red-400/5 p-2 border border-red-500/20 rounded flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <span>RELEASE DENIED: Critical verification token is missing or has warning flags!</span>
                          </div>
                          
                          <div className="text-[#5c7087] text-[11px] leading-relaxed">
                            To fix this, go back to Step 4 (Audit Phase) and switch the posture setting to "**Skeptical Hacker / Auditor**" which clears code warnings.
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#05070e] border border-[#14213d] rounded-lg p-4 font-mono">
                      <div className="text-[10px] tracking-wider text-[#5c7087] font-bold pb-1.5 border-b border-[#14213d]/60 mb-2">
                        DEPLOY CONFIG REGISTRY OUTPUT
                      </div>
                      <pre className="text-[11px] text-[#738da7]">
{`DEPLOY_REGISTRY: "VERCEL_MCP_SERVICE_MESH_GATEWAY"
ACTIVE_SUITE_STATUS: ${AUDIT_POSTURES.find(a => a.id === activeAuditPosture)?.verdict === 'VERIFIED_SAFE' ? '"RELEASED_SUCCESS"' : '"BLOCKED_COMPLIANCE"'}
TIMESTAMP: ${new Date().toISOString()}`}
                      </pre>
                    </div>
                  </div>
                )}


                {/* COMMON BOTTOM BLOCK: RE-RUN BUTTON FOR PHASE */}
                <div className="pt-4 border-t border-[#12203d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d162d]/50 -mx-6 -mb-6 px-6 py-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#5c7087] block uppercase font-bold">
                      Current Target Resource File
                    </span>
                    <span className="text-xs text-white font-mono break-all font-semibold">
                      {currentPhase.artifactTitle}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      triggerToast(`Refuel and parsed current stage: ${currentPhase.name}`);
                    }}
                    className="px-3.5 py-2 hover:bg-[#142340] border border-[#17294b] rounded text-xs text-center text-[#00d4ff] font-mono transition-colors active:scale-[0.98]"
                  >
                    View Ingest Logs
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>





      </div>
    </div>
  );
}
