import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  RouteProp,
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

const messages: {
  id: number;
  text: string;
  time: string;
  sender: "me" | "other";
}[] = [
  {
    id: 1,
    text: "Hi, good evening Natasha... 😁😁",
    time: "20.00",
    sender: "me",
  },
  {
    id: 2,
    text: "It seems we have a lot in common & have a lot of interest in each other 😂",
    time: "20.00",
    sender: "me",
  },
  {
    id: 3,
    text: "Hello, evening too Andrew",
    time: "20.01",
    sender: "other",
  },
  {
    id: 4,
    text: "Haha, yes I've seen your profile and I'm a perfect match 😆😆",
    time: "20.01",
    sender: "other",
  },
];

type RootStackParamList = {
  ChatDetail: { name: string; avatar: string };
};

type ChatDetailRouteProp = RouteProp<RootStackParamList, "ChatDetail">;

type ChatNavigationProp = NavigationProp<RootStackParamList, "ChatDetail">;

const ChatDetailScreen: React.FC = () => {
  const route = useRoute<ChatDetailRouteProp>();
  const navigation = useNavigation<ChatNavigationProp>();
  const { name } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View className='flex-1 bg-white pt-14'>
      <View className='flex-row items-center justify-between px-4 py-3 '>
        <View className='flex-row items-center gap-4'>
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>{name}</Text>
        </View>
        <View className='flex-row gap-6'>
          <TouchableOpacity>
            <Ionicons name='call-outline' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='videocam-outline' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name='more-horizontal' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className='flex-1 px-4 py-2'>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </ScrollView>
      <ChatInput />
    </View>
  );
};

export default ChatDetailScreen;
