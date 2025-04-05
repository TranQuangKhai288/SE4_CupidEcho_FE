import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import ProfileCard from "../../components/ProfileCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";

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
];

type RootStackParamList = {
  NewMatch: undefined;
};

type NewMatchNavigationProp = NavigationProp<RootStackParamList, "NewMatch">;
const NewMatch = () => {
  const navigation = useNavigation<NewMatchNavigationProp>();
  const handlePress = () => {
    navigation.navigate("NewMatch");
  };
  return (
    <View className='py-4'>
      <View className='flex-row justify-between items-center mb-2'>
        <Text className='text-xl font-bold'>New Match</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text className='text-primary-main font-bold'>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='flex-row mt-3'
      >
        {newMatchingUsers.map((user) => (
          <View className='flex mr-3 items-center' key={user.id}>
            <ProfileCard
              name={user.name}
              age={user.age}
              profession={user.profession}
              imageUrl={user.avatar}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewMatch;
