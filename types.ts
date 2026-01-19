
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export enum SystemStatus {
  ONLINE = 'ONLINE',
  PROCESSING = 'PROCESSING',
  IDLE = 'IDLE',
  ERROR = 'ERROR'
}

export type ModuleType = 'TaskManager' | 'IdeaGenerator' | 'CodeAssistant' | 'TextSummarizer' | 'ImageInspirer';

export interface Plan {
  intent: string;
  risk: 'Low' | 'Medium' | 'High';
  action: {
    module: ModuleType;
    prompt: string;
  };
}

export interface AuditLogEntry {
  id: number;
  request: string;
  plan: Plan;
  outcome: 'Approved' | 'Rejected' | 'Pending';
  timestamp: string;
}
