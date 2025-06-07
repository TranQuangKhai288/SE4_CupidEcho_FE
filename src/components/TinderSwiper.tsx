import React, { useState, useCallback, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import DatingCard from "./DatingCard"; // Đảm bảo file DatingCard.tsx cùng thư mục

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.2;
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = height * 0.6;

interface TinderSwiperProps {
  data: any[];
  onSwipeLeft?: (item: any) => void;
  onSwipeRight?: (item: any) => void;
  onSwipeComplete?: () => void;
}

export default function TinderSwiper({
  data,
  onSwipeLeft,
  onSwipeRight,
  onSwipeComplete,
}: TinderSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handleSwipeComplete = useCallback(
    (direction: "left" | "right") => {
      const item = data[currentIndex];
      if (direction === "left" && onSwipeLeft) {
        onSwipeLeft(item);
      }
      if (direction === "right" && onSwipeRight) {
        onSwipeRight(item);
      }
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (nextIndex >= data.length && onSwipeComplete) {
        onSwipeComplete();
      }
    },
    [currentIndex, data, onSwipeLeft, onSwipeRight, onSwipeComplete]
  );

  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    opacity.value = 1;
  }, [currentIndex]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
    })
    .onEnd((event) => {
      const isSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD;
      if (isSwipe) {
        const direction = event.translationX > 0 ? "right" : "left";
        const targetX = direction === "right" ? width * 1.2 : -width * 1.2;
        translateX.value = withTiming(targetX, { duration: 200 });
        translateY.value = withTiming(event.translationY + 100, {
          duration: 200,
        });
        opacity.value = withTiming(0, { duration: 200 });
        scale.value = withTiming(0.8, { duration: 200 }, () => {
          runOnJS(handleSwipeComplete)(direction);
        });
      } else {
        translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
        translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
        scale.value = withSpring(1, { damping: 20, stiffness: 300 });
      }
    });

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-width, 0, width],
      [-30, 0, 30],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  // Hiển thị tối đa 3 cards
  const visibleCards = data.slice(currentIndex, currentIndex + 3);

  return (
    <View style={styles.container}>
      {visibleCards.map((item, index) => {
        const isTopCard = index === 0;
        const backCardStyle = !isTopCard
          ? {
              transform: [
                { scale: 1 - index * 0.05 },
                { translateY: index * 8 },
              ],
              opacity: 1 - index * 0.2,
            }
          : {};

        const CardComponent = (
          <Animated.View
            key={item.id}
            style={[
              styles.card,
              {
                zIndex: visibleCards.length - index,
              },
              backCardStyle,
              isTopCard && cardAnimatedStyle,
            ]}
          >
            <DatingCard
              name={item.name}
              age={item.age}
              zodiac={item.zodiac}
              imageUrl={item.image}
              distance={item.distance}
              // Các props onLike/onDislike/onStar/onRefresh có thể truyền vào nếu muốn hiệu ứng ngoài swipe
            />
          </Animated.View>
        );

        return isTopCard ? (
          <GestureDetector key={item.id} gesture={panGesture}>
            {CardComponent}
          </GestureDetector>
        ) : (
          CardComponent
        );
      })}

      {/* Swipe indicators */}
      <Animated.View
        style={[
          styles.swipeIndicator,
          styles.likeIndicator,
          useAnimatedStyle(() => ({
            opacity: interpolate(
              translateX.value,
              [0, SWIPE_THRESHOLD],
              [0, 1],
              Extrapolation.CLAMP
            ),
          })),
        ]}
      >
        {/* LIKE indicator */}
      </Animated.View>

      <Animated.View
        style={[
          styles.swipeIndicator,
          styles.nopeIndicator,
          useAnimatedStyle(() => ({
            opacity: interpolate(
              translateX.value,
              [-SWIPE_THRESHOLD, 0],
              [1, 0],
              Extrapolation.CLAMP
            ),
          })),
        ]}
      >
        {/* NOPE indicator */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT + 64, // Để vừa DatingCard (card + nút)
    borderRadius: 36,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeIndicator: {
    position: "absolute",
    top: "40%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 3,
  },
  likeIndicator: {
    right: 50,
    borderColor: "#4CAF50",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  nopeIndicator: {
    left: 50,
    borderColor: "#F44336",
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
});
