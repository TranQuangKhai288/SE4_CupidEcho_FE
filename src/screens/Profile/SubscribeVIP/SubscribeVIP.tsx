import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ArrowLeft, Crown, Check } from "lucide-react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/AppNavigation";
import { useNavigation } from "@react-navigation/native";

interface PlanFeatureProps {
  text: string;
}

const PlanFeature: React.FC<PlanFeatureProps> = ({ text }) => (
  <View className="flex-row items-center mt-2">
    <Check size={18} color="#9333ea" />
    <Text className="text-sm ml-2 text-gray-800">{text}</Text>
  </View>
);

interface PlanCardProps {
  price: string;
  period: string;
  features: string[];
  extraInfo?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  price,
  period,
  features,
  extraInfo,
}) => (
  <View className="bg-white rounded-xl p-4 mt-4 border border-purple-200">
    <View className="flex-row justify-between items-center mb-4">
      <View className="flex-row items-center">
        <Crown size={24} color="#9333ea" />
      </View>
      <View className="flex-row items-baseline">
        <Text className="text-xl font-bold text-black">{price}</Text>
        <Text className="text-sm text-gray-600">/{period}</Text>
        {extraInfo && (
          <Text className="text-sm text-gray-600 ml-1">({extraInfo})</Text>
        )}
      </View>
    </View>

    {features.map((feature, index) => (
      <PlanFeature key={index} text={feature} />
    ))}
  </View>
);

const SubscribeVIP: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="p-4">
        <TouchableOpacity
          className="w-8 h-8 justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="px-4 pb-6">
        <Text className="text-2xl font-bold text-purple-600 text-center">
          Hume VIP
        </Text>
        <Text
          className="text-center text-gray-600 mt-1 mb-4"
          style={{ margin: 5 }}
        >
          Enjoy unlimited swiping & likes, without restrictions, & without ads.
        </Text>

        {/* Monthly Plan */}
        <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
          <PlanCard
            price="$9.99"
            period="month"
            features={[
              "Unlimited Swiping & Likes",
              "5 Super Likes a Day",
              "Unlimited Rewinds",
              "Remove Restrictions & Ads",
            ]}
          />
        </TouchableOpacity>

        {/* Six-Month Plan */}
        <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
          <PlanCard
            price="$49.99"
            period="6 months"
            features={[
              "Unlimited Swiping & Likes",
              "5 Super Likes a Day",
              "Unlimited Rewinds",
              "Remove Restrictions & Ads",
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SubscribeVIP;
