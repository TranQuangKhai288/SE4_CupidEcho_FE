import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";

// Define the type for FAQ/Support items
interface HelpItem {
  id: string;
  question: string;
  answer: string;
}

// Sample FAQ data
const faqData: HelpItem[] = [
  {
    id: "1",
    question: "How to swipe & match?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    question: "How do I edit my profile?",
    answer:
      "To edit your profile, go to the profile section, tap on the edit icon, and update your details.",
  },
  {
    id: "3",
    question: "How to get more likes?",
    answer:
      "To get more likes, ensure your profile is complete, use high-quality photos, and be active on the app.",
  },
  {
    id: "4",
    question: "How to get more matches?",
    answer:
      "Be clear about your preferences, engage with others, and keep your profile updated.",
  },
  {
    id: "5",
    question: "I'm out of profiles to swipe through?",
    answer:
      "Try adjusting your preferences or check back later for new profiles.",
  },
  {
    id: "6",
    question: "How not to miss new message?",
    answer:
      "Enable notifications in your settings to get alerts for new messages.",
  },
];

// Sample Support data (similar structure to FAQ)
const supportData: HelpItem[] = [
  {
    id: "1",
    question: "How do I contact support?",
    answer:
      "You can contact us via email at support@example.com or through the in-app chat.",
  },
  {
    id: "2",
    question: "What if I encounter a bug?",
    answer:
      "Please report the bug through the app, and our team will look into it as soon as possible.",
  },
  {
    id: "3",
    question: "How do I report a user?",
    answer:
      'Go to the user’s profile, tap the three dots, and select "Report User".',
  },
  {
    id: "4",
    question: "Can I get a refund?",
    answer:
      "Refunds are handled on a case-by-case basis. Please contact support for assistance.",
  },
  {
    id: "5",
    question: "How do I delete my account?",
    answer:
      'To delete your account, go to settings, select "Account", and choose "Delete Account".',
  },
  {
    id: "6",
    question: "Why was my account suspended?",
    answer:
      "Accounts may be suspended for violating our terms of service. Please contact support for more details.",
  },
];

// Define the props for the Help item component
interface HelpItemProps {
  item: HelpItem;
  isExpanded: boolean;
  onToggle: () => void;
}

const HelpCenterScreen: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<"FAQ" | "Support">("FAQ");

  // State for expanded items (store the ID of the expanded item)
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Ref to track if the component is mounted
  const isMounted = useRef(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false when the component unmounts
    };
  }, []);

  // Toggle item expansion
  const toggleItem = (id: string) => {
    if (isMounted.current) {
      setExpandedItemId(expandedItemId === id ? null : id);
    }
  };

  // Render each help item (used for both FAQ and Support)
  const renderHelpItem = ({ item }: HelpItemProps) => {
    const isExpanded = expandedItemId === item.id;
    return (
      <TouchableOpacity
        onPress={() => toggleItem(item.id)}
        className="bg-white rounded-lg p-4 mb-3"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold text-black flex-1">
            {item.question}
          </Text>
          <Text
            className={`text-purple text-base ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ▼
          </Text>
        </View>
        {isExpanded && (
          <Text className="text-sm text-gray-600 mt-2">{item.answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  // Render tab content (for both FAQ and Support)
  const renderTabContent = (data: HelpItem[]) => (
    <>
      {/* Search Bar */}
      <View className="p-4 bg-white">
        <TextInput
          className="bg-gray-200 rounded-lg p-3 text-base text-black"
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      {/* Help List */}
      <FlatList
        data={data}
        renderItem={({ item }) =>
          renderHelpItem({
            item,
            isExpanded: expandedItemId === item.id,
            onToggle: () => toggleItem(item.id),
          })
        }
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-medium ml-4">Help Center</Text>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {/* Tabs */}
      <View className="flex-row bg-white px-4 py-2">
        <TouchableOpacity
          onPress={() => setActiveTab("FAQ")}
          className={`flex-1 items-center py-2 ${
            activeTab === "FAQ" ? "border-b-2 border-purple" : ""
          }`}
        >
          <Text
            className={`text-base ${
              activeTab === "FAQ" ? "font-bold text-black" : "text-gray-500"
            }`}
          >
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Support")}
          className={`flex-1 items-center py-2 ${
            activeTab === "Support" ? "border-b-2 border-purple" : ""
          }`}
        >
          <Text
            className={`text-base ${
              activeTab === "Support" ? "font-bold text-black" : "text-gray-500"
            }`}
          >
            Support
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === "FAQ"
        ? renderTabContent(faqData)
        : renderTabContent(supportData)}
    </SafeAreaView>
  );
};

export default HelpCenterScreen;
