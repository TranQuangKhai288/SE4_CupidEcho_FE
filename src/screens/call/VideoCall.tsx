import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Mic,
  Video,
  Volume2,
  PhoneOff,
  Camera,
  PhoneMissed,
} from "lucide-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

export default function VideoCallScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className='flex-1 relative'>
      {/* Video đối phương */}
      <Image
        source={{
          uri: "https://img.freepik.com/free-photo/smiling-beautiful-young-woman-standing-posing_171337-11412.jpg?semt=ais_hybrid&w=740",
        }}
        className='absolute inset-0 w-full h-full'
        resizeMode='cover'
      />

      {/* Nút quay lại */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className='absolute top-10 left-5 z-20'
      >
        <MaterialIcons name='arrow-back' size={24} color='white' />
      </TouchableOpacity>

      {/* Video của mình (góc phải dưới) */}
      <View className='absolute bottom-32 right-4 w-32 h-48 rounded-xl overflow-hidden z-10'>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          className='w-full h-full'
          resizeMode='cover'
        />
      </View>

      {/* Bottom action buttons */}
      <View className='absolute bottom-8 left-0 right-0 flex-row justify-center items-center gap-6'>
        <TouchableOpacity className='bg-white/30 p-4 rounded-full'>
          <Volume2 size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className='bg-white/30 p-4 rounded-full'>
          <Video size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className='bg-white/30 p-4 rounded-full'>
          <Mic size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className='bg-red-500 p-4 rounded-full'>
          <PhoneMissed size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
