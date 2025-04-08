import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      const checkToken = async () => {
        console.log("Checking for token in AsyncStorage");
        // Kiểm tra xem có token trong AsyncStorage không
        const token = await AsyncStorage.getItem("token");
        console.log("Token found: ", token);
        if (token) {
          console.log("Token found, navigating to Main screen");
          navigation.navigate("Main"); // hoặc tên màn hình chính
        } else {
          navigation.navigate("Onboarding");
        }
      };

      checkToken();
    }, 2000);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="items-center flex-row justify-center gap-4">
        <Image
          className="object-cover"
          source={require("../../assets/Logo.png")}
          style={{ width: 80, height: 80 }}
        />
        <Text className="text-4xl font-bold">Cupid Echo</Text>
      </View>
      <View className="mt-32">
        <Loader />
      </View>
    </View>
  );
};

export default SplashScreen;
