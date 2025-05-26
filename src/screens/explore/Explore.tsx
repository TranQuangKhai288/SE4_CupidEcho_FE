import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { PurposeCard } from "../../components/ExploreCard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as UserAPI from "../../apis/UserAPI";
import { useAuth } from "../../contexts/AuthContext";

const ExploreScreen: React.FC = () => {
  const { state } = useAuth();
  const user = state.user;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [gender, setGender] = useState<string>("");
  const [ageWeight, setAgeWeight] = useState(0);
  const [distanceWeight, setDistanceWeight] = useState(0);
  const [interestWeight, setInterestWeight] = useState(0);
  const [zodiacWeight, setZodiacWeight] = useState(0);
  const [maxDistance, setMaxDistance] = useState(0);
  const [maxAgeDifference, setMaxAgeDifference] = useState(0);

  useEffect(() => {
    const fetchConditionByUser = async () => {
      try {
        if (user?._id) {
          const response = await UserAPI.getConditionByUserId(user._id);
          setGender(response?.desired_gender || "");
          setMaxDistance(response?.max_distance_km || 0);
          setDistanceWeight(response?.distance_weight || 0);
          setAgeWeight(response?.age_weight || 0);
          setInterestWeight(response?.interest_weight || 0);
          setZodiacWeight(response?.zodiac_weight || 0);
          setMaxAgeDifference(response?.max_age_difference || 0);
        } else {
          console.warn("User ID not found");
        }
      } catch (error) {
        console.error("Error fetching condition user details:", error);
      }
    };

    fetchConditionByUser();
  }, [user?._id]);

  const HandleConditionWeight = async () => {
    const totalWeight =
      ageWeight + distanceWeight + zodiacWeight + interestWeight;

    if (totalWeight > 10) {
      alert("User can't choose condition weight above 10 points");
      return;
    }

    try {
      const payload = {
        desired_gender: gender,
        max_distance_km: maxDistance,
        interest_weight: interestWeight,
        distance_weight: distanceWeight,
        zodiac_weight: zodiacWeight,
        age_weight: ageWeight,
        max_age_difference: maxAgeDifference,
      };
      await UserAPI.updateConditionByUser(payload);
      alert("Update Condition Success");
    } catch (error) {
      console.error("Failed to update condition:", error);
    }
  };

  return (
    <View
      className="flex-1 bg-white pt-10 px-6"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row justify-between items-center py-3">
        <View className="flex-row gap-3 items-center">
          <Image
            source={require("../../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className="text-3xl font-bold">CupidEcho</Text>
        </View>
      </View>

      <ScrollView className="bg-white flex-1 px-4 py-2" showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-semibold mb-1">Random Match</Text>
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

        <Text className="text-2xl font-semibold mt-6">Edit Condition</Text>

        {/* Gender Selection */}
        <Text className="text-base font-semibold mt-4 mb-2">Gender</Text>
        <View className="flex-row justify-between mb-4">
          {["male", "female", "another"].map((g) => (
            <TouchableOpacity
              key={g}
              className={`px-10 py-4 rounded-full ${
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

        {/* Sliders */}
        {[
          {
            label: "Max Distance (km)",
            value: maxDistance,
            setter: setMaxDistance,
            max: 20,
          },
          {
            label: "Age Weight",
            value: ageWeight,
            setter: setAgeWeight,
            max: 10,
          },
          {
            label: "Interest Weight",
            value: interestWeight,
            setter: setInterestWeight,
            max: 10,
          },
          {
            label: "Distance Weight",
            value: distanceWeight,
            setter: setDistanceWeight,
            max: 10,
          },
          {
            label: "Zodiac Weight",
            value: zodiacWeight,
            setter: setZodiacWeight,
            max: 10,
          },
          {
            label: "Max Age Difference",
            value: maxAgeDifference,
            setter: setMaxAgeDifference,
            max: 10,
          },
        ].map(({ label, value, setter, max }, index) => (
          <View className="mb-4" key={index}>
            <Text className="text-base font-semibold mb-2">{label}</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={max}
              minimumTrackTintColor="#9333ea"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#9333ea"
              step={1}
              value={value}
              onValueChange={(val) => setter(val)}
            />
            <Text className="text-gray-600">
              {value} {label.includes("km") ? "km" : "point"}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          onPress={HandleConditionWeight}
          className="bg-purple-500 py-3 rounded-lg mb-6"
        >
          <Text className="text-center text-white font-semibold text-base">
            Save Condition
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;
