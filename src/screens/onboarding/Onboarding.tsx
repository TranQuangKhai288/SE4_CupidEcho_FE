import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

interface NextButtonProps {
  onPress: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className='bg-primary-main px-40 py-4 rounded-full mt-40'
  >
    <Text className='text-white text-lg font-semibold'>Next</Text>
  </TouchableOpacity>
);

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const onboardingRef = useRef<any>(null);

  const handleNext = (index: number) => {
    if (index < 2) {
      onboardingRef.current?.goNext();
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <Onboarding
      ref={onboardingRef}
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      showNext={false}
      showSkip={true}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../../assets/onboarding1.png")}
              style={{ width: 200, height: 200 }}
            />
          ),
          title: (
            <Text className='font-bold text-black text-2xl text-center'>
              Find Your Soul Mate
            </Text>
          ),
          subtitle: (
            <View className='items-center'>
              <Text className='text-center text-gray-600 mt-4'>
                It’s easy to find a soul mate nearby & around you
              </Text>
              <NextButton onPress={() => handleNext(0)} />
            </View>
          ),
        },
        {
          backgroundColor: "#fdeb93",
          image: (
            <Image
              source={require("../../../assets/onboarding2.png")}
              style={{ width: 200, height: 200 }}
            />
          ),
          title: (
            <Text className='font-bold text-black text-2xl text-center'>
              Connect & Communicate
            </Text>
          ),
          subtitle: (
            <View className='items-center'>
              <Text className='text-center text-gray-600 mt-4'>
                You can share, chat, and video call with your match
              </Text>
              <NextButton onPress={() => handleNext(1)} />
            </View>
          ),
        },
        {
          backgroundColor: "#e9bcbe",
          image: (
            <Image
              source={require("../../../assets/onboarding3.png")}
              style={{ width: 200, height: 200 }}
            />
          ),
          title: (
            <Text className='font-bold text-black text-2xl text-center'>
              Start Your Love Journey
            </Text>
          ),
          subtitle: (
            <View className='items-center'>
              <Text className='text-center text-gray-600 mt-4'>
                Don't wait anymore, find your soul mate right now!
              </Text>
              <NextButton onPress={() => handleNext(2)} />
            </View>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;
