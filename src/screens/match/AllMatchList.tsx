// src/screens/Auth/MapsScreen.tsx
import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import PendingMatches from "./PendingMatches";
import YourMatched from "./YourMatched";
import InComingMatches from "./IncomingMatches";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const AllMatchListScreen: React.FC = ({}) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      className="flex-1 bg-white px-6 "
      style={{ paddingTop: insets.top }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-5 items-center">
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold">Match</Text>
        </View>
      </View>
      <PendingMatches />
      <InComingMatches />
      <YourMatched />
    </ScrollView>
  );
};

export default AllMatchListScreen;
