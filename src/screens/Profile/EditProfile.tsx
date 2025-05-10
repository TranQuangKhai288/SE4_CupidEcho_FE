import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import * as ProfileAPI from "../../apis/ProfileAPI";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, PencilLine } from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

const EditProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const { user } = state;
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
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

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  if (!profile) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {/* Header */}

        {/* Avatar */}
        <View className="items-center mt-4 relative">
          {/* Avatar Image */}
          <Image
            source={{
              uri: user?.avatar,
            }}
            className="w-full h-96"
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
        <View className="bg-white mx-6 mt-4 rounded-3xl shadow-md p-5">
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-2xl font-bold">
                {user?.name || "Andrew Ainsley"},{" "}
                {new Date().getFullYear() -
                  new Date(profile.birthDate).getFullYear()}
              </Text>
              {/* <Text className="text-gray-500 mt-1">{user?.jobTitle || "Designer"}</Text> */}
              <View className="flex-row items-center mt-2">
                <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-sm">
                  {profile.zodiac || "Capricorn"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-white/70 p-2 rounded-full"
              onPress={() => navigation.navigate("EditProfile")}
            >
              <PencilLine size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* About */}
          <Text className="text-lg font-bold mt-6">About</Text>
          <Text className="text-gray-700 mt-2">
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

          {/* Interests */}
          <Text className="text-lg font-bold mt-6 mb-2">Interest</Text>
          <View className="flex-row flex-wrap gap-2">
            {profile.interests?.map((interest: any) => (
              <Text
                key={interest._id}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {interest.name}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
