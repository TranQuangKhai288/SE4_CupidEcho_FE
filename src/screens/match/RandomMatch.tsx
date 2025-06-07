import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import { useEffect, useRef } from "react";
import { startMatching, stopMatching } from "../../apis/MatchingAPI";
import { useSocketEvents } from "../../hooks/useSocketEvents";

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

  const setupInfiniteAvatars = () => {
    // Thêm một số phần tử từ đầu vào cuối và ngược lại để tạo hiệu ứng liền mạch
    const prefix = originalAvatars.slice(-3); // Lấy 3 phần tử cuối cùng
    const suffix = originalAvatars.slice(0, 3); // Lấy 3 phần tử đầu tiên

    // Mảng mới: [...3 cuối, ...original, ...3 đầu]
    return [...prefix, ...originalAvatars, ...suffix].map((item, index) => ({
      ...item,
      key: `${item.id}-${index}`, // Tạo key unique
    }));
  };
  const infiniteAvatars = setupInfiniteAvatars();
  // Nhân bản mảng nhiều lần để tạo cảm giác vô hạn
  const avatars = Array(10).fill(originalAvatars).flat();

  const scrollX = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const totalWidth = avatars.length * TOTAL_ITEM_WIDTH;

  useEffect(() => {
    // Tính toán vị trí reset
    const resetPosition = originalAvatars.length * TOTAL_ITEM_WIDTH;

    // Tạo animation chạy từ vị trí 0 đến cuối danh sách gốc
    const animation = Animated.timing(scrollX, {
      toValue: resetPosition,
      duration: originalAvatars.length * 500, // 1.5 giây cho mỗi vòng lặp đầy đủ
      easing: Easing.linear,
      useNativeDriver: true,
    });

    // Listener để tạo hiệu ứng vòng tròn vô hạn
    const listener = scrollX.addListener(({ value }) => {
      if (value >= resetPosition - 1) {
        // Reset về đầu nhưng không gây hiệu ứng giật
        scrollX.setValue(0);

        // Restart animation ngay lập tức
        if (animationRef.current) {
          animationRef.current.stop();
          animation.start();
        }
      }
    });

    // Lưu và khởi động animation
    animationRef.current = animation;
    animation.start();

    return () => {
      scrollX.removeListener(listener);
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);
  useSocketEvents({
    onMatchSuccess(match) {
      // Xử lý sự kiện ghép đôi thành công ở đây
      // Hiển thị thông báo đã ghép được đối tượng
      // Điều hướng đến trang Blind Chat
      console.log("navigate to Blind Chat");
      navigation.navigate("BlindChat", {
        partner: match.partner,
        conversationId: match.conversationId,
      });
    },
  });

  // Chạy API vào queue
  const runQueue = async () => {
    const res = await startMatching();
    if (res.status === "OK") {
      console.log("Queue started successfully:", res);
    } else {
      console.error("Error starting queue:", res.message);
    }
  };

  const stopQueue = async () => {
    const res = await stopMatching();
    if (res.status === "OK") {
      console.log("Queue stopped successfully:", res);
    } else {
      console.error("Error stopping queue:", res.message);
    }
  };

  useEffect(() => {
    runQueue(); // chạy khi component mounted

    return () => {
      stopQueue(); // cleanup khi component unmounted
    };
  }, []);

  return (
    <View className="flex-1 bg-[#14002B] pt-10 px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          className=""
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          Random Matching
        </Text>
        <View />
      </View>

      {/* Intro */}
      <Text className="text-white text-base font-semibold text-center mb-1">
        Welcome to Random Matching
      </Text>
      <Text className="text-center text-white/80 text-sm mb-6">
        With the ultimate match, you can view the other person's profile and{" "}
        <Text className="font-semibold text-white">
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
                key={`${avatar.id}-${index}`}
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
      <Text className="text-center text-pink-400 font-semibold text-xl mt-6 mb-2">
        🔄 Connecting...
      </Text>
      <Text className="text-center text-white text-sm mb-2">
        You are currently in queue at position{" "}
        <Text className="font-bold">5</Text>. Please wait about some minutes
      </Text>
      <Text className="text-center text-pink-400 text-sm mt-1">
        You have <Text className="font-bold">9 match attempts</Text> left today.
      </Text>
    </View>
  );
};

export default RandomMatch;
