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

export const createRelationship = async ({
  receiverId,
  type = "crush",
  status = "pending",
}: {
  receiverId: string;
  type?: string;
  status?: string;
}) => {
  try {
    const res: Response = await baseURL.post("/relationship", {
      receiverId,
      type,
      status,
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
  status = "",
}: {
  page?: number;
  limit?: number;
  type?: string;
  direction?: string;
  status?: string;
}) => {
  try {
    const res: any = await baseURL.get(
      `/relationship?page=${page}&limit=${limit}&type=${type}&direction=${direction}&status=${status}`
    );
    return res;
  } catch (error) {
    console.error("API stop matching error", error);
    throw error;
  }
};
