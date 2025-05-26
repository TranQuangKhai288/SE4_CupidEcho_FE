import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as MatchingAPI from "../../apis/MatchingAPI";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export interface Relationship {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    age: number;
    birthDate: Date;
    zodiac: string;
  };
  receiver: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    age: number;
    birthDate: Date;
    zodiac: string;
  };
  type: string;
  status: string;
}

const PendingMatches = () => {
  const [pendingMatches, setPendingMatches] = useState<Relationship[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate("SeeAllMatches", {
      title: "Pending Matches",
    });
  };
  const getPendingMatches = async () => {
    const resMatches = await MatchingAPI.getRelationshipRequest({
      page: 1,
      limit: 5,
    });
    console.log(resMatches, "resMatches");
    setPendingMatches(resMatches.data.relationship);
  };

  useEffect(() => {
    getPendingMatches();
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 mt-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold">Pending Matches</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-primary-main font-bold">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-3"
      >
        {pendingMatches.map((item) => (
          <View className="flex mr-3 items-center" key={item._id}>
            <ProfileCard
              _id={item._id}
              name={item.receiver.name}
              age={item.receiver.age}
              zodiac={item.receiver.zodiac}
              imageUrl={item.receiver.avatar}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PendingMatches;
