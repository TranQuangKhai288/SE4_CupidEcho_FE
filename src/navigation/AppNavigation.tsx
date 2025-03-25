// src/navigation/AppNavigator.tsx
import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // Đảm bảo import từ đây
import LoginScreen from "../screens/Auth/Login";
// import {useTheme} from '../contexts/ThemeContext';
import MainTabNavigator from "./BottomTab";
// import ProfileScreen from '../screens/ProfileScreen';
// import MatchScreen from '../screens/MatchScreen';
// import ChatScreen from '../screens/ChatScreen';

// Định nghĩa type cho stack navigation
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Match: undefined;
  Chat: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  // const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        {/*  <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
