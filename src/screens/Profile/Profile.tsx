import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ellipsis, Moon, Settings, LogOut, Users } from "lucide-react-native";
import ProfileItem from "./detail/ProfileItem";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useAuth } from "../../contexts/AuthContext";
import * as UserAPI from "../../apis/UserAPI";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // State to control the logout modal visibility
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  // Function to open the modal
  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  // Function to close the modal
  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const { logout, state } = useAuth();

  const user = state.user;

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       if (user?._id) {
  //         const response = await UserAPI.getDetailsUser(user._id.toString());
  //         // Bạn có thể lưu dữ liệu vào state nếu cần, hoặc xử lý thêm ở đây
  //         console.log("User detail fetched:", response.data);
  //       } else {
  //         console.warn("User ID not found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   if (user) {
  //     fetchUserDetails(); // Gọi API nếu user đã có
  //   }
  // }, [user]); // Chạy lại khi `user` thay đổi

  // Function to handle logout confirmation (logs to console)
  const insets = useSafeAreaInsets();
  const handleConfirmLogout = async () => {
    setLogoutModalVisible(false);
    console.log("User logged out successfully!"); // Log to console
    await logout();
    navigation.navigate("Login");
  };
  return (
    <View className="flex-1 bg-white" style={{paddingTop: insets.top}} >
      <View>
        <ScrollView>
          {/* Header */}
          <View className='flex-row items-center justify-between px-6 py-3'>
            <View className='flex-row gap-3 items-center'>
              <Image
                source={require("../../../assets/Logo.png")}
                style={{ width: 28, height: 28 }}
              />
              <Text className='text-3xl font-bold'>Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyProfile");
              }}
            >
              <Ellipsis size={24} color='#000' />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View className='items-center mt-6'>
            <Image
              source={{ uri: user?.avatar }}
              className='w-48 h-48 rounded-full'
            />
          </View>

          {/* VIP Card */}
          <View className='mx-6 mt-6 bg-purple-500 p-4 rounded-2xl shadow-lg'>
            <Text className='text-white text-lg font-bold'>
              Enjoy All Benefits!
            </Text>
            <Text className='text-white text-sm mt-1'>
              Enjoy unlimited swiping without restrictions & without ads
            </Text>
            <View className='mt-3 flex-row items-center justify-between'>
              <TouchableOpacity
                className='bg-white px-4 py-2 rounded-lg'
                onPress={() => navigation.navigate("SubscribeVIP")}
              >
                <Text className='text-purple-600 font-bold'>Get VIP</Text>
              </TouchableOpacity>
              <Image
                source={require("../../../assets/Logo.png")}
                className='w-10 h-10'
              />
            </View>
          </View>

          {/* Menu Items */}
          <View className='mt-6'>
            <ProfileItem
              icon={<Settings size={24} color='black' />}
              onPress={() =>
                navigation.navigate("Settings", { title: "Settings" })
              }
              text='Settings'
            />
            <ProfileItem
              icon={<Moon size={24} color='black' />}
              text='Dark Mode'
            />
            <ProfileItem
              icon={<Users size={24} color='black' />}
              text='Help Center'
              onPress={() => navigation.navigate("HelpCenter")}
            />
            <ProfileItem
              icon={<Users size={24} color='black' />}
              text='Invite Friends'
              onPress={() => navigation.navigate("InviteFriend")}
            />
            <ProfileItem
              icon={<LogOut size={24} color='red' />}
              text='Logout'
              isLogout
              onPress={handleLogoutPress} // Open modal on logout press
            />
          </View>
        </ScrollView>

        {/* Logout Confirmation Modal */}
        <Modal
          transparent={true}
          visible={isLogoutModalVisible}
          animationType='slide'
          onRequestClose={handleCancelLogout} // Close modal on back press (Android)
        >
          <View className='flex-1 justify-end bg-black/50'>
            <View className='bg-white rounded-t-2xl p-6'>
              {/* Drag Handle */}
              <View className='w-12 h-1 bg-gray-300 rounded-full self-center mb-4' />

              {/* Title */}
              <Text className='text-xl font-bold text-black text-center'>
                Logout
              </Text>

              {/* Message */}
              <Text className='text-base text-gray-600 text-center mt-2'>
                Are you sure you want to log out?
              </Text>

              {/* Buttons */}
              <View className='flex-row justify-between mt-6'>
                <TouchableOpacity
                  onPress={handleCancelLogout}
                  className='flex-1 bg-gray-200 py-3 rounded-lg mr-2'
                >
                  <Text className='text-black text-center font-semibold'>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleConfirmLogout}
                  className='flex-1 bg-purple-600 py-3 rounded-lg ml-2'
                >
                  <Text className='text-white text-center font-semibold'>
                    Yes, Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ProfileScreen;
