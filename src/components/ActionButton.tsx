import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Check, X } from "lucide-react-native";

const ActionButton = ({
  onAccept,
  onReject,
  justIcon,
}: {
  onAccept: () => void;
  onReject: () => void;
  justIcon?: boolean;
}) => {
  return (
    <View className="flex-row w-full gap-2">
      {/* Reject Button */}
      <TouchableOpacity
        onPress={onReject}
        className="flex-1 bg-red-500 py-2 rounded-full flex-row items-center justify-center gap-2 shadow"
      >
        <X size={18} color="white" />
        {!justIcon && <Text className="text-white font-semibold">Reject</Text>}
      </TouchableOpacity>

      {/* Accept Button */}
      <TouchableOpacity
        onPress={onAccept}
        className="flex-1 bg-green-500 py-2 rounded-full flex-row items-center justify-center gap-2 shadow"
      >
        <Check size={18} color="white" />
        {!justIcon && <Text className="text-white font-semibold">Accept</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;
