import axios from "axios";
import { useAuth } from "@/hooks/useTenantAuth";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
