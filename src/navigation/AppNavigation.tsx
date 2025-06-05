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
import BlindChat from "../screens/chat/detail/BlindChat";
import Splash from "../screens/Splash";
import OnboardingScreen from "../screens/onboarding/Onboarding";
import ForgotPasswordScreen from "../screens/forgotPass/ForgotPassword";
import verifyCodeScreen from "../screens/forgotPass/verifyCode";
import CreateNewPasswordScreen from "../screens/forgotPass/CreateNewPassword";
import SeeAllMatches from "../screens/match/SeeAllMatches";
import SettingsScreen from "../screens/Profile/Setting/Settings";
import FindAMatch from "../screens/match/FindAMatch";
import HelpCenterScreen from "../screens/Profile/Help";
import InviteFriendsScreen from "../screens/Profile/InviteFriend";
import MyProfileScreen from "../screens/Profile/MyProfile";
import AllMatchListScreen from "../screens/match/AllMatchList";
import CreateNewPost from "../screens/post/CreateNewPost";
import PostDetail from "../screens/post/PostDetail";
import RandomMatch from "../screens/match/RandomMatch";
import ExploreDetail from "../screens/explore/ExploreDetail";
import InitialProfile from "../screens/initialCustomInfo/initialProfile";
import InitialBestPhotos from "../screens/initialCustomInfo/initialBestPhotos";
import InitialInterest from "../screens/initialCustomInfo/initialInterest";
import InitialIdealMatch from "../screens/initialCustomInfo/initialIdealMatch";
import VoiceCallScreen from "../screens/call/VoiceCall";
import VideoCallScreen from "../screens/call/VideoCall";
import PersonalInformation from "../screens/Profile/Setting/PersonalInformation";
import DiscoverySetting from "../screens/Profile/Setting/DiscoverySetting";
import SubscribeVIP from "../screens/Profile/SubscribeVIP/SubscribeVIP";
import PaymentScreen from "../screens/Profile/SubscribeVIP/Payment";
import EditProfileScreen from "../screens/Profile/EditProfile/EditProfile";
import EditInterestScreen from "../screens/Profile/EditProfile/EditInterest";
import ProfileUserDetail from "../screens/post/ProfileUserDetail";

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
  SeeAllMatches: { title: string };
  AllMatchList: undefined;
  RandomMatch: undefined;
  ExploreDetail: { title: string };
  Chat: undefined;
  ChatDetail: { convId: string; name: string; avatar: string };
  BlindChat: { partnerId: string; conversationId: string };
  Splash: undefined;
  Onboarding: undefined;

  //forgot password
  ForgotPassword: undefined;
  VerifyCode: undefined;
  CreateNewPassword: undefined;

  // Post
  CreateNewPost: undefined;
  PostDetail: { postId: string };

  //InitialCustomInfo
  InitialProfile: undefined;
  InitialImage: undefined;
  InitialInterest: undefined;
  InitialIdealMatch: undefined;

  //Call
  VoiceCall: { roomId: string };
  VideoCall: { roomId: string };

  //Profile
  Settings: { title: String };
  HelpCenter: undefined;
  InviteFriend: undefined;
  MyProfile: undefined;
  FindAMatch: undefined;
  PersonalInfo: undefined;
  DiscoverySetting: undefined;
  SubscribeVIP: undefined;
  Payment: undefined;
  EditProfile: undefined;
  EditInterest: { ListInterest: string[] };
  ProfileUserDetail: { userId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { state } = useAuth();
  if (state.isLoading) {
    console.log("Loading state is true, showing loading indicator");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }
  // const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        <Stack.Screen name="AllMatchList" component={AllMatchListScreen} />
        <Stack.Screen name="SeeAllMatches" component={SeeAllMatches} />
        <Stack.Screen name="RandomMatch" component={RandomMatch} />
        <Stack.Screen name="ExploreDetail" component={ExploreDetail} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen
          name="ChatDetail"
          component={ChatDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlindChat"
          component={BlindChat}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={verifyCodeScreen} />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPasswordScreen}
        />
        <Stack.Screen name="FindAMatch" component={FindAMatch} />

        {/* Post */}
        <Stack.Screen name="CreateNewPost" component={CreateNewPost} />
        <Stack.Screen name="PostDetail" component={PostDetail} />

        {/* InitialCustomInfo */}
        <Stack.Screen name="InitialProfile" component={InitialProfile} />
        <Stack.Screen name="InitialImage" component={InitialBestPhotos} />
        <Stack.Screen name="InitialInterest" component={InitialInterest} />
        <Stack.Screen name="InitialIdealMatch" component={InitialIdealMatch} />

        {/* Call */}
        <Stack.Screen name="VoiceCall" component={VoiceCallScreen} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />

        {/* Profile */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="InviteFriend" component={InviteFriendsScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInformation} />
        <Stack.Screen name="DiscoverySetting" component={DiscoverySetting} />
        <Stack.Screen name="SubscribeVIP" component={SubscribeVIP} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="EditInterest" component={EditInterestScreen} />
        <Stack.Screen name="ProfileUserDetail" component={ProfileUserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
