import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Heart, Moon, Sun, Star, Flower, Dices } from "lucide-react-native";

export const DiscoverCard = ({
  title,
  icon,
  count,
  onPress,
}: {
  title: string;
  icon: string;
  count: string;
  onPress?: () => void;
}) => {
  const Icon = icon === "flower" ? Flower : Sun;

  return (
    <TouchableOpacity
      onPress={onPress} // 👈
      activeOpacity={0.8}
      className='bg-purple-400 rounded-xl px-5 py-8 justify-between relative'
    >
      <View className='items-center justify-center my-4'>
        <Icon color='white' size={60} />
      </View>
      <Text className='text-white text-xl font-semibold mt-4'>{title}</Text>
      <View className='bg-white/20 px-2 py-1 rounded-md absolute top-2 right-2'>
        <Text className='text-white text-xs'>{count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const PurposeCard = ({
  title,
  icon,
  count,
  bgColor,
  fullWidth = false,
  onPress,
}: {
  title: string;
  icon: string;
  count: string;
  bgColor: string;
  fullWidth?: boolean;
  onPress?: () => void;
}) => {
  let Icon;
  switch (icon) {
    case "heart":
      Icon = Heart;
      break;
    case "moon":
      Icon = Moon;
      break;
    case "sun":
      Icon = Sun;
      break;
    case "star":
      Icon = Star;
      break;
    case "dices":
      Icon = Dices;
      break;
    default:
      Icon = Sun;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`${
        fullWidth ? "w-full" : "w-[48%]"
      } rounded-xl p-4 ${bgColor} relative`}
    >
      <Icon color='white' size={32} className='mb-2' />
      <Text className='text-white text-sm font-semibold mt-1'>{title}</Text>
      <View className='absolute top-2 right-2 bg-white/20 px-2 py-1 rounded-md'>
        <Text className='text-white text-xs'>{count}</Text>
      </View>
    </TouchableOpacity>
  );
};
