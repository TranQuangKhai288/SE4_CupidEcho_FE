import baseURL from "./Customize-axios";

export type CommentUser = {
  _id: string;
  name: string;
  avatar: string;
};

export type Comment = {
  _id: string;
  userId: string;
  postId: string;
  content: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: CommentUser;
};

export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  try {
    const res = await baseURL.get(`/post/comment/${postId}`);
    return res.data.comments;
  } catch (error) {
    console.error("Get comments error:", error);
    return [];
  }
};

export type CreateCommentPayload = {
  postId: string;
  content: string;
  parentId?: string | null;
};

export const createComment = async (
  data: CreateCommentPayload,
  token: string
): Promise<void> => {
  try {
    await baseURL.post(
      `/post/comment/${data.postId}`,
      {
        content: data.content,
        parentId: data.parentId || null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Create comment error:", error);
    throw error;
  }
};
