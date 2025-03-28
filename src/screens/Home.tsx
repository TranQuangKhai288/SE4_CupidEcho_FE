import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

const HomeScreen: React.FC = ({}) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className='text-primary-main'>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
