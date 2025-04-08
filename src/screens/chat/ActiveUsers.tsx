import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

const activeUsers = [
  { id: 1, avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
  { id: 2, avatar: "https://randomuser.me/api/portraits/women/9.jpg" },
  { id: 3, avatar: "https://randomuser.me/api/portraits/women/10.jpg" },
  { id: 4, avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
  { id: 5, avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 6, avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
];

const ActiveUserList = () => {
  return (
    <View className='py-4 border-b border-gray-200'>
      <View className='flex-row justify-between items-center mb-2'>
        <Text className='text-xl font-bold'>Now Active</Text>
        <TouchableOpacity>
          <Text className='text-primary-main font-bold'>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='flex-row mt-3'
      >
        {activeUsers.map((user) => (
          <View className='flex mr-3 items-center' key={user.id}>
            <Image
              source={{ uri: user.avatar }}
              className='w-20 h-20 rounded-full border-none '
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActiveUserList;
