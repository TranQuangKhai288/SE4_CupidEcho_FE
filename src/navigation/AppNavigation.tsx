// src/navigation/AppNavigator.tsx
import React from "react";
import { ActivityIndicator, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // Đảm bảo import từ đây
import { useAuth } from "../contexts/AuthContext";
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
import NewMatchList from "../screens/match/NewMatchList";
import SettingsScreen from "../screens/Profile/Settings";
import FindAMatch from "../screens/match/FindAMatch";
import HelpCenterScreen from "../screens/Profile/Help";
import InviteFriendsScreen from "../screens/Profile/InviteFriend";
import MyProfileScreen from "../screens/Profile/MyProfile";
import AllMatchListScreen from "../screens/match/AllMatchList";
import CreateNewPost from "../screens/post/CreateNewPost";
import PostDetail from "../screens/post/PostDetail";
import RandomMatch from "../screens/match/RandomMatch";
import ExploreDetail from "../screens/explore/ExploreDetail";
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
  AllMatchList: undefined;
  RandomMatch: undefined;
  ExploreDetail: { title: string };
  Chat: undefined;
  ChatDetail: { _id: string; name: string; avatar: string };
  Splash: undefined;
  Onboarding: undefined;

  //forgot password
  ForgotPassword: undefined;
  VerifyCode: undefined;
  CreateNewPassword: undefined;

  Settings: undefined;
  HelpCenter: undefined;
  InviteFriend: undefined;
  MyProfile: undefined;
  FindAMatch: undefined;
  // Post
  CreateNewPost: undefined;
  PostDetail: { postId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { state } = useAuth();
  if (state.isLoading) {
    console.log("Loading state is true, showing loading indicator");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#3498db' />
      </View>
    );
  }
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
        <Stack.Screen name='AllMatchList' component={AllMatchListScreen} />
        <Stack.Screen name='NewMatch' component={NewMatchList} />
        <Stack.Screen name='RandomMatch' component={RandomMatch} />
        <Stack.Screen name='ExploreDetail' component={ExploreDetail} />
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
        <Stack.Screen name='FindAMatch' component={FindAMatch} />

        {/* Post */}
        <Stack.Screen name='CreateNewPost' component={CreateNewPost} />
        <Stack.Screen name='PostDetail' component={PostDetail} />

        {/* Profile */}

        <Stack.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerShown: true,
            headerBackTitle: "",
          }}
        />
        <Stack.Screen
          name='HelpCenter'
          component={HelpCenterScreen}
          options={{
            title: "HelpCenter",
            headerShown: true,
            headerBackTitle: "",
          }}
        />
        <Stack.Screen
          name='InviteFriend'
          component={InviteFriendsScreen}
          options={{
            title: "InviteFriend",
            headerShown: true,
            headerBackTitle: "",
          }}
        />
        <Stack.Screen
          name='MyProfile'
          component={MyProfileScreen}
          options={{
            title: "MyProfile",
            headerShown: true,
            headerBackTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
