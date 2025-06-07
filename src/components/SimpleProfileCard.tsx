import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigation";

interface SimpleProfileCardProps {
  id: string;
  userId: string;
  name: string;
  age: number;
  imageUrl: string;
}

const SimpleProfileCard = ({
  id,
  userId,
  name,
  age,
  imageUrl,
}: SimpleProfileCardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePressCard = () => {
    navigation.navigate("ProfileUserDetail", { userId: userId });
  };

  return (
    <TouchableOpacity onPress={handlePressCard}>
      <View className="rounded-[24px] overflow-hidden w-[140px] h-[180px] shadow-lg">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full object-cover"
          resizeMode="cover"
        />
      </View>
      <View className="flex items-center text-center mt-2">
        <Text className="text-black text-xl font-bold ">{name}</Text>
        <Text className="text-black text-base font-semibold "> {age}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleProfileCard;
