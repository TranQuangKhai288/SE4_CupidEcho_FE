import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SwipeCard from "../../components/SwipeCard";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type ExploreDetailRouteProp = RouteProp<RootStackParamList, "ExploreDetail">;

const ExploreDetail = () => {
  const route = useRoute<ExploreDetailRouteProp>();
  const { title } = route.params ?? { title: "CupidEcho" };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 '>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-3xl font-bold'>{title}</Text>
        </View>
      </View>
      <SwipeCard />
    </View>
  );
};

export default ExploreDetail;
