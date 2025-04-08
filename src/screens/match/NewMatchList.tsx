import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import MainTabNavigator from "../../navigation/BottomTab";

const newMatchingUsers = [
  {
    id: 1,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
  {
    id: 2,
    name: "Bích Hằng",
    age: 23,
    profession: "Developer",
    avatar:
      "https://timanhdep.com/wp-content/uploads/2022/06/hinh-anh-gai-xinh-cute-viet-nam-nhin-la-yeu-30.jpg",
  },
  {
    id: 3,
    name: "Mai Nguyễn",
    age: 22,
    profession: "Marketing",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-19-1.jpg",
  },
  {
    id: 4,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
  {
    id: 5,
    name: "Mai Nguyễn",
    age: 22,
    profession: "Marketing",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-19-1.jpg",
  },
  {
    id: 6,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
  {
    id: 7,
    name: "Trinh Nguyễn",
    age: 25,
    profession: "Designer",
    avatar:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-25.jpg",
  },
];
type RootStackParamList = {
  NewMatch: undefined;
};

type NewMatchNavigationProp = NavigationProp<RootStackParamList, "NewMatch">;

const NewMatchList = () => {
  const navigation = useNavigation<NewMatchNavigationProp>();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View className='flex-1 bg-white pt-6'>
      <View className='flex-row items-center justify-between px-4 py-3 '>
        <View className='flex-row items-center gap-4'>
          <TouchableOpacity onPress={handleBackPress}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>New Match</Text>
        </View>
        <View className='flex-row gap-6'>
          <TouchableOpacity>
            <Feather name='search' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row flex-wrap px-2'>
          {newMatchingUsers.map((user) => (
            <View key={user.id} className='p-2 w-1/2'>
              <ProfileCard
                name={user.name}
                age={user.age}
                profession={user.profession}
                imageUrl={user.avatar}
                height={240}
                width={176}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewMatchList;
