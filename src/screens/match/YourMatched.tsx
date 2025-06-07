import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as MatchingAPI from "../../apis/MatchingAPI";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SimpleProfileCard from "../../components/SimpleProfileCard";
import { useAuth } from "../../contexts/AuthContext";

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

const YourMatched = () => {
  const { state } = useAuth();
  const { user } = state;
  const [AcceptedMatches, setAcceptedMatches] = useState<Relationship[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate("SeeAllMatches", {
      title: "Your Matched",
    });
  };
  const getAcceptedMatches = async () => {
    const resMatches = await MatchingAPI.getRelationshipRequest({
      page: 1,
      limit: 5,
      status: "accepted",
    });
    console.log(resMatches, "resMatches");
    setAcceptedMatches(resMatches.data.relationship);
  };

  useEffect(() => {
    getAcceptedMatches();
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 pb-16">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold">Your Matched</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-primary-main font-bold">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-3"
      >
        {AcceptedMatches.map((item) => {
          const matchedProfile =
            item.sender._id === user?._id ? item.receiver : item.sender;
          return (
            <View className="flex mr-3 items-center" key={item._id}>
              <SimpleProfileCard
                id={matchedProfile._id}
                userId={matchedProfile._id}
                name={matchedProfile.name}
                age={matchedProfile.age}
                imageUrl={matchedProfile.avatar}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default YourMatched;
