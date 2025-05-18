import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import {
  ChevronLeft,
  Calendar,
  Mars,
  Venus,
  VenusAndMars,
  Mail,
  User,
  Phone
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import * as UserAPI from "../../../apis/UserAPI";
import * as ProfileAPI from "../../../apis/ProfileAPI";

const PersonalInformation = () => {
  const { state } = useAuth();
  const { user } = state;
  const navigation = useNavigation();
  const [profile, setProfile] = useState<any>(null);
  const [userDetail, setuserDetail] = useState<any>(null);

  // Hàm lấy thông tin người dùng
  const fetchUserDetails = useCallback(async () => {
    try {
      if (user?._id) {
        const fetchProfile = await ProfileAPI.getDetailsProfile(
          user._id.toString()
        );
        setProfile(fetchProfile.data);
        const fetchUser = await UserAPI.getDetailsUser(user._id.toString());
        setuserDetail(fetchUser.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center px-4 py-4">
          <TouchableOpacity onPress={navigation.goBack}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-medium ml-4">Personal Information</Text>
        </View>

        {/* Form Content */}
        <View className="px-4 mt-2">
          <TextInput
            value={user?.name}
            className="text-black bg-gray-100 p-4 rounded-lg mb-5"
          />
        </View>
        <View className="px-4 flex-row items-center bg-gray-100 rounded-lg mb-5 ml-4 mr-4">
          <TextInput
            value={profile?.gender}
            className="flex-1 text-black bg-transparent pt-4 pb-4"
            editable={true}
          />
          {profile?.gender === "male" ? (
            <Mars color="#000" size={20} />
          ) : profile?.gender === "female" ? (
            <Venus color="#000" size={20} />
          ) : (
            <VenusAndMars color="#000" size={20} />
          )}
        </View>
        <View className="px-4 flex-row items-center bg-gray-100 rounded-lg mb-5 ml-4 mr-4">
          <TextInput
            value={
              profile?.birthDate
                ? new Date(profile.birthDate).toLocaleDateString("vi-VN")
                : ""
            }
            className="flex-1 text-black bg-transparent pt-4 pb-4"
            editable={true}
          />
          <Calendar color="#000" size={20} />
        </View>
        <View className="px-4 flex-row items-center bg-gray-100 rounded-lg mb-5 ml-4 mr-4">
          <TextInput
            value={user?.email}
            className="flex-1 text-black bg-transparent pt-4 pb-4"
            editable={true}
          />
          <Mail color="#000" size={20} />
        </View>
        <View className="px-4 flex-row items-center bg-gray-100 rounded-lg mb-5 ml-4 mr-4">
          <TextInput
            value={profile?.zodiac}
            className="flex-1 text-black bg-transparent pt-4 pb-4"
            editable={true}
          />
        </View>
        <View className="px-4 flex-row items-center bg-gray-100 rounded-lg mb-5 ml-4 mr-4">
          <TextInput
            value={userDetail?.phone}
            className="flex-1 text-black bg-transparent pt-4 pb-4"
            editable={true}
          />
          <Phone color="#000" size={20} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
