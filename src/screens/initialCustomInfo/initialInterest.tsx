import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import Button from "../../components/Button";
import {
  Gamepad,
  Music,
  Languages,
  Clapperboard,
  Book,
  Landmark,
  Camera,
  Shirt,
  PenLine,
  Leaf,
  Paintbrush,
  PawPrint,
  Users,
  Dumbbell,
  Sandwich,
  MapPin,
  Palette,
} from "lucide-react-native";

const interests = [
  { label: "Gaming", icon: Gamepad },
  { label: "Dancing & Singing", icon: Music },
  { label: "Language", icon: Languages },
  { label: "Movie", icon: Clapperboard },
  { label: "Book & Novel", icon: Book },
  { label: "Architecture", icon: Landmark },
  { label: "Photography", icon: Camera },
  { label: "Fashion", icon: Shirt },
  { label: "Nature & Plant", icon: Leaf },
  { label: "Painting", icon: Paintbrush },
  { label: "Animals", icon: PawPrint },
  { label: "People & Society", icon: Users },
  { label: "Gym & Fitness", icon: Dumbbell },
  { label: "Food & Drink", icon: Sandwich },
  { label: "Travel & Places", icon: MapPin },
  { label: "Art", icon: Palette },
];

const InitialInterest = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 mb-4'>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>Select Your Interest</Text>
        </View>
      </View>
      <View>
        <Text className='text-base text-gray-800 my-4'>
          Select your interests to match with soul mate who have similar things
          in common.
        </Text>
        <View className=' py-3'>
          <View className='flex-row flex-wrap justify-between'></View>
        </View>
      </View>
      <View>
        <View className='flex flex-row flex-wrap gap-4'>
          {interests.map(({ label, icon: Icon }) => {
            const isSelected = selected.includes(label);
            return (
              <TouchableOpacity
                key={label}
                onPress={() => toggleSelect(label)}
                className={`flex-row items-center px-6 py-3 rounded-full border ${
                  isSelected
                    ? "bg-purple-600 border-purple-600"
                    : "border-purple-600"
                }`}
              >
                <Icon size={18} color={isSelected ? "white" : "#9333ea"} />
                <Text
                  className={`ml-2 text-sm font-medium ${
                    isSelected ? "text-white" : "text-purple-600"
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
        <Button
          title='Continue'
          onPress={() => navigation.navigate("InitialIdealMatch")}
        />
      </View>
    </View>
  );
};

export default InitialInterest;
