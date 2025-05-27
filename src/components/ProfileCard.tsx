import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ProfileCardProps {
  _id: string;
  name: string;
  age: number;
  zodiac: string;
  imageUrl: string;
  height?: number;
  width?: number;
  actions?: React.ReactNode;
}

const ProfileCard = ({
  _id,
  name,
  age,
  zodiac,
  imageUrl,
  height = 320,
  width = 224,
  actions,
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
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
        }}
      >
        <View className='absolute bottom-4 left-4 right-4'>
          <Text className='text-white text-2xl font-bold mb-1'>
            {name}, {age}
          </Text>
          <Text className='text-white text-sm opacity-90 mb-2'>{zodiac}</Text>

     
          {actions && <View className='mt-3 items-center'>{actions}</View>}
        </View>
      </LinearGradient>
    </View>
  );
};

export default ProfileCard;
