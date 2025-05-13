import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { ChevronLeft, Calendar, Edit2, ChevronDown } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";

const PersonalInformation = () => {
  const { state } = useAuth();
  const { user } = state;
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center px-4 py-4">
          <TouchableOpacity onPress={navigation.goBack}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-medium ml-4">Personal Information</Text>
        </View>

        {/* Form Content */}
        <View className="px-4 mt-2">
          <TextInput
            value={user?.name}
            className="text-black bg-gray-100 p-4 rounded-lg mb-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
