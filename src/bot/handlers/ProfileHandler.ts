import { BotHandler, BotContext, BotResponse, BotMessage } from '../types';

export class ProfileHandler implements BotHandler {
  canHandle(message: string, context: BotContext): boolean {
    const profileKeywords = ['profile', 'bio', 'photo', 'picture', 'avatar', 'about me', 'description'];
    const lowerMessage = message.toLowerCase();
    
    return profileKeywords.some(keyword => lowerMessage.includes(keyword)) ||
           context.currentState?.currentFlow === 'profile_setup';
  }

  async handle(message: string, context: BotContext): Promise<BotResponse> {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('help') || lowerMessage.includes('tips')) {
      return this.getProfileTips();
    }

    if (lowerMessage.includes('photo') || lowerMessage.includes('picture')) {
      return this.getPhotoAdvice();
    }

    if (lowerMessage.includes('bio') || lowerMessage.includes('description')) {
      return this.getBioAdvice();
    }

    return this.getGeneralProfileHelp();
  }

  private getProfileTips(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Here are some great profile tips to attract more matches! ✨`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `📸 Photo Tips:\n• Use recent, high-quality photos\n• Include a clear face shot as your main photo\n• Show your interests and hobbies\n• Smile genuinely - it's attractive!`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `✍️ Bio Tips:\n• Be authentic and genuine\n• Mention your interests and hobbies\n• Add a touch of humor if that's your style\n• Keep it positive and upbeat`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getPhotoAdvice(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Great photo advice coming up! 📸`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Photo Do's:\n• Natural lighting is your friend\n• Show your face clearly in the main photo\n• Include full-body photos\n• Action shots of hobbies are great\n• Group photos (but not as main photo)`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Photo Don'ts:\n• Avoid heavily filtered photos\n• Don't use group photos as main pic\n• Skip the sunglasses in main photo\n• Avoid mirror selfies\n• No ex-partners in photos`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getBioAdvice(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Let me help you craft an amazing bio! ✍️`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Bio Structure:\n1. Start with something interesting about you\n2. Mention 2-3 hobbies or interests\n3. Add what you're looking for\n4. End with a conversation starter`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Example: "Adventure seeker who loves hiking and trying new cuisines 🥾🍜 Looking for someone to explore the city with and maybe share some laughs. What's your favorite hidden gem restaurant?"`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getGeneralProfileHelp(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `I'm here to help optimize your profile! What specific area would you like help with?`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `I can help with:\n• "photo tips" - Photo selection advice\n• "bio help" - Writing your bio\n• "profile tips" - General profile optimization\n• "interests" - Choosing the right interests`,
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

export default new ProfileHandler();