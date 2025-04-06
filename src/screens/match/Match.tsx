// src/screens/Auth/MatchScreen.tsx
import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome, Feather } from "@expo/vector-icons";
import NewMatch from "./NewMatch";
import YourMatch from "./YourMatch";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";

const MatchScreen: React.FC = ({}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className='flex-1 bg-white pt-6 px-6'>
      <View className='flex-row justify-between items-center  py-3 '>
        <View className='flex-row gap-3 items-center'>
          <Image
            source={require("../../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className='text-3xl font-bold'>Match</Text>
        </View>
        <View className='flex-row gap-5 items-center'>
          <TouchableOpacity>
            <Feather name='search' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("FindAMatch")}>
            <Feather name='more-horizontal' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <NewMatch />
      <YourMatch />
    </View>
  );
};

export default MatchScreen;
