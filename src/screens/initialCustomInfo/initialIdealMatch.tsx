import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import Button from "../../components/Button";
import { Heart, Users, BriefcaseBusiness, Flag } from "lucide-react-native";

const options = [
  { label: "Love", icon: Heart },
  { label: "Friends", icon: Users },
  { label: "Fling", icon: Flag },
  { label: "Business", icon: BriefcaseBusiness },
];

const InitialIdealMatch = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 mb-4'>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>Select Your Ideal Match</Text>
        </View>
      </View>
      <View>
        <Text className='text-base text-gray-800 my-4'>
          What are you hoping to find on the CupidEcho Dating App?
        </Text>
        <View className='flex-row flex-wrap justify-between gap-y-4'>
          {options.map(({ label, icon: Icon }) => {
            const isSelected = selected === label;
            return (
              <TouchableOpacity
                key={label}
                onPress={() => setSelected(label)}
                className={`w-[48%] py-12 rounded-3xl items-center justify-center border ${
                  isSelected ? "border-purple-600" : "border-gray-200"
                }`}
              >
                <View className='bg-violet-100 p-6 rounded-full mb-3'>
                  <Icon size={20} color='#9333ea' />
                </View>
                <Text
                  className={`text-sm font-medium ${
                    isSelected ? "text-purple-600" : "text-gray-700"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className='mt-10'>
        <Button title='Continue' onPress={() => navigation.navigate("Main")} />
      </View>
    </View>
  );
};

export default InitialIdealMatch;
