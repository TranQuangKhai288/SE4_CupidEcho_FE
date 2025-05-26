import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { DiscoverCard, PurposeCard } from "../../components/ExploreCard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ExploreScreen: React.FC = ({}) => {
  const [gender, setGender] = useState<string>("All");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [location, setLocation] = useState<string>("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className="flex-1 bg-white pt-10 px-6" style={{paddingTop:insets.top}}>
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

        <Text className="text-2xl font-semibold mt-6">Edit Condition</Text>
        <View className="mt-3">
          {/* Gender Selection */}
          <Text className="text-base font-semibold mb-3">Gender</Text>
          <View className="flex-row justify-between mb-4">
            {["Male", "Female", "Other"].map((g) => (
              <TouchableOpacity
                key={g}
                className={`px-6 py-2 rounded-full ${
                  gender === g ? "bg-purple-500" : "bg-gray-200"
                }`}
                onPress={() => setGender(g)}
              >
                <Text className={gender === g ? "text-white" : "text-black"}>
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Age Range */}
          <Text className="text-base font-semibold mb-2">Age Range</Text>
          <View className="mb-4">
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={18}
              maximumValue={100}
              minimumTrackTintColor="#9333ea"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#9333ea"
              step={1}
              value={ageRange[0]}
              onValueChange={(value) => setAgeRange([value, ageRange[1]])}
            />
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={18}
              maximumValue={100}
              minimumTrackTintColor="#9333ea"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#9333ea"
              step={1}
              value={ageRange[1]}
              onValueChange={(value) => setAgeRange([ageRange[0], value])}
            />
            <Text className="text-gray-600">
              {ageRange[0]} - {ageRange[1]} years
            </Text>
          </View>

          {/* Location */}
          <Text className="text-base font-semibold mb-2">Location</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter city or area"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Text className="text-base font-semibold mb-1">Random Match</Text>
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
