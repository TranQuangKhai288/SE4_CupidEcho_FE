import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigation";
import {
  StreamVideoClient,
  StreamCall,
  StreamVideo,
  CallContent,
} from "@stream-io/video-react-native-sdk";
import { useAuth } from "../../contexts/AuthContext";

type ChatDetailRouteProp = RouteProp<RootStackParamList, "VideoCall">;

export default function VideoCallScreen() {
  const { state } = useAuth();
  const { user } = state;
  const route = useRoute<ChatDetailRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { roomId } = route.params;

  const [loading, setLoading] = useState(true);
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(
    null
  );
  const [call, setCall] = useState<any>(null);

  useEffect(() => {
    const initializeVideoCall = async () => {
      try {
        // Lấy token từ BE
        const response = await fetch(
          `http://192.168.1.12:5000/stream-token?userId=${user?._id}`
        );
        const data = await response.json();
        console.log("Token data:", data);

        // Khởi tạo StreamVideoClient
        const client = new StreamVideoClient({
          apiKey: "sxjtjbmr8c32", // Nên lưu trong .env
          user: {
            id: user?._id || "",
            name: user?.name || user?._id || "Anonymous", // Thêm name cho user
          },
          token: data.token,
        });

        setStreamClient(client);

        // Tạo hoặc join call
        const videoCall = client.call("default", roomId);
        await videoCall.join({ create: true });
        setCall(videoCall);
      } catch (err) {
        console.error("Video call initialization error:", err);
        Alert.alert("Lỗi", "Không thể khởi tạo cuộc gọi video");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      initializeVideoCall();
    }

    // Cleanup khi component unmount
    return () => {
      if (call) {
        call.leave();
      }
    };
  }, [user?._id, roomId]);

  const handleEndCall = async () => {
    try {
      if (call) {
        await call.leave();
      }
      navigation.goBack();
    } catch (err) {
      console.error("Error ending call:", err);
      navigation.goBack();
    }
  };

  if (loading || !streamClient || !call) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <StreamVideo client={streamClient}>
      <StreamCall call={call}>
        <View className="flex-1">
          <CallContent />

          {/* Header với nút back và end call */}
          <View
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              zIndex: 10,
            }}
          >
            {/* Nút quay lại */}
            <TouchableOpacity
              onPress={handleEndCall}
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: 25,
                padding: 10,
              }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Nút kết thúc cuộc gọi */}
            <TouchableOpacity
              onPress={handleEndCall}
              style={{
                backgroundColor: "rgba(255,0,0,0.8)",
                borderRadius: 25,
                padding: 10,
              }}
            >
              <MaterialIcons name="call-end" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </StreamCall>
    </StreamVideo>
  );
}
