import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { MessageCircle, Heart, User } from "lucide-react-native";
import { formatDistanceToNow } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getNotifications, Notification } from "../apis/NotificationAPI"; // adjust path as needed

const PAGE_SIZE = 15;

type Props = {
  onClose: () => void;
};

const getIcon = (type: string) => {
  switch (type) {
    case "comment":
      return <MessageCircle size={32} color="#3b82f6" />;
    case "like":
      return <Heart size={32} color="#ef4444" />;
    case "follow":
    case "relationship_request":
    case "relationship_accepted":
      return <User size={32} color="#10b981" />;
    default:
      return <MessageCircle size={32} color="#6b7280" />;
  }
};

const NotificationListSheet = ({ onClose }: Props) => {
  const insets = useSafeAreaInsets();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch notifications
  const fetchNotifications = useCallback(
    async (pageNumber = 1, isRefresh = false) => {
      if (loading) return;
      setLoading(true);
      try {
        const res = await getNotifications(pageNumber, PAGE_SIZE);
        console.log(res);
        if (res) {
          setTotalPages(res.totalPages);
          if (isRefresh || pageNumber === 1) {
            setNotifications(res.notifications);
          } else {
            setNotifications((prev) => [...prev, ...res.notifications]);
          }
        }
      } catch (error) {
        // You can show an alert/toast here
      } finally {
        setLoading(false);
        if (isRefresh) setRefreshing(false);
      }
    },
    [loading]
  );

  // Initial load
  useEffect(() => {
    fetchNotifications(1, true);
    setPage(1);
  }, []);

  // Fetch next page when page changes (but not on initial)
  useEffect(() => {
    if (page === 1) return; // Already loaded in initial useEffect
    fetchNotifications(page);
  }, [page, fetchNotifications]);

  // Pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchNotifications(1, true);
  };

  // Load more data when reaching bottom
  const onEndReached = () => {
    if (!loading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <View
      className="bg-white flex-1"
      style={{
        minHeight: Dimensions.get("window").height,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex-row justify-between items-center border-b border-gray-200 ">
        <Text className="text-2xl font-bold">Notifications</Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="text-purple-500 font-semibold">Close</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          // paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row items-start gap-3 py-3 border-b border-gray-200 ${
              item.isRead ? "opacity-60" : ""
            }`}
          >
            <View>{getIcon(item.type)}</View>
            <View className="flex-1">
              <Text className="text-base text-gray-800">{item.content}</Text>
              <Text className="text-sm text-gray-500 mt-1">
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                })}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading && !refreshing ? (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default NotificationListSheet;
