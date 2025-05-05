import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../components/Button";

const InitialProfile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // State for form fields
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Format date for display
  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Handle date confirm
  const handleConfirmDate = (selectedDate: Date) => {
    setShowDatePicker(false);
    setDateOfBirth(selectedDate);
  };

  // Handle date cancel
  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      {/* Header */}
      <View className='flex-row justify-between items-center py-3 mb-4'>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>Fill your Profile</Text>
        </View>
      </View>

      {/* Full Name */}
      <View className='flex-row items-center bg-gray-100 px-8 py-3 rounded-2xl mb-4'>
        <TextInput
          placeholder='Full Name'
          value={fullName}
          onChangeText={setFullName}
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
          {formatDate(dateOfBirth)}
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

      {/* Email */}
      <View className='flex-row items-center bg-gray-100 px-8 py-3 rounded-2xl mb-4'>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          className='flex-1 text-base'
          keyboardType='email-address'
        />
        <MaterialIcons name='email' size={20} color='gray' />
      </View>

      {/* Phone Number */}
      <View className='flex-row items-center bg-gray-100 px-8 py-3 rounded-2xl mb-4'>
        <TextInput
          placeholder='Phone number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          className='flex-1 text-base'
          keyboardType='phone-pad'
        />
        <MaterialIcons name='phone' size={20} color='gray' />
      </View>

      {/* Continue Button */}
      <View className='mt-10'>
        <Button
          title='Continue'
          onPress={() => navigation.navigate("InitialImage")}
        />
      </View>
    </View>
  );
};

export default InitialProfile;
