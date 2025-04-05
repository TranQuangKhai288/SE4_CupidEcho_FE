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
import RegisterScreen from "../screens/Auth/Register";
import ChatScreen from "../screens/chat/Chat";
import ChatDetailScreen from "../screens/chat/detail/ChatDetail";
import Splash from "../screens/Splash";
import OnboardingScreen from "../screens/onboarding/Onboarding";
import ForgotPasswordScreen from "../screens/forgotPass/ForgotPassword";
import verifyCodeScreen from "../screens/forgotPass/verifyCode";
import CreateNewPasswordScreen from "../screens/forgotPass/CreateNewPassword";
import NewMatchList from '../screens/match/NewMatchList';
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
  NewMatch: undefined;
  Chat: undefined;
  ChatDetail: { name: string; avatar: string };
  Splash: undefined;
  Onboarding: undefined;

  //forgot password
  ForgotPassword: undefined;
  VerifyCode: undefined;
  CreateNewPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  // const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen
          name='Onboarding'
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen name='NewMatch' component={NewMatchList} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen
          name='ChatDetail'
          component={ChatDetailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='VerifyCode' component={verifyCodeScreen} />
        <Stack.Screen
          name='CreateNewPassword'
          component={CreateNewPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
