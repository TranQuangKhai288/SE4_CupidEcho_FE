import { useState, useCallback, useEffect } from 'react';
import { botManager } from '../bot';
import { BotMessage, BotResponse } from '../bot/types';

interface UseBotIntegrationProps {
  userId: string;
  conversationId: string;
  enabled?: boolean;
}

interface UseBotIntegrationReturn {
  botMessages: BotMessage[];
  isProcessing: boolean;
  sendToBotAsync: (message: string) => Promise<BotResponse>;
  shouldShowBot: (message: string) => boolean;
  clearBotHistory: () => void;
  initializeBotConversation: () => Promise<void>;
  botStats: any;
}

export const useBotIntegration = ({
  userId,
  conversationId,
  enabled = true
}: UseBotIntegrationProps): UseBotIntegrationReturn => {
  const [botMessages, setBotMessages] = useState<BotMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize bot on mount
  useEffect(() => {
    if (enabled) {
      botManager.initialize().catch(console.error);
    }
  }, [enabled]);

  // Send message to bot
  const sendToBotAsync = useCallback(async (message: string): Promise<BotResponse> => {
    if (!enabled) {
      throw new Error('Bot integration is disabled');
    }

    setIsProcessing(true);
    
    try {
      const response = await botManager.processMessage(message, userId, conversationId);
      
      // Add bot responses to local state
      if (response.messages && response.messages.length > 0) {
        setBotMessages(prev => [...prev, ...response.messages]);
      }
      
      return response;
    } catch (error) {
      console.error('Error processing bot message:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [enabled, userId, conversationId]);

  // Check if message should trigger bot response
  const shouldShowBot = useCallback((message: string): boolean => {
    if (!enabled) return false;
    return botManager.shouldHandleMessage(message, conversationId);
  }, [enabled, conversationId]);

  // Clear bot conversation history
  const clearBotHistory = useCallback(() => {
    setBotMessages([]);
    botManager.clearBotContext(userId, conversationId);
  }, [userId, conversationId]);

  // Initialize a new bot conversation
  const initializeBotConversation = useCallback(async () => {
    if (!enabled) return;
    
    try {
      const response = await botManager.startBotConversation(userId);
      if (response.messages && response.messages.length > 0) {
        setBotMessages(response.messages);
      }
    } catch (error) {
      console.error('Error initializing bot conversation:', error);
    }
  }, [enabled, userId]);

  // Get bot statistics
  const botStats = botManager.getBotStats();

  return {
    botMessages,
    isProcessing,
    sendToBotAsync,
    shouldShowBot,
    clearBotHistory,
    initializeBotConversation,
    botStats
  };
};