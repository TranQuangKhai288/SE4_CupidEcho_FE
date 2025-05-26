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

export const getDetailsUser = async (id: string) => {
  const res: Response = await baseURL.get(`/user/${id}`);
  return res;
};

export const getUserRecommends = async () => {
  const res: Response = await baseURL.get(`/user/recommend`);
  return res;
};

export const updateUser = async(data: any)=>{
  const res:Response = await baseURL.put(`/user/`,data)
  return res;
}

export const refreshToken = async (refreshToken: string) => {
  const res: Response = await baseURL.post(`/user/refresh-token`, {
    refreshToken: refreshToken,
  });
  return res;
};
