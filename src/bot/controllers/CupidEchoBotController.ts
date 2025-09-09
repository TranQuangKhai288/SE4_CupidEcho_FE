import { Botkit } from 'botkit';
import { 
  BotContext, 
  BotMessage, 
  BotResponse, 
  BotHandler, 
  BotMiddleware,
  BotPlugin,
  BotState,
  BotFlow
} from '../types';

export class CupidEchoBotController {
  private botkit: Botkit;
  private handlers: Map<string, BotHandler> = new Map();
  private middleware: BotMiddleware[] = [];
  private plugins: Map<string, BotPlugin> = new Map();
  private contexts: Map<string, BotContext> = new Map();

  constructor() {
    this.botkit = new Botkit({
      webhook_uri: '/api/messages'
    });
    
    this.initializeDefaultHandlers();
  }

  // Initialize the bot with default handlers
  private initializeDefaultHandlers(): void {
    // These will be implemented in separate handler files
    this.registerHandler('welcome', require('../handlers/WelcomeHandler').default);
    this.registerHandler('profile', require('../handlers/ProfileHandler').default);
    this.registerHandler('matching', require('../handlers/MatchingHandler').default);
    this.registerHandler('conversation', require('../handlers/ConversationHandler').default);
  }

  // Register a new handler
  public registerHandler(name: string, handler: BotHandler): void {
    this.handlers.set(name, handler);
  }

  // Register middleware
  public registerMiddleware(middleware: BotMiddleware): void {
    this.middleware.push(middleware);
  }

  // Register a plugin
  public registerPlugin(plugin: BotPlugin): void {
    plugin.initialize();
    this.plugins.set(plugin.name, plugin);
    
    // Register plugin handlers
    plugin.handlers.forEach((handler, index) => {
      this.registerHandler(`${plugin.name}_${index}`, handler);
    });

    // Register plugin middleware
    if (plugin.middleware) {
      plugin.middleware.forEach(middleware => {
        this.registerMiddleware(middleware);
      });
    }
  }

  // Process incoming message
  public async processMessage(
    message: string, 
    userId: string, 
    conversationId: string
  ): Promise<BotResponse> {
    try {
      // Get or create context
      const contextKey = `${userId}_${conversationId}`;
      let context = this.contexts.get(contextKey) || this.createContext(userId, conversationId);

      // Process through middleware
      for (const middleware of this.middleware) {
        context = await middleware.process(message, context);
      }

      // Find appropriate handler
      const handler = this.findHandler(message, context);
      
      if (!handler) {
        return this.getDefaultResponse();
      }

      // Handle the message
      const response = await handler.handle(message, context);

      // Update context
      if (response.nextState) {
        context.currentState = response.nextState;
      }

      // Add message to history
      const botMessage: BotMessage = {
        id: this.generateId(),
        content: message,
        timestamp: new Date(),
        type: 'text'
      };
      context.history.push(botMessage);

      // Store updated context
      this.contexts.set(contextKey, context);

      return response;

    } catch (error) {
      console.error('Error processing bot message:', error);
      return this.getErrorResponse();
    }
  }

  // Find the appropriate handler for a message
  private findHandler(message: string, context: BotContext): BotHandler | null {
    for (const [name, handler] of this.handlers) {
      if (handler.canHandle(message, context)) {
        return handler;
      }
    }
    return null;
  }

  // Create a new context
  private createContext(userId: string, conversationId: string): BotContext {
    return {
      userId,
      conversationId,
      currentState: {
        currentFlow: 'welcome',
        step: 0,
        data: {}
      },
      history: []
    };
  }

  // Get default response when no handler is found
  private getDefaultResponse(): BotResponse {
    return {
      messages: [{
        id: this.generateId(),
        content: "I'm sorry, I didn't understand that. Could you please rephrase?",
        timestamp: new Date(),
        type: 'text'
      }]
    };
  }

  // Get error response
  private getErrorResponse(): BotResponse {
    return {
      messages: [{
        id: this.generateId(),
        content: "I'm experiencing some technical difficulties. Please try again later.",
        timestamp: new Date(),
        type: 'text'
      }]
    };
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get context for a user/conversation
  public getContext(userId: string, conversationId: string): BotContext | undefined {
    const contextKey = `${userId}_${conversationId}`;
    return this.contexts.get(contextKey);
  }

  // Update context
  public updateContext(userId: string, conversationId: string, updates: Partial<BotContext>): void {
    const contextKey = `${userId}_${conversationId}`;
    const context = this.contexts.get(contextKey);
    if (context) {
      this.contexts.set(contextKey, { ...context, ...updates });
    }
  }

  // Clear context (useful for resetting conversation)
  public clearContext(userId: string, conversationId: string): void {
    const contextKey = `${userId}_${conversationId}`;
    this.contexts.delete(contextKey);
  }
}