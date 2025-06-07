// src/screens/Auth/ChatScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome, Feather } from "@expo/vector-icons";
import ActiveUserList from "./ActiveUsers";
import ChatItem from "./ChatItem";
import * as ConvAPI from "../../apis/ConversationAPI";
const ChatScreen: React.FC = ({}) => {
  const insets = useSafeAreaInsets();

  interface Conv {
    _id: string;
    participants: {
      _id: string;
      name: string;
      avatar: string;
    };
    lastMessage: {
      content: string;
      createdAt: Date;
      sender: {
        name: string;
        avatar: string;
      };
    };
  }

  const [convData, setConvData] = useState<Conv[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await ConvAPI.getListConv(
        pagination.page,
        pagination.limit,
        ""
      );
      if (response.status === "OK") {
        setConvData(response.data.conversations);
      } else {
        console.error("Error fetching conversations:", response.message);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [pagination.page, pagination.limit]);

  return (
    <View className="flex-1 bg-white px-6" style={{ paddingTop: insets.top }}>
      <View className="flex-row justify-between items-center py-3 ">
        <View className="flex-row gap-3 items-center">
          <Image
            source={require("../../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className="text-3xl font-bold">Chats</Text>
        </View>

        <View className="flex-row gap-5 items-center">
          {/* <TouchableOpacity>
            <Feather name="search" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={20} color="black" />
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ActiveUserList /> */}
        {loading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {convData.map((conv, index) => (
          <ChatItem key={index} {...conv} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
