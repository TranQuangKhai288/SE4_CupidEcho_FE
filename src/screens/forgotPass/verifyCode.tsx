import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import OTPInput from "../../components/OTPInput";
import Button from "../../components/Button";

type VerifyCodeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "VerifyCode">;
};

const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = ({ navigation }) => {
  return (
    <View className='flex-1 bg-white px-6 pt-10 justify-between'>
      <View>
        <View className='flex-row items-center gap-4 mb-8'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={24} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>Forgot Password</Text>
        </View>
      </View>

      {/* OTP Input */}
      <View className='flex-col items-center gap-16 mb-16'>
        <Text className='text-gray-600 font-semibold text-center'>
          Code has been sent to +1 111 ******99
        </Text>
        <OTPInput />
        <Text className='text-gray-600 font-semibold text-center mt-4'>
          Resend code in <Text className='text-purple-600'>53</Text> s
        </Text>
      </View>

      <View className='mb-6'>
        <Button
          title='Verify'
          onPress={() => navigation.navigate("CreateNewPassword")}
        />
      </View>
    </View>
  );
};

export default VerifyCodeScreen;
