import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

interface DatingCardProps {
  name: string;
  age: number;
  zodiac: string;
  imageUrl: string;
  distance?: string;
  height?: number;
  width?: number;
  onRefresh?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onStar?: () => void;
}

const DatingCard = ({
  name,
  age,
  zodiac,
  imageUrl,
  distance,
  height = 580, // 👈 cao hơn để chứa nút
  width = 320,
  onRefresh,
  onLike,
  onDislike,
  onStar,
}: DatingCardProps) => {
  const cardHeight = height - 64; // Chiều cao phần card không tính phần nút

  return (
    <View style={{ width, height }} className="relative items-center">
      {/* Card content */}
      <View
        style={{ width, height: cardHeight }}
        className="rounded-[36px] overflow-hidden shadow-lg"
      >
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full object-cover"
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={[
            "rgba(138, 43, 226, 0)",
            "rgba(138, 43, 226, 0.3)",
            "rgba(138, 43, 226, 0.6)",
            "rgba(138, 43, 226, 0.9)",
            "rgba(138, 43, 226, 1)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
          }}
        />

        {/* Info */}
        <View className="absolute bottom-16 left-4 right-4">
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-white text-3xl font-bold mb-1">
                {name}, {age}
              </Text>
              <Text className="text-white text-xl opacity-90 mb-1">
                {zodiac}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View
                className="flex-row items-center px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <Ionicons name="location-outline" size={14} color="white" />
                <Text className="text-white text-sm ml-1">{distance}</Text>
              </View>

              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.smallButton} onPress={onRefresh}>
          <Ionicons name="refresh" size={24} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigButton} onPress={onDislike}>
          <Ionicons name="close" size={36} color="#F87171" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigButton} onPress={onLike}>
          <Ionicons name="heart" size={36} color="#EC4899" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton} onPress={onStar}>
          <FontAwesome name="star" size={24} color="#FBBF24" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: -30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  smallButton: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  bigButton: {
    width: 64,
    height: 64,
    backgroundColor: "white",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});

export default DatingCard;
