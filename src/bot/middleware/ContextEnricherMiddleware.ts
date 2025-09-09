import { BotMiddleware, BotContext } from '../types';

export class ContextEnricherMiddleware implements BotMiddleware {
  async process(message: string, context: BotContext): Promise<BotContext> {
    // Enrich context with user profile if not already present
    if (!context.userProfile) {
      const profile = await this.fetchUserProfile(context.userId);
      if (profile) {
        context.userProfile = profile;
      }
    }

    // Add message analysis
    const currentState = context.currentState || {
      currentFlow: 'welcome' as const,
      step: 0,
      data: {}
    };

    context.currentState = {
      ...currentState,
      data: {
        ...currentState.data,
        lastMessage: message,
        messageTimestamp: new Date(),
        messageLength: message.length,
        containsEmoji: this.containsEmoji(message),
        sentiment: this.analyzeSentiment(message)
      }
    };

    return context;
  }

  private async fetchUserProfile(userId: string) {
    try {
      // This would integrate with your existing user API
      // For now, return a mock profile
      return {
        id: userId,
        name: 'User',
        interests: []
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  private containsEmoji(text: string): boolean {
    const emojiRegex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
    return emojiRegex.test(text);
  }

  private analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['good', 'great', 'awesome', 'love', 'like', 'happy', 'excited', 'wonderful', 'amazing', 'fantastic'];
    const negativeWords = ['bad', 'hate', 'sad', 'angry', 'terrible', 'awful', 'disappointed', 'frustrated', 'annoying'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
}

export default new ContextEnricherMiddleware();