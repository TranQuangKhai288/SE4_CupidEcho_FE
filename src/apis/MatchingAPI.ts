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
