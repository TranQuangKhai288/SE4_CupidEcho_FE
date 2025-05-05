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
