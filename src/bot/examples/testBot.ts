// Simple test to verify bot functionality
import { botManager } from '../bot';

export const testBotIntegration = async () => {
  try {
    console.log('Testing CupidEcho Bot Integration...');
    
    // Initialize bot
    await botManager.initialize();
    console.log('✅ Bot initialized successfully');
    
    // Test welcome message
    const welcomeResponse = await botManager.processMessage(
      'hello',
      'test-user-123',
      'test-conversation-456'
    );
    console.log('✅ Welcome response:', welcomeResponse.messages[0]?.content);
    
    // Test profile help
    const profileResponse = await botManager.processMessage(
      'help with my profile',
      'test-user-123',
      'test-conversation-456'
    );
    console.log('✅ Profile help response:', profileResponse.messages[0]?.content);
    
    // Test conversation starters
    const conversationResponse = await botManager.processMessage(
      'conversation starters',
      'test-user-123',
      'test-conversation-456'
    );
    console.log('✅ Conversation starters:', conversationResponse.messages[0]?.content);
    
    // Test bot commands
    const commands = botManager.getBotCommands();
    console.log('✅ Available commands:', commands.length);
    
    // Test bot stats
    const stats = botManager.getBotStats();
    console.log('✅ Bot stats:', stats);
    
    console.log('🎉 All bot tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Bot test failed:', error);
    return false;
  }
};

// Export for use in development
export default testBotIntegration;