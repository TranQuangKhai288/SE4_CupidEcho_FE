import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Image,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import PostCard from "../../components/PostCard";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { getAllPosts, getPostByUserId, Post } from "../../apis/PostAPI";
import CommentModal from "../../components/CommentModal";
import { useAuth } from "../../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ChevronLeft } from "lucide-react-native";
import { getDetailsUser } from "../../apis/UserAPI";
type ProfileUserDetailProps = RouteProp<
  RootStackParamList,
  "ProfileUserDetail"
>;

const ProfileUserDetail: React.FC = () => {
  const route = useRoute<ProfileUserDetailProps>();
  const { userId } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [detailUser, setDetailUser] = useState<any>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const openComments = (postId: string) => {
    setSelectedPostId(postId);
    setShowCommentsModal(true);
  };
  const { state } = useAuth();
  const { user } = state;
  const insets = useSafeAreaInsets();
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
          const data = await getPostByUserId(userId);
          const dataDetailUser = await getDetailsUser(userId);
          setPosts(data);
          setDetailUser(dataDetailUser);
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
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="relative items-center justify-center h-14 mb-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
        >
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">{detailUser?.data?.name}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar và Info */}
        <View className="flex-col items-center justify-center my-3">
          <Image
            source={{ uri: detailUser?.data?.avatar }}
            className="w-36 h-36 rounded-full mb-3"
          />
          <Text className="text-black font-semibold text-sm my-2">
            {detailUser?.data?.name}
          </Text>
          <Text className="text-black font-semibold text-sm">
            {detailUser?.data?.email}
          </Text>
        </View>

        {/* Posts */}
        {loading ? (
          <ActivityIndicator size="large" color="#6b21a8" />
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              _id={post._id}
              username={post.userId}
              avatarUrl="https://cdn-icons-png.flaticon.com/512/149/149071.png"
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

export default ProfileUserDetail;
