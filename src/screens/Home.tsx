import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SlidersHorizontal } from "lucide-react-native";
import SwipeCard from "../components/SwipeCard";
import { useAuth } from "../contexts/AuthContext";

const HomeScreen: React.FC = ({}) => {
  const { state } = useAuth();
  const { user } = state;

  return (
    <View className="flex-1 bg-white pt-6 px-6">
      <View className="flex-row justify-between items-center py-3">
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: user?.avatar }}
            className="w-14 h-14 rounded-full"
          />
          <View>
            <Text className="text-gray-500 text-base">Good Morning 👋</Text>
            <Text className="text-lg font-bold text-black">{user?.name}</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2 ">
          <SlidersHorizontal size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <SwipeCard />
      </View>
    </View>
  );
};

export default HomeScreen;
