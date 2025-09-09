import { BotHandler, BotContext, BotResponse, BotMessage } from '../types';

export class WelcomeHandler implements BotHandler {
  canHandle(message: string, context: BotContext): boolean {
    const welcomeKeywords = ['hello', 'hi', 'hey', 'start', 'begin', 'welcome'];
    const lowerMessage = message.toLowerCase();
    
    // Handle if it's a welcome keyword or if user is in welcome flow
    return welcomeKeywords.some(keyword => lowerMessage.includes(keyword)) ||
           context.currentState?.currentFlow === 'welcome';
  }

  async handle(message: string, context: BotContext): Promise<BotResponse> {
    const step = context.currentState?.step || 0;

    switch (step) {
      case 0:
        return this.getWelcomeMessage(context);
      case 1:
        return this.getFeatureIntroduction(context);
      case 2:
        return this.getNextStepsMessage(context);
      default:
        return this.getWelcomeMessage(context);
    }
  }

  private getWelcomeMessage(context: BotContext): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Hello! 👋 Welcome to CupidEcho! I'm your dating assistant bot, here to help you find meaningful connections.`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `I can help you with:\n• Setting up your profile\n• Finding compatible matches\n• Starting conversations\n• Dating advice and tips`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return {
      messages,
      nextState: {
        currentFlow: 'welcome',
        step: 1,
        data: {}
      }
    };
  }

  private getFeatureIntroduction(context: BotContext): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Let me show you what I can do! Type any of these commands to get started:`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `🔹 "help profile" - Get help with your profile\n🔹 "find matches" - Discover potential matches\n🔹 "conversation tips" - Get conversation starters\n🔹 "dating advice" - Get relationship advice`,
        timestamp: new Date(),
        type: 'suggestion'
      }
    ];

    return {
      messages,
      nextState: {
        currentFlow: 'welcome',
        step: 2,
        data: {}
      }
    };
  }

  private getNextStepsMessage(context: BotContext): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Great! I'm here whenever you need help. Just type what you need assistance with, and I'll do my best to help you! 💕`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return {
      messages,
      nextState: {
        currentFlow: 'help',
        step: 0,
        data: {}
      }
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export default new WelcomeHandler();