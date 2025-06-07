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
import { getPostByUserId, Post } from "../../apis/PostAPI";
import CommentModal from "../../components/CommentModal";
import { useAuth } from "../../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronLeft,
  MessageCircle,
  Heart,
  SendHorizontal,
  Check,
  CheckCircle,
  X,
} from "lucide-react-native";
import { getDetailsUser } from "../../apis/UserAPI";
import * as ProfileAPI from "../../apis/ProfileAPI";
import * as ConvAPI from "../../apis/ConversationAPI";
import * as MatchingAPI from "../../apis/MatchingAPI";

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
  const [matchStatus, setMatchStatus] = useState<any>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const { state } = useAuth();
  const { user } = state;

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
        setDetailUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getMatchStatus = async () => {
    try {
      const resStatus = await MatchingAPI.getRelationshipStatus(userId);
      setMatchStatus(resStatus.data);
    } catch (error) {
      setMatchStatus(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      fetchPosts();
      getDetailUser();
      getMatchStatus();
    }, [])
  );

  const handleMessage = async () => {
    try {
      const participants = [user?._id || "", userId];
      const resAccess = await ConvAPI.accessConv(participants);
      navigation.navigate("ChatDetail", {
        convId: resAccess.data._id,
        name: detailUser.name,
        avatar: detailUser.avatar,
      });
    } catch (e) {
      console.log(e, "err");
    }
  };

  const handleReject = async () => {
    try {
      await MatchingAPI.changeStatusRelationship(matchStatus._id, "rejected");
      await getMatchStatus();
    } catch (e) {
      console.log(e);
    }
  };

  const handleAccept = async () => {
    try {
      await MatchingAPI.changeStatusRelationship(matchStatus._id, "accepted");
      await getMatchStatus();
    } catch (e) {
      console.log(e);
    }
  };

  const renderMatchAndMessageButtons = () => {
    if (matchStatus && matchStatus.status === "waiting") {
      return (
        <View className="w-full items-center">
          <View className="flex-row gap-2 w-full justify-center mb-2">
            <TouchableOpacity
              className="py-4 px-4 bg-red-500 min-w-1/3 justify-center items-center rounded-2xl flex-row"
              onPress={handleReject}
            >
              <X size={24} color="#fff" />
              <Text className="text-xl font-bold ml-2 text-white">Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-4 px-4 bg-green-500 min-w-1/3 justify-center items-center rounded-2xl flex-row"
              onPress={handleAccept}
            >
              <CheckCircle size={24} color="#fff" />
              <Text className="text-xl font-bold ml-2 text-white">Accept</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="py-3.5 px-4 min-w-1/3 justify-center items-center rounded-2xl flex-row border-2 border-purple-600"
            onPress={handleMessage}
          >
            <MessageCircle size={24} color="#000" />
            <Text className="text-xl font-bold ml-2">Message</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Các trạng thái còn lại
    return (
      <View className="w-full flex-row gap-2 justify-center items-center">
        <View className="flex-1">{renderMatchButton()}</View>
        <TouchableOpacity
          className="py-3.5 px-4 flex-1 justify-center items-center rounded-2xl flex-row border-2 border-purple-600"
          onPress={handleMessage}
        >
          <MessageCircle size={24} color="#000" />
          <Text className="text-xl font-bold ml-2">Message</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Chỉ render các nút match, ngoài trạng thái waiting
  const renderMatchButton = () => {
    if (!matchStatus) {
      return (
        <TouchableOpacity className="py-4 px-4 bg-purple-500 justify-center items-center rounded-2xl flex-row opacity-60">
          <Heart size={24} color="#fff" />
          <Text className="text-xl font-bold ml-2 text-white">Sent Match</Text>
        </TouchableOpacity>
      );
    }

    if (matchStatus.status === "accepted" && matchStatus.type === "crush") {
      return (
        <TouchableOpacity
          className="py-4 px-4 bg-green-500 justify-center items-center rounded-2xl flex-row"
          disabled
        >
          <Check size={24} color="#fff" />
          <Text className="text-xl font-bold ml-2 text-white">Matched</Text>
        </TouchableOpacity>
      );
    }

    if (matchStatus.status === "pending" && matchStatus.type === "crush") {
      return (
        <TouchableOpacity
          className="py-4 px-4 bg-orange-400 justify-center items-center rounded-2xl flex-row"
          disabled
        >
          <SendHorizontal size={24} color="#fff" />
          <Text className="text-xl font-bold ml-2 text-white">Pending...</Text>
        </TouchableOpacity>
      );
    }

    // Trường hợp khác
    return (
      <TouchableOpacity className="py-4 px-4 bg-purple-500 justify-center items-center rounded-2xl flex-row opacity-60">
        <Heart size={24} color="#fff" />
        <Text className="text-xl font-bold ml-2 text-white">Sent Match</Text>
      </TouchableOpacity>
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
              uri: detailUser?.avatar,
            }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />
          {/* Back button overlay */}
          <View className="absolute flex-row top-2 left-2 w-full justify-between">
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
              height: -5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
          }}
        >
          <View className="bg-white pt-6 px-6">
            <View
              className="flex-row items-center justify-between"
              style={{
                shadowOffset: { width: 0, height: -6 },
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

                {/* Các nút Match và Message */}
                <View className="w-full mt-4">
                  {renderMatchAndMessageButtons()}
                </View>
              </View>
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
                  openComments={setSelectedPostId}
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
