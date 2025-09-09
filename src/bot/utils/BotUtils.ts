import { BotMessage } from '../types';

export class BotUtils {
  // Generate unique ID for messages
  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Create a text message
  static createTextMessage(content: string): BotMessage {
    return {
      id: this.generateId(),
      content,
      timestamp: new Date(),
      type: 'text'
    };
  }

  // Create a suggestion message
  static createSuggestionMessage(content: string): BotMessage {
    return {
      id: this.generateId(),
      content,
      timestamp: new Date(),
      type: 'suggestion'
    };
  }

  // Create an action message
  static createActionMessage(content: string, metadata?: Record<string, any>): BotMessage {
    return {
      id: this.generateId(),
      content,
      timestamp: new Date(),
      type: 'action',
      metadata
    };
  }

  // Extract keywords from message
  static extractKeywords(message: string): string[] {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    
    return message
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
  }

  // Calculate message similarity
  static calculateSimilarity(message1: string, message2: string): number {
    const keywords1 = this.extractKeywords(message1);
    const keywords2 = this.extractKeywords(message2);
    
    const commonKeywords = keywords1.filter(keyword => keywords2.includes(keyword));
    const totalKeywords = new Set([...keywords1, ...keywords2]).size;
    
    return totalKeywords > 0 ? commonKeywords.length / totalKeywords : 0;
  }

  // Format time for display
  static formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }

  // Validate message content
  static validateMessage(content: string): boolean {
    if (!content || typeof content !== 'string') return false;
    if (content.trim().length === 0) return false;
    if (content.length > 1000) return false;
    return true;
  }

  // Clean message content
  static cleanMessage(content: string): string {
    return content
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?;:()-]/g, '');
  }

  // Get random item from array
  static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Get random items from array
  static getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  }

  // Check if message contains profanity
  static containsProfanity(message: string): boolean {
    const profanityWords = ['bad', 'word', 'list']; // Add actual profanity filter
    const lowerMessage = message.toLowerCase();
    return profanityWords.some(word => lowerMessage.includes(word));
  }

  // Escape HTML in message content
  static escapeHtml(content: string): string {
    const div = document.createElement('div');
    div.textContent = content;
    return div.innerHTML;
  }

  // Convert markdown-like syntax to formatting
  static formatMessage(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  // Check if user is typing too fast (potential spam)
  static isTypingTooFast(messages: BotMessage[], threshold: number = 3): boolean {
    if (messages.length < 2) return false;
    
    const recentMessages = messages.slice(-threshold);
    const timeSpan = recentMessages[recentMessages.length - 1].timestamp.getTime() - 
                   recentMessages[0].timestamp.getTime();
    
    return timeSpan < 5000; // Less than 5 seconds for multiple messages
  }

  // Get conversation statistics
  static getConversationStats(messages: BotMessage[]) {
    const userMessages = messages.filter(m => !m.metadata?.isBot);
    const botMessages = messages.filter(m => m.metadata?.isBot);
    
    return {
      totalMessages: messages.length,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      averageMessageLength: messages.reduce((sum, m) => sum + m.content.length, 0) / messages.length,
      conversationDuration: messages.length > 0 ? 
        messages[messages.length - 1].timestamp.getTime() - messages[0].timestamp.getTime() : 0
    };
  }
}

export default BotUtils;