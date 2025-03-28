// src/screens/Auth/MapsScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

const MapsScreen: React.FC = ({}) => {
  const handleHome = () => {
    console.log("Login");
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Map Screen</Text>
      <Button title='Click' onPress={handleHome} />
    </View>
  );
};

export default MapsScreen;
