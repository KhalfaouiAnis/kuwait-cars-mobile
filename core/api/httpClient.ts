import axios from "axios";
import { toast } from "sonner-native";
import { TokenService } from "../services/token-manager";

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL + "/api/v1",
});

let onUnauthorized: () => void = () => {};

export const injectLogout = (callback: () => void) => {
  onUnauthorized = callback;
};

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = TokenService.getAccessToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const data = error.response?.data;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Token session expired! refreshing...");
      
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        const { data } = await axios.post(
          process.env.EXPO_PUBLIC_API_URL + "/api/v1/auth/refresh",
          {
            token: refreshToken,
          }
        );

        TokenService.setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        TokenService.clearTokens();
        onUnauthorized();
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 400 && data?.errors) {
      toast.error(data.message || "Please check your input");
      data.errors.forEach(
        ({ path, message }: { path: string; message: string }) => {
          toast.error(path, { description: message });
        }
      );
    } else {
      toast.error(data?.message || "An unexpected error occurred");
    }
    return Promise.reject(error);
  }
);
