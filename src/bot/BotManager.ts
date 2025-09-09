import { CupidEchoBotController } from './controllers/CupidEchoBotController';
import ContextEnricherMiddleware from './middleware/ContextEnricherMiddleware';
import { BotResponse, BotMessage } from './types';
import BotUtils from './utils/BotUtils';

export class BotManager {
  private static instance: BotManager;
  private botController: CupidEchoBotController;
  private isInitialized: boolean = false;

  private constructor() {
    this.botController = new CupidEchoBotController();
  }

  // Singleton pattern
  public static getInstance(): BotManager {
    if (!BotManager.instance) {
      BotManager.instance = new BotManager();
    }
    return BotManager.instance;
  }

  // Initialize the bot
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Register middleware
      this.botController.registerMiddleware(ContextEnricherMiddleware);

      this.isInitialized = true;
      console.log('CupidEcho Bot initialized successfully');
    } catch (error) {
      console.error('Failed to initialize bot:', error);
      throw error;
    }
  }

  // Process a message from a user
  public async processMessage(
    message: string,
    userId: string,
    conversationId: string
  ): Promise<BotResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Validate message
    if (!BotUtils.validateMessage(message)) {
      return this.getInvalidMessageResponse();
    }

    // Clean message
    const cleanedMessage = BotUtils.cleanMessage(message);

    // Check for profanity
    if (BotUtils.containsProfanity(cleanedMessage)) {
      return this.getProfanityResponse();
    }

    try {
      return await this.botController.processMessage(cleanedMessage, userId, conversationId);
    } catch (error) {
      console.error('Error processing message:', error);
      return this.getErrorResponse();
    }
  }

  // Check if a message should be handled by the bot
  public shouldHandleMessage(message: string, conversationId: string): boolean {
    const lowerMessage = message.toLowerCase();
    
    // Bot keywords that trigger bot responses
    const botTriggers = [
      'bot', 'help', 'advice', 'tip', 'suggestion', 'guide',
      'what should', 'how do i', 'can you', 'please help',
      'dating advice', 'conversation starter', 'profile help'
    ];

    // Check if it's a direct bot conversation
    if (conversationId.includes('bot_')) {
      return true;
    }

    // Check for bot trigger keywords
    return botTriggers.some(trigger => lowerMessage.includes(trigger));
  }

  // Get bot context for a conversation
  public getBotContext(userId: string, conversationId: string) {
    return this.botController.getContext(userId, conversationId);
  }

  // Update bot context
  public updateBotContext(userId: string, conversationId: string, updates: any) {
    this.botController.updateContext(userId, conversationId, updates);
  }

  // Clear bot context (reset conversation)
  public clearBotContext(userId: string, conversationId: string) {
    this.botController.clearContext(userId, conversationId);
  }

  // Start a new bot conversation
  public async startBotConversation(userId: string): Promise<BotResponse> {
    const botConversationId = `bot_${userId}_${Date.now()}`;
    return await this.processMessage('hello', userId, botConversationId);
  }

  // Get available bot commands
  public getBotCommands(): string[] {
    return [
      'help profile - Get profile optimization tips',
      'find matches - Learn about finding compatible matches',
      'conversation tips - Get conversation starters and advice',
      'dating advice - General dating and relationship advice',
      'photo tips - Advice for choosing great profile photos',
      'bio help - Tips for writing an engaging bio'
    ];
  }

  // Check if bot is available
  public isAvailable(): boolean {
    return this.isInitialized;
  }

  // Get bot statistics
  public getBotStats() {
    // This could be expanded to track more detailed statistics
    return {
      initialized: this.isInitialized,
      availableCommands: this.getBotCommands().length,
      version: '1.0.0'
    };
  }

  private getInvalidMessageResponse(): BotResponse {
    return {
      messages: [
        BotUtils.createTextMessage("I'm sorry, but that message seems to be invalid. Could you please try again?")
      ]
    };
  }

  private getProfanityResponse(): BotResponse {
    return {
      messages: [
        BotUtils.createTextMessage("Let's keep our conversation friendly and respectful! How can I help you with your dating journey? 😊")
      ]
    };
  }

  private getErrorResponse(): BotResponse {
    return {
      messages: [
        BotUtils.createTextMessage("I'm experiencing some technical difficulties right now. Please try again in a moment! 🤖")
      ]
    };
  }
}

// Export singleton instance
export const botManager = BotManager.getInstance();
export default botManager;