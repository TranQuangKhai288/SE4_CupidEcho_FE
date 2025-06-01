import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as MatchingAPI from "../../apis/MatchingAPI";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { Relationship } from "./PendingMatches";
import ActionButton from '../../components/ActionButton';

const InComingMatches = () => {
  const [pendingMatches, setPendingMatches] = useState<Relationship[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handlePress = () => {
    navigation.navigate("SeeAllMatches", {
      title: "Someone Likes You",
    });
  };
  const getReceivedMatches = async () => {
    const resMatches = await MatchingAPI.getRelationshipRequest({
      page: 1,
      limit: 5,
      direction: "received",
    });
    console.log(resMatches, "resMatches");
    setPendingMatches(resMatches.data.relationship);
  };

  useEffect(() => {
    getReceivedMatches();
  }, []);
  return (
    <View className='py-4'>
      <View className='flex-row justify-between items-center mb-2'>
        <Text className='text-xl font-bold'>Someone Likes you</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text className='text-primary-main font-bold'>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='flex-row mt-3'
      >
        {pendingMatches.map((item) => (
          <View className='flex mr-3 items-center' key={item._id}>
            <ProfileCard
              _id={item?._id}
              name={item?.sender.name}
              age={item.sender.age}
              zodiac={item.sender.zodiac}
              imageUrl={item.sender.avatar}
              actions={
                <ActionButton
                  onAccept={() => console.log("Accepted")}
                  onReject={() => console.log("Rejected")}
                />
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default InComingMatches;
