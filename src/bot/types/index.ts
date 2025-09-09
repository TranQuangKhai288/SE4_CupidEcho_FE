// Bot type definitions for CupidEcho
export interface BotMessage {
  id: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'suggestion' | 'action';
  metadata?: Record<string, any>;
}

export interface BotContext {
  userId: string;
  conversationId: string;
  userProfile?: UserProfile;
  currentState?: BotState;
  history: BotMessage[];
}

export interface UserProfile {
  id: string;
  name: string;
  age?: number;
  interests?: string[];
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  ageRange?: [number, number];
  distance?: number;
  interests?: string[];
}

export interface BotState {
  currentFlow: BotFlow;
  step: number;
  data: Record<string, any>;
}

export type BotFlow = 
  | 'welcome'
  | 'profile_setup'
  | 'matching_suggestions'
  | 'conversation_starter'
  | 'dating_advice'
  | 'help';

export interface BotResponse {
  messages: BotMessage[];
  nextState?: BotState;
  actions?: BotAction[];
}

export interface BotAction {
  type: 'navigate' | 'update_profile' | 'start_match' | 'show_suggestions';
  payload: Record<string, any>;
}

export interface BotHandler {
  canHandle(message: string, context: BotContext): boolean;
  handle(message: string, context: BotContext): Promise<BotResponse>;
}

export interface BotMiddleware {
  process(message: string, context: BotContext): Promise<BotContext>;
}

export interface BotPlugin {
  name: string;
  initialize(): void;
  handlers: BotHandler[];
  middleware?: BotMiddleware[];
}