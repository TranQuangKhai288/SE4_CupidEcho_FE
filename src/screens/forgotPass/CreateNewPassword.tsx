import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

type CreateNewPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "CreateNewPassword">;
};

const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = ({
  navigation,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
        navigation.navigate("Login");
      }, 2000);
    }
  }, [showModal]);

  return (
    <View className='flex-1 bg-white p-6'>
      <View className='flex-row items-center gap-4 mb-8'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold '>Create New Password</Text>
      </View>

      <View className='items-center'>
        <Image
          className='object-contain w-[250px] h-[230px]'
          source={require("../../../assets/newpass.png")}
        />
      </View>

      <View>
        <Text className='text-gray-600 font-semibold my-6'>
          Create Your New Password
        </Text>
        <View className='flex-col items-center'>
          <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
            <MaterialIcons name='lock' size={20} color='gray' />
            <TextInput
              placeholder='Enter new password'
              className='flex-1 ml-3 text-base'
              secureTextEntry
            />
            <Feather name='eye-off' size={20} color='gray' />
          </View>
          <View className='flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4'>
            <MaterialIcons name='lock' size={20} color='gray' />
            <TextInput
              placeholder='Enter confirm password'
              className='flex-1 ml-3 text-base'
              secureTextEntry
            />
            <Feather name='eye-off' size={20} color='gray' />
          </View>
        </View>

        <View className='mt-6'>
          <Button title='Continue' onPress={() => setShowModal(true)} />
        </View>
      </View>

      {/* MODAL */}
      <Modal
        isVisible={showModal}
        backdropOpacity={0.5}
        animationIn='fadeInUp'
        animationOut='fadeOutDown'
        useNativeDriver
      >
        <View className='bg-white p-10 rounded-2xl w-80 items-center self-center shadow-lg'>
          <View className='items-center'>
            <Image
              className='object-contain w-[200px] h-[200px]'
              source={require("../../../assets/congrate.png")}
            />
          </View>
          <Text className='text-2xl font-bold text-purple-600 mb-2'>
            Congratulations!
          </Text>
          <Text className='text-gray-600 font-semibold text-center'>
            Your account is ready to use. You will be redirected to the Home
            page in a few seconds..
          </Text>
          <ActivityIndicator size='large' color='#9333ea' className='my-8' />
        </View>
      </Modal>
    </View>
  );
};

export default CreateNewPasswordScreen;
