import { handleTokenValidation } from "@/core/utils/authUtils";
import axios from "axios";
import { router } from "expo-router";
import { getAuthState } from "../stores/auth.store";

const { accessToken, signOut } = getAuthState();

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL + "/api",
});

export const publicHttpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

httpClient.interceptors.request.use(
  async (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const authenticated = await handleTokenValidation();

        if(authenticated){
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        processQueue(null, accessToken);

        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        signOut();
        router.replace("/signin");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
