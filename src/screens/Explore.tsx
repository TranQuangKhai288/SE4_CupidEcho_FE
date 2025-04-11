import React from "react";
import { View, Text, Button, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

const ExploreScreen: React.FC = ({}) => {
  const handleHome = () => {
    console.log("Login");
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 '>
        <View className='flex-row gap-3 items-center'>
          <Image
            source={require("../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className='text-3xl font-bold'>CupidEcho</Text>
        </View>
      </View>
    </View>
  );
};

export default ExploreScreen;
