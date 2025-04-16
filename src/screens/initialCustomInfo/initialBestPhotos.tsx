import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import Button from "../../components/Button";

const InitialBestPhotos = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className='flex-1 bg-white pt-10 px-6'>
      <View className='flex-row justify-between items-center py-3 mb-4'>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={20} color='black' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold'>Add Your Best Photos</Text>
        </View>
      </View>
      <View>
        <Text className='text-base text-gray-800 my-4'>
          Add your best photos to get a higher amount of daily matches.
        </Text>
        <View className=' py-3'>
          <View className='flex-row flex-wrap justify-between'>
            {/* Ô 1 */}
            <TouchableOpacity className='border-2 border-dashed bg-purple-100 border-purple-400 rounded-3xl p-4 items-center justify-center w-[48%] h-60 mb-4'>
              <View className='bg-purple-600 rounded-full w-10 h-10 items-center justify-center'>
                <MaterialIcons name='add' size={20} color='white' />
              </View>
            </TouchableOpacity>

            {/* Ô 2 */}
            <TouchableOpacity className='border-2 border-dashed bg-purple-100 border-purple-400 rounded-3xl p-4 items-center justify-center w-[48%] h-60 mb-4'>
              <View className='bg-purple-600 rounded-full w-10 h-10 items-center justify-center'>
                <MaterialIcons name='add' size={20} color='white' />
              </View>
            </TouchableOpacity>

            {/* Ô 3 */}
            <TouchableOpacity className='border-2 border-dashed bg-purple-100 border-purple-400 rounded-3xl p-4 items-center justify-center w-[48%] h-60 mb-4'>
              <View className='bg-purple-600 rounded-full w-10 h-10 items-center justify-center'>
                <MaterialIcons name='add' size={20} color='white' />
              </View>
            </TouchableOpacity>

            {/* Ô 4 */}
            <TouchableOpacity className='border-2 border-dashed bg-purple-100 border-purple-400 rounded-3xl p-4 items-center justify-center w-[48%] h-60 mb-4'>
              <View className='bg-purple-600 rounded-full w-10 h-10 items-center justify-center'>
                <MaterialIcons name='add' size={20} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className='mt-10'>
        <Button
          title='Continue'
          onPress={() => navigation.navigate("InitialInterest")}
        />
      </View>
    </View>
  );
};

export default InitialBestPhotos;
