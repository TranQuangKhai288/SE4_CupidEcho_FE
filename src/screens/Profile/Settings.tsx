import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  User,
  Search,
  Lock,
  Bell,
  Shield,
  Database,
  MessageSquare,
  Globe,
  Info,
} from "lucide-react-native";

// Define navigation param list
type RootStackParamList = {
  PersonalInfo: undefined;
  DiscoverySettings: undefined;
  PrivacyPermissions: undefined;
  Notifications: undefined;
  Security: undefined;
  DataStorage: undefined;
  Feedback: undefined;
  Language: undefined;
  AboutHume: undefined;
};

interface SettingItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  screen: keyof RootStackParamList;
  extra?: string;
  iconColor: string;
}

const settingsData: SettingItem[] = [
  {
    id: "1",
    title: "Personal Information",
    icon: User,
    screen: "PersonalInfo",
    iconColor: "#8B5CF6",
  }, // Purple
  {
    id: "2",
    title: "Discovery Settings",
    icon: Search,
    screen: "DiscoverySettings",
    iconColor: "#F59E0B",
  }, // Orange
  {
    id: "3",
    title: "Privacy & Permissions",
    icon: Lock,
    screen: "PrivacyPermissions",
    iconColor: "#3B82F6",
  }, // Blue
  {
    id: "4",
    title: "Notifications",
    icon: Bell,
    screen: "Notifications",
    iconColor: "#EF4444",
  }, // Red
  {
    id: "5",
    title: "Security",
    icon: Shield,
    screen: "Security",
    iconColor: "#10B981",
  }, // Green
  {
    id: "6",
    title: "Data & Storage",
    icon: Database,
    screen: "DataStorage",
    iconColor: "#FBBF24",
  }, // Yellow
  {
    id: "7",
    title: "Feedback",
    icon: MessageSquare,
    screen: "Feedback",
    iconColor: "#6B7280",
  }, // Gray
  {
    id: "8",
    title: "Language",
    icon: Globe,
    screen: "Language",
    extra: "ENGLISH (US)",
    iconColor: "#3B82F6",
  }, // Blue
  {
    id: "9",
    title: "About Hume",
    icon: Info,
    screen: "AboutHume",
    iconColor: "#6B7280",
  }, // Gray
];

const SettingsScreen: React.FC = () => {
  const renderItem = ({ item }: { item: SettingItem }) => (
    <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-200">
      {/* Icon Container */}
      <View className="w-10 h-10 rounded-full bg-gray-200 justify-center items-center mr-4">
        <item.icon color={item.iconColor} size={24} />
      </View>

      {/* Title and Extra Text */}
      <View className="flex-1">
        <Text className="text-base font-medium text-black">{item.title}</Text>
        {item.extra && (
          <Text className="text-sm text-gray-500">{item.extra}</Text>
        )}
      </View>

      {/* Right Arrow */}
      <View className="w-6 h-6 justify-center items-center">
        <Text className="text-black text-xl">{">"}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default SettingsScreen;
