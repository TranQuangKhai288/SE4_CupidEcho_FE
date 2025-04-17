// screens/ChatDetailScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  RouteProp,
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import * as ConvAPI from "../../../apis/ConversationAPI";
import { useSocketEvents, Message } from "../../../hooks/useSocketEvents";
import { set } from "date-fns";
import { useAuth } from "../../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid"; // Thêm thư viện này vào
type RootStackParamList = {
  ChatDetail: { _id: string; name: string; avatar: string };
  VoiceCall: undefined;
  VideoCall: undefined;
};

type ChatDetailRouteProp = RouteProp<RootStackParamList, "ChatDetail">;

type ChatNavigationProp = NavigationProp<RootStackParamList, "ChatDetail">;

const ChatDetailScreen: React.FC = () => {
  const route = useRoute<ChatDetailRouteProp>();
  const navigation = useNavigation<ChatNavigationProp>();
  const { name, avatar, _id } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
  });
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null); // Thêm ref để cuộn xuống cuối

  const handleBackPress = () => {
    navigation.goBack();
  };
  const { state } = useAuth();
  const { user } = state;
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await ConvAPI.getConvDetails(
          _id,
          pagination.page,
          pagination.limit
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        Alert.alert("Lỗi", "Không thể tải tin nhắn");
      }
    };

    fetchMessages();
  }, [pagination.page, pagination.limit]);

  const { sendMessage, isConnected } = useSocketEvents({
    onNewMessage: (message: Message) => {
      if (message.conversationId === _id) {
        setMessages((prev) => {
          // Tìm tin nhắn tạm thời đã gửi
          const tempIndex = prev.findIndex(
            (msg) =>
              msg.status === "sending" &&
              msg.content === message.content &&
              msg.senderId === message.senderId
          );

          if (tempIndex !== -1) {
            const updated = [...prev];
            updated[tempIndex] = {
              ...message,
              status: "sent",
            };
            return updated;
          } else {
            return [...prev, { ...message, status: "sent" }];
          }
        });

        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    },

    onNewNotification: (notification) => {
      console.log("Thông báo mới:", notification);
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (!isConnected) {
      Alert.alert("Lỗi", "Không thể gửi tin nhắn: Socket chưa kết nối");
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.floor(Math.random() * 10000)}`; // ID tạm

    const sendingMessage: Message = {
      _id: tempId,
      conversationId: _id,
      senderId: user?._id || "",
      content: newMessage,
      createdAt: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, sendingMessage]);

    sendMessage(_id, newMessage, (response) => {
      if (response.status === "OK") {
        setNewMessage("");
        // Tin nhắn thực sẽ được xử lý tại onNewMessage
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === tempId ? { ...msg, status: "failed" } : msg
          )
        );
        Alert.alert("Lỗi", response.message || "Không thể gửi tin nhắn");
      }
    });
  };

  // Cuộn xuống cuối khi vào trang hoặc khi danh sách tin nhắn thay đổi
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View className='flex-1 bg-white pt-6'>
      <View className='flex-row items-center justify-between px-4 py-3'>
        <View className='flex-row items-center gap-4'>
          <TouchableOpacity onPress={handleBackPress} className='mr-2'>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Image source={{ uri: avatar }} className='w-10 h-10 rounded-full' />
          <Text className='text-2xl font-bold'>{name}</Text>
        </View>
        <View className='flex-row gap-6'>
          <TouchableOpacity onPress={() => navigation.navigate("VoiceCall")}>
            <Ionicons name='call-outline' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("VideoCall")}>
            <Ionicons name='videocam-outline' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name='more-horizontal' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className='flex-1 px-4 py-2 mt-4'
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        {messages.map((msg, index) => (
          <MessageBubble key={index} {...msg} />
        ))}
      </ScrollView>

      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </View>
  );
};

export default ChatDetailScreen;
