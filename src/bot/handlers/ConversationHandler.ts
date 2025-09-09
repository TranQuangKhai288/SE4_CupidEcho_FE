import { BotHandler, BotContext, BotResponse, BotMessage } from '../types';

export class ConversationHandler implements BotHandler {
  canHandle(message: string, context: BotContext): boolean {
    const conversationKeywords = ['conversation', 'chat', 'talk', 'message', 'say', 'starter', 'icebreaker', 'first message'];
    const lowerMessage = message.toLowerCase();
    
    return conversationKeywords.some(keyword => lowerMessage.includes(keyword)) ||
           context.currentState?.currentFlow === 'conversation_starter';
  }

  async handle(message: string, context: BotContext): Promise<BotResponse> {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('starter') || lowerMessage.includes('icebreaker')) {
      return this.getConversationStarters();
    }

    if (lowerMessage.includes('first message')) {
      return this.getFirstMessageAdvice();
    }

    if (lowerMessage.includes('keep going') || lowerMessage.includes('continue')) {
      return this.getConversationTips();
    }

    if (lowerMessage.includes('flirt') || lowerMessage.includes('romantic')) {
      return this.getFlirtingTips();
    }

    return this.getGeneralConversationHelp();
  }

  private getConversationStarters(): BotResponse {
    const starters = [
      "I noticed you're into [hobby/interest]. What got you started with that?",
      "Your travel photos are amazing! What's been your favorite destination so far?",
      "I see we both love [shared interest]. Have you tried [related activity]?",
      "That photo of you [doing activity] looks fun! How long have you been into that?",
      "I have to ask - what's the story behind that [specific photo detail]?",
      "Fellow [profession/hobby] here! What's the best part about it for you?",
      "I'm curious - what's something you've learned recently that excited you?",
      "Your bio mentions [interest]. I'm thinking of trying that - any beginner tips?"
    ];

    const randomStarters = this.getRandomItems(starters, 4);

    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Here are some personalized conversation starters! 🗣️`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Great conversation starters:\n\n${randomStarters.map((starter, index) => `${index + 1}. ${starter}`).join('\n\n')}`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `💡 Pro tip: Personalize these based on their profile! Reference specific photos or interests they've mentioned.`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getFirstMessageAdvice(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Crafting the perfect first message! ✍️`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `First Message Formula:\n• Start with something from their profile\n• Ask an open-ended question\n• Keep it light and positive\n• Show genuine interest\n• Be yourself!`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `❌ Avoid: "Hey", "What's up?", generic compliments\n✅ Try: Specific questions about their interests, thoughtful observations, friendly humor`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Want me to suggest some conversation starters? Just ask! 😊`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getConversationTips(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `Keep the conversation flowing! 🌊`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Conversation Flow Tips:\n• Ask follow-up questions\n• Share similar experiences\n• Use active listening\n• Balance asking and sharing\n• Show genuine curiosity`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Topic Ideas:\n🎬 Movies & TV shows\n🎵 Music & concerts\n🍕 Food & restaurants\n✈️ Travel experiences\n🎨 Hobbies & interests\n📚 Books & learning`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getFlirtingTips(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `A little flirting can be fun! 😉`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Subtle Flirting Tips:\n• Playful teasing (keep it light)\n• Genuine compliments\n• Use emojis sparingly\n• Create inside jokes\n• Show interest in their thoughts`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `Remember: Respect boundaries, read the room, and keep it classy! Confidence is attractive, but being pushy isn't. 💫`,
        timestamp: new Date(),
        type: 'text'
      }
    ];

    return { messages };
  }

  private getGeneralConversationHelp(): BotResponse {
    const messages: BotMessage[] = [
      {
        id: this.generateId(),
        content: `I'm here to help with all your conversation needs! 💬`,
        timestamp: new Date(),
        type: 'text'
      },
      {
        id: this.generateId(),
        content: `I can help with:\n• "conversation starters" - Get icebreaker ideas\n• "first message" - Tips for opening lines\n• "keep talking" - How to maintain conversations\n• "flirting tips" - Subtle ways to show interest`,
        timestamp: new Date(),
        type: 'suggestion'
      }
    ];

    return { messages };
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export default new ConversationHandler();