import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

const DiscoverySetting = () => {
  const navigation = useNavigation();

  // State for various settings
  const [location, setLocation] = useState("New York, US");
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(30);
  const [distanceMin, setDistanceMin] = useState(5);
  const [distanceMax, setDistanceMax] = useState(80);
  const [expandSearchArea, setExpandSearchArea] = useState(false);
  const [showMePreference, setShowMePreference] = useState("Women Only");
  const [hideLastSeen, setHideLastSeen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold ml-4">Discovery Settings</Text>
      </View>

      {/* Content */}
      <View className="px-4 mt-2">
        {/* Location */}
        <TouchableOpacity className="flex-row justify-between items-center py-4">
          <Text className="text-base font-medium">Location</Text>
          <View className="flex-row items-center">
            <Text className="text-base text-gray-700 mr-2">{location}</Text>
            <ChevronRight size={20} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Age Range */}
        <View className="py-4">
          <Text className="text-base font-medium mb-4">Age</Text>

          {/* Showing current values */}
          <View className="flex-row justify-between mb-2">
            <View className="bg-purple-600 px-2 py-1 rounded-md">
              <Text className="text-white font-medium">{ageMin}</Text>
            </View>
            <View className="bg-purple-600 px-2 py-1 rounded-md">
              <Text className="text-white font-medium">{ageMax}</Text>
            </View>
          </View>

          {/* Slider track */}
          <View className="h-1 bg-gray-200 rounded-full mb-6">
            <View
              className="absolute h-1 bg-purple-600 rounded-full"
              style={{
                left: `${((ageMin - 18) / (60 - 18)) * 100}%`,
                right: `${100 - ((ageMax - 18) / (60 - 18)) * 100}%`,
              }}
            />
          </View>

          {/* Min Age Slider */}
          <Slider
            style={{ height: 40, marginTop: -50, zIndex: 10 }}
            minimumValue={18}
            maximumValue={60}
            step={1}
            value={ageMin}
            onValueChange={(value) => {
              // Ensure min doesn't exceed max
              if (value <= ageMax) {
                setAgeMin(value);
              }
            }}
            thumbTintColor="#8b5cf6"
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
          />

          {/* Max Age Slider */}
          <Slider
            style={{ height: 40, marginTop: -40 }}
            minimumValue={18}
            maximumValue={60}
            step={1}
            value={ageMax}
            onValueChange={(value) => {
              // Ensure max doesn't go below min
              if (value >= ageMin) {
                setAgeMax(value);
              }
            }}
            thumbTintColor="#8b5cf6"
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
          />
        </View>

        {/* Distance */}
        <View className="py-4">
          <Text className="text-base font-medium mb-4">Distance (in km)</Text>

          {/* Showing current values */}
          <View className="flex-row justify-between mb-2">
            <View className="bg-purple-600 px-2 py-1 rounded-md">
              <Text className="text-white font-medium">{distanceMin}</Text>
            </View>
            <View className="bg-purple-600 px-2 py-1 rounded-md">
              <Text className="text-white font-medium">{distanceMax}</Text>
            </View>
          </View>

          {/* Slider track */}
          <View className="h-1 bg-gray-200 rounded-full mb-6">
            <View
              className="absolute h-1 bg-purple-600 rounded-full"
              style={{
                left: `${(distanceMin / 100) * 100}%`,
                right: `${100 - (distanceMax / 100) * 100}%`,
              }}
            />
          </View>

          {/* Min Distance Slider */}
          <Slider
            style={{ height: 40, marginTop: -50, zIndex: 10 }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={distanceMin}
            onValueChange={(value) => {
              // Ensure min doesn't exceed max
              if (value <= distanceMax) {
                setDistanceMin(value);
              }
            }}
            thumbTintColor="#8b5cf6"
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
          />

          {/* Max Distance Slider */}
          <Slider
            style={{ height: 40, marginTop: -40, zIndex: 10 }}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={distanceMax}
            onValueChange={(value) => {
              // Ensure max doesn't go below min
              if (value >= distanceMin) {
                setDistanceMax(value);
              }
            }}
            thumbTintColor="#8b5cf6"
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
          />
        </View>

        {/* Expand Search Area */}
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-base font-medium">Expand Search Area</Text>
          <Switch
            trackColor={{ false: "#f4f3f4", true: "#d1d5db" }}
            thumbColor={expandSearchArea ? "#8b5cf6" : "#f4f3f4"}
            ios_backgroundColor="#f4f3f4"
            onValueChange={() => setExpandSearchArea(!expandSearchArea)}
            value={expandSearchArea}
          />
        </View>

        {/* Show Me */}
        <TouchableOpacity className="flex-row justify-between items-center py-4">
          <Text className="text-base font-medium">Show Me</Text>
          <View className="flex-row items-center">
            <Text className="text-base text-gray-700 mr-2">
              {showMePreference}
            </Text>
            <ChevronRight size={20} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Hide Last Seen */}
        <View className="flex-row justify-between items-center py-4">
          <Text className="text-base font-medium">Hide Last Seen</Text>
          <Switch
            trackColor={{ false: "#f4f3f4", true: "#d1d5db" }}
            thumbColor={hideLastSeen ? "#8b5cf6" : "#f4f3f4"}
            ios_backgroundColor="#f4f3f4"
            onValueChange={() => setHideLastSeen(!hideLastSeen)}
            value={hideLastSeen}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DiscoverySetting;
