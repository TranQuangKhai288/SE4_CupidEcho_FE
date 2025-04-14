import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useAuth } from "../../contexts/AuthContext";
import { LayoutPanelLeft, SlidersHorizontal } from "lucide-react-native";
import SwipeCard from "../../components/SwipeCard";
import FilterModal from "../../components/FilterModal";

const MatchScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { state } = useAuth();
  const { user } = state;

  // State for modal visibility and filters
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<{
    gender: string;
    ageRange: [number, number];
    location: string;
  }>({
    gender: "All",
    ageRange: [18, 60],
    location: "",
  });

  const handleApplyFilters = (newFilters: {
    gender: string;
    ageRange: [number, number];
    location: string;
  }) => {
    setFilters(newFilters);
    // TODO: Apply filters to SwipeCard or backend API
    console.log("Applied filters:", newFilters);
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3'>
        <View className='flex-row items-center gap-2'>
          <Image
            source={{ uri: user?.avatar }}
            className='w-14 h-14 rounded-full'
          />
          <View>
            <Text className='text-gray-500 text-base'>Good Morning 👋</Text>
            <Text className='text-lg font-bold text-black'>{user?.name}</Text>
          </View>
        </View>
        <View className='flex-row gap-1 items-center'>
          <TouchableOpacity
            className='p-2'
            onPress={() => setFilterModalVisible(true)}
          >
            <SlidersHorizontal size={20} color='#000' />
          </TouchableOpacity>
          <TouchableOpacity
            className='p-2'
            onPress={() => navigation.navigate("AllMatchList")}
          >
            <LayoutPanelLeft size={20} color='#000' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex-1'>
        <SwipeCard />
      </View>

      {/* Filter Modal */}
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
      />
    </View>
  );
};

export default MatchScreen;
