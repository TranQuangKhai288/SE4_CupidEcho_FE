import React, { useRef, useState } from "react";
import { View, TextInput } from "react-native";

const OTPInput = () => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));

  const handleChange = (text: string, index: number) => {
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus(); // Quay lại ô trước nếu xoá
    }
  };

  return (
    <View className='flex-row justify-center gap-6'>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className='w-20 h-14 border border-gray-300 text-center text-lg font-bold rounded-2xl'
          maxLength={1}
          keyboardType='numeric'
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

export default OTPInput;
