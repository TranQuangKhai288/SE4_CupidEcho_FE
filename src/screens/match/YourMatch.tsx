import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import SimpleProfileCard from "../../components/SimpleProfileCard";

const yourMatchingUsers = [
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

const YourMatch = () => {
  return (
    <View className='py-4'>
      <View className='flex-row justify-between items-center mb-2'>
        <Text className='text-xl font-bold'>Your Match</Text>
        <TouchableOpacity>
          <Text className='text-primary-main font-bold'>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='flex-row mt-3'
      >
        {yourMatchingUsers.map((user) => (
          <View className='flex mr-3 items-center' key={user.id}>
            <SimpleProfileCard
              name={user.name}
              age={user.age}
              imageUrl={user.avatar}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default YourMatch;
