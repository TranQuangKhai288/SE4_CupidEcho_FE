import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { resetPass } from "../../apis/UserAPI";
import { RouteProp, useRoute } from "@react-navigation/native";

type CreateNewPasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "CreateNewPassword">;
};

const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = ({
  navigation,
}) => {
  const route = useRoute<RouteProp<RootStackParamList, "CreateNewPassword">>();
  // Giả sử email được truyền qua params, nếu không có hãy bổ sung ở nơi gọi navigation
  const email = route.params?.info ?? "";

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
        navigation.navigate("Login");
      }, 2000);
    }
  }, [showModal]);

  const handleContinue = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await resetPass(email, password);
      if (res.status === "OK" || res.data?.status === "OK") {
        setLoading(false);
        setShowModal(true);
      } else {
        setLoading(false);
        Alert.alert(
          "Reset failed",
          res.message || res.data?.message || "Unknown error"
        );
      }
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row items-center gap-4 mb-8">
        <TouchableOpacity onPress={() => navigation.pop(2)}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold ">Create New Password</Text>
      </View>

      <View className="items-center">
        <Image
          className="object-contain w-[250px] h-[230px]"
          source={require("../../../assets/newpass.png")}
        />
      </View>

      <View>
        <Text className="text-gray-600 font-semibold my-6">
          Create Your New Password
        </Text>
        <View className="flex-col items-center">
          <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4">
            <MaterialIcons name="lock" size={20} color="gray" />
            <TextInput
              placeholder="Enter new password"
              className="flex-1 ml-3 text-base"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              <Feather
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-lg mb-4">
            <MaterialIcons name="lock" size={20} color="gray" />
            <TextInput
              placeholder="Enter confirm password"
              className="flex-1 ml-3 text-base"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmVisible}
            />
            <TouchableOpacity
              onPress={() => setConfirmVisible(!isConfirmVisible)}
            >
              <Feather
                name={isConfirmVisible ? "eye" : "eye-off"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={loading}
          />
        </View>
      </View>

      {/* Loading Indicator */}
      <Modal
        isVisible={loading}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#9333ea" />
        </View>
      </Modal>

      {/* MODAL thành công */}
      <Modal
        isVisible={showModal}
        backdropOpacity={0.5}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        useNativeDriver
      >
        <View className="bg-white p-10 rounded-2xl w-80 items-center self-center shadow-lg">
          <View className="items-center">
            <Image
              className="object-contain w-[200px] h-[200px]"
              source={require("../../../assets/congrate.png")}
            />
          </View>
          <Text className="text-2xl font-bold text-purple-600 mb-2">
            Congratulations!
          </Text>
          <Text className="text-gray-600 font-semibold text-center">
            Your account is ready to use. You will be redirected to the Home
            page in a few seconds..
          </Text>
          <ActivityIndicator
            size="large"
            color="#9333ea"
            style={{ marginTop: 16 }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CreateNewPasswordScreen;
