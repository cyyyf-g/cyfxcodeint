import { SystemPhase } from './types';

export const SYSTEM_PHASES_INITIAL: SystemPhase[] = [
  {
    id: 'p1',
    name: 'STAGE 01: ARCHITECTURAL EVALUATION',
    code: 'STAGE_01',
    title: 'Architectural Specs & Trade-offs',
    subtitle: 'Evaluate 3 alternative structural patterns with deep adversarial critique before any code is generated.',
    icon: 'Layers3',
    status: 'idle',
    model: 'Reasoning Mode (e.g., o3-mini / Claude Thinking)',
    role: 'Evaluates the structure for hidden performance assumptions, failure states, and technical debt prior to schemas.',
    artifactTitle: 'Architecture Decision Record (ADR-001)',
    artifactDoc: `# ADR-001: Structural Analysis & Core Strategy
STATUS: CONFIRMED_GATED
STABILITY LEVEL: HIGH

## 1. Minimalist Core Pattern (Rapid Deployment)
* Complexity: Low
* Speed: Max (Immediate execution)
* Invariant: Fast flat state. Vulnerable to memory spikes at high trace frequencies.

## 2. Decoupled Service Model (Scalable / Protected)
* Complexity: Medium
* Speed: Balanced
* Invariant: Strict async boundaries with dedicated state files. Prevents cascade failures.

## 3. Sandboxed WASM Architecture (Optimal / Experimental)
* Complexity: High
* Speed: Low (WASM context switch latency)
* Invariant: Total process isolation. Guaranteed security but high run-time friction.`,
    details: 'CONSTRAINED INVARIANT: The reasoning layer is strictly banned from generating feature code. It can only map high-level system boundaries and hidden assumptions.',
    promptUsed: 'You are a senior systems software architect. Analyze my technical parameters and present exactly 3 architectural options with contrasting trade-offs:\n(1) low-complexity/rapid,\n(2) scalable/highly-maintainable,\n(3) optimal/experimental.\n\nFor each, outline hidden assumptions, prospective failure points, and long-term technical debt. Do not output implementation patterns yet. Challenge my premise.'
  },
  {
    id: 'p2',
    name: 'STAGE 02: PURE SCHEMAS & TYPES',
    code: 'STAGE_02',
    title: 'Immutable Schema Boundaries',
    subtitle: 'Establish crisp, compile-ready data contracts with strict type definitions.',
    icon: 'Code',
    status: 'idle',
    model: 'Frontier Model / Fast Mode (e.g., Claude Sonnet / Gemini Flash)',
    role: 'Accepts the structural ADR and outputs pure schemas and types without any prose or conversational filler.',
    artifactTitle: 'TypeScript Declarations & Schema JSON',
    artifactDoc: `/**
 * Strict contract definitions for state-isolated workflows.
 * All properties are read-only to eliminate side-effect mutations.
 */
export interface PipelineContract {
  readonly transactionId: string;
  readonly payloadSignature: string; /* HMAC SHA256 */
  readonly securityPosture: 'gated' | 'isolated' | 'hostile';
  readonly stateSequenceId: number;
  readonly constraintRules: {
    readonly timeoutMs: number;
    readonly apiRoot: string;
  };
}

// TODO: RUNTIME_REVIEW - A human engineer must cross-verify cryptography settings here.`,
    details: 'CONSTRAINED INVARIANT: Strictly no explanations, tips, or tutorials. Structural generation only to maintain clean context.',
    promptUsed: 'Based on the selected architectural constraints, synthesize the structural configuration files and TypeScript strict type layouts. Do not explain anything, do not include tutorials. Output clean file blocks only. Include explicit boundaries and validation schemas. If human intervention is needed, flag with // TODO: RUNTIME_REVIEW.'
  },
  {
    id: 'p3',
    name: 'STAGE 03: CONSTRAINED IMPLEMENTATION',
    code: 'STAGE_03',
    title: 'Tight Inline Implementation Scope',
    subtitle: 'Write feature logic nested inside the immutable schemas, with zero adjacent mutations.',
    icon: 'Terminal',
    status: 'idle',
    model: 'Frontier Coding Engine (e.g., Cursor / Inline Copilot Context)',
    role: 'Locked strictly to a minimized scope to write logic satisfying the Type definitions.',
    artifactTitle: 'Clean Implementation Script',
    artifactDoc: `import { PipelineContract } from './src/types';

export function runSecureTransition(
  incomingPayload: any,
  envSettings: { apiRoot: string; timeoutMs: number }
): PipelineContract {
  // Enforce rigid contract limits directly at runtime entry
  if (!incomingPayload.transactionId) {
    throw new Error('Contract Violation: Missing transactionId');
  }
  
  if (incomingPayload.timeoutMs > envSettings.timeoutMs) {
    throw new Error('Contract Violation: Specified timeout exceeds maximum authorized bounds');
  }

  return {
    transactionId: String(incomingPayload.transactionId),
    payloadSignature: String(incomingPayload.signature || 'unauthenticated_fallback'),
    securityPosture: 'isolated',
    stateSequenceId: Math.floor(Date.now() / 1000),
    constraintRules: {
      timeoutMs: envSettings.timeoutMs,
      apiRoot: envSettings.apiRoot
    }
  };
}`,
    details: 'CONSTRAINED INVARIANT: Prevent the generator from modifying neighboring modules or refactoring layout files with unauthorized assumptions.',
    promptUsed: 'Implement the specific feature described below. You must adhere strictly to the type definitions in the reference scope. Do not alter adjacent components or refactor base styles. If you must adjust schemas to complete this task, stop immediately and flag it—prefer explicit and readable engineering over highly abstract configurations.'
  },
  {
    id: 'p4',
    name: 'STAGE 04: MANUAL ADVERSARIAL AUDIT',
    code: 'STAGE_04',
    title: 'Adversarial Security Code Review',
    subtitle: 'Subject the resulting code block to an aggressive, hostile container audit with zero praise.',
    icon: 'ShieldAlert',
    status: 'idle',
    model: 'High-Compliance Reasoning Mode (e.g., DeepSeek R1 / Isolated session)',
    role: 'Analyzes the implementation under a total sandbox environment to catch logic bugs and edge vulnerabilities.',
    artifactTitle: 'Hostile Pen-Test Integrity Verdict',
    artifactDoc: `[SECURITY VERDICT: WARNINGS_PRESENT - COMPLIANCE RISK ARRESTED]
Review Posture: SKID_HOSTILE_AUDIT

## Vulnerability Rankings

1. WARNING [IMPLICIT STATE TRUST]:
   - Severity: Medium
   - Location: String(incomingPayload.signature || 'unauthenticated_fallback')
   - Risk: Accepts a fallback string on invalid hmac authentication. Potential signature spoofing risk if upstream validation decays.
   - Recommended Fix: Halt execution immediately on signature mismatch instead of relying on a fallback.

2. LOGICAL OVERSIGHT [RANGE BOUNDS]:
   - Severity: Low
   - Location: incomingPayload.timeoutMs check
   - Risk: Negative inputs are not caught. A negative timeout could trigger unhandled promise errors in subsequent layers.
   - Recommended Fix: Ensure incoming payload values are > 0.`,
    details: 'CONSTRAINED INVARIANT: Force an absolute hostile adversarial stance. Zero praise or polite filler allowed; list ONLY potential failure vectors.',
    promptUsed: 'You are a hostile, highly critical senior security auditor and code reviewer. Review this code block. Assume the author was distracted and prone to oversights. Check manually for: (1) unhandled null paths, (2) structural security risks, (3) complex logic anti-patterns, (4) missing catch states. Output only a list of ranked vulnerabilities. Do not offer praise.'
  },
  {
    id: 'p5',
    name: 'STAGE 05: DOCUMENTATION EXTRACTION',
    code: 'STAGE_05',
    title: 'Frictionless Stranger Transfer Docs',
    subtitle: 'Synthesize clean operational instructions detailing strict invariants for subsequent developers.',
    icon: 'Layers',
    status: 'idle',
    model: 'Balanced Utility Model',
    role: 'Collects verified code specifications and produces clean, functional developer guides without redundant noise.',
    artifactTitle: 'Structural Developer Hand-off Guide',
    artifactDoc: `# Engineering Guide: Isolated Pipeline Controller
This module is optimized for absolute context isolation to prevent logical system drift.

## Runtime Pre-requisites
* Strict TypeScript 5.2+ compiler config.
* Environment variable validation:
  - API_ROOT (must align with static ADR prefixes)
  - TIMEOUT_MS (must default to <= 1000ms limit)

## Invariant Safeguards
* Never access raw state bindings directly; always request read-only signatures.
* Any changes to payload validation rules MUST go through an external schema review rather than local controller tweaks.`,
    details: 'CONSTRAINED INVARIANT: Write exclusively for an experienced software developer who is encountering the repository for the primary run-thru.',
    promptUsed: 'Analyze this verified code setup and write a structural document. Include: functional dependencies, mandatory environment structures, architectural constraints, and specific patterns future developers must preserve. Write for an experienced software engineer stepping into the repository for the first time.'
  }
];

export const SCHOOL_CASE_STUDY_PHASES: SystemPhase[] = [
  {
    id: 's1',
    name: 'STAGE 01: ARCHITECTURAL EVALUATION',
    code: 'SCHOOL_STAGE_01',
    title: 'RBAC Database Design Strategy',
    subtitle: 'Deconstruct three SQL strategies to isolate Student, Teacher, and Admin permission roles strictly at the schema boundaries before writing endpoints.',
    icon: 'Layers3',
    status: 'idle',
    model: 'Reasoning / Extended Thinking Mode',
    role: 'Reviews and maps structural database splits to prevent leaky multi-tenant access or context cross-pollution.',
    artifactTitle: 'RBAC Database Design ADR-002',
    artifactDoc: `# ADR-002: School Portal Multi-Role Database Isolation Scheme
STATUS: DESIGN_APPROVED
REGULATORY POSTURE: COMPLIANT / HIGH

## 1. Single Shared Database with PostgreSQL RLS (Row-Level Security)
* Leverage PostgreSQL active user-role checks matching 'current_setting('app.current_user_role')' directly in tables.
* Bottlenecks: Requires active connection hook overhead on every query. Perfect isolation boundaries.

## 2. Decoupled tables with Polymorphic Associations
* Separate tables for Students, Teachers, and Admins. Access credentials exist only in isolated tables.
* Bottlenecks: Complex many-to-many grade tables require multiple joins. Zero cascading leak risk.

## 3. Logical Database Partitioning/Sharding per Sector
* Admin data resides on server node A, Academic records on server node B. 
* Bottlenecks: High infrastructural maintenance complexity. Maximum security but very high setup overhead.`,
    details: 'CONSTRAINED INVARIANT: Prohibited from generating logic code, classes, or frameworks yet. Focus exclusively on relational constraints.',
    promptUsed: 'You are a principal database architect. I am mapping out a full-stack school management system requiring strict role isolation (Admins, Teachers, Students).\n\nPresent exactly 3 backend strategies for Role-Based Access Control (RBAC):\n(1) Single shared database with row-level security (RLS) policies,\n(2) Decoupled relation tables with polymorphic associations,\n(3) Complete logical database partitioning per client/role sector.\n\nAnalyze the performance bottlenecks, cache-invalidation challenges, and potential cross-tenant leak vectors for each approach. Do not generate code yet.'
  },
  {
    id: 's2',
    name: 'STAGE 02: PURE SCHEMAS & TYPES',
    code: 'SCHOOL_STAGE_02',
    title: 'Airtight Prisma Schemas and Type Contracts',
    subtitle: 'Draft clear, compiler-validated SQL Prisma tables and authentication tokens strictly corresponding to selected RLS pattern.',
    icon: 'Code',
    status: 'idle',
    model: 'Frontier Model / Fast Mode',
    role: 'Extracts the system decisions from Stage 01 and formats strict SQL schema structures in total isolation from logic controllers.',
    artifactTitle: 'Prisma Schema & JWT Token Type Contracts',
    artifactDoc: `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(STUDENT)
  studentProfile Student?
  teacherProfile Teacher?
}

enum Role {
  ADMIN
  TEACHER
  STUDENT
}

model Class {
  id         String   @id @default(uuid())
  name       String
  teachers   Teacher[]
  students   Student[]
  grades     Grade[]
}

model Student {
  id      String  @id @default(uuid())
  userId  String  @unique
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  classes Class[]
  grades  Grade[]
}

model Teacher {
  id      String  @id @default(uuid())
  userId  String  @unique
  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  classes Class[]
}

model Grade {
  id        String   @id @default(uuid())
  score     Float
  subject   String
  studentId String
  student   Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
  classId   String
  class     Class    @relation(fields: [classId], references: [id], onDelete: Cascade)
}

// typescript/contracts.ts
export interface SchoolTokenPayload {
  readonly userId: string;
  readonly role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  readonly associatedProfileId: string;
  readonly iat: number;
}
`,
    details: 'CONSTRAINED INVARIANT: No framework routes, tutorials, or inline explanations. Strictly formatted schema structures and TypeScript interfaces only.',
    promptUsed: 'Based on the selected Row-Level Security (RLS) relational architecture for the school portal, synthesize the raw Prisma schema and accompanying strict TypeScript definitions for the session authentication tokens.\n\nThe schema must explicitly map relationships for: Users, Roles, Classes, Attendance, and Grades. Ensure foreign key cascade behaviors are airtight. Do not output anything other than raw code blocks.'
  },
  {
    id: 's3',
    name: 'STAGE 03: CONSTRAINED IMPLEMENTATION',
    code: 'SCHOOL_STAGE_03',
    title: 'Isolated Grade Submission Controller Logic',
    subtitle: 'Code the Grade Submission transaction logic constrained to the isolated environment of GradeSubmissionController.',
    icon: 'Terminal',
    status: 'idle',
    model: 'Frontier Coding Engine (Inline Editor Context)',
    role: 'Write single-method transaction code locked inside rigid file structures, preventing unintended schema modification.',
    artifactTitle: 'GradeSubmissionController.ts',
    artifactDoc: `import { PrismaClient } from '@prisma/client';
import { SchoolTokenPayload } from '../types/contracts';

const prisma = new PrismaClient();

export async function submitStudentGrades(
  authTeacherToken: SchoolTokenPayload,
  classId: string,
  gradePayloads: Array<{ studentId: string; score: number; subject: string }>
) {
  // 1. Core Invariant: Only authenticated TEACHERS are permitted to access this transaction path
  if (authTeacherToken.role !== 'TEACHER') {
    throw new Error('Access Denied: Unprivileged role submission attempt');
  }

  const teacherProfileId = authTeacherToken.associatedProfileId;

  // 2. Transaction safety lock: Ensure the teacher is actively assigned to the Class
  const isAssigned = await prisma.class.findFirst({
    where: {
      id: classId,
      teachers: { some: { id: teacherProfileId } }
    }
  });

  if (!isAssigned) {
    throw new Error('Authorization Violation: Teacher is not registered for target class context');
  }

  // 3. Complete database transaction to prevent partial grade leakage
  return await prisma.$transaction(
    gradePayloads.map((grade) => {
      // Validate bounds constraint
      if (grade.score < 0 || grade.score > 100) {
        throw new Error('Contract Violation: Score value must fall in 0-100 threshold range');
      }

      return prisma.grade.create({
        data: {
          score: grade.score,
          subject: grade.subject,
          studentId: grade.studentId,
          classId: classId
        }
      });
    })
  );
}
`,
    details: 'CONSTRAINED INVARIANT: The engine is disabled from accessing adjacent middleware or modifying the parent schema models.',
    promptUsed: 'Implement the backend controller function `submitStudentGrades`. It must parse the teacher\'s session token, manually verify that the authenticated teacher is actively assigned to the target Class ID, sanitize the grade payloads, and update the database transactionally.\n\nAdhere strictly to the Schema interfaces in scope. Do not alter adjacent middleware or global error handlers. If an architectural gap is found, halt execution and leave a comment.'
  },
  {
    id: 's4',
    name: 'STAGE 04: MANUAL ADVERSARIAL AUDIT',
    code: 'SCHOOL_STAGE_04',
    title: 'White-Box Vulnerability & IDOR Pen-Test',
    subtitle: 'Provide the Controller code to a totally separated LLM context to run security tests and verify authentication boundaries hostilely.',
    icon: 'ShieldAlert',
    status: 'idle',
    model: 'High-Compliance Reasoning Mode (Completely different AI provider)',
    role: 'Acts as an aggressive auditor pointing out potential IDOR, state leaks, and parameter pollution without any politeness.',
    artifactTitle: 'White-Box Penetration Report (Scholastic System)',
    artifactDoc: `[VULNERABILITY ASSESSMENT REPORT: ACTION REQUIRED]
AUDIT SCOPE: GradeSubmissionController.ts
POSTURE: STRICT ADV-WHITEBOX

## Ranked Vulnerabilities

1. IDOR RISK (SEVERITY: HIGH):
   - Location: prisma.grade.create on studentId parameters
   - Risk: The system verifies that the teacher has access to the CLASS, but it does NOT explicitly double check that the target student is actively enrolled inside that specific CLASS. A malicious teacher could inject grades for arbitrary students in other classes using their studentIds.
   - Remediation: Enforce transactional validation checking that each grade.studentId exists within the Class's student array.

2. CONCURRENCY EXPLOITATION / DATA RACE CONDITIONS (SEVERITY: MEDIUM):
   - Location: Single transaction payload mapping
   - Risk: Rapid connection pool congestion might allow a grade submission transaction to lock high-density records, raising opportunities for resource exhaustion.
   - Remediation: Throttle concurrent submissions and enforce database statement time limits.`,
    details: 'CONSTRAINED INVARIANT: Completely detached context session. Under no circumstances should the model show polite support or omit security gaps.',
    promptUsed: 'You are a hostile security engineer conducting a white-box audit on this `submitStudentGrades` controller. Look specifically for Insecure Direct Object References (IDOR), privilege escalation vectors, and parameter pollution.\n\nCan a malicious student spoof a payload or manipulate their session state to rewrite grade entries? Identify every single edge case where the verification logic might fail under a high-concurrency race condition. Rank findings by severity.'
  },
  {
    id: 's5',
    name: 'STAGE 05: DOCUMENTATION EXTRACTION',
    code: 'SCHOOL_STAGE_05',
    title: 'Secure Handoff Lifecycle Onboarding Guide',
    subtitle: 'Synthesize formal markdown files detailing actual token verification loops, transaction limits, and safe telemetry rules.',
    icon: 'Layers',
    status: 'idle',
    model: 'Balanced Utility Model',
    role: 'Processes validated code and generates deep technical references designed directly for newly-onboarded core systems engineers.',
    artifactTitle: 'Scholastic Secure Handoff Operational Document',
    artifactDoc: `# Operational Handoff: Academic Record Controller Lifecycle

This guide describes the strict authorization boundaries governing student records.

## 1. Token Verification Pipeline
* Handled strictly prior to database queries.
* Validate that SchoolTokenPayload contains "role = 'TEACHER'" before invoking transactional grade routes.

## 2. Transaction Boundaries
* Grade records are written as a single isolated PostgreSQL transaction via "prisma.$transaction()".
* A single invalid score (e.g. out of 0-100 threshold range) will roll back all modifications to ensure 100% database sanitization.

## 3. Telemetry and Logging Invariants
* To comply with student privacy laws (FERPA, GDPR), never write studentId or scores directly to standard logs.
* Log only the authenticated teacherId and target classId. Use masked SHA HMACs for trace queries.`,
    details: 'CONSTRAINED INVARIANT: Explanations must be kept thoroughly objective, highly academic, and completely clean of non-technical conversational filler.',
    promptUsed: 'Analyze this audited grade-submission lifecycle. Write a technical reference guide for a new developer joining the project.\n\nDocument: (1) exact token verification paths, (2) database transaction boundaries, (3) how to securely trace data mutations in production without logging sensitive student information. Keep it highly objective and formal.'
  }
];

export interface ADRCustomOption {
  id: string;
  name: string;
  subtitle: string;
  complexity: string;
  latency: string;
  debt: string;
  doc: string;
}

export const ADR_CUSTOM_OPTIONS: ADRCustomOption[] = [
  {
    id: 'rapid',
    name: 'Option 1: Minimalist Direct State (Low Complexity)',
    subtitle: 'Pragmatic, zero-dependency flat memory state map with minimum file locks.',
    complexity: 'Extremely Low',
    latency: 'Ultra Low (~2ms)',
    debt: 'High. Prone to cascading state rot as task variance increases.',
    doc: `# ADR-001-MINIMA: Low-Complexity Architecture Spec

## Core Approach
We utilize flat global variables, running synchronous data checks directly in client-side runtime frames.

## Constraints & Trade-offs
* Rapid prototyping; extremely low developer cognitive drag.
* Assumes all input models are benign.
* Accumulates significant technical debt over multiple revision loops.`
  },
  {
    id: 'scalable',
    name: 'Option 2: Isolated Message Mesh (Scale-First)',
    subtitle: 'Highly structured message channels with strict system boundary isolation.',
    complexity: 'Moderate',
    latency: 'Medium (~12ms)',
    debt: 'Low. Highly maintainable and protected against system decay.',
    doc: `# ADR-001-SCALE: Scalable Event-Driven System Spec

## Core Approach
We decouples user input, model generation, and verification loops. Information must go through schema guards.

## Constraints & Trade-offs
* Full tracking records and immune to model memory decay.
* Extra effort required to validate contracts at each node.
* Eliminates single-point failures and maintains long-term structural sanity.`
  },
  {
    id: 'experimental',
    name: 'Option 3: Adversarial Sandboxed WASM (Experimental)',
    subtitle: 'Extreme security mode where every module runs in a memory-capped WASM environment.',
    complexity: 'High',
    latency: 'High (~85ms due to context switching)',
    debt: 'Extremely Low. Complete process safety.',
    doc: `# ADR-001-SANDBOX: Hardened WASM Sandbox Spec

## Core Approach
Code compilation and executions occur strictly under web assembly isolation frames with active clock-cycle limiters.

## Constraints & Trade-offs
* Zero raw file-system or process access is exposed.
* Incurs notable runtime latency during system initialization.
* Perfect for high-risk transactional APIs; heavy overkill for light interfaces.`
  }
];

export const HOX_POSTURES = [
  {
    id: 'hostile',
    name: 'Hostile Security Auditor Profile',
    title: 'Bypasses, memory-leak, and contract boundary verification',
    tag: 'HOSTILE_AUDIT',
    logs: `[AUDIT PROTOCOL DEPLOYED] - Review Posture: STRICT ADVERSARIAL
-----------------------------------------------------------
✔ VERIFY: Static boundaries aligned with ADR-001 contracts.
✖ RISK WARNING: Fallback hmac string signature can be abused if API gateway fails to catch Null keys.
✔ SUCCESS: Memory footprint constant. No dynamic resource leakages identified.
-----------------------------------------------------------
FINAL ADVERSARIAL STATUS: INTEGRITY PASS_WITH_RECOMMENDED_FIX`
  },
  {
    id: 'compliant',
    name: 'Compliance / Regulatory Reviewer',
    title: 'Structural checks for license tags and clean interface variables',
    tag: 'COMPLIANCE',
    logs: `[COMPLIANCE CHECK ACTIVE] - Posture: REGULATORY ASSURANCE
-----------------------------------------------------------
✔ VERIFY: explicit licensing files are parsed and matching parameters.
✖ METADATA WARNING: Timeout limits must be declared globally rather than bound inside individual API scopes.
✔ SUCCESS: TypeScript strict compiler options successfully parsed.
-----------------------------------------------------------
FINAL COMPLIANCE STATUS: WARN_FLAGS_NOTED_PROCEED`
  },
  {
    id: 'skeptical',
    name: 'Skeptical Team Technical Lead',
    title: 'Evaluates logical simplicity, readability, and redundant abstraction',
    tag: 'TECH_LEAD_REVIEW',
    logs: `[TECH LEAD REVIEW RUNNING] - Posture: SIMPLICITY COMPACTNESS
-----------------------------------------------------------
✖ ABSTRACT COMPLEXITY: The input payload model mapping has unnecessary key nesting.
✔ REUSE RATE: Transition handlers have excellent pure-function characteristics.
✔ DEBT INDEX: Minimal. Code matches basic contract specification perfectly.
-----------------------------------------------------------
FINAL TECH LEAD STATUS: APPROVED_WITH_MINOR_REFACTOR`
  }
];
