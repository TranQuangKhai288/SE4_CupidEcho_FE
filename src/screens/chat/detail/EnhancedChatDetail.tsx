// Enhanced ChatDetail with Bot Integration
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
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
import BotMessage from "../../../components/BotMessage";
import * as ConvAPI from "../../../apis/ConversationAPI";
import { useSocketEvents, Message } from "../../../hooks/useSocketEvents";
import { useBotIntegration } from "../../../hooks/useBotIntegration";
import { useAuth } from "../../../contexts/AuthContext";
import { RootStackParamList } from "../../../navigation/AppNavigation";

type ChatDetailRouteProp = RouteProp<RootStackParamList, "ChatDetail">;
type ChatNavigationProp = NavigationProp<RootStackParamList, "ChatDetail">;

const EnhancedChatDetail: React.FC = () => {
  const route = useRoute<ChatDetailRouteProp>();
  const navigation = useNavigation<ChatNavigationProp>();
  const { name, avatar, convId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
  });
  const [newMessage, setNewMessage] = useState("");
  const [showBotInterface, setShowBotInterface] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { state } = useAuth();
  const { user } = state;

  // Bot integration
  const {
    botMessages,
    isProcessing,
    sendToBotAsync,
    shouldShowBot,
    clearBotHistory,
    initializeBotConversation
  } = useBotIntegration({
    userId: user?._id || "",
    conversationId: convId,
    enabled: true
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!convId) return;
        const response = await ConvAPI.getConvDetails(
          convId,
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
  }, [pagination.page, pagination.limit, convId]);

  const { sendMessage, isConnected } = useSocketEvents({
    onNewMessage: (message: Message) => {
      if (message.conversationId === convId) {
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

        // Check if bot should respond to this message
        checkForBotResponse(message.content);
        
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    },
  });

  const checkForBotResponse = async (messageContent: string) => {
    if (shouldShowBot(messageContent)) {
      try {
        await sendToBotAsync(messageContent);
      } catch (error) {
        console.error('Error getting bot response:', error);
      }
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (!isConnected) {
      Alert.alert("Lỗi", "Không thể gửi tin nhắn: Socket chưa kết nối");
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const sendingMessage: Message = {
      _id: tempId,
      conversationId: convId,
      senderId: user?._id || "",
      content: newMessage,
      createdAt: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, sendingMessage]);

    sendMessage(convId, newMessage, (response) => {
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

  const handleSendToBotOnly = async () => {
    if (!newMessage.trim()) return;

    try {
      await sendToBotAsync(newMessage);
      setNewMessage("");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi tin nhắn tới bot");
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const toggleBotInterface = () => {
    setShowBotInterface(!showBotInterface);
    if (!showBotInterface && botMessages.length === 0) {
      initializeBotConversation();
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, botMessages]);

  return (
    <SafeAreaView className="flex-1 bg-white pt-6">
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={handleBackPress} className="mr-2">
            <MaterialIcons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Image source={{ uri: avatar }} className="w-10 h-10 rounded-full" />
          <Text className="text-2xl font-bold">{name}</Text>
        </View>
        <View className="flex-row gap-6">
          <TouchableOpacity onPress={toggleBotInterface}>
            <Ionicons 
              name="chatbubble-ellipses-outline" 
              size={20} 
              color={showBotInterface ? "#ec4899" : "black"} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("VoiceCall", {
                roomId: convId,
              })
            }
          >
            <Ionicons name="call-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("VideoCall", {
                roomId: convId,
              })
            }
          >
            <Ionicons name="videocam-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={20} color="black" />
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
        {/* Regular chat messages */}
        {messages.map((msg, index) => (
          <MessageBubble key={index} {...msg} />
        ))}

        {/* Bot messages */}
        {showBotInterface && (
          <View className="mt-4 border-t border-gray-200 pt-4">
            <View className="flex-row items-center mb-3">
              <Ionicons name="chatbubble" size={16} color="#ec4899" />
              <Text className="text-pink-600 font-semibold ml-2">
                Dating Assistant
              </Text>
              <TouchableOpacity 
                onPress={clearBotHistory}
                className="ml-auto"
              >
                <Ionicons name="refresh-outline" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            
            {botMessages.map((botMsg, index) => (
              <BotMessage
                key={botMsg.id}
                message={botMsg}
                onSuggestionPress={handleSuggestionPress}
              />
            ))}
            
            {isProcessing && (
              <View className="flex-row items-center py-2">
                <View className="bg-pink-500 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Ionicons name="chatbubble" size={16} color="white" />
                </View>
                <Text className="text-gray-500 italic">Bot is typing...</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={showBotInterface ? handleSendToBotOnly : handleSendMessage}
        placeholder={showBotInterface ? "Ask dating assistant..." : "Type a message..."}
        showBotToggle={!showBotInterface}
        onBotToggle={toggleBotInterface}
      />
    </SafeAreaView>
  );
};

export default EnhancedChatDetail;