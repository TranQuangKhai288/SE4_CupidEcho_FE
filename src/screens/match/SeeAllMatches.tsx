import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as MatchingAPI from "../../apis/MatchingAPI";

import { RootStackParamList } from "../../navigation/AppNavigation";
import { Relationship } from "./PendingMatches";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  {
    id: 4,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
  {
    id: 5,
    name: "Mai Nguyễn",
    age: 22,
    profession: "Marketing",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-19-1.jpg",
  },
  {
    id: 6,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
  {
    id: 7,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
];

const SeeAllMatches = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "SeeAllMatches">>();

  const { title } = route.params;
  const [data, setData] = useState<Relationship[]>([]);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const getPendingMatches = async () => {
    const resMatches = await MatchingAPI.getRelationshipRequest({
      page: 1,
      limit: 20,
    });
    console.log(resMatches, "resMatches");
    setData(resMatches.data.relationship);
  };

  const getReceivedMatches = async () => {
    const resMatches = await MatchingAPI.getRelationshipRequest({
      page: 1,
      limit: 20,
      direction: "received",
    });
    setData(resMatches.data.relationship);
  };

  const insets = useSafeAreaInsets();
  useEffect(() => {
    switch (title) {
      case "Pending Matches":
        getPendingMatches();
        break;
      case "Someone Likes You":
        getReceivedMatches();
        break;
      default:
        console.warn("Unknown title:", title);
    }
  }, [title]);

  return (
    <View className="flex-1 bg-white" style={{paddingTop:insets.top}}>
      <View className="flex-row items-center justify-between px-4 pb-4 ">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">{title}</Text>
        </View>
        <View className="flex-row gap-6">
          <TouchableOpacity>
            <Feather name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap px-2">
          {data.map((item) => {
            const user =
              title === "Pending Matches" ? item.receiver : item.sender;

            return (
              <View key={item._id} className="p-2 w-1/2">
                <ProfileCard
                  _id={item._id}
                  name={user.name}
                  age={user.age}
                  zodiac={user.zodiac}
                  imageUrl={user.avatar}
                  height={240}
                  width={176}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SeeAllMatches;
