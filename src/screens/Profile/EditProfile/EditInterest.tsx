import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Check, ChevronLeft, Save } from "lucide-react-native";
import tw from "nativewind"; // hoặc 'twrnc' nếu bạn dùng twrnc
import * as interestAPI from "../../../apis/InterestAPI";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/AppNavigation";
import * as profileAPI from "../../../apis/ProfileAPI";

// Interface cho Group và Interest
interface Group {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

interface Interest {
  _id: string;
  name: string;
  description: string;
  groupId: Group;
  __v: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Interest[];
}

type EditInterestRouteProp = RouteProp<RootStackParamList, "EditInterest">;

const EditInterestScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<EditInterestRouteProp>();
  const initialSelected = route.params?.ListInterest || [];

  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch interests khi component mount
  const fetchAllInterests = async () => {
    try {
      const response = (await interestAPI.getAllInterest()) as ApiResponse;
      setInterests(response.data);
    } catch (error) {
      console.error("Fetch interests error: ", error);
      Alert.alert("Error", "Failed to load interests. Please try again.");
    }
  };

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const payload = { interests: selectedInterests };
      console.log("Sending payload to update:", payload);
      const response = await profileAPI.updateProfile(payload);
      Alert.alert("Success", "Your interests have been updated.");
      navigation.goBack();
    } catch (error) {
      console.error("Update interests error: ", error);
      Alert.alert("Error", "Failed to update interests. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInterests();
    setSelectedInterests(initialSelected); // Gán selected khi mount
  }, [initialSelected]); // Chỉ chạy lại khi initialSelected thay đổi

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interestId)) {
        return prev.filter((id) => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  const groupedInterests = interests.reduce((acc, interest) => {
    const groupName = interest.groupId.name;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(interest);
    return acc;
  }, {} as Record<string, Interest[]>);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-black">Choose Interests</Text>
        <TouchableOpacity
          onPress={updateProfile}
          disabled={isLoading}
          className="p-2 rounded-full bg-blue-500"
        >
          <Save size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="p-4">
        {Object.entries(groupedInterests).map(([groupName, groupInterests]) => (
          <View key={groupName} className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-3">
              {groupName}
            </Text>
            {groupInterests.map((interest) => (
              <TouchableOpacity
                key={interest._id}
                className="flex-row items-center p-3 bg-white rounded-lg mb-2 shadow-sm"
                onPress={() => toggleInterest(interest._id)}
              >
                <View
                  className={`w-6 h-6 mr-3 border-2 rounded flex items-center justify-center ${
                    selectedInterests.includes(interest._id)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-400"
                  }`}
                >
                  {selectedInterests.includes(interest._id) && (
                    <Check size={16} color="white" />
                  )}
                </View>

                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">
                    {interest.name}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {interest.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      
      {selectedInterests.length > 0 && (
        <View className="p-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            onPress={updateProfile}
            disabled={isLoading}
            className={`py-3 rounded-lg items-center ${
              isLoading ? "bg-gray-400" : "bg-blue-500"
            }`}
          >
            <Text className="text-white font-bold text-lg">
              {isLoading ? "Updating..." : "Save Interests"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditInterestScreen;
