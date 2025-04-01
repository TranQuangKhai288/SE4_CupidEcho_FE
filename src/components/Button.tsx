import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full py-4 rounded-3xl ${
        disabled ? "bg-gray-300" : "bg-purple-600"
      }`}
    >
      <Text className='text-center text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
