import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// Define the type for FAQ items
interface FAQItem {
  id: string;
  question: string;
  answer?: string; // Optional answer field for expand/collapse functionality
}

// Sample FAQ data
const faqData: FAQItem[] = [
  { id: '1', question: 'How to swipe & match?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: '2', question: 'How do I edit my profile?' },
  { id: '3', question: 'How to get more likes?' },
  { id: '4', question: 'How to get more matches?' },
  { id: '5', question: "I'm out of profiles to swipe through?" },
  { id: '6', question: 'How not to miss new message?' },
];

// Define the props for the FAQ item component
interface FAQItemProps {
  item: FAQItem;
}

const HelpCenterScreen: React.FC = () => {
  // Render each FAQ item
  const renderFAQItem = ({ item }: FAQItemProps) => (
    <View className="bg-white rounded-lg p-4 mb-3 shadow-md">
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-bold text-black">{item.question}</Text>
        <Text className="text-purple text-base">▼</Text>
      </View>
      {item.answer && <Text className="text-sm text-gray-600 mt-2">{item.answer}</Text>}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity>
          <Text className="text-2xl text-black mr-4">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">Help Center</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white px-4 py-2">
        <View className="flex-1 items-center py-2 border-b-2 border-purple">
          <Text className="text-base font-bold text-black">FAQ</Text>
        </View>
        <View className="flex-1 items-center py-2">
          <Text className="text-base text-gray-500">Support</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="p-4 bg-white">
        <TextInput
          className="bg-gray-200 rounded-lg p-3 text-base text-black"
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      {/* FAQ List */}
      <FlatList
        data={faqData}
        renderItem={renderFAQItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default HelpCenterScreen;