import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { dispatch } = useAuth();
  const [isChecked, setChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleRegister = () => {
    navigation.navigate("Login");
  };
  const handleSignIn = () => {
    navigation.navigate("Login");
  };
  return (
    <View className='flex-1 bg-white px-6 pt-6'>
      <TouchableOpacity className='mb-14'>
        <MaterialIcons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>
      <View className='items-center'>
        <Image
          className='object-cover'
          source={require("../../../assets/Logo.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>
      <Text className='text-3xl font-bold text-center my-8'>
        Create Your Account
      </Text>

      <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
        <MaterialIcons name='email' size={20} color='gray' />
        <TextInput
          placeholder='Email'
          className='flex-1 ml-3 text-base'
          keyboardType='email-address'
        />
      </View>

      <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
        <MaterialIcons name='lock' size={20} color='gray' />
        <TextInput
          placeholder='Password'
          className='flex-1 ml-3 text-base'
          secureTextEntry={!isPasswordVisible} // Ẩn/hiện mật khẩu
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color='gray'
          />
        </TouchableOpacity>
      </View>

      <View className=' items-center mb-6'>
        <TouchableOpacity
          onPress={() => setChecked(!isChecked)}
          className='flex-row items-center'
        >
          <View
            className={`w-6 h-6 border-2 rounded-md mr-3 flex items-center justify-center ${
              isChecked
                ? "bg-primary-main border-purple-600"
                : "border-gray-400"
            }`}
          >
            {isChecked && <Ionicons name='checkmark' size={16} color='white' />}
          </View>
          <Text className='text-gray-500 font-semibold'>Remember me</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleRegister}
        className='bg-primary-main py-4 rounded-3xl'
      >
        <Text className='text-white text-center text-lg font-bold'>
          Sign up
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className='flex-row items-center my-6'>
        <View className='flex-1 h-px bg-gray-300' />
        <Text className='mx-3 text-gray-400'>or continue with</Text>
        <View className='flex-1 h-px bg-gray-300' />
      </View>

      {/* Social Login */}
      <View className='flex-row items-center justify-center gap-4 space-x-4'>
        <TouchableOpacity className='px-6 py-3  bg-gray-100 rounded-lg'>
          <FontAwesome name='facebook' size={20} color='#1877F2' />
        </TouchableOpacity>
        <TouchableOpacity className='px-6 py-3 bg-gray-100 rounded-lg'>
          <Image
            source={require("../../../assets/google.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity className='px-6 py-3 bg-gray-100 rounded-lg'>
          <FontAwesome name='apple' size={20} color='black' />
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-center mt-8'>
        <Text className='text-gray-500'>Already have an account?</Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text className='text-purple-600 font-bold ml-2'>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
