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
import { useAuth } from "../../contexts/AuthContext";

import { RootStackParamList } from "../../navigation/AppNavigation";
import { Relationship } from "./PendingMatches";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActionButton from "../../components/ActionButton";

const SeeAllMatches = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "SeeAllMatches">>();

  const { title } = route.params;
  const { state } = useAuth();
  const { user } = state;
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

  const getMatched = async () => {
    const resMatches = await MatchingAPI.getRelationshipRequest({
      page: 1,
      limit: 20,
      direction: "",
      status: "accepted",
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
      case "Your Matched":
        getMatched();
        break;
      default:
        console.log("Unknown title:");
    }
  }, [title]);

  const changeStatusRelationship = async (
    pendingId: string,
    status: string
  ) => {
    const resStatus = await MatchingAPI.changeStatusRelationship(
      pendingId,
      status
    );
    console.log(resStatus, "resStatus");
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
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
            const matchedProfile =
              item.sender._id === user?._id ? item.receiver : item.sender;

            return (
              <View key={item._id} className="p-2 w-1/2">
                <ProfileCard
                  _id={item._id}
                  userId={matchedProfile._id}
                  name={matchedProfile.name}
                  age={matchedProfile.age}
                  zodiac={matchedProfile.zodiac}
                  imageUrl={matchedProfile.avatar}
                  height={240}
                  width={176}
                  actions={
                    title === "Someone Likes You" ? (
                      <ActionButton
                        onAccept={async () =>
                          await changeStatusRelationship(item?._id, "accepted")
                        }
                        onReject={async () =>
                          await changeStatusRelationship(item?._id, "rejected")
                        }
                        justIcon={true}
                      />
                    ) : (
                      <></>
                    )
                  }
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
