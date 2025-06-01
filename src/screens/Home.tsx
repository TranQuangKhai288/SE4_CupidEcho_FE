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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationListModal from "../components/NotificationListModal";

const mockNotifications = [
  {
    _id: "6835cd7834c3a70fddeba80f",
    userId: "68344a1938efaa3c2ff6c1ea",
    type: "comment",
    content: "Phạm Thu Hằng đã cho bạn biết rằng Phạm Thu Hằng đang để ý bạn",
    link: "/relationship/",
    isRead: false,
    createdAt: "2025-05-27T14:34:32.405Z",
  },
  {
    _id: "6835ceec34c3a70fddeba826",
    userId: "683453f4a46d6cc89d0003d6",
    type: "like",
    content: "Phạm Thu Hằng đã thích bài viết của bạn.",
    link: "/posts/683456f1a46d6cc89d000647",
    isRead: false,
    createdAt: "2025-05-27T14:40:44.399Z",
  },
];

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const { state } = useAuth();
  const { user } = state;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [modalNotification, setModalNotification] = useState(false);

  const openComments = (postId: string) => {
    setSelectedPostId(postId);
    setShowCommentsModal(true);
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
    <View className='flex-1 bg-white' style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className='flex-row justify-between items-center py-3 px-6'>
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
          <TouchableOpacity onPress={() => setModalNotification(true)}>
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
              username={post?.user?.name}
              avatarUrl={post.user.avatar}
              timeAgo={new Date(post.createdAt).toLocaleString()}
              caption={post.content}
              media={post.media ?? []}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              isLiked={post.isLiked}
              openComments={openComments}
              // onLikeToggle={handleLikeToggle}
              userId={post.user._id}
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

      <NotificationListModal
        visible={modalNotification}
        onClose={() => setModalNotification(false)}
        notifications={mockNotifications}
      />
    </View>
  );
};

export default HomeScreen;
