import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import * as ProfileAPI from "../../../apis/ProfileAPI";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, PencilLine } from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/AppNavigation";
import { TextInput } from "react-native-gesture-handler";
import ImageItem from "../detail/ImageItem";
import { useFocusEffect } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const { user } = state;
  const [profile, setProfile] = useState<any>(null);
  const [listInterest, setListInterest] = useState<string[]>([]);

  // Hàm lấy thông tin người dùng
  const fetchUserDetails = useCallback(async () => {
    try {
      if (user?._id) {
        const response = await ProfileAPI.getDetailsProfile(user._id.toString());
        setProfile(response.data);
        setListInterest(response.data.interests?.map((i: any) => i._id) || []);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user, fetchUserDetails]);

  // Reload data mỗi khi màn hình focus lại
  useFocusEffect(() => {
    fetchUserDetails();
  });

  if (!profile) return null;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <SafeAreaView className="bg-white">
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-gray-100"
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-black">Edit Profile</Text>
          <View className="w-10" />
        </View>
      </SafeAreaView>

      <ScrollView className="bg-white mx-2 p-5 shadow-md">
        {/* Avatar */}
        <View>
          <Text className="text-xl font-bold text-black mb-5">Your Best Photo</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ImageItem url="https://anhnail.vn/wp-content/uploads/2024/10/meme-meo-khoc-6.webp" />
            <ImageItem url="https://anhnail.vn/wp-content/uploads/2024/10/meme-meo-khoc-3.webp" />
            <ImageItem url="https://anhnail.vn/wp-content/uploads/2024/10/meme-meo-khoc-6.webp" />
            <ImageItem url="https://anhnail.vn/wp-content/uploads/2024/10/meme-meo-khoc-3.webp" />
            <ImageItem url="https://anhnail.vn/wp-content/uploads/2024/10/meme-meo-khoc-6.webp" />
            <ImageItem url="https://anhnail.vn/wp-content/uploads/2024/10/meme-meo-khoc-3.webp" />
          </ScrollView>
        </View>

        {/* Profile Card */}
        <View className="bg-white mt-5">
          {/* Interests */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-xl font-bold text-black mb-3">Your Interest</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditInterest", { ListInterest: listInterest })
                }
              >
                <PencilLine size={24} color="#7b219f" />
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap gap-3">
              {profile.interests?.map((interest: any) => (
                <Text
                  key={interest._id}
                  className="font-medium px-4 py-2 bg-purple-600 text-white rounded-full text-sm"
                >
                  {interest.name}
                </Text>
              ))}
            </View>
          </View>

          {/* Your Profile */}
          <View>
            <Text className="text-xl font-bold text-black mb-5">Your Profile</Text>

            <TextInput
              value={user?.name}
              className="text-black bg-gray-100 p-4 rounded-lg mb-5"
            />
            <TextInput
              value={user?.email}
              className="text-black bg-gray-100 p-4 rounded-lg mb-5"
            />
            <TextInput
              multiline
              value={`I am single ${
                new Date().getFullYear() - new Date(profile.birthDate).getFullYear()
              } years old. I love ${profile.interests
                ?.slice(0, 3)
                .map((i: any) => i.name.toLowerCase())
                .join(", ")}... You can find me in ${profile.address?.city}.`}
              className="text-black bg-gray-100 p-4 rounded-lg mb-5"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
