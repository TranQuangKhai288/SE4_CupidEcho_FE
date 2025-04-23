import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { ArrowLeft, RefreshCw } from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/AppNavigation";

interface PaymentMethodProps {
  id: string;
  title: string;
  icon: string;
  lastDigits?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  id,
  title,
  icon,
  lastDigits,
  isSelected,
  onSelect,
}) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4 px-2 border-b border-gray-100"
    onPress={() => onSelect(id)}
  >
    <View className="flex-row items-center">
      {icon === "paypal" && (
        <View className="w-8 h-8 mr-3 justify-center">
          <Text className="text-blue-600 font-bold text-lg">P</Text>
        </View>
      )}
      {icon === "google" && (
        <View className="w-8 h-8 mr-3 justify-center">
          <Text className="font-bold text-base">G</Text>
        </View>
      )}
      {icon === "apple" && (
        <View className="w-8 h-8 mr-3 justify-center">
          <Text className="font-bold text-lg">􀣺</Text>
        </View>
      )}
      {icon === "mastercard" && (
        <View className="w-8 h-8 mr-3 justify-center">
          <View className="flex-row">
            <View className="w-3 h-3 bg-red-500 rounded-full opacity-80" />
            <View className="w-3 h-3 bg-yellow-500 rounded-full -ml-1 opacity-80" />
          </View>
        </View>
      )}

      <View>
        <Text className="font-medium text-base">{title}</Text>
        {lastDigits && (
          <Text className="text-sm text-gray-500">
            •••• •••• •••• {lastDigits}
          </Text>
        )}
      </View>
    </View>

    <View
      className={`w-5 h-5 rounded-full border ${
        isSelected ? "bg-purple-600 border-purple-600" : "border-gray-300"
      } items-center justify-center`}
    >
      {isSelected && <View className="w-2 h-2 rounded-full bg-white" />}
    </View>
  </TouchableOpacity>
);

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("mastercard");

  const paymentMethods = [
    { id: "paypal", title: "PayPal", icon: "paypal" },
    { id: "google", title: "Google Pay", icon: "google" },
    { id: "apple", title: "Apple Pay", icon: "apple" },
    {
      id: "mastercard",
      title: "Mastercard",
      icon: "mastercard",
      lastDigits: "4679",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
        <TouchableOpacity
          className="w-8 h-8 justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color="#000" />
        </TouchableOpacity>
        <Text className="font-semibold text-lg">Payment</Text>
        <TouchableOpacity className="w-8 h-8 justify-center items-center">
          <RefreshCw size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-gray-500 mb-2">
            Select the payment method you want to use.
          </Text>

          {/* Payment Methods */}
          <View className="mt-2">
            {paymentMethods.map((method) => (
              <PaymentMethod
                key={method.id}
                id={method.id}
                title={method.title}
                icon={method.icon}
                lastDigits={method.lastDigits}
                isSelected={selectedPaymentMethod === method.id}
                onSelect={setSelectedPaymentMethod}
              />
            ))}
          </View>

          {/* Add New Card */}
          <TouchableOpacity className="bg-purple-100 rounded-full py-3 items-center mt-6">
            <Text className="text-purple-600 font-medium">Add New Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="p-4">
        <TouchableOpacity className="bg-purple-600 rounded-full py-3 items-center">
          <Text className="text-white font-medium">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
