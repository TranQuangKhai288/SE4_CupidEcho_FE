import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../components/Button";
import { format } from "date-fns";
import * as ProfileAPI from "../../apis/ProfileAPI";

type InitialProfileRouteProp = RouteProp<RootStackParamList, "InitialProfile">;

const InitialProfile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<InitialProfileRouteProp>();

  const [zodiac, setZodiac] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmDate = (date: Date) => {
    setShowDatePicker(false);
    setDateOfBirth(date);
  };

  const handleCancelDate = () => {
    setShowDatePicker(false);
  };

  const handleUpdateProfile = async () => {
    if (!zodiac || !gender || !formattedAddress || !city || !country) {
      Alert.alert("Incomplete", "Please fill in all the fields.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        birthDate: dateOfBirth.toISOString(),
        zodiac,
        gender,
        address: {
          formattedAddress,
          city,
          country,
        },
      };
      await ProfileAPI.updateProfile(payload);
      Alert.alert("Success", "Your profile has been saved.");
      navigation.navigate("InitialInterest");
    } catch (error) {
      console.error("Update profile failed:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const zodiacOptions = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Unknown",
  ];

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 mb-10'>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold '>Fill Your Profile</Text>
        </View>
      </View>

      {/* Date of Birth */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className='flex-row items-center justify-between mb-4 px-4 py-5 bg-gray-100 rounded-lg'
      >
        <Text className='text-black'>{format(dateOfBirth, "dd/MM/yyyy")}</Text>
        <MaterialIcons name='date-range' size={20} color='gray' />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode='date'
        onConfirm={handleConfirmDate}
        onCancel={handleCancelDate}
        maximumDate={new Date()}
      />

      {/* Gender Picker */}
      <View className='mb-4 bg-gray-100 rounded-lg'>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label='Select gender' value='' />
          <Picker.Item label='Male' value='male' />
          <Picker.Item label='Female' value='female' />
          <Picker.Item label='Another' value='another' />
        </Picker>
      </View>

      {/* Zodiac Picker */}
      <View className='mb-4 bg-gray-100 rounded-lg'>
        <Picker
          selectedValue={zodiac}
          onValueChange={(itemValue) => setZodiac(itemValue)}
        >
          <Picker.Item label='Select zodiac' value='' />
          {zodiacOptions.map((z) => (
            <Picker.Item key={z} label={z} value={z} />
          ))}
        </Picker>
      </View>

      {/* Address Inputs */}
      <TextInput
        placeholder='Formatted Address'
        value={formattedAddress}
        onChangeText={setFormattedAddress}
        className='bg-gray-100 text-black rounded-lg px-4 py-5 mb-4'
      />
      <TextInput
        placeholder='City'
        value={city}
        onChangeText={setCity}
        className='bg-gray-100 text-black rounded-lg px-4 py-5 mb-4'
      />
      <TextInput
        placeholder='Country'
        value={country}
        onChangeText={setCountry}
        className='bg-gray-100 text-black rounded-lg px-4 py-5 mb-6'
      />

      {/* Save Button */}
      <Button
        title={isLoading ? "Saving..." : "Save Profile"}
        onPress={handleUpdateProfile}
        disabled={isLoading}
      />
    </View>
  );
};

export default InitialProfile;
