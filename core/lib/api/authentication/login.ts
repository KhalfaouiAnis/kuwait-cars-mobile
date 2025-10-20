import { User, UserRole } from "@/core/types";
import { httpClient } from "../httpClient";

export const attemptLogin = async (email: string, password: string) => {
  return httpClient.post<{ token: string; user: User }>("/auth/login", {
    email,
    password,
  });
};

export const createAccount = async (data: any) => {
  return httpClient.post("/auth/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const requestOTP = async (email: string) => {
  return httpClient.post("/auth/request_otp", { email });
};

export const verifyOTP = async (email: string, otp: string) => {
  return httpClient.post<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>("/auth/verify_otp", {
    email,
    otp,
  });
};

export const getAnonymousAccessToken = async () => {
  try {
    const { data } = await httpClient.post<{
      role: UserRole.ANONYMOUS;
      token: string;
    }>("/auth/anonymous");
    return data.token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
