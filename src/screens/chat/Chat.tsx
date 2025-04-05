// src/screens/Auth/ChatScreen.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome, Feather } from "@expo/vector-icons";
import ActiveUserList from "./ActiveUsers";
import ChatItem from "./ChatItem";

const ChatScreen: React.FC = ({}) => {
  const chatData = [
    {
      id: 1,
      name: "Andrew Right Hand",
      message: "Hello, evening too Andrew",
      time: "20:00",
      unread: 2,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Marci Senter",
      message: "Wow, this is really epic 👍",
      time: "18:39",
      unread: 3,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Marx Hershey",
      message: "Thank you so much andrew 🔥",
      time: "12:26",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Sanjuanita Ordonez",
      message: "Wow love it! ❤️",
      time: "09:48",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Elanor Pera",
      message: "I know... I'm trying to get the...",
      time: "Dec 20, 2024",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: 6,
      name: "Maryland Winkles",
      message: "It's strong not just fabulous! 😆",
      time: "Yesterday",
      unread: 2,
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "Leatrice Handler",
      message: "Sky blue. Trying it now! 😊",
      time: "Dec 19, 2024",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: 8,
      name: "Leatrice Handler",
      message: "Sky blue. Trying it now! 😊",
      time: "Dec 19, 2024",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: 9,
      name: "Leatrice Handler",
      message: "Sky blue. Trying it now! 😊",
      time: "Dec 19, 2024",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: 10,
      name: "Sanjuanita Ordonez",
      message: "Wow love it! ❤️",
      time: "09:48",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 11,
      name: "Elanor Pera",
      message: "I know... I'm trying to get the...",
      time: "Dec 20, 2024",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  ];

  return (
    <View className='flex-1 bg-white pt-6 px-6'>
      <View className='flex-row justify-between items-center py-3 '>
        <View className='flex-row gap-3 items-center'>
          <Image
            source={require("../../../assets/Logo.png")}
            style={{ width: 28, height: 28 }}
          />
          <Text className='text-3xl font-bold'>Chats</Text>
        </View>

        <View className='flex-row gap-5 items-center'>
          <TouchableOpacity>
            <Feather name='search' size={20} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name='more-horizontal' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActiveUserList />
        {chatData.map((chat) => (
          <ChatItem key={chat.id} {...chat} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
