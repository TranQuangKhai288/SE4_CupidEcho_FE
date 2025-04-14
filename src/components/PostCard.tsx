import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Heart, MessageCircle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";

interface PostCardProps {
  id: string;
  username: string;
  avatarUrl: string;
  timeAgo: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  username,
  avatarUrl,
  timeAgo,
  caption,
  imageUrl,
  likes,
  comments,
}) => {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className='bg-gray-50 px-4 py-3 shadow-gray-400 shadow-lg rounded-lg my-4'>
      {/* Header */}
      <View className='flex-row items-center mb-2'>
        <Image
          source={{ uri: avatarUrl }}
          className='w-10 h-10 mr-2 rounded-full'
        />
        <View className='flex-col items-start justify-center'>
          <Text className='text-black font-semibold text-sm'>{username}</Text>
          <Text className='text-gray-500 text-xs ml-1'>• {timeAgo}</Text>
        </View>
      </View>

      {/* Caption */}
      <Text className='text-black text-sm mb-3'>{caption}</Text>

      {/* Image */}
      <View>
        <View className='mb-3 mt-1'>
          <Image
            source={{ uri: imageUrl }}
            className='w-full h-72 rounded-lg'
            resizeMode='cover'
          />
        </View>
      </View>

      <View className='flex-row justify-between mt-4'>
        <View className='flex-row gap-4'>
          {/* Heart toggle */}
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
              {liked ? likes + 1 : likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetail", { postId: id })}
            className='flex-row items-center'
          >
            <MessageCircle size={20} color='#000' />
            <Text className='text-black text-sm ml-1'>{comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
