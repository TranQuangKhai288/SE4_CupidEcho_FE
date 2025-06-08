import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import OTPInput from "../../components/OTPInput";
import Button from "../../components/Button";
import { RouteProp, useRoute } from "@react-navigation/native";
import { verifyOTP } from "../../apis/UserAPI";

type VerifyCodeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "VerifyCode">;
};

const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = ({ navigation }) => {
  const route = useRoute<RouteProp<RootStackParamList, "VerifyCode">>();
  const { option, info } = route.params;
  const [OTP, setOTP] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      console.log("OTP:", OTP); // <-- log OTP ra đây
      const res = await verifyOTP(info, OTP);
      if (res.status === "OK") {
        navigation.navigate("CreateNewPassword", {
          option: option,
          info: info,
        });
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("OTP unverified", res.message);
      }
      return;
    } catch (e) {
      console.log(e);
      setLoading(false);

      return;
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-10 justify-between">
      <View>
        <View className="flex-row items-center gap-4 mb-8">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Forgot Password</Text>
        </View>
      </View>

      {/* OTP Input */}
      <View className="flex-col items-center gap-16 mb-16">
        <Text className="text-gray-600 font-semibold text-center">
          Code has been sent to {info}
        </Text>
        <OTPInput onOtpChange={setOTP} /> {/* truyền prop xuống */}
        <Text className="text-gray-600 font-semibold text-center mt-4">
          Resend code in
        </Text>
      </View>

      <View className="mb-6">
        <Button title="Verify" onPress={handleVerifyOTP} />
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

export default VerifyCodeScreen;
