import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <ActivityIndicator size={40} color='#9C27B0' />
    </View>
  );
};

export default Loader;
