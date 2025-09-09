// Main exports for the CupidEcho Bot module
export { BotManager, botManager } from './BotManager';
export { CupidEchoBotController } from './controllers/CupidEchoBotController';

// Type exports
export type {
  BotMessage,
  BotContext,
  BotResponse,
  BotHandler,
  BotMiddleware,
  BotPlugin,
  BotState,
  BotFlow,
  BotAction,
  UserProfile,
  UserPreferences
} from './types';

// Handler exports
export { WelcomeHandler } from './handlers/WelcomeHandler';
export { ProfileHandler } from './handlers/ProfileHandler';
export { MatchingHandler } from './handlers/MatchingHandler';
export { ConversationHandler } from './handlers/ConversationHandler';

// Middleware exports
export { ContextEnricherMiddleware } from './middleware/ContextEnricherMiddleware';

// Utility exports
export { default as BotUtils } from './utils/BotUtils';

// Default export - the main bot manager instance
export { botManager as default } from './BotManager';