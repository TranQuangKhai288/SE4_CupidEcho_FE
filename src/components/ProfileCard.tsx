import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ProfileCardProps {
  name: string;
  age: number;
  profession: string;
  imageUrl: string;
  height?: number;
  width?: number;
}

const ProfileCard = ({
  name,
  age,
  profession,
  imageUrl,
  height = 320, // Default height of 320px
  width = 224, // Default width of 224px 
}: ProfileCardProps) => {
  return (
    <View
      className='relative rounded-[36px] overflow-hidden shadow-lg'
      style={{
        width: width,
        height: height,
      }}
    >
      <Image
        source={{ uri: imageUrl }}
        className='w-full h-full object-cover'
        resizeMode='cover'
      />

      <LinearGradient
        colors={[
          "rgba(138, 43, 226, 0)",
          "rgba(138, 43, 226, 0.3)",
          "rgba(138, 43, 226, 0.6)",
          "rgba(138, 43, 226, 0.9)",
          "rgba(138, 43, 226, 1)",
        ]}
        className='absolute bottom-0 left-0 right-0 h-1/2'
      >
        <View className='absolute bottom-4 left-4'>
          <Text className='text-white text-2xl font-bold mb-1'>
            {name}, {age}
          </Text>
          <Text className='text-white text-sm opacity-90 mb-2'>
            {profession}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileCard;
