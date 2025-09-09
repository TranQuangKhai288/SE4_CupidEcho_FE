import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { BotMessage as BotMessageType } from '../bot/types';
import { Ionicons } from '@expo/vector-icons';

interface BotMessageProps {
  message: BotMessageType;
  onSuggestionPress?: (suggestion: string) => void;
}

const BotMessage: React.FC<BotMessageProps> = ({ message, onSuggestionPress }) => {
  const renderMessageContent = () => {
    switch (message.type) {
      case 'suggestion':
        return (
          <View className="bg-pink-50 border border-pink-200 rounded-lg p-3">
            <Text className="text-gray-800 mb-2">{message.content}</Text>
            {message.metadata?.suggestions && (
              <View className="flex-row flex-wrap gap-2 mt-2">
                {message.metadata.suggestions.map((suggestion: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-pink-500 px-3 py-1 rounded-full"
                    onPress={() => onSuggestionPress?.(suggestion)}
                  >
                    <Text className="text-white text-sm">{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      
      case 'action':
        return (
          <View className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <Text className="text-gray-800 mb-2">{message.content}</Text>
            {message.metadata?.actionButton && (
              <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded-lg self-start"
                onPress={() => message.metadata?.onAction?.()}
              >
                <Text className="text-white font-medium">
                  {message.metadata.actionButton}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      
      default:
        return (
          <View className="bg-gray-100 rounded-lg p-3">
            <Text className="text-gray-800">{message.content}</Text>
          </View>
        );
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(timestamp);
  };

  return (
    <View className="flex-row items-start mb-4 px-2">
      {/* Bot Avatar */}
      <View className="bg-pink-500 w-8 h-8 rounded-full items-center justify-center mr-3 mt-1">
        <Ionicons name="chatbubble" size={16} color="white" />
      </View>
      
      {/* Message Content */}
      <View className="flex-1 max-w-[80%]">
        <View className="flex-row items-center mb-1">
          <Text className="text-pink-600 font-semibold text-sm mr-2">
            CupidEcho Bot
          </Text>
          <Text className="text-gray-500 text-xs">
            {formatTime(message.timestamp)}
          </Text>
        </View>
        
        {renderMessageContent()}
      </View>
    </View>
  );
};

export default BotMessage;