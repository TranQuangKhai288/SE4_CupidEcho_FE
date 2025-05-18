import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import * as ProfileAPI from "../../apis/ProfileAPI";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ChevronLeft, PencilLine } from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

const MyProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const { user } = state;
  const [profile, setProfile] = useState<any>(null);

  const fetchUserDetails = async () => {
    try {
      if (user?._id) {
        const response = await ProfileAPI.getDetailsProfile(
          user._id.toString()
        );
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  // Fetch data again when the screen comes into focus
  useFocusEffect(() => {
    fetchUserDetails();
  });

  if (!profile) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {/* Avatar */}
        <View className="relative">
          <Image
            source={{
              uri: "https://anhnail.vn/wp-content/uploads/2024/10/meme-meo-khoc-7.webp",
            }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />
          {/* Back button overlay */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <View className="bg-white mx-6 mt-[-40px] rounded-3xl p-6">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-4xl font-bold">
                {user?.name || "Andrew Ainsley"},{" "}
                {new Date().getFullYear() -
                  new Date(profile.birthDate).getFullYear()}
              </Text>
              <View className="flex-row items-center mt-2 gap-2">
                <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                  {profile.gender}
                </Text>
                <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                  {profile.zodiac}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-white/70 p-2 rounded-full"
              onPress={() => navigation.navigate("EditProfile")}
            >
              <PencilLine size={24} color="#7b219f" />
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-lg font-bold mt-3">Address</Text>
            <View className="flex-row items-center mt-2 gap-2">
              <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                {profile.address.formattedAddress}
              </Text>
              <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                {profile.address.city}
              </Text>
              <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                {profile.address.country}
              </Text>
            </View>
          </View>

          <View>
            <Text className="text-lg font-bold mt-3">Birthday</Text>
            <View className="flex-row items-center mt-2 gap-2">
              <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                {new Date(profile.birthDate).toLocaleDateString("vi-VN")}
              </Text>
            </View>
          </View>

          {/* Interests */}
          <Text className="text-lg font-bold mt-3 mb-2">Interest</Text>
          <View className="flex-row flex-wrap gap-3">
            {profile.interests?.map((interest: any) => (
              <Text
                key={interest._id}
                className="px-4 py-2 bg-purple-700 text-white rounded-full text-sm"
              >
                {interest.name}
              </Text>
            ))}
          </View>

          {/* About */}
          <Text className="text-lg font-bold mt-3">About</Text>
          <Text className="text-gray-700 mt-2 text-base">
            I am single{" "}
            {new Date().getFullYear() -
              new Date(profile.birthDate).getFullYear()}{" "}
            years old. I love{" "}
            {profile.interests
              ?.slice(0, 3)
              .map((i: any) => i.name.toLowerCase())
              .join(", ")}
            ... You can find me in {profile.address?.city}.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
