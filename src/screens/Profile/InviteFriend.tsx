import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
// Define the type for Friend items
interface Friend {
  id: string;
  name: string;
  phone: string;
  avatar: string; // URL or local path to the avatar image
}

// Sample friend data (using placeholder images since we don't have the actual images)
const friendData: Friend[] = [
  {
    id: "1",
    name: "Maryland Winkles",
    phone: "+1-300-555-0135",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Geoffrey Mott",
    phone: "+1-202-555-0136",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Rachel Foose",
    phone: "+1-300-555-0119",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Krishna Barbe",
    phone: "+1-300-555-0161",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "5",
    name: "Lauralee Quintero",
    phone: "+1-300-555-0136",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "6",
    name: "Rodolfo Goode",
    phone: "+1-202-555-0167",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: "7",
    name: "Lavern Laboy",
    phone: "+1-202-555-0119",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "8",
    name: "Kylee Danford",
    phone: "+1-300-555-0171",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: "9",
    name: "Elanor Pera",
    phone: "+1-202-555-0171",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: "10",
    name: "Darcel Ballentine",
    phone: "+1-202-555-0171",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

// Define the props for the Friend item component
interface FriendItemProps {
  item: Friend;
}

const InviteFriendsScreen: React.FC = () => {
  const navigation = useNavigation();
  // Render each friend item
  const renderFriendItem = ({ item }: FriendItemProps) => (
    <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-200">
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.avatar }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          <Text className="text-base font-bold text-black">{item.name}</Text>
          <Text className="text-sm text-gray-500">{item.phone}</Text>
        </View>
      </View>
      <TouchableOpacity
        className="bg-purple-600 py-2 px-4 rounded-full"
        onPress={() => console.log(`Invited ${item.name}`)} // Debugging press
      >
        <Text className="text-white text-sm font-semibold">INVITE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={navigation.goBack}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-medium ml-4">Invite Friend</Text>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {/* Friend List */}
      <FlatList
        data={friendData}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default InviteFriendsScreen;
