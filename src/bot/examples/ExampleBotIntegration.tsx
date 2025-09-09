// Example: How to add bot functionality to existing ChatDetail.tsx

import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBotIntegration } from '../../../hooks/useBotIntegration';
import BotMessage from '../../../components/BotMessage';

// Add this to your existing ChatDetail component
const ExampleBotIntegration = ({ userId, conversationId }) => {
  const [showBot, setShowBot] = useState(false);
  
  const {
    botMessages,
    isProcessing,
    sendToBotAsync,
    initializeBotConversation
  } = useBotIntegration({
    userId,
    conversationId,
    enabled: true
  });

  const handleBotToggle = async () => {
    if (!showBot && botMessages.length === 0) {
      await initializeBotConversation();
    }
    setShowBot(!showBot);
  };

  const handleQuickHelp = async (topic: string) => {
    await sendToBotAsync(`help with ${topic}`);
  };

  return (
    <View>
      {/* Bot Toggle Button */}
      <TouchableOpacity 
        onPress={handleBotToggle}
        className="bg-pink-500 p-3 rounded-full absolute top-4 right-4 z-10"
      >
        <Ionicons name="chatbubble" size={20} color="white" />
      </TouchableOpacity>

      {/* Bot Interface */}
      {showBot && (
        <View className="bg-gray-50 p-4 rounded-lg mb-4">
          <Text className="font-bold text-lg mb-3">Dating Assistant</Text>
          
          {/* Quick Help Buttons */}
          <View className="flex-row flex-wrap gap-2 mb-4">
            <TouchableOpacity 
              onPress={() => handleQuickHelp('profile')}
              className="bg-pink-500 px-3 py-2 rounded-full"
            >
              <Text className="text-white text-sm">Profile Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleQuickHelp('conversation')}
              className="bg-blue-500 px-3 py-2 rounded-full"
            >
              <Text className="text-white text-sm">Conversation Starters</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleQuickHelp('matching')}
              className="bg-green-500 px-3 py-2 rounded-full"
            >
              <Text className="text-white text-sm">Matching Tips</Text>
            </TouchableOpacity>
          </View>

          {/* Bot Messages */}
          {botMessages.map((message) => (
            <BotMessage 
              key={message.id} 
              message={message}
              onSuggestionPress={(suggestion) => {
                // Handle suggestion press - could send to chat or bot
                console.log('Suggestion pressed:', suggestion);
              }}
            />
          ))}

          {/* Processing Indicator */}
          {isProcessing && (
            <Text className="text-gray-500 italic">Bot is thinking...</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ExampleBotIntegration;

// Usage in your existing ChatDetail component:
/*
import ExampleBotIntegration from './ExampleBotIntegration';

// In your ChatDetail component:
<SafeAreaView className="flex-1 bg-white">
  {/* Your existing chat UI */}
  
  {/* Add bot integration */}
  <ExampleBotIntegration 
    userId={user?._id} 
    conversationId={convId} 
  />
  
  {/* Your existing chat input */}
</SafeAreaView>
*/