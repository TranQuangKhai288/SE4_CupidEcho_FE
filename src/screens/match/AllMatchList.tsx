// src/screens/Auth/MapsScreen.tsx
import React from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import NewMatch from "./NewMatch";
import YourMatch from "./YourMatch";

const AllMatchListScreen: React.FC = ({}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center  py-3 '>
        <View className='flex-row gap-5 items-center'>
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-3xl font-bold'>Match</Text>
        </View>
      </View>
      <NewMatch />
      <YourMatch />
    </View>
  );
};

export default AllMatchListScreen;
