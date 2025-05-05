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
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { createPost, MediaItem } from "../../apis/PostAPI";

const CreateNewPost: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { state } = useAuth();
  const { user } = state;

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (uri: string): Promise<string | null> => {
    const data = new FormData();

    const file = {
      uri,
      type: "image/jpeg",
      name: `post_${Date.now()}.jpg`,
    };

    data.append("file", file as any);
    data.append("upload_preset", "eBook_project");
    data.append("cloud_name", "ddzqupaez");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddzqupaez/image/upload",
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

    let uploadedImageUrl: string | null = null;

    if (imageUrl) {
      uploadedImageUrl = await uploadToCloudinary(imageUrl);
      if (!uploadedImageUrl) {
        Alert.alert("Lỗi", "Tải ảnh lên thất bại!");
        return;
      }
    }

    const media: MediaItem[] = uploadedImageUrl
      ? [{ type: "image", URL: uploadedImageUrl }]
      : [];

    try {
      await createPost({ content: caption, media });
      Alert.alert("Thành công", "Bài viết đã được đăng!");
      setCaption("");
      setImageUrl(null);
      navigation.goBack();
    } catch (err) {
      Alert.alert("Lỗi", "Đăng bài thất bại!");
    }
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      {/* Header */}
      <View className='flex-row justify-between items-center p-4 '>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={20} color='black' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold'>Create a new Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text className='text-purple-600 text-lg font-semibold'>POST</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className='px-4 py-3'>
          <View className='flex-row items-center mb-3'>
            <Image
              source={{ uri: user?.avatar }}
              className='w-8 h-8 mr-2 rounded-full'
            />
            <Text className='text-black font-semibold text-sm'>
              {user?.name}
            </Text>
          </View>
          <TextInput
            className='bg-gray-50 rounded-lg p-3 text-sm text-black min-h-[120px] my-2'
            style={{ fontSize: 16 }}
            placeholder='What do you think?'
            multiline
            value={caption}
            onChangeText={setCaption}
            textAlignVertical='top'
          />
        </View>

        {/* Image Preview */}
        <View className='px-4 py-3'>
          {imageUrl ? (
            <View>
              <Image
                source={{ uri: imageUrl }}
                className='w-full h-64 rounded-lg'
                resizeMode='cover'
              />
              <TouchableOpacity
                onPress={() => setImageUrl(null)}
                className='absolute top-2 right-2 bg-gray-800 p-1 rounded-full'
              >
                <Feather name='x' size={20} color='white' />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSelectImage}
              className='border-2 border-dashed border-gray-400 rounded-lg p-4 items-center justify-center h-64'
            >
              <Feather name='image' size={40} color='gray' />
              <Text className='text-gray-500 mt-2'>Add image</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNewPost;
