import React from "react";
import { View, Text } from "react-native";

interface MessageBubbleProps {
  text: string;
  time: string;
  sender: "me" | "other";
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  time,
  sender,
}) => {
  const isMe = sender === "me";

  return (
    <View className={`flex-row ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <View
        className={`max-w-[75%] px-4 py-2 rounded-xl ${
          isMe ? "bg-primary-main" : "bg-gray-200"
        } ${isMe ? "rounded-tr-none" : "rounded-tl-none"}`}
      >
        <Text className={`text-base ${isMe ? "text-white" : "text-black"}`}>
          {text}
        </Text>
        <Text className={`text-xs text-gray-400 text-right mt-1`}>{time}</Text>
      </View>
    </View>
  );
};

export default MessageBubble;
//
