import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import * as UserAPI from "../../apis/UserAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [isChecked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State để xử lý hiển thị mật khẩu
  const [email, setEmail] = useState(""); // State để lưu email nhập vào
  const [password, setPassword] = useState(""); // State để lưu mật khẩu nhập

  const handleLogin = async () => {
    try {
      const response = await UserAPI.loginUser({ email, password });
      const { access_token, refresh_token, data: user } = response;
      if (response.status !== "OK") {
        console.log("Login failed", response.message);
        return;
      }
      if (!access_token || !refresh_token) {
        throw new Error("Missing tokens");
      }
      await login({ token: access_token, user, refreshToken: refresh_token });

      navigation.navigate("Main"); // hoặc tên màn hình chính
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <TouchableOpacity className="mb-14" onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Logo */}
      <View className="items-center">
        <Image
          className="object-cover"
          source={require("../../../assets/Logo.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <Text className="text-3xl font-bold text-center my-8">
        Login to Your Account
      </Text>

      {/* Email Input */}
      <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4">
        <MaterialIcons name="email" size={20} color="gray" />
        <TextInput
          placeholder="Email"
          className="flex-1 ml-3 text-base"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)} // Assuming you have a state variable for email
        />
      </View>

      {/* Password Input */}
      <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4">
        <MaterialIcons name="lock" size={20} color="gray" />
        <TextInput
          placeholder="Password"
          className="flex-1 ml-3 text-base"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => setPassword(text)} // Assuming you have a state variable for password
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Feather
            name={passwordVisible ? "eye" : "eye-off"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Remember Me */}
      <View className="items-center mb-6">
        <TouchableOpacity
          onPress={() => setChecked(!isChecked)}
          className="flex-row items-center"
        >
          <View
            className={`w-6 h-6 border-2 rounded-md mr-3 flex items-center justify-center ${
              isChecked ? "bg-purple-600 border-purple-600" : "border-gray-400"
            }`}
          >
            {isChecked && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <Text className="text-gray-500 font-semibold">Remember me</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-primary-main py-4 rounded-3xl"
      >
        <Text className="text-white text-center text-lg font-bold">
          Sign in
        </Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <View className="items-center my-6">
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text className="text-purple-600 font-bold">
            Forgot the password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-3 text-gray-400">or continue with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Social Login */}
      <View className="flex-row items-center justify-center gap-4 space-x-4">
        <TouchableOpacity className="px-6 py-3 bg-gray-100 rounded-lg">
          <FontAwesome name="facebook" size={20} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity className="px-6 py-3 bg-gray-100 rounded-lg">
          <Image
            source={require("../../../assets/google.png")}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity className="px-6 py-3 bg-gray-100 rounded-lg">
          <FontAwesome name="apple" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View className="flex-row justify-center mt-8">
        <Text className="text-gray-500">Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text className="text-purple-600 font-bold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
