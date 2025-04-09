// src/screens/Auth/ProfileScreen.tsx
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Bell, Moon, Settings, LogOut, Users } from "lucide-react-native";
import MenuItem from "./detail/MenuItem";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useAuth } from "../../contexts/AuthContext";
const ProfileScreen: React.FC = ({}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { logout, state } = useAuth();
  const { user } = state;
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-12">
        <View className="flex-row justify-center">
          <Image
            style={{ marginRight: 10 }}
            source={require("../../../assets/Logo.png")}
            className="w-10 h-10"
          />
          <Text className="text-2xl font-bold">Profile</Text>
        </View>
        <Bell size={24} color="#000" />
      </View>

      {/* Avatar */}
      <View className="items-center mt-6">
        <Image
          source={{ uri: user?.avatar }}
          className="w-24 h-24 rounded-full"
        />
      </View>

      {/* VIP Card */}
      <View className="mx-6 mt-6 bg-purple-500 p-4 rounded-2xl shadow-lg">
        <Text className="text-white text-lg font-bold">
          Enjoy All Benefits!
        </Text>
        <Text className="text-white text-sm mt-1">
          Enjoy unlimited swiping without restrictions & without ads
        </Text>
        <View className="mt-3 flex-row items-center justify-between">
          <TouchableOpacity className="bg-white px-4 py-2 rounded-lg">
            <Text className="text-purple-600 font-bold">Get VIP</Text>
          </TouchableOpacity>
          <Image
            source={require("../../../assets/Logo.png")}
            className="w-10 h-10"
          />
        </View>
      </View>
      {/* Menu Items */}
      <View className="mt-6">
        <MenuItem
          icon={<Settings size={24} color="black" />}
          onPress={() => navigation.navigate("Settings")}
          text="Settings"
        />
        <MenuItem icon={<Moon size={24} color="black" />} text="Dark Mode" />
        <MenuItem icon={<Users size={24} color="black" />} text="Help Center" />
        <MenuItem
          icon={<Users size={24} color="black" />}
          text="Invite Friends"
        />
        <MenuItem
          icon={<LogOut size={24} color="red" />}
          text="Logout"
          isLogout
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
