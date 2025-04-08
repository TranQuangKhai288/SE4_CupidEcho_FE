import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Svg, Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/Button";

const HeartIcon = () => (
  <Svg width={30} height={30} viewBox='0 0 24 24' fill='none'>
    <Path
      d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42
         4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81
         14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0
         3.78-3.4 6.86-8.55 11.54L12 21.35z'
      fill='#9C27B0'
    />
  </Svg>
);

const FindAMatch = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      {/* Header Back Button */}
      <TouchableOpacity onPress={handleBackPress}>
        <MaterialIcons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>
      <View className='flex-1 items-center  bg-white px-6 pt-10 space-y-6'>
        <View className='relative w-[300px] h-[320px]'>
          {/* Card Right */}
          <View className='absolute right-[-20px] top-0 w-[200px] h-[260px] rounded-2xl bg-gray-300 rotate-[12deg] shadow-2xl overflow-hidden'>
            <Image
              source={{ uri: "https://i.pravatar.cc/300?img=38" }}
              className='w-full h-full'
              resizeMode='cover'
            />
          </View>

          {/* Card Left */}
          <View className='absolute left-[-20px] bottom-0 w-[200px] h-[260px] rounded-2xl bg-gray-300 -rotate-[12deg] shadow-2xl overflow-hidden'>
            <Image
              source={{ uri: "https://i.pravatar.cc/300?img=12" }}
              className='w-full h-full'
              resizeMode='cover'
            />
          </View>
          <View className='absolute left-[105px] -top-8 w-20 h-20 rounded-full overflow-hidden z-10'>
            <LinearGradient
              colors={["#fff", "#fce4ec"]}
              className='flex-1 items-center justify-center shadow-lg'
            >
              <HeartIcon />
            </LinearGradient>
          </View>
          <View className='absolute right-[105px] -bottom-5 w-20 h-20 rounded-full overflow-hidden z-10'>
            <LinearGradient
              colors={["#fff", "#fce4ec"]}
              className='flex-1 items-center justify-center shadow-lg'
            >
              <HeartIcon />
            </LinearGradient>
          </View>
        </View>

        <Text className='text-5xl text-purple-600 font-bold mt-16 mb-4'>
          It's a Match!
        </Text>
        <Text className='text-center text-xl text-gray-500 font-semibold'>
          Start a conversation now with each other
        </Text>

        <View className='w-full items-center mt-16 flex flex-col gap-4'>
          <Button title='Say Hello' onPress={handleBackPress} />
          <TouchableOpacity
            onPress={handleBackPress}
            className='bg-purple-100 w-full py-4 rounded-3xl'
          >
            <Text className='text-purple-600 text-base font-semibold text-center'>
              Keep Swiping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FindAMatch;
