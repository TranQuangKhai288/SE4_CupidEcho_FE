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
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  openComments: (postId: string) => void;
  // onLikeToggle?: (postId: string, liked: boolean) => void;
  userId: string;
}

const PostCard: React.FC<PostCardProps> = ({
  _id,
  username,
  avatarUrl,
  timeAgo,
  caption,
  media,
  likeCount,
  commentCount,
  isLiked,
  openComments,
  // onLikeToggle,
  userId,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likeCount);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLike = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }
      const resLike = await likePost(_id);
      console.log(resLike, "reslike");
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
      setLiked(!liked);
      // onLikeToggle?.(_id, !liked);
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  return (
    <View className="bg-gray-50 px-4 py-3 shadow-gray-400 shadow-lg rounded-lg m-4">
      {/* Header */}
      <TouchableOpacity
        className="flex-row items-center mb-2"
        onPress={() => {
          navigation.navigate("ProfileUserDetail", { userId: userId });
        }}
      >
        <Image
          source={{ uri: avatarUrl }}
          className="w-12 h-12 mr-2 rounded-full"
        />
        <View className="flex-col items-start justify-center">
          <Text className="text-black font-semibold text-xl">{username}</Text>
          <Text className="text-gray-500 text-sm ml-1">• {timeAgo}</Text>
        </View>
      </TouchableOpacity>

      {/* Caption */}
      <Text className="text-black text-lg mb-3">{caption}</Text>

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
              <Heart fill="#9333ea" color="#9333ea" size={24} />
            ) : (
              <Heart size={24} color="#000" />
            )}
            <Text className="text-black text-lg ml-1">{likesCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openComments(_id)}
            className="flex-row items-center"
          >
            <MessageCircle size={24} color="#000" />
            <Text className="text-black text-lg ml-1">{commentCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
