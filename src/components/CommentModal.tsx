import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { getCommentsByPostId } from "../apis/CommentAPI";
import { createComment } from "../apis/CommentAPI"; // 👈 Nhớ import API tạo bình luận
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/AppNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
  onUpdateCommentCount: (postId: string, newCount: number) => void;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
}

const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  postId,
  onUpdateCommentCount,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const insets = useSafeAreaInsets();
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await getCommentsByPostId(postId);
      setComments(res);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchComments();
    }
  }, [visible, postId]);

  const handleSubmitComment = async () => {
    if (!commentInput.trim()) return;
    setSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      await createComment({ postId, content: commentInput }, token);
      setCommentInput("");
      fetchComments();
      onUpdateCommentCount(postId, comments.length + 1);
    } catch (err) {
      console.error("Failed to submit comment", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-white p-4" style = {{paddingTop:insets.top}}>
        <TouchableOpacity onPress={onClose}>
          <Text className="mt-3 text-right text-purple-600 font-semibold">Đóng</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold mt-4 mb-2">Bình luận</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#9333ea" />
        ) : comments.length === 0 ? (
          <Text className="text-gray-500">Chưa có bình luận nào.</Text>
        ) : (
          <ScrollView className="mb-20">
            {comments.map((c) => (
              <View key={c._id} className="mt-4 flex-row gap-3">
                <Image
                  source={{ uri: c.user.avatar }}
                  className="w-8 h-8 rounded-full"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-sm">{c.user.name}</Text>
                  <Text className="text-sm text-black mt-1">{c.content}</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Ô nhập và nút gửi bình luận */}
        <View className="absolute bottom-0 left-0 right-0 bg-white p-3 border-t border-gray-200 flex-row items-center">
          <TextInput
            placeholder="Nhập bình luận..."
            value={commentInput}
            onChangeText={setCommentInput}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 mr-2 text-sm"
            editable={!submitting}
          />
          <TouchableOpacity
            onPress={handleSubmitComment}
            disabled={submitting}
            className="bg-purple-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold text-sm">
              {submitting ? "..." : "Gửi"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
