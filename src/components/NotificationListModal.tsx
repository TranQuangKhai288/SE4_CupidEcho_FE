import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Heart, User } from "lucide-react-native";
import { formatDistanceToNow } from "date-fns";

const SCREEN_WIDTH = Dimensions.get("window").width;

type NotificationItem = {
  _id: string;
  type: "comment" | "like" | "follow" | string;
  content: string;
  createdAt: string;
  isRead: boolean;
  link: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
};

const getIcon = (type: string) => {
  switch (type) {
    case "comment":
      return <MessageCircle size={24} color='#3b82f6' />;
    case "like":
      return <Heart size={24} color='#ef4444' />;
    case "follow":
      return <User size={24} color='#10b981' />;
    default:
      return <MessageCircle size={24} color='#6b7280' />;
  }
};

const NotificationListModal = ({ visible, onClose, notifications }: Props) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [internalVisible, setInternalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setInternalVisible(false);
      });
    }
  }, [visible]);

  if (!internalVisible) return null;

  return (
    <Modal transparent visible={true} animationType='none'>
      <View className='flex-1 bg-black bg-opacity-40'>
        <TouchableOpacity
          className='absolute top-0 left-0 right-0 bottom-0'
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          className='absolute top-0 bottom-0 right-0 w-full bg-white'
          style={{
            transform: [{ translateX: slideAnim }],
          }}
        >
          <View className='flex-row justify-between items-center px-4 py-3 border-b border-gray-200'>
            <Text className='text-lg font-bold'>Notifications</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className='text-purple-500 font-semibold'>Close</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={notifications}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`flex-row items-start gap-3 py-3 border-b border-gray-200 ${
                  item.isRead ? "opacity-60" : ""
                }`}
              >
                {getIcon(item.type)}
                <View className='flex-1'>
                  <Text className='text-sm text-gray-800'>{item.content}</Text>
                  <Text className='text-xs text-gray-500 mt-1'>
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default NotificationListModal;
