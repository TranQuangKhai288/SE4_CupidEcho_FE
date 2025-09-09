// components/ChatInput.tsx
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (text: string) => void;
  handleSendMessage: () => void;
  placeholder?: string;
  showBotToggle?: boolean;
  onBotToggle?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  placeholder = "Type a message ...",
  showBotToggle = false,
  onBotToggle,
}) => {
  return (
    <View className="flex-row items-center bg-white px-4 py-2 mb-8 gap-2">
      <View className="flex-row items-center rounded-2xl bg-gray-50 py-1 w-[85%]">
        <TouchableOpacity className="ml-4">
          <Entypo name="emoji-happy" size={20} color="gray" />
        </TouchableOpacity>
        <TextInput
          placeholder={placeholder}
          className="flex-1 px-3 text-base text-black"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <View className="flex-row gap-4 mr-4">
          {showBotToggle && (
            <TouchableOpacity onPress={onBotToggle}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#ec4899" />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <Feather name="paperclip" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="camera" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleSendMessage}>
        <Feather
          name="send"
          size={24}
          color="white"
          className="bg-primary-main p-3 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
