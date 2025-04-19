import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useAuth } from "../../../contexts/AuthContext";
import { RootStackParamList } from "../../../navigation/AppNavigation";

type BlindChatRouteProp = RouteProp<RootStackParamList, "BlindChat">;

type ChatNavigationProp = NavigationProp<RootStackParamList>;

const BlindChatScreen: React.FC = () => {
  const route = useRoute<BlindChatRouteProp>();
  const navigation = useNavigation<ChatNavigationProp>();
  const { partnerId, conversationId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const { state } = useAuth();
  const { user } = state;

  // Giả lập tên và avatar cho Blind Chat
  const blindChatName = "Your Match";
  const blindChatAvatar = "https://i.pravatar.cc/150?img=1";
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await ConvAPI.getConvDetails(conversationId, 1, 15);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        Alert.alert("Lỗi", "Không thể tải tin nhắn");
      }
    };

    fetchMessages();
  }, [conversationId]);

  const { sendMessage, isConnected, sendExitSign } = useSocketEvents({
    onNewMessage: (message: Message) => {
      console.log("Tin nhắn mới:", message);
      if (message.conversationId === conversationId) {
        setMessages((prev) => {
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
    onExitSign: (convId: string) => {
      console.log("Exit sign received for conversation:", convId);
      Alert.alert("Alert", "Your match has exited the conversation.", [
        {
          text: "OK",
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("Home"); // hoặc màn hình phù hợp
            }
          },
        },
      ]);
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (!isConnected) {
      Alert.alert("Lỗi", "Không thể gửi tin nhắn: Socket chưa kết nối");
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const sendingMessage: Message = {
      _id: tempId,
      conversationId,
      senderId: user?._id || "",
      content: newMessage,
      createdAt: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, sendingMessage]);

    sendMessage(conversationId, newMessage, (response) => {
      if (response.status === "OK") {
        setNewMessage("");
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

  const handleRevealIdentity = () => {
    Alert.alert(
      "Lộ danh tính",
      "Bạn có muốn lộ danh tính và chuyển sang chat thông thường?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              // Giả lập API lấy thông tin đối tác
              const partnerInfo = {
                _id: partnerId,
                name: "Tên đối tác", // Thay bằng API thực tế
                avatar: "https://i.pravatar.cc/150?img=2", // Thay bằng API thực tế
              };
              navigation.navigate("ChatDetail", partnerInfo);
            } catch (error) {
              console.error("Error revealing identity:", error);
              Alert.alert("Lỗi", "Không thể lộ danh tính");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleGoBack = () => {
    Alert.alert(
      "Exit Conversation?",
      "Are you sure you want to exit this conversation??",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          style: "destructive",
          onPress: async () => {
            try {
              // await ConvAPI.deleteConv(conversationId);
              //gui thong bao cho doi tac rang ban da thoat khoi cuoc tro chuyen
              sendExitSign(conversationId, partnerId);
              navigation.goBack();
              //xoa cuộc trò chuyện
            } catch (error) {
              console.error("Error deleting conversation:", error);
              Alert.alert("Lỗi", "Không thể xóa cuộc trò chuyện");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <View className="flex-row items-center justify-between px-4 py-3 bg-gray-900">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={handleGoBack} className="mr-2">
            <MaterialIcons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: blindChatAvatar }}
            className="w-10 h-10 rounded-full"
          />
          <Text className="text-2xl font-bold text-white">{blindChatName}</Text>
        </View>
        <View className="flex-row gap-6">
          <TouchableOpacity onPress={handleRevealIdentity}>
            <Ionicons name="person-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 py-2 mt-4"
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        <View className="items-center mb-4">
          <Text className="text-white text-lg">
            You're now chatting with a random match
          </Text>
          <Text className="text-gray-400">
            The identities of you and your partner are hidden
          </Text>
        </View>
        {messages.map((msg, index) => (
          <MessageBubble key={index} {...msg} />
        ))}
      </ScrollView>

      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </SafeAreaView>
  );
};

export default BlindChatScreen;
