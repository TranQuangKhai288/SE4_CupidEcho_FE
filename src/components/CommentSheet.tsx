import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { getCommentsByPostId, createComment } from "../apis/CommentAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenHeight = Dimensions.get("window").height;
interface CommentSheetProps {
  postId: string;
  onClose: () => void;
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

const CommentSheet: React.FC<CommentSheetProps> = ({
  onClose,
  postId,
  onUpdateCommentCount,
}) => {
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
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        minHeight: screenHeight * 0.75,
      }}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      <View className="flex-1 ">
        <View className="flex flex-row justify-between items-center ">
          <Text className="text-2xl font-bold ">Comments</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className=" text-right text-purple-600 font-semibold">
              Close
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#9333ea" />
        ) : comments.length === 0 ? (
          <Text className="text-gray-500">There're no comments</Text>
        ) : (
          <ScrollView className="mb-20">
            {comments.map((c) => (
              <View key={c._id} className="mt-4 flex-row gap-3">
                <Image
                  source={{ uri: c.user.avatar }}
                  className="w-12 h-12 rounded-full"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-lg">{c.user.name}</Text>
                  <Text className="text-base text-black mt-1">{c.content}</Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Ô nhập và nút gửi bình luận */}
        <View className="absolute gap-4 bottom-0 left-0 right-0 justify-between py-2 border-t border-gray-200 flex-row items-center">
          <TextInput
            placeholder="Comment something"
            value={commentInput}
            onChangeText={setCommentInput}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm"
            editable={!submitting}
          />
          <TouchableOpacity
            onPress={handleSubmitComment}
            disabled={submitting}
            className="bg-purple-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold text-sm">
              {submitting ? "..." : "Sent"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentSheet;
