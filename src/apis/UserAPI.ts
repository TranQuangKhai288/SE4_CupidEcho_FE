import baseURL from "./Customize-axios";
interface Response {
  status: string;
  message?: string;
  data: any;
  access_token?: string;
  refresh_token?: string;
}
export const loginUser = async (data: any) => {
  try {
    console.log("data login", data);
    const res: Response = await baseURL.post("/user/login", data);
    return res;
  } catch (error) {
    console.error("API login error", error);
    throw error;
  }
};
export const registerUser = async (data: any) => {
  try {
    const res: Response = await baseURL.post(`/user/register`, data);
    return res;
  } catch (error) {
    console.error("API register error", error);
    throw error;
  }
};

export const getCallToken = async (userId: string) => {
  try {
    const res: any = await baseURL.post(`/stream-token?userId=${userId}`);
    return res;
  } catch (error) {
    console.error("API stream-token error", error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res: Response = await baseURL.post(`/user/forgot-password`, {
      email: email,
    });
    return res;
  } catch (error) {
    console.error("API forgot password error", error);
    throw error;
  }
};

export const verifyOTP = async (email: string, OTP: string) => {
  try {
    const res: Response = await baseURL.post(`/user/verify-otp`, {
      email: email,
      otp: OTP,
    });
    return res;
  } catch (error) {
    console.error("API forgot password error", error);
    throw error;
  }
};

export const resetPass = async (email: string, newPassword: string) => {
  try {
    const res: Response = await baseURL.post(`/user/reset-password`, {
      email: email,
      newPassword: newPassword,
    });
    return res;
  } catch (error) {
    console.error("API forgot password error", error);
    throw error;
  }
};

export const getDetailsUser = async (id: string) => {
  const res: Response = await baseURL.get(`/user/${id}`);
  return res;
};

export const getUserRecommends = async (page: number, limit: number) => {
  const res: Response = await baseURL.get(
    `/user/recommend?page=${page}&limit=${limit}`
  );
  return res;
};

export const updateUser = async (data: any) => {
  const res: any = await baseURL.put(`/user/`, data);
  return res;
};

export const refreshToken = async (refreshToken: string) => {
  const res: Response = await baseURL.post(`/user/refresh-token`, {
    refreshToken: refreshToken,
  });
  return res;
};

export const getConditionByUserId = async (userId: string) => {
  const res: Response = await baseURL.get(`/user/condition/${userId}`);
  return res.data;
};

export const updateConditionByUser = async (data: any) => {
  const res: Response = await baseURL.put(`/user/condition/`, data);
  return res;
};
