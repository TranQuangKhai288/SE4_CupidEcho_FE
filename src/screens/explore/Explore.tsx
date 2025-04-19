import React from "react";
import { View, Text, Button, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { DiscoverCard, PurposeCard } from "../../components/ExploreCard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";

const ExploreScreen: React.FC = ({}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 bg-white pt-10 px-6">
      <View className="flex-row justify-between items-center py-3 ">
        <View className="flex-row gap-3 items-center">
          <Image
            source={require("../../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className="text-3xl font-bold">CupidEcho</Text>
        </View>
      </View>
      <ScrollView className="bg-white flex-1 px-4 py-2">
        <Text className="text-lg font-semibold mb-4">
          Welcome to the Explore section
        </Text>
        <DiscoverCard
          title="Lovers"
          icon="flower"
          count="5K"
          onPress={() =>
            navigation.navigate("ExploreDetail", { title: "Lovers" })
          }
        />

        <Text className="text-base font-semibold mt-6 mb-1">Purpose</Text>
        <Text className="text-sm text-gray-500 mb-3">
          Find people who share the same dating goals
        </Text>

        <View className="flex flex-row flex-wrap justify-between gap-y-4">
          <PurposeCard
            title="Serious Relationship"
            icon="heart"
            bgColor="bg-orange-500"
            count="3K"
            onPress={() =>
              navigation.navigate("ExploreDetail", {
                title: "Serious Relationship",
              })
            }
          />
          <PurposeCard
            title="Free Tonight"
            icon="moon"
            bgColor="bg-purple-400"
            count="2K"
            onPress={() =>
              navigation.navigate("ExploreDetail", { title: "Free Tonight" })
            }
          />
          <PurposeCard
            title="Casual Fun"
            icon="sun"
            bgColor="bg-pink-400"
            count="2K"
            onPress={() =>
              navigation.navigate("ExploreDetail", { title: "Casual Fun" })
            }
          />
          <PurposeCard
            title="Make New Friends"
            icon="star"
            bgColor="bg-red-400"
            count="2K"
            onPress={() =>
              navigation.navigate("ExploreDetail", {
                title: "Make New Friends",
              })
            }
          />
        </View>

        <Text className="text-base font-semibold mt-6 mb-1">Random Match</Text>
        <Text className="text-sm text-gray-500 mb-3">
          Meet random new people and connect instantly
        </Text>
        <PurposeCard
          title="Meet new friends every day"
          icon="dices"
          count="4K"
          bgColor="bg-green-300"
          fullWidth
          onPress={() => navigation.navigate("RandomMatch")}
        />
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;
