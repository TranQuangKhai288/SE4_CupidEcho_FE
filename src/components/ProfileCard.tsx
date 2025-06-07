import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";

interface ProfileCardProps {
  _id: string;
  userId: string;
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
  userId,
  name,
  age,
  zodiac,
  imageUrl,
  height = 320,
  width = 224,
  actions,
}: ProfileCardProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePressCard = () => {
    navigation.navigate("ProfileUserDetail", { userId: userId });
  };

  return (
    <TouchableOpacity
      className="relative rounded-[16px] overflow-hidden shadow-lg"
      style={{
        width: width,
        height: height,
      }}
      onPress={handlePressCard}
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-full object-cover"
        resizeMode="cover"
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
        <View className="absolute bottom-4 left-4 right-4">
          <Text className="text-white text-2xl font-bold mb-1">
            {name}, {age}
          </Text>
          <Text className="text-white text-sm opacity-90 mb-2">{zodiac}</Text>

          {actions && <View>{actions}</View>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ProfileCard;
