import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { Heart, MessageCircle } from "lucide-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { getPostById } from "../../apis/PostAPI";
import baseURL from "../../apis/Customize-axios";

type PostDetailRouteProp = RouteProp<RootStackParamList, "PostDetail">;

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
}

const PostDetail: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<PostDetailRouteProp>();
  const { postId } = route.params;

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postData = await getPostById(postId);
        //  const commentsRes = await axios.get(
        //    `${baseURL}/api/post/comment/${postId}`
        //  );

        if (postData) {
          setPost(postData);
          //  setComments(commentsRes.data.data.comments);
        }
      } catch (error) {
        console.error("Failed to load post or comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const fakeComment: Comment = {
      _id: Date.now().toString(),
      content: newComment,
      createdAt: new Date().toISOString(),
      user: {
        name: "Bạn",
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      },
    };
    setComments([fakeComment, ...comments]);
    setNewComment("");
  };

  if (loading || !post) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };
  return (
    <View className="flex-1 bg-white pt-10 px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Post Details</Text>
        <View className="w-5" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Post */}
        <View className="px-2 py-3">
          <TouchableOpacity>
            <View className="flex-row items-center mb-3">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                }}
                className="w-10 h-10 mr-3 rounded-full"
              />
              <View>
                <Text className="font-semibold text-sm">{post.userId}</Text>
                <Text className="text-xs text-gray-500">
                  {timeAgo(post.createdAt)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <Text className="text-base text-black mb-3">{post.content}</Text>

          {post.media?.[0] && (
            <Image
              source={{ uri: post.URL }}
              className="w-full h-72 rounded-lg mb-3"
              resizeMode="cover"
            />
          )}

          {/* Like & Comment count */}
          <View className="flex-row gap-6 mb-4">
            <TouchableOpacity
              onPress={() => setLiked(!liked)}
              className="flex-row items-center"
            >
              {liked ? (
                <Heart fill="#9333ea" color="#9333ea" size={20} />
              ) : (
                <Heart size={20} color="#000" />
              )}
              <Text className="ml-2 text-sm text-black">
                {liked
                  ? (post.likes?.length ?? 0) + 1
                  : post.likes?.length ?? 0}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
              <MessageCircle size={20} color="#000" />
              <Text className="ml-2 text-sm text-black">{comments.length}</Text>
            </View>
          </View>
        </View>

        {/* Comments */}
        <View className="px-2 py-3">
          <Text className="text-lg font-bold mb-3">Bình luận</Text>
          {comments.length > 0 ? (
            comments.map((c) => (
              <View key={c._id} className="mb-4 flex-row gap-3">
                <Image
                  source={{ uri: c.user.avatar }}
                  className="w-8 h-8 rounded-full"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-sm">{c.user.name}</Text>
                  <Text className="text-sm text-black mt-1">{c.content}</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {timeAgo(c.createdAt)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">Chưa có bình luận nào.</Text>
          )}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View className="flex-row items-center p-4 border-t border-gray-200">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2"
          placeholder="Viết bình luận..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Text className="text-purple-600 font-semibold">Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostDetail;
