import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
} from "react-native";
import { useAuth, IUser } from "../../../contexts/AuthContext";
import * as ProfileAPI from "../../../apis/ProfileAPI";
import * as UserAPI from "../../../apis/UserAPI";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronLeft,
  PencilLine,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/AppNavigation";
import { TextInput } from "react-native-gesture-handler";
import ImageItem from "../detail/ImageItem";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state, updateUser } = useAuth();
  const { user } = state;
  const [profile, setProfile] = useState<any>(null);
  const [listInterest, setListInterest] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState(user?.avatar?.toString() || "");
  const [name, setName] = useState(user?.name?.toString() || "");
  // DatePicker states
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Gender dropdown states
  const [gender, setGender] = useState("");
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const genderOptions = ["male", "female", "another"];

  // Zodiac states
  const [zodiac, setZodiac] = useState("");
  const [showZodiacModal, setShowZodiacModal] = useState(false);
  const zodiacOptions = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Unknown",
  ];

  // Hàm upload ảnh lên Cloudinary
  const uploadToCloudinary = async (
    uri: string,
    type: "image" | "video"
  ): Promise<string | null> => {
    const data = new FormData();

    const file = {
      uri,
      type: type === "image" ? "image/jpeg" : "video/mp4",
      name: `post_${Date.now()}.${type === "image" ? "jpg" : "mp4"}`,
    };

    data.append("file", file as any);
    data.append("upload_preset", "eBook_project");
    data.append("cloud_name", "ddzqupaez");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/ddzqupaez/${type}/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      return result.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  // Hàm chọn ảnh từ thư viện
  const handleSelectMedia = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        const uploadedUrl = await uploadToCloudinary(
          selectedAsset.uri,
          "image"
        );
        if (uploadedUrl) {
          console.log("Uploaded image URL:", uploadedUrl);
          setAvatar(uploadedUrl); // Cập nhật state avatar để hiển thị ảnh mới ngay lập tức
        } else {
          console.log("Failed to upload image");
          alert("Failed to upload image to Cloudinary");
        }
      }
    } catch (error) {
      console.error("Error selecting media:", error);
      alert("Error selecting media");
    }
  };

  // Hàm lấy thông tin người dùng
  const fetchUserDetails = useCallback(async () => {
    try {
      if (user?._id) {
        const response = await ProfileAPI.getDetailsProfile(
          user._id.toString()
        );
        setProfile(response.data);
        setListInterest(response.data.interests?.map((i: any) => i._id) || []);

        // Set date from profile
        if (response.data.birthDate) {
          setDate(new Date(response.data.birthDate));
        }

        // Set gender from profile if available
        if (response.data.gender) {
          setGender(response.data.gender);
        }

        // Set zodiac from profile if available
        if (response.data.zodiac) {
          setZodiac(response.data.zodiac);
        }

        // Set avatar from profile if available
        if (response.data.avatar) {
          setAvatar(response.data.avatar);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [user]);

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const payload = {
        birthDate: date.toISOString(),
        gender,
        zodiac,
        address: {
          formattedAddress: profile?.address.formattedAddress,
          city: profile?.address.city,
          country: profile?.address.country,
        },
      };
  
      // Cập nhật profile
      await ProfileAPI.updateProfile(payload);
  
      // Nếu avatar hoặc name thay đổi, cập nhật user
      if (avatar !== user?.avatar || name !== user?.name) {
        if (!user || !user._id) {
          throw new Error("User không hợp lệ hoặc thiếu _id");
        }
  
        const userPayload = { avatar, name }; // Gửi cả avatar và name
        const resUpdate = await UserAPI.updateUser(userPayload);
  
        // Hợp nhất dữ liệu, ưu tiên name từ state
        const updatedUser: IUser = {
          _id: user._id, // Đảm bảo _id không bị undefined
          name: resUpdate.name || name || "", // Ưu tiên name từ state
          email: user.email || "", // Đảm bảo email không undefined
          bio: user.bio || "", // Đảm bảo bio không undefined
          avatar: resUpdate.avatar || avatar, // Cập nhật avatar từ API hoặc state
          isAdmin: user.isAdmin || false, // Đảm bảo isAdmin
        };
  
        await updateUser(updatedUser); // Gọi updateUser với dữ liệu hợp lệ
      }
  
      alert("Cập nhật hồ sơ thành công!");
      await fetchUserDetails(); // Làm mới dữ liệu sau khi cập nhật
    } catch (error) {
      console.error("Cập nhật hồ sơ thất bại:", error);
      alert("Cập nhật hồ sơ thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user, fetchUserDetails]);

  // Reload data mỗi khi màn hình focus lại
  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetails();
      return () => {};
    }, [fetchUserDetails])
  );

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN");
  };

  const selectGender = (option: string) => {
    setGender(option);
    setShowGenderDropdown(false);
  };

  const selectZodiac = (option: string) => {
    setZodiac(option);
    setShowZodiacModal(false);
  };

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
          <Text className="text-xl font-bold text-black mb-5">
            Your Best Photo
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ImageItem url={avatar} handleSelectMedia={handleSelectMedia} />
          </ScrollView>
        </View>

        {/* Profile Card */}
        <View className="bg-white mt-5">
          {/* Interests */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-xl font-bold text-black mb-3">
                Your Interest
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditInterest", {
                    ListInterest: listInterest,
                  })
                }
              >
                <PencilLine size={24} color="#7b219f" />
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap gap-3">
              {profile?.interests?.map((interest: any) => (
                <Text
                  key={interest?._id}
                  className="font-medium px-4 py-2 bg-purple-600 text-white rounded-full text-sm"
                >
                  {interest?.name}
                </Text>
              ))}
            </View>
          </View>

          {/* Your Profile */}
          <View>
            <Text className="text-xl font-bold text-black mb-5">
              Your Profile
            </Text>

            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              className="text-black bg-gray-100 p-4 rounded-lg mb-5"
            />
            <TextInput
              value={user?.email || ""}
              className="text-black bg-gray-100 p-4 rounded-lg mb-5"
            />

            <View className="mb-5">
              {Platform.OS === "ios" ? (
                <View className="flex-row items-center">
                  <Text className="text-lg font-bold">Birthday:</Text>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                    style={{ margin: 0, padding: 0 }}
                  />
                </View>
              ) : (
                <>
                  <Text className="text-lg font-bold">Birthday:</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className="text-black bg-gray-100 p-4 rounded-lg mt-3 flex-row justify-between items-center"
                  >
                    <Text className="text-black">{formatDate(date)}</Text>
                    <ChevronDown size={20} color="#000" />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                      maximumDate={new Date()}
                    />
                  )}
                </>
              )}
            </View>

            <Text className="text-lg font-bold mt-3">Gender</Text>
            {/* Gender Dropdown - Direct on screen implementation */}
            <View className="mt-3">
              <TouchableOpacity
                onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                className="text-black bg-gray-100 p-4 rounded-lg flex-row justify-between items-center"
              >
                <Text className="text-black">{gender || "Select gender"}</Text>
                {showGenderDropdown ? (
                  <ChevronUp size={20} color="#000" />
                ) : (
                  <ChevronDown size={20} color="#000" />
                )}
              </TouchableOpacity>

              {/* Dropdown options */}
              {showGenderDropdown && (
                <View className="bg-white rounded-lg border border-gray-200 mt-1 shadow-md">
                  {genderOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => selectGender(option)}
                      className="p-4 border-b border-gray-100"
                    >
                      <Text className="text-black">{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <Text className="text-lg font-bold mt-3">Zodiac</Text>
            <View className="mt-3">
              <TouchableOpacity
                onPress={() => setShowZodiacModal(true)}
                className="text-black bg-gray-100 p-4 rounded-lg flex-row justify-between items-center"
              >
                <Text className="text-black">{zodiac || "Select zodiac"}</Text>
                <ChevronDown size={20} color="#000" />
              </TouchableOpacity>

              {/* Zodiac Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={showZodiacModal}
                onRequestClose={() => setShowZodiacModal(false)}
              >
                <View className="flex-1 justify-center items-center bg-transparent bg-opacity-50">
                  <View className="bg-white p-4 rounded-lg w-4/5">
                    <Text className="text-lg font-bold mb-3">
                      Select Zodiac
                    </Text>
                    <FlatList
                      data={zodiacOptions}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => selectZodiac(item)}
                          className="p-3 border-b border-gray-200"
                        >
                          <Text className="text-black">{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    <TouchableOpacity
                      onPress={() => setShowZodiacModal(false)}
                      className="mt-4 bg-gray-300 p-2 rounded-lg"
                    >
                      <Text className="text-center text-black">Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <Text className="text-lg font-bold mt-3">Address</Text>
            <TextInput
              value={profile?.address?.formattedAddress}
              onChangeText={(text) =>
                setProfile({
                  ...profile,
                  address: { ...profile.address, formattedAddress: text },
                })
              }
              className="text-black bg-gray-100 p-4 rounded-lg mb-3"
            />
            <TextInput
              value={profile?.address?.city}
              onChangeText={(text) =>
                setProfile({
                  ...profile,
                  address: { ...profile.address, city: text },
                })
              }
              className="text-black bg-gray-100 p-4 rounded-lg mb-3"
            />
            <TextInput
              value={profile?.address?.country}
              onChangeText={(text) =>
                setProfile({
                  ...profile,
                  address: { ...profile.address, country: text },
                })
              }
              className="text-black bg-gray-100 p-4 rounded-lg mb-3"
            />
          </View>
        </View>
        <View className="mb-5 p-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            disabled={isLoading}
            onPress={updateProfile}
            className={`py-3 rounded-lg items-center ${
              isLoading ? "bg-purple-400" : "bg-purple-600"
            }`}
          >
            <Text className="text-white font-bold text-lg">
              {isLoading ? "Updating..." : "Save Profile"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;