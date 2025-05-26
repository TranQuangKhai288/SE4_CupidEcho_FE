import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import ReactNativeModal from "react-native-modal";

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: {
    gender: string;
    ageRange: [number, number];
    location: string;
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApply,
}) => {
  const [gender, setGender] = useState<string>("All");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 60]);
  const [location, setLocation] = useState<string>("");

  const genders = ["Male", "Female", "Other"];

  const handleApply = () => {
    onApply({ gender, ageRange, location });
    onClose();
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className='bg-white rounded-lg p-6'>
        <Text className='text-xl font-bold my-4 text-center'>Filter</Text>

        {/* Gender Selection */}
        <Text className='text-base font-semibold mb-2'>Gender</Text>
        <View className='flex-row justify-between mb-4'>
          {genders.map((g) => (
            <TouchableOpacity
              key={g}
              className={`px-11 py-3 rounded-full ${
                gender === g ? "bg-purple-500" : "bg-gray-200"
              }`}
              onPress={() => setGender(g)}
            >
              <Text className={`${gender === g ? "text-white" : "text-black"}`}>
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Age Range */}
        <Text className='text-base font-semibold mb-2'>Age Range</Text>
        <View className='mb-4'>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={18}
            maximumValue={100}
            minimumTrackTintColor='#9333ea'
            maximumTrackTintColor='#d1d5db'
            thumbTintColor='#9333ea'
            step={1}
            value={ageRange[0]}
            onValueChange={(value) => setAgeRange([value, ageRange[1]])}
          />
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={18}
            maximumValue={100}
            minimumTrackTintColor='#9333ea'
            maximumTrackTintColor='#d1d5db'
            thumbTintColor='#9333ea'
            step={1}
            value={ageRange[1]}
            onValueChange={(value) => setAgeRange([ageRange[0], value])}
          />
          <Text className='text-gray-600'>
            {ageRange[0]} - {ageRange[1]} years
          </Text>
        </View>

        {/* Location */}
        <Text className='text-base font-semibold mb-2'>Location</Text>
        <TextInput
          className='border border-gray-300 rounded-lg p-2 mb-4'
          placeholder='Enter city or area'
          value={location}
          onChangeText={setLocation}
        />

        {/* Buttons */}
        <View className='flex-row justify-end gap-2'>
          <TouchableOpacity
            className='px-8 py-3 rounded-3xl bg-primary-light'
            onPress={onClose}
          >
            <Text className='text-purple-600 font-semibold'>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='bg-purple-600 px-8 py-3 rounded-3xl'
            onPress={handleApply}
          >
            <Text className='text-white'>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default FilterModal;
