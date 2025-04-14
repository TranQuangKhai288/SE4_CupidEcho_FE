import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useEffect, useRef, useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 60;
const ITEM_SPACING = 20;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const CENTER_OFFSET = SCREEN_WIDTH / 2 - ITEM_WIDTH / 2;

const RandomMatch = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const originalAvatars = [
    { id: "1", uri: "https://i.pravatar.cc/150?img=1" },
    { id: "2", uri: "https://i.pravatar.cc/150?img=2" },
    { id: "3", uri: "https://i.pravatar.cc/150?img=3" },
    { id: "4", uri: "https://i.pravatar.cc/150?img=4" },
    { id: "5", uri: "https://i.pravatar.cc/150?img=5" },
    { id: "6", uri: "https://i.pravatar.cc/150?img=6" },
    { id: "7", uri: "https://i.pravatar.cc/150?img=7" },
    { id: "8", uri: "https://i.pravatar.cc/150?img=8" },
    { id: "9", uri: "https://i.pravatar.cc/150?img=9" },
    { id: "10", uri: "https://i.pravatar.cc/150?img=10" },
  ];

  // Giảm số lần lặp để tối ưu hiệu suất
  const avatars = [...originalAvatars, ...originalAvatars];

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollPos = useRef(0);
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null);

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      scrollPos.current = value;
    });

    const randomIndex = Math.floor(Math.random() * originalAvatars.length);

    const finalOffset = TOTAL_ITEM_WIDTH * randomIndex;

    const animation = Animated.timing(scrollX, {
      toValue: finalOffset,
      duration: 10000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    });

    animation.start(() => {
      const selected = originalAvatars[randomIndex];
      setSelectedAvatar(selected);
      // Điều hướng sang ChatDetailScreen
      navigation.navigate("ChatDetail", {
        _id: selected.id,
        name: `User ${selected.id}`, // Tạo name mặc định, có thể thay bằng dữ liệu thực
        avatar: selected.uri,
      });
    });
    return () => {
      scrollX.removeListener(listener);
      animation.stop();
    };
  }, []);

  return (
    <View className='flex-1 bg-[#14002B] pt-10 px-4'>
      {/* Header */}
      <View className='flex-row justify-between items-center mb-6'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name='arrow-back' size={20} color='white' />
        </TouchableOpacity>
        <Text className='text-white text-lg font-semibold'>
          Random Matching
        </Text>
        <View />
      </View>

      {/* Intro */}
      <Text className='text-white text-base font-semibold text-center mb-1'>
        Welcome to Random Matching
      </Text>
      <Text className='text-center text-white/80 text-sm mb-6'>
        With the ultimate match, you can view the other person's profile and{" "}
        <Text className='font-semibold text-white'>
          chat without any time limit.
        </Text>
      </Text>

      {/* Avatar carousel */}
      <View style={{ height: 120, overflow: "hidden", paddingTop: 20 }}>
        <Animated.View
          style={{
            flexDirection: "row",
            paddingHorizontal: CENTER_OFFSET,
            transform: [{ translateX: Animated.multiply(scrollX, -1) }],
          }}
        >
          {avatars.map((avatar, index) => {
            const inputRange = [
              (index - 1) * TOTAL_ITEM_WIDTH,
              index * TOTAL_ITEM_WIDTH,
              (index + 1) * TOTAL_ITEM_WIDTH,
            ];

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.6, 1],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={{
                  width: TOTAL_ITEM_WIDTH,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [{ scale }],
                }}
              >
                <Image
                  source={{ uri: avatar.uri }}
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_WIDTH,
                    borderRadius: ITEM_WIDTH / 2,
                    borderWidth: 2,
                    borderColor: "#f472b6",
                  }}
                />
              </Animated.View>
            );
          })}
        </Animated.View>
      </View>

      {/* Status message */}
      <Text className='text-center text-pink-400 font-semibold text-xl mt-6 mb-2'>
        {selectedAvatar ? "🎉 Matched!" : "🔄 Connecting..."}
      </Text>
      <Text className='text-center text-white text-sm mb-2'>
        {selectedAvatar ? (
          `You've matched with avatar ID: ${selectedAvatar.id}`
        ) : (
          <>
            You are currently in queue at position{" "}
            <Text className='font-bold'>5</Text>. Please wait about some minutes
          </>
        )}
      </Text>
      <Text className='text-center text-pink-400 text-sm mt-1'>
        You have <Text className='font-bold'>9 match attempts</Text> left today.
      </Text>
    </View>
  );
};

export default RandomMatch;
