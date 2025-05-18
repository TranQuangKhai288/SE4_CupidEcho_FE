import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { registerUser } from "../../apis/UserAPI";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);


  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const payload = { name, email, password, confirmPassword };
      const res = await registerUser(payload);

      if (res.status === "OK") {
        Alert.alert(
          "Success",
          "Account created successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("InitialProfile"),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Error", res.message || "Registration failed");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleSignIn = () => navigation.navigate("Login");

  return (
    <View className='flex-1 bg-white px-6 pt-6'>
      <TouchableOpacity className='mb-4' onPress={() => navigation.goBack()}>
        <MaterialIcons name='arrow-back' size={24} color='black' />
      </TouchableOpacity>

      <View className='items-center'>
        <Image
          source={require("../../../assets/Logo.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <Text className='text-3xl font-bold text-center my-8'>
        Create Your Account
      </Text>

      <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
        <MaterialIcons name='person' size={20} color='gray' />
        <TextInput
          placeholder='Username'
          className='flex-1 ml-3 text-base'
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
        <MaterialIcons name='email' size={20} color='gray' />
        <TextInput
          placeholder='Email'
          className='flex-1 ml-3 text-base'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
      </View>

      <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
        <MaterialIcons name='lock' size={20} color='gray' />
        <TextInput
          placeholder='Password'
          className='flex-1 ml-3 text-base'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
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

      <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
        <MaterialIcons name='lock' size={20} color='gray' />
        <TextInput
          placeholder='Confirm Password'
          className='flex-1 ml-3 text-base'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isPasswordVisible}
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

      <TouchableOpacity
        onPress={handleRegister}
        className='bg-primary-main py-4 rounded-3xl'
      >
        <Text className='text-white text-center text-lg font-bold'>
          Sign up
        </Text>
      </TouchableOpacity>

      <View className='flex-row items-center my-6'>
        <View className='flex-1 h-px bg-gray-300' />
        <Text className='mx-3 text-gray-400'>or continue with</Text>
        <View className='flex-1 h-px bg-gray-300' />
      </View>

      <View className='flex-row items-center justify-center gap-4 space-x-4'>
        <TouchableOpacity className='px-6 py-3 bg-gray-100 rounded-lg'>
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

      <View className='flex-row justify-center mt-4'>
        <Text className='text-gray-500'>Already have an account?</Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text className='text-purple-600 font-bold ml-2'>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
