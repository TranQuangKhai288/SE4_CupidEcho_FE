//Facade: Cung cấp giao diện đơn giản để gửi/nhận tin nhắn và thông báo, ẩn đi sự phức tạp của WebSocket.
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { socketService } from "../sockets/socket";

export interface Message {
  _id: string;
  convId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  status?: string;
}

export interface Notification {
  senderId: string;
  type: string;
  content: string;
  timestamp: number;
}

export interface SocketEvents {
  onNewMessage: (message: Message) => void;
  onNewNotification: (notification: Notification) => void;
}

export const useSocketEvents = ({
  onNewMessage,
  onNewNotification,
}: SocketEvents) => {
  const { state } = useAuth();
  const socket = socketService.getSocket();
  const isConnected = state.isSocketConnected;

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("newMessage", (message: Message) => {
      console.log("Tin nhắn mới:", message);
      onNewMessage(message);
    });

    socket.on("newNotification", (notification: Notification) => {
      console.log("Thông báo mới:", notification);
      onNewNotification(notification);
    });

    socket.on("errorMessage", (error: { status: string; message: string }) => {
      console.error("Lỗi từ server:", error.message);
    });

    return () => {
      socket.off("newMessage");
      socket.off("newNotification");
      socket.off("errorMessage");
    };
  }, [socket, isConnected, onNewMessage, onNewNotification]);

  const sendMessage = (
    convId: string,
    content: string,
    callback?: (response: any) => void
  ) => {
    if (!socket || !isConnected) {
      console.error("Socket chưa kết nối");
      return;
    }
    socket.emit("createMessage", { convId, content }, callback);
  };

  const sendNotification = (
    recipientId: string,
    type: string,
    content: string,
    callback?: (response: any) => void
  ) => {
    if (!socket || !isConnected) {
      console.error("Socket chưa kết nối");
      return;
    }
    socket.emit("sendNotification", { recipientId, type, content }, callback);
  };

  return { sendMessage, sendNotification, isConnected };
};
