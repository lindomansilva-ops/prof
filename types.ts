
export enum Difficulty {
  BEGINNER = 'Iniciante',
  INTERMEDIATE = 'Intermediário',
  ADVANCED = 'Avançado'
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  objective: string;
  baseCode: string;
  xpReward: number;
}

export interface Phase {
  id: string;
  title: string;
  concept: string;
  unlocked: boolean;
  completed: boolean;
  missions: Mission[];
}

export interface World {
  id: string;
  title: string;
  description: string;
  phases: Phase[];
  unlocked: boolean;
}

export interface UserState {
  name: string;
  xp: number;
  level: number;
  unlockedWorldId: string;
  completedPhaseIds: string[];
}

export interface AIResponse {
  type: 'evaluation' | 'hint' | 'explanation' | 'challenge';
  content: string;
  isCorrect?: boolean;
}
