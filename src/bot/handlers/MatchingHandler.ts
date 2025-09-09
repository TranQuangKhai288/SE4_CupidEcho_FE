import { BotHandler, BotContext, BotResponse, BotMessage } from '../types';

export class MatchingHandler implements BotHandler {
  canHandle(message: string, context: BotContext): boolean {
    const matchKeywords = ['match', 'find', 'discover', 'compatible', 'partner', 'dating', 'relationship'];
    const lowerMessage = message.toLowerCase();
    
    return matchKeywords.some(keyword => lowerMessage.includes(keyword)) ||
           context.currentState?.currentFlow === 'matching_suggestions';
  }

  async handle(message: string, context: BotContext): Promise<BotResponse> {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('find') || lowerMessage.includes('discover')) {
      return this.getMatchingTips();
    }

    if (lowerMessage.includes('compatible') || lowerMessage.includes('compatibility')) {
      return this.getCompatibilityAdvice();
    }

    if (lowerMessage.includes('preferences') || lowerMessage.includes('settings')) {
      return this.getPreferencesHelp();
    }

    return this.getGeneralMatchingHelp();
  }

  private getMatchingTips(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Let me help you find better matches! 💕`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `🎯 Matching Tips:\n• Be open-minded about age ranges\n• Consider expanding your distance radius\n• Look beyond just photos - read profiles\n• Check shared interests and values\n• Don't judge too quickly`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `💡 Pro Tip: Quality over quantity! It's better to have meaningful conversations with fewer matches than superficial chats with many.`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return {
      messages,
      actions: [
        {
          type: 'show_suggestions',
          payload: { type: 'explore_matches' }
        }
      ]
    };
  }

  private getCompatibilityAdvice(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Understanding compatibility is key to lasting relationships! 🔍`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Look for compatibility in:\n• Core values and beliefs\n• Life goals and ambitions\n• Communication styles\n• Lifestyle preferences\n• Sense of humor\n• Interests (some shared, some different)`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Remember: Opposites can attract, but shared values create lasting bonds! 💪`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getPreferencesHelp(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Let's optimize your matching preferences! ⚙️`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Preference Tips:\n• Age Range: Consider +/- 5 years from your age\n• Distance: Start with 25-50 miles/km\n• Interests: Select 5-8 genuine interests\n• Deal-breakers: Keep them reasonable and important`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Would you like me to help you review your current preferences?`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return {
      messages,
      actions: [
        {
          type: 'navigate',
          payload: { screen: 'preferences' }
        }
      ]
    };
  }

  private getGeneralMatchingHelp(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `I can help you improve your matching experience! What would you like to know about?`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Ask me about:\n• "find matches" - Tips for discovering people\n• "compatibility" - What makes people compatible\n• "preferences" - Optimizing your settings\n• "red flags" - What to watch out for`,
        timestamp: new Date(),
        type: 'suggestion'
      }
    ];

    return { messages };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export default new MatchingHandler();