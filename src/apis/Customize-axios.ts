import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: `http://192.168.1.3:5000/api`,
  timeout: 50000,
});

export default instance;

instance.interceptors.request.use(
  async (config: any) => {
    // console.log("Calling API", config.url);
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    console.log("Error in request interceptor", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.data.message === "jwt expired") {
      try {
        //console.log("calling refresh token");
        const result: any = await instance.post(`/user/refresh-token`, {
          withCredentials: true,
        });

        if (result.status === "ERR") {
          console.error("refresh token failed");
          console.log(result, "result refresh token");
        }
        //console.log("Refresh token result", result.access_token);
        const access_token = result.access_token;
        originalRequest.headers["authorization"] = `Bearer ${access_token}`;
        return instance(originalRequest);
      } catch (error) {
        console.log("Refresh token failed", error);
      }
    } else {
      console.log(
        `error in customize-axios when call API ${originalRequest.url}`,
        error
      );
      console.log("Error response data", error.response.data);
      console.log("Error response status", error.response.status);
      return error.response.data;
      // return Promise.reject(error);
    }
  }
);
