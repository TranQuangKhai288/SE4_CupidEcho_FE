import baseURL from "./Customize-axios";
interface Response {
  status: string;
  message?: string;
  data: any;
  access_token?: string;
  refresh_token?: string;
}
export const getDetailsProfile = async (id: string) => {
  const res: Response = await baseURL.get(`/user/profile/${id}`);
  return res;
};

export const updateProfile = async (data: any) => {
  const res: Response = await baseURL.put(`/user/profile/`,data);
  return res;
}