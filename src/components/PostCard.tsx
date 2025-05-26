import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Heart, MessageCircle } from "lucide-react-native";
import { Video } from "expo-av";
import { likePost } from "../apis/PostAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";

interface MediaItem {
  type: "image" | "video";
  URL: string;
}

interface PostCardProps {
  _id: string;
  username: string;
  avatarUrl: string;
  timeAgo: string;
  caption: string;
  media: MediaItem[];
  likes: string[];
  comments: number;
  openComments: (postId: string) => void;
  onLikeToggle?: (postId: string, liked: boolean) => void;
  userId: string;
}

const PostCard: React.FC<PostCardProps> = ({
  _id,
  username,
  avatarUrl,
  timeAgo,
  caption,
  media,
  likes,
  comments,
  openComments,
  onLikeToggle,
  userId,
}) => {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    setLiked(likes.includes(userId));
  }, [likes, userId]);

  const handleLike = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }
      await likePost(_id, token);
      const newLiked = !liked;
      setLiked(newLiked);
      onLikeToggle?.(_id, newLiked);
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  return (
    <View className="bg-gray-50 px-4 py-3 shadow-gray-400 shadow-lg rounded-lg m-4">
      {/* Header */}
      <TouchableOpacity className="flex-row items-center mb-2" onPress={() => {
            navigation.navigate("ProfileUserDetail", { userId: userId });
          }} >
          <Image
            source={{ uri: avatarUrl }}
            className="w-10 h-10 mr-2 rounded-full"
          />
          <View className="flex-col items-start justify-center">
            <Text className="text-black font-semibold text-sm">{username}</Text>
            <Text className="text-gray-500 text-xs ml-1">• {timeAgo}</Text>
          </View>
      </TouchableOpacity>

      {/* Caption */}
      <Text className="text-black text-sm mb-3">{caption}</Text>

      {/* Media */}
      {media.map((item, index) => (
        <View key={index} className="mb-3 mt-1">
          {item.type === "image" ? (
            <Image
              source={{ uri: item.URL }}
              className="w-full h-72 rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <Video
              source={{ uri: item.URL }}
              className="w-full h-72 rounded-lg"
              useNativeControls
              isLooping
            />
          )}
        </View>
      ))}

      {/* Actions */}
      <View className="flex-row justify-between mt-4">
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleLike}
          >
            {liked ? (
              <Heart fill="#9333ea" color="#9333ea" size={20} />
            ) : (
              <Heart size={20} color="#000" />
            )}
            <Text className="text-black text-sm ml-1">
              {likes.length +
                (liked && !likes.includes(userId) ? 1 : 0) -
                (!liked && likes.includes(userId) ? 1 : 0)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openComments(_id)}
            className="flex-row items-center"
          >
            <MessageCircle size={20} color="#000" />
            <Text className="text-black text-sm ml-1">{comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
