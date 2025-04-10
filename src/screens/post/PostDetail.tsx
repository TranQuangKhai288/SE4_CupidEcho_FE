import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Heart, MessageCircle } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { mockPosts } from "../Home";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";

interface Comment {
  id: string;
  username: string;
  text: string;
  timeAgo: string;
}

const PostDetail: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "PostDetail">>();
  const { postId } = route.params;

  const post = mockPosts.find((p) => p.id === postId);
  if (!post) return <Text>Post not found</Text>;

  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: "1", username: "User1", text: "Đẹp quá!", timeAgo: "5 phút" },
    {
      id: "2",
      username: "User2",
      text: "Tuyệt vời luôn á",
      timeAgo: "10 phút",
    },
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: "CurrentUser", // Thay bằng username thực tế từ AuthContext
        text: newComment,
        timeAgo: "Vừa xong",
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center p-4 '>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={20} color='black' />
        </TouchableOpacity>
        <Text className='text-xl font-bold'>Post Details</Text>
        <View className='w-2' />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Post Content */}
        <View className=' px-4 py-3'>
          <View className='flex-row items-center mb-2'>
            <Image
              source={{ uri: post.avatarUrl }}
              className='w-10 h-10 mr-2 rounded-full'
            />
            <View className='flex-col items-start justify-center'>
              <Text className='text-black font-semibold text-sm'>
                {post.username}
              </Text>
              <Text className='text-gray-500 text-xs ml-1'>
                • {post.timeAgo}
              </Text>
            </View>
          </View>

          <Text className='text-black text-sm mb-3'>{post.caption}</Text>

          <Image
            source={{ uri: post.imageUrl }}
            className='w-full h-72 rounded-lg mb-3'
            resizeMode='cover'
          />

          <View className='flex-row justify-between'>
            <View className='flex-row gap-4'>
              <TouchableOpacity
                className='flex-row items-center'
                onPress={() => setLiked(!liked)}
              >
                {liked ? (
                  <Heart fill='#9333ea' color='#9333ea' size={20} />
                ) : (
                  <Heart size={20} color='#000' />
                )}
                <Text className='text-black text-sm ml-1'>
                  {liked ? post.likes + 1 : post.likes}
                </Text>
              </TouchableOpacity>
              <View className='flex-row items-center'>
                <MessageCircle size={20} color='#000' />
                <Text className='text-black text-sm ml-1'>
                  {comments.length}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Comments Section */}
        <View className='px-4 py-3'>
          <Text className='text-lg font-bold mb-3'>Comments</Text>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <View key={comment.id} className='mb-4'>
                <View className='flex-row items-center gap-1'>
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/1.jpg",
                    }}
                    className='w-8 h-8 mr-2 rounded-full'
                  />
                  <View className='flex-col'>
                    <View className='flex-row items-baseline gap-2'>
                      <Text className='font-semibold text-sm'>
                        {comment.username}
                      </Text>
                      <Text className='text-gray-500 text-xs'>
                        {comment.timeAgo}
                      </Text>
                    </View>
                    <Text className='text-black text-sm mt-1'>
                      {comment.text}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text className='text-gray-500'>Chưa có bình luận nào.</Text>
          )}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View className='flex-row items-center p-4 border-t border-gray-200'>
        <TextInput
          className='flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2'
          placeholder='Viết bình luận...'
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Text className='text-purple-600 font-semibold'>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostDetail;
