import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Check, X } from "lucide-react-native";

const ActionButton = ({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) => {
  return (
    <View className='flex-row gap-2'>
      {/* Reject Button */}
      <TouchableOpacity
        onPress={onReject}
        className='bg-red-500 px-4 py-2 rounded-full flex-row items-center gap-2 shadow'
      >
        <X size={18} color='white' />
        <Text className='text-white font-semibold'>Reject</Text>
      </TouchableOpacity>

      {/* Accept Button */}
      <TouchableOpacity
        onPress={onAccept}
        className='bg-green-500 px-4 py-2 rounded-full flex-row items-center gap-2 shadow'
      >
        <Check size={18} color='white' />
        <Text className='text-white font-semibold'>Accept</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;
