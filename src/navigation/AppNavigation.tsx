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
  ChatDetail: { name: string; avatar: string };
  Splash: undefined;
  Onboarding: undefined;
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
        {/* <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Match" component={MatchScreen} /> */}
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen
          name='ChatDetail'
          component={ChatDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
