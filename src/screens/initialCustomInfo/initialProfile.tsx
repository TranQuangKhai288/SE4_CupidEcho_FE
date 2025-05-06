import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as UserAPI from "../../apis/UserAPI";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";

type InitialProfileRouteProp = RouteProp<RootStackParamList, "InitialProfile">;

const InitialProfile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<InitialProfileRouteProp>();
  const { login } = useAuth();

  const { email, password, confirmPassword } = route.params;
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = async () => {
    try {
      if (!name || !gender) {
        console.log("Please fill in all fields");
        return;
      }

      const registerRes = await UserAPI.registerUser({
        name,
        email,
        password,
        confirmPassword,
        gender,
      });

      if (!registerRes || registerRes.status !== "OK") {
        console.log("Registration failed:", registerRes?.message);
        return;
      }

      // Tự động đăng nhập sau khi đăng ký
      const loginRes = await UserAPI.loginUser({ email, password });

      if (!loginRes || loginRes.status !== "OK") {
        console.log("Login failed after register:", loginRes?.message);
        return;
      }

      if (!loginRes.access_token || !loginRes.refresh_token) {
        console.log("Missing tokens after login");
        return;
      }

      await login({
        token: loginRes.access_token,
        user: loginRes.data,
        refreshToken: loginRes.refresh_token,
      });

      navigation.navigate("Main");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 mb-4'>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>Fill Your Profile</Text>
        </View>
      </View>

      <View className='flex-row items-center bg-gray-100 px-8 py-3 rounded-2xl mb-4'>
        <TextInput
          placeholder='Full Name'
          value={name}
          onChangeText={setName}
          className='flex-1 text-base'
        />
      </View>

      <View className='bg-gray-100 px-4 rounded-2xl mb-4'>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={{ height: 60 }}
          itemStyle={{ fontSize: 12 }}
        >
          <Picker.Item label='Select Gender' value='' enabled={false} />
          <Picker.Item label='Male' value='male' />
          <Picker.Item label='Female' value='female' />
          <Picker.Item label='Other' value='other' />
        </Picker>
      </View>

      <View className='mt-10'>
        <Button title='Continue' onPress={handleRegister} />
      </View>
    </View>
  );
};

export default InitialProfile;
