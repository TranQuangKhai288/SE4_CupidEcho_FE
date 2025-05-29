import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { createPost, MediaItem } from "../../apis/PostAPI";
import Loader from "../../components/Loader";

const CreateNewPost: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [caption, setCaption] = useState("");
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const { state } = useAuth();
  const { user } = state;

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setMediaUri(asset.uri);
      setMediaType(asset.type as "image" | "video");
    }
  };

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

  const handlePost = async () => {
    if (!caption.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập nội dung bài viết!");
      return;
    }

    setIsLoading(true);

    let uploadedUrl: string | null = null;

    if (mediaUri && mediaType) {
      uploadedUrl = await uploadToCloudinary(mediaUri, mediaType);
      if (!uploadedUrl) {
        Alert.alert("Lỗi", "Tải media lên thất bại!");
        setIsLoading(false);
        return;
      }
    }

    const media: MediaItem[] = uploadedUrl
      ? [{ type: mediaType!, URL: uploadedUrl }]
      : [];

    try {
      await createPost({ content: caption, media });
      Alert.alert("Thành công", "Bài viết đã được đăng!");
      setCaption("");
      setMediaUri(null);
      setMediaType(null);
      navigation.goBack();
    } catch (err) {
      Alert.alert("Lỗi", "Đăng bài thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white pt-10 px-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Header */}
          <View className="flex-row justify-between items-center p-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold">Create a new Post</Text>
            <TouchableOpacity onPress={handlePost}>
              <Text className="text-purple-600 text-lg font-semibold">
                POST
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View className="px-4 py-3">
              <View className="flex-row items-center mb-3">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-8 h-8 mr-2 rounded-full"
                />
                <Text className="text-black font-semibold text-sm">
                  {user?.name}
                </Text>
              </View>
              <TextInput
                className="bg-gray-50 rounded-lg p-3 text-sm text-black min-h-[120px] my-2"
                style={{ fontSize: 16 }}
                placeholder="What do you think?"
                multiline
                value={caption}
                onChangeText={setCaption}
                textAlignVertical="top"
              />
            </View>

            {/* Media Preview */}
            <View className="px-4 py-3">
              {mediaUri ? (
                <View>
                  {mediaType === "image" ? (
                    <Image
                      source={{ uri: mediaUri }}
                      className="w-full h-64 rounded-lg"
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      source={{ uri: mediaUri }}
                      className="w-full h-64 rounded-lg"
                      useNativeControls
                      shouldPlay={false}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      setMediaUri(null);
                      setMediaType(null);
                    }}
                    className="absolute top-2 right-2 bg-gray-800 p-1 rounded-full"
                  >
                    <Feather name="x" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleSelectMedia}
                  className="border-2 border-dashed border-gray-400 rounded-lg p-4 items-center justify-center h-64"
                >
                  <Feather name="image" size={40} color="gray" />
                  <Text className="text-gray-500 mt-2">Add image or video</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default CreateNewPost;
