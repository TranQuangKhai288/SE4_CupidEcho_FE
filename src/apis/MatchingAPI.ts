import baseURL from "./Customize-axios";
interface Response {
  status: string;
  message?: string;
  data: any;
  access_token?: string;
  refresh_token?: string;
}
export const startMatching = async () => {
  try {
    const res: Response = await baseURL.post("/matching/start");
    return res;
  } catch (error) {
    console.error("API start matching error", error);
    throw error;
  }
};

export const stopMatching = async () => {
  try {
    const res: Response = await baseURL.post("/matching/stop");
    return res;
  } catch (error) {
    console.error("API stop matching error", error);
    throw error;
  }
};

export const sentRelationshipRequest = async ({
  receiverId,
  type = "crush",
}: {
  receiverId: string;
  type?: string;
}) => {
  try {
    const res: Response = await baseURL.post("/relationship", {
      receiverId,
      type,
    });
    return res;
  } catch (error) {
    console.error("API stop matching error", error);
    throw error;
  }
};

export const getRelationshipRequest = async ({
  page = 1,
  limit = 10,
  type = "crush",
  direction = "sent",
}: {
  page?: number;
  limit?: number;
  type?: string;
  direction?: string;
}) => {
  try {
    const res: any = await baseURL.get(
      `/relationship?page=${page}&limit=${limit}&type=${type}&direction=${direction}`
    );
    return res;
  } catch (error) {
    console.error("API stop matching error", error);
    throw error;
  }
};
