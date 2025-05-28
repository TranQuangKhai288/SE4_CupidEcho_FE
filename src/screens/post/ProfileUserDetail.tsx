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
  SafeAreaView,
  StatusBar,
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
import { ChevronLeft, MessageCircle, Heart } from "lucide-react-native";
import { getDetailsUser } from "../../apis/UserAPI";
import * as ProfileAPI from "../../apis/ProfileAPI";
import * as ConvAPI from "../../apis/ConversationAPI";

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
  const [profile, setProfile] = useState<any>(null);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const openComments = (postId: string) => {
    setSelectedPostId(postId);
    setShowCommentsModal(true);
  };
  const { state } = useAuth();
  const { user } = state;
  const insets = useSafeAreaInsets();

  const updateCommentCount = (postId: string, newCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, commentCount: newCount } : post
      )
    );
  };
  const fetchPosts = async () => {
    try {
      const data = await getPostByUserId(userId);
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserProfile = async () => {
    try {
      if (user?._id) {
        const response = await ProfileAPI.getDetailsProfile(userId);
        console.log(response, "response");
        setProfile(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const getDetailUser = async () => {
    try {
      if (userId) {
        const response = await getDetailsUser(userId);
        console.log(response, "response get de");
        setDetailUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      fetchPosts();
      getDetailUser();
    }, [])
  );

  const handleMessage = async () => {
    navigation.navigate("ChatDetail", { _id: "hehe", name: "Ngu", avatar: "" });
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
          <View className="absolute flex-row top-2 left-2 w-full justify-between  ">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white/70 p-2 rounded-full w-12 h-12 justify-center items-center"
            >
              <ChevronLeft size={24} color="#000" style={{ marginRight: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile card */}
        <View
          className="bg-white -mt-16 flex-1 "
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
          <View className="bg-white pt-6 px-6">
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
              <View className="flex-1 justify-center items-center ">
                <Text className="text-4xl font-bold">
                  {detailUser?.name || "Andrew Ainsley"},{" "}
                  {new Date().getFullYear() -
                    new Date(profile?.birthDate).getFullYear()}
                </Text>
                <View className="flex-row items-center mt-1 gap-2">
                  <Text className="text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-xl text-base">
                    {profile?.zodiac}
                  </Text>
                </View>

                <View className="w-full gap-2 mt-4 justify-center items-center flex-row">
                  <TouchableOpacity className="py-4 px-4 bg-purple-500 min-w-1/3 justify-center items-center rounded-2xl flex-row">
                    <Heart size={24} color="#fff" />
                    <Text className="text-xl font-bold ml-2 text-white">
                      Sent Match
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="py-3.5 px-4  min-w-1/3 justify-center items-center rounded-2xl flex-row border-2 border-purple-600"
                    onPress={handleMessage}
                  >
                    <MessageCircle size={24} color="#000" />
                    <Text className="text-xl font-bold ml-2">Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* About */}
            <Text className="text-xl font-bold mt-3">About</Text>
            <Text className="text-gray-700 mt-2 text-base font-semibold">
              {detailUser?.bio || "No bio"}
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
              {profile?.interests?.map((interest: any) => (
                <Text
                  key={interest?._id}
                  className="px-4 py-2 bg-purple-700 text-white rounded-full text-base"
                >
                  {interest?.name}
                </Text>
              ))}
            </View>
          </View>

          <View className="mt-4 ">
            <Text className="text-xl font-bold px-6">Post</Text>
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

export default ProfileUserDetail;
