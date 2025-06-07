//Facade: Cung cấp giao diện đơn giản để gửi/nhận tin nhắn và thông báo, ẩn đi sự phức tạp của WebSocket.
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { socketService } from "../sockets/socket";

export interface Message {
  _id: string;
  conversationId: string;
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

export interface MatchSuccess {
  partner: {
    id: string;
    name: string;
    avatar: string;
  };
  conversationId: string;
  timestamp: number;
}
export interface WebRTCSignal {
  type: "offer" | "answer" | "candidate";
  data: any;
  from?: string;
  to?: string;
  roomId?: string;
}
export interface MatchRequest {
  senderId: string;
  timestamp: number;
}
export interface MatchRequestResponse {
  responderId: string;
  response: "accept" | "reject";
  timestamp: number;
}

export interface SocketEvents {
  onNewMessage?: (message: Message) => void;
  onNewNotification?: (notification: Notification) => void;
  onMatchSuccess?: (match: MatchSuccess) => void;
  onExitSign?: (convId: string) => void;
  onReceiveMatchRequest?: (req: MatchRequest) => void;
  onMatchRequestResponse?: (resp: MatchRequestResponse) => void;
}

export const useSocketEvents = ({
  onNewMessage,
  onNewNotification,
  onMatchSuccess,
  onExitSign,
  onReceiveMatchRequest,
  onMatchRequestResponse,
}: SocketEvents) => {
  const { state } = useAuth();
  const socket = socketService.getSocket();
  const isConnected = state.isSocketConnected;

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("newMessage", (message: Message) => {
      console.log("Tin nhắn mới:", message);
      if (onNewMessage) {
        onNewMessage(message);
      }
    });

    socket.on("newNotification", (notification: Notification) => {
      console.log("Thông báo mới:", notification);
      if (onNewNotification) {
        onNewNotification(notification);
      }
    });

    socket.on("errorMessage", (error: { status: string; message: string }) => {
      console.error("Lỗi từ server:", error.message);
    });

    socket.on("matching:matched", (match: MatchSuccess) => {
      console.log("Ghép đôi thành công:", match);
      if (onMatchSuccess) {
        onMatchSuccess(match);
      }
    });

    socket.on("exitSignal", (convId: string) => {
      console.log("Người dùng đã thoát:", convId);
      if (onExitSign) {
        onExitSign(convId);
      }
    });

    socket.on("receiveMatchRequest", (req: MatchRequest) => {
      if (onReceiveMatchRequest) onReceiveMatchRequest(req);
    });

    // Lắng nghe sự kiện nhận phản hồi match
    socket.on("matchRequestResponse", (resp: MatchRequestResponse) => {
      if (onMatchRequestResponse) onMatchRequestResponse(resp);
    });

    return () => {
      socket.off("newMessage");
      socket.off("newNotification");
      socket.off("errorMessage");
      socket.off("matching:matched");
      socket.off("exitSignal");
      socket.off("webrtc:signal");
    };
  }, [
    socket,
    isConnected,
    onNewMessage,
    onNewNotification,
    onMatchSuccess,
    onReceiveMatchRequest,
    onMatchRequestResponse,
  ]);

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

  const sendExitSign = (
    convId: string,
    partnerId: string,
    callback?: (response: any) => void
  ) => {
    if (!socket || !isConnected) {
      console.error("Socket chưa kết nối");
      return;
    }
    socket.emit("exitSign", { convId, partnerId }, callback);
  };

  const sendWebRTCSignal = (signal: WebRTCSignal) => {
    if (!socket || !isConnected) {
      console.error("Socket chưa kết nối");
      return;
    }
    socket.emit("webrtc:signal", signal);
  };

  const sendMatchRequest = (
    targetUserId: string,
    callback?: (response: any) => void
  ) => {
    if (!socket || !isConnected) {
      console.error("Socket chưa kết nối");
      return;
    }
    socket.emit("sendMatchRequest", { targetUserId }, callback);
  };

  // Thêm hàm gửi phản hồi match
  const respondMatchRequest = (
    senderId: string,
    response: "accept" | "reject",
    callback?: (response: any) => void
  ) => {
    if (!socket || !isConnected) {
      console.error("Socket chưa kết nối");
      return;
    }
    socket.emit("respondMatchRequest", { senderId, response }, callback);
  };

  return {
    sendMessage,
    sendNotification,
    sendExitSign,
    sendWebRTCSignal,
    sendMatchRequest,
    respondMatchRequest,
    isConnected,
  };
};
