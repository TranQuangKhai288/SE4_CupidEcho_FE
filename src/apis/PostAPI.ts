import baseURL from "./Customize-axios";

export type MediaItem = {
  type: "image" | "video";
  URL: string;
};

export type Post = {
  _id: string;
  userId: string;
  content: string;
  likes: string[]; // Mảng userId đã like
  createdAt: string;
  updatedAt: string;
  media?: MediaItem[]; // Nếu có
  likeCount?: number;
  commentCount?: number;
};

export type CreatePostPayload = {
  content: string;
  media: MediaItem[];
};

export type CreatePostResponse = {
  message: string;
  postId: string;
  createdAt: string;
};

export const createPost = async (
  payload: CreatePostPayload
): Promise<CreatePostResponse> => {
  try {
    const res: CreatePostResponse = await baseURL.post("/post/", payload);
    return res;
  } catch (error) {
    console.error("Post error:", error);
    throw error;
  }
};

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const res = await baseURL.get("/post");
    // 👇 đúng đường dẫn để lấy mảng posts
    return res.data.posts;
  } catch (error) {
    console.error("Get posts error:", error);
    return [];
  }
};

export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const res = await baseURL.get(`/post/${postId}`);
    return res.data.media;
  } catch (error) {
    console.error(`Get post ${postId} error:`, error);
    return null;
  }
};

export const getPostByUserId = async (userId: string): Promise<Post[]> => {
  try {
    const res = await baseURL.get(`/post/users/${userId}`);
    return res.data.posts;
  } catch (error) {
    console.error(`Get post ${userId} error:`, error);
    return [];
  }
};

export const likePost = async (
  postId: string,
  token: string
): Promise<void> => {
  try {
    await baseURL.post(`/post/like/${postId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Like post ${postId} error:`, error);
    throw error;
  }
};
