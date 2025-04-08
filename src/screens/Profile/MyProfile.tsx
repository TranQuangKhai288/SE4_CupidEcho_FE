import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";

type ProfileProps = {
  name: string;
  age: number;
  occupation: string;
  company?: string;
  bio: string;
  location: string;
  profileImage: string;
  interests: string[];
};

const MyProfileScreen: React.FC<ProfileProps> = ({
  name,
  age,
  occupation,
  company,
  bio,
  location,
  profileImage,
  interests,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <ScrollView>
        {/* Profile Image */}
        <View className="items-center mb-4">
          <Image
            source={{ uri: profileImage }}
            className="w-full h-96 rounded-lg"
            resizeMode="cover"
          />

          {/* Dots Indicator */}
          <View className="flex-row mt-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 mx-1 rounded-full ${
                  index === 0 ? "bg-purple-500" : "bg-gray-300"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Profile Info */}
        <View className="px-4 pb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-2xl font-bold">{`${name}, ${age}`}</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-600">{occupation}</Text>
                {company && (
                  <Text className="text-purple-500 ml-2 text-sm">
                    {company}
                  </Text>
                )}
              </View>
            </View>
            {/* <TouchableOpacity className="p-2">
              <PenSquare size={20} color="#9333ea" />
            </TouchableOpacity> */}
          </View>

          {/* About Section */}
          <View className="mb-4">
            <Text className="font-semibold text-lg mb-1">About</Text>
            <Text className="text-gray-700 leading-5">{bio}</Text>
            <Text className="text-gray-700 mt-1">
              You can find me in {location}
            </Text>
          </View>

          {/* Interests Section */}
          <View>
            <Text className="font-semibold text-lg mb-2">Interest</Text>
            <View className="flex-row flex-wrap">
              {interests.map((interest, index) => (
                <View
                  key={index}
                  className="bg-purple-100 rounded-full px-4 py-1 mr-2 mb-2"
                >
                  <Text className="text-purple-600">
                    {interest.includes("Food")
                      ? "🍴"
                      : interest === "Fashion"
                      ? "👕"
                      : interest === "Movie"
                      ? "🎬"
                      : interest === "Travel"
                      ? "✈️"
                      : interest === "Fitness"
                      ? "💪"
                      : ""}{" "}
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Example usage
export default function App() {
  return (
    <MyProfileScreen
      name="Andrew Ainsley"
      age={25}
      occupation="Designer"
      company="Copman"
      bio="I am single 25 years old. I love fitness, food, travel, design & art."
      location="Jakarta"
      profileImage="https://randomuser.me/api/portraits/men/1.jpg"
      interests={["Fashion", "Movie", "Travel", "Fitness", "Food & Drink"]}
    />
  );
}
