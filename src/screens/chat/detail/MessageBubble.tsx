import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { format } from "date-fns";

interface MessageBubbleProps {
  content: string;
  createdAt: Date;
  senderId: string;
  status?: string; // Optional status prop
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  createdAt,
  senderId,
  status,
}) => {
  const { state } = useAuth();
  const { user } = state;
  const isMe = senderId === user?._id;
  const [isShowDetail, setIsShowDetail] = useState(false);
  const handleShowDetail = () => {
    setIsShowDetail(!isShowDetail);
  };
  return (
    <View className={`flex-row ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <View className={`flex-col ${isMe ? "items-end" : "items-start"} gap-1`}>
        <TouchableOpacity
          onPress={handleShowDetail}
          className={`flex-row max-w-[100%] px-4 py-2 rounded-xl ${
            isMe ? "bg-primary-main" : "bg-gray-200"
          } ${isMe ? "rounded-tr-none" : "rounded-tl-none"}`}
        >
          <Text className={`text-base ${isMe ? "text-white" : "text-black"}`}>
            {content}
          </Text>
        </TouchableOpacity>
        {isShowDetail && (
          <Text className="text-xs text-gray-500">
            {format(new Date(createdAt), "HH:mm dd/MM/yyyy")}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MessageBubble;
//
