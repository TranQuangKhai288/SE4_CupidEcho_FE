import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as MatchingAPI from "../../apis/MatchingAPI";

const newMatchingUsers = [
  {
    id: 1,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
  {
    id: 2,
    name: "Bích Hằng",
    age: 23,
    profession: "Developer",
    avatar:
      "https://timanhdep.com/wp-content/uploads/2022/06/hinh-anh-gai-xinh-cute-viet-nam-nhin-la-yeu-30.jpg",
  },
  {
    id: 3,
    name: "Mai Nguyễn",
    age: 22,
    profession: "Marketing",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-19-1.jpg",
  },
];

type RootStackParamList = {
  NewMatch: undefined;
};
interface Relationship {
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

type NewMatchNavigationProp = NavigationProp<RootStackParamList, "NewMatch">;
const InComingMatches = () => {
  const [pendingMatches, setPendingMatches] = useState<Relationship[]>([]);
  const navigation = useNavigation<NewMatchNavigationProp>();
  const handlePress = () => {
    navigation.navigate("NewMatch");
  };
  const getPendingMatches = async () => {
    const resMatches = await MatchingAPI.getRelationshipRequest({
      page: 1,
      limit: 5,
      direction: "received",
    });
    console.log(resMatches, "resMatches");
    setPendingMatches(resMatches.data.relationship);
  };

  useEffect(() => {
    getPendingMatches();
  }, []);
  return (
    <View className="py-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold">Someone Likes you</Text>
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
              _id={item?._id}
              name={item?.sender.name}
              age={item.sender.age}
              zodiac={item.sender.zodiac}
              imageUrl={item.sender.avatar}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default InComingMatches;
