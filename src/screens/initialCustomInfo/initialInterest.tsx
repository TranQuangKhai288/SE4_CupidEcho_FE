import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import Button from "../../components/Button";
import { getAllInterest } from "../../apis/InterestAPI";
import { updateProfile } from '../../apis/ProfileAPI';


const InitialInterest = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<string[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await getAllInterest();
        if (res.status === "OK") {
          setInterests(res.data);
        } else {
          Alert.alert("Error", res.message || "Failed to fetch interests");
        }
      } catch (err) {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    };

    fetchInterests();
  }, []);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selected.length === 0) {
      Alert.alert("Please select at least one interest.");
      return;
    }

    try {
      setLoading(true);
      const res = await updateProfile({ interests: selected });
      if (res.status === "OK") {
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", res.message || "Failed to update profile");
      }
    } catch (err) {
      Alert.alert("Error", "Unable to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 mb-4'>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>Select Your Interest</Text>
        </View>
      </View>
      <Text className='text-base text-gray-800 my-4'>
        Select your interests to match with soul mate who have similar things in
        common.
      </Text>

      <View className='flex flex-row flex-wrap gap-4'>
        {interests.map((item) => {
          const isSelected = selected.includes(item._id);

          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => toggleSelect(item._id)}
              className={`px-6 py-3 rounded-full border ${
                isSelected
                  ? "bg-purple-600 border-purple-600"
                  : "border-purple-600"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  isSelected ? "text-white" : "text-purple-600"
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className='my-14'>
        <Button
          title={loading ? "Saving..." : "Continue"}
          onPress={handleContinue}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

export default InitialInterest;
