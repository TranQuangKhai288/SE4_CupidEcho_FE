import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import PostCard from "../components/PostCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import { getAllPosts, Post } from "../apis/PostAPI";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotificationListSheet from "../components/NotificationListSheet";
import { useBottomSheet } from "../contexts/BottomSheetContext";
import CommentSheet from "../components/CommentSheet";

const PAGE_SIZE = 20;
const END_REACHED_THRESHOLD = 0.5; // Khi lướt tới 50% cuối danh sách sẽ fetch thêm

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const { state } = useAuth();
  const { user } = state;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // loading lần đầu
  const [loadingMore, setLoadingMore] = useState(false); // loading khi fetch thêm
  const [refreshing, setRefreshing] = useState(false); // loading khi pull to refresh
  const [hasMore, setHasMore] = useState(true); // còn dữ liệu để fetch tiếp không

  const { openBottomSheet, closeBottomSheet } = useBottomSheet();
  const openComments = (postId: string) => {
    openBottomSheet(
      <CommentSheet
        postId={postId}
        onClose={closeBottomSheet}
        onUpdateCommentCount={updateCommentCount}
      />,
      ["80%"]
    );
  };

  const updateCommentCount = (postId: string, newCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, commentCount: newCount } : post
      )
    );
  };

  // Fetch posts cho 1 page, append hoặc replace tuỳ flag isRefresh
  const fetchPosts = async (pageNumber: number, isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else if (pageNumber === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    try {
      const data = await getAllPosts(pageNumber, PAGE_SIZE);
      const fetchedPosts = data?.posts || [];
      setHasMore(fetchedPosts.length === PAGE_SIZE); // Nếu fetch đủ PAGE_SIZE thì có thể còn
      if (isRefresh || pageNumber === 1) {
        setPosts(fetchedPosts);
      } else {
        // Loại trùng (nếu có) khi append
        setPosts((prev) => {
          const ids = new Set(prev.map((p) => p._id));
          return [...prev, ...fetchedPosts.filter((p) => !ids.has(p._id))];
        });
      }
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      if (isRefresh) setRefreshing(false);
      else if (pageNumber === 1) setLoading(false);
      else setLoadingMore(false);
    }
  };

  // Khi vào focus screen, reset về page 1
  useFocusEffect(
    useCallback(() => {
      setPage(1);
      fetchPosts(1, true);
    }, [])
  );

  // Khi page thay đổi (và khác 1), fetch thêm
  useEffect(() => {
    // if (page > 1) {
    console.log("page", page);
    console.log("fetchPosts");
    fetchPosts(page);
    // }
  }, [page]);

  // Pagination: Khi cuộn tới cuối
  const handleEndReached = () => {
    if (!loadingMore && !loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // Refresh: Kéo xuống đầu trang
  const handleRefresh = () => {
    setPage(1);
    fetchPosts(1, true);
  };

  // Render từng post
  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      key={item._id}
      _id={item._id}
      username={item?.user?.name}
      avatarUrl={item.user.avatar}
      timeAgo={new Date(item.createdAt).toLocaleString()}
      caption={item.content}
      media={item.media ?? []}
      likeCount={item.likeCount}
      commentCount={item.commentCount}
      isLiked={item.isLiked}
      openComments={openComments}
      userId={item.user._id}
    />
  );

  const handleOpenNotification = () => {
    openBottomSheet(<NotificationListSheet onClose={closeBottomSheet} />, [
      "90%",
    ]);
  };
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row justify-between items-center py-3 px-6">
        <View className="flex-row gap-3 items-center">
          <Image
            source={require("../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className="text-3xl font-bold">CupidEcho</Text>
        </View>

        <View className="flex-row gap-5 items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateNewPost")}
          >
            <Feather name="plus-circle" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenNotification}>
            <View className="relative">
              <Feather name="heart" size={20} color="black" />
              <View className="absolute bottom-4 left-4">
                <Text className="bg-red-600 text-white text-xs rounded-full px-1">
                  5
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={END_REACHED_THRESHOLD}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color="#6b21a8"
              style={{ marginVertical: 12 }}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#6b21a8"
          />
        }
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default HomeScreen;
