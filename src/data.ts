import { SystemPhase, ADRApproach, AuditPosture } from './types';

export const SYSTEM_PHASES_INITIAL: SystemPhase[] = [
  {
    id: 'p1',
    name: '01_SPEC',
    code: 'SYS_DSN',
    title: 'Architecture & Invariant Spec',
    subtitle: 'Generate explicit system state contracts before drafting any code',
    icon: 'Layers3',
    status: 'idle',
    model: 'Claude 3.7 (Extended Thinking Edition)',
    role: 'Analyzes three diverse architectural patterns alongside failure states and edge constraints, locking decisions into a formal markdown document.',
    artifactTitle: 'Architecture Decision Record Template',
    artifactDoc: '# ADR-001: Architecture Specification\nSTATUS: APPROVED\n\n## 1. System Context\nEstablishing high-performance reactive pipelines utilizing state contracts.\n\n## 2. Structural Invariants\n* Core operations must use immutable State records.\n* API boundaries MUST check payload contracts.\n* No shared-memory mutations are permitted.',
    details: 'This phase decouples human intent from premature coding. The system is evaluated for performance, scalability, and security bottlenecks prior to writing logic.',
    promptUsed: 'You are a senior systems architect. Before producing code, evaluate exactly 3 alternative architectural layouts with distinct trade-offs: (1) Minimalist, (2) Scalable, and (3) Experimental. Freeze boundaries into a rigid, immutable ADR-001.md declaration.'
  },
  {
    id: 'p2',
    name: '02_BUILD',
    code: 'GEN_BLD',
    title: 'Precision Implementation Loop',
    subtitle: 'Synthesize code inside rigid state schema boundaries',
    icon: 'Code',
    status: 'idle',
    model: 'Claude 3.5 Sonnet / Gemini 2.0 Pro',
    role: 'Consumes ADR schema rules to formulate pristine interface types, utility scripts, and main page templates, respecting strict architectural scopes.',
    artifactTitle: 'Generated Code Components & Schema Ingest',
    artifactDoc: 'export interface PipelinePayload {\n  id: string;\n  status: "idle" | "active" | "finalized";\n  timestamp: number;\n  payloadSignature: string; // validated by hostile auditor\n}',
    details: 'By separating scaffold coding from architecture authority, code modification requests can never arbitrarily change root system choices.',
    promptUsed: 'Develop application features bound strictly by the custom ADR type parameters. You have zero authorization to alter adjacent modules or change configuration state.'
  },
  {
    id: 'p3',
    name: '03_TEST',
    code: 'RUN_TST',
    title: 'Deterministic Sandbox Test Harness',
    subtitle: 'Bypass semantic model hallucination using rigid code-checks',
    icon: 'Terminal',
    status: 'idle',
    model: 'Isolated Sandbox (Non-Agentic Node)',
    role: 'Runs real typechecks, code lint rules, and testing frameworks inside a sterile runtime, parsing warnings or compilation failures explicitly.',
    artifactTitle: 'Execution Test Output Telemetry',
    artifactDoc: '[SUCCESS] Linting passes. 0 issues detected.\n[SUCCESS] TypeScript compiler type check complete.\n[SUCCESS] Run Test CI: 8 specs verified.\n[INFO] Bundle size resolved to 48.2kb.',
    details: 'This isolated test loop translates code output checks into dry, absolute engineering metrics. It compiles assets in real sandboxes rather than guessing correctness.',
    promptUsed: 'npm run lint && npm run typecheck && npm run test -- --ci --coverage'
  },
  {
    id: 'p4',
    name: '04_AUDIT',
    code: 'ADV_AUD',
    title: 'Adversarial Code Audit',
    subtitle: 'Cross-examine changes against the architectural specifications and test logs',
    icon: 'ShieldAlert',
    status: 'idle',
    model: 'DeepSeek R1 / Claude 3.7 (Dedicated Context Window)',
    role: 'An aggressive auditor agent placed inside an isolated container, specialized in scanning logic specifically to identify security bypasses and specification deviations.',
    artifactTitle: 'Adversarial Security Verdict',
    artifactDoc: '[STATUS: VERIFIED_SAFE]\nAuthenticity token successfully generated.\nAll types match ADR-001 boundaries.\nNo memory leaks detected in reactive payload processing.',
    details: 'This audit agent operates in a separate session context. It receives the target ADR rules, live files, and test logs, then attacks the build with rigorous critique.',
    promptUsed: 'You are an aggressive senior security auditor. Cross-examine the current files against ADR-001.md rules and execution test-harness failures. If even one assertion is broken, emit an absolute REJECTED status with error logs.'
  },
  {
    id: 'p5',
    name: '05_DEPLOY',
    code: 'INF_CD',
    title: 'Continuous Secure Delivery',
    subtitle: 'Zero-touch distribution gated by validation signatures',
    icon: 'Layers',
    status: 'idle',
    model: 'Continuous Delivery MCP Node',
    role: 'Gathers the cryptographic validation token emitted in Phase 4 and triggers safe direct deployment straight to cloud registries.',
    artifactTitle: 'Production Release Record',
    artifactDoc: 'Deploying release v1.0.4...\nTarget Cloud Gateway: VERCEL_MCP_NODE\nSecure Token: verified_tok_adv_aud_674512\nBuild deployment succeeded: https://prod-gateway.secured-ai.run',
    details: 'The deployment router requires absolute alignment across all validation checks. If the adversarial auditor does not certify the build, automated keys remain securely disabled.',
    promptUsed: 'Verify security signature == "[STATUS: VERIFIED_SAFE]". If verified, initiate production compilation pipelines.'
  }
];

export const ADR_PROFILES: Record<string, { title: string; doc: string; description: string }> = {
  modular: {
    title: 'Option A: Modular Service Mesh (Scalability-First)',
    description: 'Decoupled systems with discrete event emitters and static schemas. Highly resilient to structural collapse, but requires setup overhead.',
    doc: `# ADR-001: Architecture Specification (SERVICE_MESH_MODE)
STATUS: APPROVED
TYPE: DECOUPLED_MICRO_ARCH

## 1. Architectural Strategy
Every agent system behaves as an independent reactive node communicating over a structured JSON message pipeline.

## 2. Invariants & Guardrails
* Schema structures are strictly governed by metadata types.
* Direct system updates must go through designated event buses.
* State retention is permanent, backed by append-only event files.`
  },
  lightweight: {
    title: 'Option B: Compact Unified Stack (Speed-First)',
    description: 'A tight single-file interface maximizing execution speed and zero-dependency imports. Optimal for local prototypes but prone to single-point-of-failure errors.',
    doc: `# ADR-001: Architecture Specification (COMPACT_FLAT_MODE)
STATUS: APPROVED
TYPE: UNIFIED_MONOLITHICP_ARCH

## 1. Architectural Strategy
We use a clean, centralized reactive state store in a single file, eliminating latency-heavy network protocols between layers.

## 2. Invariants & Guardrails
* All state values are kept in active client-side memory.
* External API calls are bypassed or routed using local key values.
* Minimal dependency footprints: no complex build-scaffolding layers.`
  },
  sandbox: {
    title: 'Option C: Dual-Core Sandboxed Mesh (Security-First)',
    description: 'Hyper-secure layout mapping where all untrusted scripts execute inside distinct WebAssembly sandboxes. Fully isolates failures, but increases run time latency.',
    doc: `# ADR-001: Architecture Specification (SECURE_SANDBOX_MODE)
STATUS: APPROVED
TYPE: HARDENED_WASM_SANDBOX_ARCH

## 1. Architectural Strategy
Logic compilation takes place under isolated environments with memory-limit constraints. Zero raw hardware filesystem permissions are exposed.

## 2. Invariants & Guardrails
* Execution threads are terminated if CPU usage exceeds 450ms.
* Output logs must be sanitized of potential secret leakages.
* Token authorizations are transient and auto-expire after 90 seconds.`
  }
};

export const AUDIT_POSTURES: AuditPosture[] = [
  {
    id: "strict",
    name: "Skeptical Hacker / Auditor",
    title: "Aggressive SecOps Review Posture",
    description: "Highly hostile approach. Expects models to fail type safety, look for runtime injections, and analyze code boundaries strictly.",
    icon: "ShieldAlert",
    verdict: "VERIFIED_SAFE",
    response: "[AUDITOR VERDICT: VERIFIED_SAFE]\n\nAnalysis Summary:\n* Cryptographic boundaries are intact and properly aligned with ADR-001 rules.\n* Data inputs pass isolated sanitization validators successfully.\n* Zero unhandled promise terminations or dangerous fallback handlers detected in generated state files."
  },
  {
    id: "gullible",
    name: "Optimistic Linter Assistant",
    title: "Permissive Static Linter Posture",
    description: "Accepts minor warnings, focusing on stylistic rules and code tidiness rather than hostile injection vectors.",
    icon: "Code",
    verdict: "WARNINGS_PRESENT",
    response: "[AUDITOR VERDICT: WARNINGS_PRESENT]\n\nAnalysis Summary:\n* Stylistic alert: code contains 3 unused parameters in helper function declarations.\n* Performance: optional type bindings can be optimized using inline exports.\n* Security overview: boundary checked superficially, assume environment variables are benign."
  },
  {
    id: "paranoid",
    name: "Enterprise Compliance Protocol",
    title: "Hyper-Paranoid Regulatory Audit",
    description: "Strict checks matching legal code constraints. Flags external libraries and requires structural auditing trails for imports.",
    icon: "FileText",
    verdict: "REJECTED",
    response: "[AUDITOR VERDICT: REJECTED]\n\nReason for Rejection:\n* Outbound request schemas lack explicit legal license headers.\n* Trace references use standard Date functions rather than cryptographically stable clock offsets.\n* External package imports haven't been resolved against locked enterprise hash registers."
  }
];

export const METHODOLOGY_DIF = {
  chat: {
    stateLoss: "45% loss after 4 interactions",
    tokensSpent: "150,000+ per small revision",
    reliability: "Low (prone to feature regression)",
    architecture: "Brittle, moves target specs arbitrarily",
    maintenance: "High manual refactoring overhead"
  },
  artifact: {
    stateLoss: "0% loss (guaranteed by ADR state files)",
    tokensSpent: "14,000 avg (focused contextual reads)",
    reliability: "High (validated via automated test harness)",
    architecture: "Rigid, constrained by immutable rules",
    maintenance: "Minimal (isolated, automated pipeline checks)"
  }
};
