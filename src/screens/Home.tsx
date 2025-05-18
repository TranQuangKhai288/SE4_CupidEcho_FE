import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import PostCard from "../components/PostCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { getAllPosts, Post } from "../apis/PostAPI";
import { useFocusEffect } from "@react-navigation/native";
import CommentModal from "../components/CommentModal";

const HomeScreen: React.FC = () => {
  const { state } = useAuth();
  const { user } = state;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const openComments = (postId: string) => {
    setSelectedPostId(postId);
    setShowCommentsModal(true);
  };

  const handleLikeToggle = (postId: string, liked: boolean) => {
    if (!user?._id) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: liked
                ? [...post.likes, user._id]
                : post.likes.filter((id) => id !== user._id),
            }
          : post
      )
    );
  };

  const updateCommentCount = (postId: string, newCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, commentCount: newCount } : post
      )
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        try {
          const data = await getAllPosts();
          setPosts(data);
        } catch (err) {
          console.error("Failed to fetch posts", err);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }, [])
  );

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      {/* Header */}
      <View className='flex-row justify-between items-center py-3'>
        <View className='flex-row gap-3 items-center'>
          <Image
            source={require("../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className='text-3xl font-bold'>CupidEcho</Text>
        </View>

        <View className='flex-row gap-5 items-center'>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateNewPost")}
          >
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

      {/* Posts */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size='large' color='#6b21a8' />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              _id={post._id}
              username={post.userId}
              avatarUrl='https://cdn-icons-png.flaticon.com/512/149/149071.png'
              timeAgo={new Date(post.createdAt).toLocaleString()}
              caption={post.content}
              media={post.media ?? []}
              likes={post.likes ?? []}
              comments={post.commentCount ?? 0}
              openComments={openComments}
              onLikeToggle={handleLikeToggle}
              userId={user?._id ?? ""}
            />
          ))
        )}
      </ScrollView>

      {/* Comments Modal */}
      {selectedPostId && (
        <CommentModal
          visible={showCommentsModal}
          onClose={() => setShowCommentsModal(false)}
          postId={selectedPostId}
          onUpdateCommentCount={updateCommentCount}
        />
      )}
    </View>
  );
};

export default HomeScreen;
