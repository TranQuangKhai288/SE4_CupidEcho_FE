// src/navigation/AppNavigation.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home";
import MapsScreen from "../screens/Maps";
import MatchScreen from "../screens/match/Match";
import ChatScreen from "../screens/chat/Chat";
import ProfileScreen from "../screens/Profile/Profile";

type TabParamList = {
  Home: undefined;
  Maps: undefined;
  Match: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Maps":
              iconName = "map";
              break;
            case "Match":
              iconName = "favorite";
              break;
            case "Chat":
              iconName = "chat";
              break;
            case "Profile":
              iconName = "person";
              break;
            default:
              iconName = "circle";
          }
          return (
            <View>
              <MaterialIcons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: "#9C27B0",
        tabBarInactiveTintColor: "#757575",
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Maps' component={MapsScreen} />
      <Tab.Screen name='Match' component={MatchScreen} />
      <Tab.Screen name='Chat' component={ChatScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
