// sockets/socket.ts
import { io, Socket } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigation";

// const SOCKET_URL = `${process.env.EXPO_PUBLIC_API_URL}`;
const SOCKET_URL = `http://192.168.1.3:5000`;

// sockets/socket.ts
class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;

  connect(token: string): Socket {
    if (this.socket && this.socket.connected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnection: false,
    });

    this.socket.on("connect", () => {
      console.log("Đã kết nối tới WebSocket server:", this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on("disconnect", () => {
      console.log("Ngắt kết nối khỏi WebSocket server");
      // this.handleReconnect(token);
    });

    this.socket.on("connect_error", (error: any) => {
      console.log("Lỗi kết nối WebSocket:", error.message, "Code:", error.code);
      if (error.code === "TOKEN_EXPIRED") {
        // Token hết hạn, cần làm mới token và kết nối lại
        console.log("Token hết hạn, cần làm mới token...");
        // Gọi hàm làm mới token (sẽ cập nhật trong AuthProvider)
      } else if (error.code === "INVALID_TOKEN") {
        console.log("Token không hợp lệ, đăng xuất người dùng...");
        // Gọi logout (sẽ cập nhật trong AuthProvider)
      }
      this.handleReconnect(token);
    });

    return this.socket;
  }

  private async handleReconnect(token: string) {
    const { logout } = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Thử kết nối lại lần ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
      );
      setTimeout(() => {
        this.connect(token);
      }, this.reconnectInterval);
    } else {
      // đăng xuất người dùng, xoá token
      await logout();
      navigation.navigate("Login");
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.reconnectAttempts = 0;
    }
  }
}

export const socketService = new SocketService();
