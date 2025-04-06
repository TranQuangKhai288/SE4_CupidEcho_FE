import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SlidersHorizontal } from "lucide-react-native";
import SwipeCard from "../components/SwipeCard";

const HomeScreen: React.FC = ({}) => {
  return (
    <View className='flex-1 bg-white pt-6 px-6'>
      <View className='flex-row justify-between items-center py-3'>
        <View className='flex-row items-center gap-2'>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            className='w-14 h-14 rounded-full'
          />
          <View>
            <Text className='text-gray-500 text-base'>Good Morning 👋</Text>
            <Text className='text-lg font-bold text-black'>Andrew Ainsley</Text>
          </View>
        </View>
        <TouchableOpacity className='p-2 '>
          <SlidersHorizontal size={20} color='#000' />
        </TouchableOpacity>
      </View>
      <View className='flex-1'>
        <SwipeCard />
      </View>
    </View>
  );
};

export default HomeScreen;
