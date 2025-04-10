import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Heart, MessageCircle, Share2 } from "lucide-react-native";
import PostCard from "../components/PostCard";

export const mockPosts = [
  {
    id: "1",
    username: "Andre Oliver",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    timeAgo: "1 giờ",
    caption:
      "Gái Nam và Trai Bắc trong những joke của Kiến không ngủ là có thật",
    imageUrl: "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
    likes: 5844,
    comments: 166,
  },
  {
    id: "2",
    username: "Trần Văn A",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    timeAgo: "2 giờ",
    caption: "Tối qua chill với anh em mà sáng nay vẫn chưa tỉnh 🍻",
    imageUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    likes: 322,
    comments: 45,
  },
  {
    id: "3",
    username: "Lê Thu Hằng",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/168/168726.png",
    timeAgo: "3 giờ",
    caption: "Mùa hè năm nay phải đi Đà Lạt ít nhất 2 lần ☀️🌸",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    likes: 1032,
    comments: 77,
  },
  {
    id: "4",
    username: "Nguyễn Quốc Bảo",
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/924/924915.png",
    timeAgo: "4 giờ",
    caption: "Code xuyên Tết, deadline không tha một ai 😭💻",
    imageUrl:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80",
    likes: 867,
    comments: 98,
  },
];

const HomeScreen: React.FC = ({}) => {
  const { state } = useAuth();
  const { user } = state;

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 '>
        <View className='flex-row gap-3 items-center'>
          <Image
            source={require("../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className='text-3xl font-bold'>CupidEcho</Text>
        </View>

        <View className='flex-row gap-5 items-center'>
          <TouchableOpacity>
            <Feather name='plus-circle' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <View className='relative'>
              <Feather name='heart' size={20} color='black' />
              <View className='absolute bottom-4 left-4'>
                <Text className='bg-red-600 text-white text-xs rounded-full px-1'>
                  5
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            username={post.username}
            avatarUrl={post.avatarUrl}
            timeAgo={post.timeAgo}
            caption={post.caption}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
