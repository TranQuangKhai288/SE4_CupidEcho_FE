import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  ChatDetail: { name: string; avatar: string };
};

type ChatNavigationProp = NavigationProp<RootStackParamList, "ChatDetail">;

interface ChatItemProps {
  name: string;
  message: string;
  time: string;
  unread: number;
  avatar: string;
}

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  message,
  time,
  unread,
  avatar,
}) => {
  const navigation = useNavigation<ChatNavigationProp>();

  const handlePress = () => {
    navigation.navigate("ChatDetail", { name, avatar });
  };

  return (
    <TouchableOpacity
      className='flex-row items-center py-4'
      onPress={handlePress}
    >
      <Image source={{ uri: avatar }} className='w-12 h-12 rounded-full' />
      <View className='flex-1 ml-3'>
        <Text className='text-lg font-bold'>{name}</Text>
        <Text className='text-gray-400 font-semibold'>{message}</Text>
      </View>
      <View className='items-end'>
        <Text className='text-gray-400 text-xs'>{time}</Text>
        {unread > 0 && (
          <View className='w-6 h-6 rounded-full bg-primary-main items-center justify-center mt-1'>
            <Text className='text-white font-semibold text-xs'>{unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
