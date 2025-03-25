// src/screens/Auth/LoginScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { dispatch } = useAuth();

  const handleLogin = () => {
    // dispatch({
    //   type: 'LOGIN',
    //   payload: {user: {id: 1, name: 'User'}, token: 'abc123'},
    // });
    navigation.navigate("Main");
  };

  return (
    <View>
      <Text className="ml-2">Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
