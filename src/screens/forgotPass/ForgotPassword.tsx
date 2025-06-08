import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { forgotPassword } from "../../apis/UserAPI";

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "ForgotPassword">;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState("and***ley@yourdomain.com");
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPass = async () => {
    try {
      setLoading(true);
      const res = await forgotPassword(email);
      console.log(res);
      if (res.status === "OK") {
        navigation.navigate("VerifyCode", {
          option: "gmail",
          info: email,
        });
        setLoading(false);
      } else {
        setLoading(false);

        Alert.alert("Something went wrong", res.message);
      }
    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row items-center gap-4 mb-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ">Forgot Password</Text>
      </View>

      <View className="items-center">
        <Image
          className="object-contain w-[250px] h-[230px]"
          source={require("../../../assets/lock.png")}
        />
      </View>
      <View>
        <Text className="text-gray-600 font-semibold my-6">
          Select which contact details should we use to reset your password
        </Text>
        <View className="flex-col items-center gap-4 mb-4">
          <TouchableOpacity
            className="border-2 border-purple-600 rounded-2xl p-4 flex-row items-center bg-slate-400 w-full"
            disabled
          >
            <View className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
              <Ionicons name="chatbubbles" size={24} color="#475569" />
            </View>
            <View className="ml-4">
              <Text className="text-gray-500 text-sm">via SMS:</Text>
              <Text className="text-slate-600 font-bold text-lg">
                +1 111 ******99
              </Text>
            </View>
          </TouchableOpacity>
          <View className="border-2 border-purple-600 rounded-2xl p-4 flex-row items-center bg-white w-full">
            <TouchableOpacity
              className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center"
              onPress={() => setIsSelected((selected) => !selected)}
              activeOpacity={0.7}
            >
              {isSelected ? (
                <Ionicons name="checkmark-circle" size={28} color="green" />
              ) : (
                <Ionicons name="mail" size={24} color="#9333ea" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="ml-4 flex-1"
              onPress={() => setIsEditing(true)}
              activeOpacity={1}
            >
              <Text className="text-gray-500 text-sm">via Email:</Text>
              {isEditing ? (
                <TextInput
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#000",
                    lineHeight: 24,
                    paddingVertical: 1,
                  }}
                  value={email}
                  onChangeText={setEmail}
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#000",
                    lineHeight: 24,
                    paddingVertical: 1,
                  }}
                >
                  {email}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Button title="Continue" onPress={handleForgotPass} />
        </View>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.8)",
              borderRadius: 16,
              padding: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgotPasswordScreen;
