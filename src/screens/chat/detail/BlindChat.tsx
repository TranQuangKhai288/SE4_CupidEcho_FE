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
import { StackNavigationProp } from "@react-navigation/stack";

type BlindChatRouteProp = RouteProp<RootStackParamList, "BlindChat">;
type ChatNavigationProp = StackNavigationProp<RootStackParamList>;

const BlindChatScreen: React.FC = () => {
  const route = useRoute<BlindChatRouteProp>();
  const navigation = useNavigation<ChatNavigationProp>();
  const { partner, conversationId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const { state } = useAuth();
  const { user } = state;

  // Simulated name and avatar for Blind Chat
  const blindChatName = partner.name;
  const blindChatAvatar = partner.avatar;

  // For reveal identity requests
  const [pendingReveal, setPendingReveal] = useState<null | {
    relationshipId: string;
    senderId: string;
    timestamp: number;
  }>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await ConvAPI.getConvDetails(conversationId, 1, 15);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        Alert.alert("Error", "Failed to load messages");
      }
    };

    fetchMessages();
  }, [conversationId]);

  const {
    sendMessage,
    isConnected,
    sendExitSign,
    sendMatchRequest,
    respondMatchRequest,
  } = useSocketEvents({
    onNewMessage: (message: Message) => {
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
      Alert.alert("Alert", "Your match has exited the conversation.", [
        {
          text: "OK",
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.pop(2);
            } else {
              navigation.navigate("Home");
            }
          },
        },
      ]);
    },
    onReceiveMatchRequest: (req) => {
      // Show dialog to accept/reject reveal identity
      setPendingReveal(req);
    },
    onMatchRequestResponse: (resp) => {
      if (resp.response === "accept") {
        Alert.alert(
          "Connection accepted",
          "Your partner accepted the identity reveal. You can now chat with real identities.",
          [
            {
              text: "Go to normal chat",
              onPress: () => {
                // Simulate navigating to ChatDetail with real info
                navigation.navigate("ChatDetail", {
                  name: partner.name,
                  avatar: partner.avatar,
                  convId: conversationId,
                });
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Request rejected",
          "Your partner declined the connection request."
        );
      }
    },
  });

  useEffect(() => {
    if (pendingReveal) {
      Alert.alert(
        "Connection Request",
        "Your partner wants to reveal identity and continue the conversation with real profiles. Do you accept?",
        [
          {
            text: "Reject",
            style: "cancel",
            onPress: () => {
              respondMatchRequest(
                pendingReveal.relationshipId,
                pendingReveal.senderId,
                "reject"
              );
              setPendingReveal(null);
            },
          },
          {
            text: "Accept",
            onPress: () => {
              respondMatchRequest(
                pendingReveal.relationshipId,
                pendingReveal.senderId,
                "accept"
              );
              // Navigate to normal chat
              navigation.replace("ChatDetail", {
                name: partner.name,
                avatar: partner.avatar,
                convId: conversationId,
              });
              setPendingReveal(null);
            },
          },
        ]
      );
    }
  }, [pendingReveal]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (!isConnected) {
      Alert.alert("Error", "Cannot send message: Socket is not connected");
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
        Alert.alert("Error", response.message || "Failed to send message");
      }
    });
  };

  const handleRevealIdentity = () => {
    Alert.alert(
      "Reveal Identity",
      "Do you want to reveal your identity and switch to normal chat?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            // Send reveal request to partner
            sendMatchRequest(partner.id, (response) => {
              if (response.status !== "OK") {
                Alert.alert(
                  "Error",
                  response.message || "Unable to send connection request"
                );
              }
            });
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
      "Are you sure you want to exit this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          style: "destructive",
          onPress: async () => {
            try {
              // send notification to partner that you left the conversation
              sendExitSign(conversationId, partner.id);
              navigation.pop(2);
            } catch (error) {
              console.error("Error deleting conversation:", error);
              Alert.alert("Error", "Failed to delete conversation");
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
