import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Volume2, Mic, PhoneOff, PhoneMissed } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";

export default function VoiceCallScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <LinearGradient
      colors={["#c084fc", "#f472b6", "#fb923c"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className='flex-1 items-center justify-center px-6'
    >
      {/* Back button */}
      <TouchableOpacity
        className='absolute top-10 left-5'
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name='arrow-back' size={24} color='white' />
      </TouchableOpacity>

      {/* Avatar */}
      <Image
        source={{
          uri: "https://imgcdn.stablediffusionweb.com/2024/9/16/046beccd-bdce-4988-abe0-81df7a06f36e.jpg",
        }}
        className='w-40 h-40 rounded-full mb-6'
      />

      {/* Name */}
      <Text className='text-white text-3xl font-bold mb-4'>
        Natasha Winkles
      </Text>

      {/* Call duration */}
      <Text className='text-gray-200 mb-16'>04:35 minutes</Text>

      {/* Bottom controls */}
      <View className='flex-row justify-between items-center gap-8 px-12 mt-10'>
        <TouchableOpacity className='bg-white/20 p-6 rounded-full'>
          <Volume2 size={20} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className='bg-white/20 p-6 rounded-full'>
          <Mic size={20} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className='bg-red-500 p-6 rounded-full'>
          <PhoneMissed size={20} color='white' />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
