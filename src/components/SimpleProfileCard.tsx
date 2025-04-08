import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SimpleProfileCardProps {
  name: string;
  age: number;
  imageUrl: string;
}

const SimpleProfileCard = ({ name, age, imageUrl }: SimpleProfileCardProps) => {
  return (
    <View>
      <View className='rounded-[24px] overflow-hidden w-[140px] h-[180px] shadow-lg'>
        <Image
          source={{ uri: imageUrl }}
          className='w-full h-full object-cover'
          resizeMode='cover'
        />
      </View>
      <View className='flex items-center text-center mt-2'>
        <Text className='text-black text-xl font-bold '>{name}</Text>
        <Text className='text-black text-base font-semibold '> {age}</Text>
      </View>
    </View>
  );
};

export default SimpleProfileCard;
