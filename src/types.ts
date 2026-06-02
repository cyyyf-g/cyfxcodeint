export interface SystemPhase {
  id: string;
  name: string;
  code: string;
  title: string;
  subtitle: string;
  icon: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'idle';
  model: string;
  role: string;
  artifactTitle: string;
  artifactDoc: string;
  details: string;
  promptUsed: string;
}

export interface ADRApproach {
  name: string;
  complexity: string;
  speed: string;
  description: string;
  assumptions: string[];
  failureModes: string[];
  regretFactors: string[];
}

export interface AuditPosture {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  verdict: 'VERIFIED_SAFE' | 'REJECTED' | 'WARNINGS_PRESENT';
  response: string;
}
