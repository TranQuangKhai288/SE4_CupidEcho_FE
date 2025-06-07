import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import * as ProfileAPI from "../../apis/ProfileAPI";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ChevronLeft, PencilLine } from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { getAllPosts, getPostByUserId, Post } from "../../apis/PostAPI";
import PostCard from "../../components/PostCard";
import CommentModal from "../../components/CommentModal";

const MyProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const { user } = state;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const fetchUserDetails = async () => {
    try {
      if (user?._id) {
        const response = await ProfileAPI.getDetailsProfile(
          user._id.toString()
        );
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const fetchPosts = async () => {
    try {
      const data = await getPostByUserId(user?._id || "");
      console.log(data, "post data");
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data again when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchUserDetails();
      fetchPosts();
    }, [user?._id]) // thêm dependency nếu cần
  );

  if (!profile) {
    return <ActivityIndicator />;
  }
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1">
        {/* Avatar */}
        <View className="relative bg-slate-500">
          <Image
            source={{
              uri: user?.avatar,
            }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />
          {/* Back button overlay */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-2 left-2 bg-white/70 p-2 rounded-full"
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <View
          className="bg-white px-6 p-6 -mt-16 flex-1"
          style={{
            borderTopLeftRadius: 44,
            borderTopRightRadius: 44,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -5, // đổ bóng lên trên
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,

            // Android shadow
            elevation: 10,
          }}
        >
          <View>
            <View
              className="flex-row items-center justify-between"
              style={{
                shadowOffset: { width: 0, height: -6 }, // hướng bóng lên trên
                shadowOpacity: 0.15,
                shadowRadius: 12,
                shadowColor: "#000",
                elevation: 8,
              }}
            >
              <View>
                <Text className="text-4xl font-bold">
                  {user?.name || "Andrew Ainsley"},{" "}
                  {new Date().getFullYear() -
                    new Date(profile?.birthDate).getFullYear()}
                </Text>
                <View className="flex-row items-center mt-2 gap-2">
                  <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-xl text-base">
                    {profile.zodiac}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                className="bg-white/70 p-2 rounded-full"
                onPress={() => navigation.navigate("EditProfile")}
              >
                <PencilLine size={24} color="#7b219f" />
              </TouchableOpacity>
            </View>
            {/* About */}
            <Text className="text-xl font-bold mt-3">About</Text>
            <Text className="text-gray-700 mt-2 text-base font-semibold">
              {profile?.bio || "No bio"}
            </Text>

            <View>
              <Text className="text-xl font-bold mt-3">Birthday</Text>
              <View className="flex-row items-center mt-2 gap-2">
                <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full text-base">
                  {new Date(profile?.birthDate)?.toLocaleDateString("vi-VN")}
                </Text>
              </View>
            </View>

            {/* Interests */}
            <Text className="text-xl font-bold mt-3 mb-2">Interest</Text>
            <View className="flex-row flex-wrap gap-3">
              {profile.interests?.map((interest: any) => (
                <Text
                  key={interest?._id}
                  className="px-4 py-2 bg-purple-700 text-white rounded-full text-base"
                >
                  {interest?.name}
                </Text>
              ))}
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-xl font-bold">Post</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#6b21a8" />
            ) : posts.length !== 0 ? (
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
            ) : (
              <View className="justify-center items-center">
                <Text className="text-2xl font-bold">You have no post</Text>
              </View>
            )}
          </View>
        </View>
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
    </SafeAreaView>
  );
};

export default MyProfileScreen;
