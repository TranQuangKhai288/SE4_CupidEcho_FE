import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as MatchingAPI from "../../apis/MatchingAPI";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { Relationship } from "./PendingMatches";
import ActionButton from "../../components/ActionButton";
import { useFocusEffect } from "@react-navigation/native";

const InComingMatches = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingMatches, setPendingMatches] = useState<Relationship[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate("SeeAllMatches", {
      title: "Someone Likes You",
    });
  };

  const getReceivedMatches = async (isReload: boolean) => {
    if (!isReload) {
      setLoading(true);
    }
    try {
      const resMatches = await MatchingAPI.getRelationshipRequest({
        page: 1,
        limit: 5,
        direction: "received",
      });
      setPendingMatches(resMatches.data.relationship);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReceivedMatches(false);
    }, [])
  );

  const changeStatusRelationship = async (
    pendingId: string,
    status: string
  ) => {
    try {
      const resStatus = await MatchingAPI.changeStatusRelationship(
        pendingId,
        status
      );
      console.log(resStatus);
      await getReceivedMatches(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="py-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold">Someone Likes you</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-primary-main font-bold">See All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size={64} />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mt-3"
        >
          {pendingMatches.map((item) => (
            <View className="flex mr-3 items-center" key={item._id}>
              <ProfileCard
                _id={item?._id}
                userId={item?.sender._id}
                name={item?.sender.name}
                age={item.sender.age}
                zodiac={item.sender.zodiac}
                imageUrl={item.sender.avatar}
                actions={
                  <ActionButton
                    onAccept={async () =>
                      await changeStatusRelationship(item?._id, "accepted")
                    }
                    onReject={async () =>
                      await changeStatusRelationship(item?._id, "rejected")
                    }
                  />
                }
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default InComingMatches;
