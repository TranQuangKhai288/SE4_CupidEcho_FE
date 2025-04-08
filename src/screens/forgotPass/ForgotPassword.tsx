import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "ForgotPassword">;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  return (
    <View className='flex-1 bg-white p-6'>
      <View className='flex-row items-center gap-4 mb-8'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold '>Forgot Password</Text>
      </View>

      <View className='items-center'>
        <Image
          className='object-contain w-[250px] h-[230px]'
          source={require("../../../assets/lock.png")}
        />
      </View>
      <View>
        <Text className='text-gray-600 font-semibold my-6'>
          Select which contact details should we use to reset your password
        </Text>
        <View className='flex-col items-center gap-4 mb-4'>
          <TouchableOpacity className='border-2 border-purple-600 rounded-2xl p-4 flex-row items-center bg-white w-full'>
            <View className='w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center'>
              <Ionicons name='chatbubbles' size={24} color='#9333ea' />
            </View>
            <View className='ml-4'>
              <Text className='text-gray-500 text-sm'>via SMS:</Text>
              <Text className='text-black font-bold text-lg'>
                +1 111 ******99
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='border-2 border-purple-600 rounded-2xl p-4 flex-row items-center bg-white w-full'>
            <View className='w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center'>
              <Ionicons name='mail' size={24} color='#9333ea' />
            </View>
            <View className='ml-4'>
              <Text className='text-gray-500 text-sm'>via Email:</Text>
              <Text className='text-black font-bold text-lg'>
                and***ley@yourdomain.com
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className='mt-6'>
          <Button
            title='Continue'
            onPress={() => navigation.navigate("VerifyCode")}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
