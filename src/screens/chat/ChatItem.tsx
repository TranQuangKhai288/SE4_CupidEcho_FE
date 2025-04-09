import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { format } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
type RootStackParamList = {
  ChatDetail: { _id: string; name: string; avatar: string };
};

type ChatNavigationProp = NavigationProp<RootStackParamList, "ChatDetail">;

interface ChatItemProps {
  _id: string;
  participants: {
    name: string;
    avatar: string;
  };
  lastMessage: {
    content: string;
    createdAt: Date;
    sender: {
      _id?: string;
      name: string;
      avatar: string;
    };
  };
  // time: string;
  // unread: number;
  // avatar: string;
}

const ChatItem: React.FC<ChatItemProps> = ({
  _id,
  participants,
  lastMessage,
  // time,
  // unread,
  // avatar,
}) => {
  const navigation = useNavigation<ChatNavigationProp>();
  const { state } = useAuth();
  const { user } = state;
  const handlePress = () => {
    navigation.navigate("ChatDetail", {
      _id,
      name: participants.name,
      avatar: participants.avatar,
    });
  };
  console.log(lastMessage, "lastMessage");

  return (
    <TouchableOpacity
      className="flex-row items-center py-4"
      onPress={handlePress}
    >
      <Image
        source={{ uri: participants.avatar }}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex-1 ml-3">
        <Text className="text-lg font-bold">{participants.name}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-400 font-semibold">
            {lastMessage?.sender?._id?.toString() === user?._id.toString()
              ? "Bạn: "
              : lastMessage?.sender.name}
            {lastMessage?.content || "You're now connected, let's say hi!"}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-gray-400 text-xs">
          {lastMessage?.createdAt
            ? format(new Date(lastMessage?.createdAt), "HH:mm dd/MM/yyyy ")
            : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
