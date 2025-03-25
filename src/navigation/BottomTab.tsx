// src/navigation/AppNavigation.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home";
import MapsScreen from "../screens/Maps"; // Tạo mới nếu chưa có
import MatchScreen from "../screens/Match";
import ChatScreen from "../screens/Chat";
import ProfileScreen from "../screens/Profile";
import { View, Text } from "react-native";
// import {useTheme} from '../contexts/ThemeContext';

// import Icon from 'react-native-vector-icons'; // Thêm icon (cài đặt bên dưới)

type TabParamList = {
  Home: undefined;
  Maps: undefined;
  Match: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// const {theme} = useTheme();
// Component cho Bottom Tab Navigator
const MainTabNavigator: React.FC = () => {
  console.log("MainTabNavigator");
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case "Home":
              console.log("Home");
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
              <Text>{iconName}</Text>
            </View>
          );
          //   return <Icon name={iconName} size={size} color={color} />;
        },
        // tabBarActiveTintColor: theme === 'dark' ? '#FF8A80' : '#FF6F61',
        // tabBarInactiveTintColor: theme === 'dark' ? '#B0BEC5' : '#757575',
        // tabBarStyle: {
        //   backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
        //   borderTopWidth: 0,
        // },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Maps" component={MapsScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
