import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate } from "date-fns";

type InitialProfileRouteProp = RouteProp<RootStackParamList, "InitialProfile">;

const InitialProfile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<InitialProfileRouteProp>();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [gender, setGender] = useState("");

  const handleConfirmDate = (date: Date) => {
    setShowDatePicker(false);
    setDateOfBirth(date);
  };
  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  const handleRegister = async () => {
    try {
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

      {/* Nickname */}
      <View className='flex-row items-center bg-gray-100 px-8 py-3 rounded-2xl mb-4'>
        <TextInput
          placeholder='Nickname'
          value={nickname}
          onChangeText={setNickname}
          className='flex-1 text-base'
        />
      </View>

      {/* Date of Birth */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className='flex-row items-center bg-gray-100 px-8 py-6 rounded-2xl mb-4'
      >
        <Text className='flex-1 text-base text-gray-500'>
          {formatDate(dateOfBirth, "dd/MM/yyyy")}
        </Text>
        <MaterialIcons name='date-range' size={20} color='gray' />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode='date'
        date={dateOfBirth}
        onConfirm={handleConfirmDate}
        onCancel={handleCancelDate}
        maximumDate={new Date()}
        locale='vi-VN' // Vietnamese locale
        confirmTextIOS='Xác nhận'
        cancelTextIOS='Hủy'
        textColor='#000000' // Đặt màu chữ để tránh lỗi hiển thị
      />

      {/* Gender Picker */}
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
