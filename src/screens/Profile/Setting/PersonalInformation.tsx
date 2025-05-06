import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ChevronLeft, Calendar, Edit2, ChevronDown } from "lucide-react-native";

const PersonalInformation = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center px-4 py-4">
          <TouchableOpacity>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-medium ml-4">Personal Information</Text>
        </View>

        {/* Form Content */}
        <View className="px-4 mt-2">
          {/* Full Name */}
          <View className="mb-4">
            <Text className="text-xs text-gray-500 mb-1">Andrew Ainsley</Text>
            <Text className="text-base">Andrew</Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 my-2" />

          {/* Birth Date */}
          <View className="mb-4 flex-row justify-between items-center py-2">
            <View>
              <Text className="text-base">12/27/1995</Text>
            </View>
            <TouchableOpacity>
              <Calendar size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 my-2" />

          {/* Gender */}
          <View className="mb-4 flex-row justify-between items-center py-2">
            <View>
              <Text className="text-base">Male</Text>
            </View>
            <TouchableOpacity>
              <ChevronDown size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 my-2" />

          {/* Email */}
          <View className="mb-4 flex-row justify-between items-center py-2">
            <View>
              <Text className="text-base">andrew_ainsley@yourdomain.com</Text>
            </View>
            <TouchableOpacity>
              <Edit2 size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-200 my-2" />

          {/* Phone */}
          <View className="mb-4 flex-row items-center py-2">
            <View className="flex-row items-center flex-1">
              <Image
                source={{ uri: "https://flagcdn.com/w40/us.png" }}
                className="w-6 h-4 mr-2"
                defaultSource={{}} // Bạn cần có file này hoặc thay bằng image khác
              />
              <Text className="text-base">+1 (818) 457 378 399</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
