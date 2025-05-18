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
  try{
    const res: Response = await baseURL.put(`/user/profile/`,data);
  return res;
  }catch(error){
    console.error("Update Profile Error",error);
    throw error;
  }
}