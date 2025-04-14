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

const CreateNewPost: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { state } = useAuth();
  const { user } = state;

  const handlePost = () => {
    if (!caption.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập nội dung bài viết!");
      return;
    }
    // Ở đây bạn có thể gọi API để đăng bài
    Alert.alert("Thành công", "Bài viết đã được đăng!");
    setCaption("");
    setImageUrl(null);
    navigation.goBack(); // Quay lại HomeScreen sau khi đăng
  };

  // Hàm giả lập chọn ảnh (thay bằng react-native-image-picker nếu cần)
  const handleSelectImage = () => {
    setImageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c");
    // Thực tế: tích hợp react-native-image-picker
    // Ví dụ:
    // import * as ImagePicker from 'react-native-image-picker';
    // ImagePicker.launchImageLibrary({}, (response) => {
    //   if (response.uri) setImageUrl(response.uri);
    // });
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      {/* Header */}
      <View className='flex-row justify-between items-center p-4 '>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={20} color='black' />
        </TouchableOpacity>
        <Text className='text-xl font-bold'>Create a new Post</Text>
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
