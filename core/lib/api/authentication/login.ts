import { User, UserRole } from "@/core/types";
import { httpClient } from "../httpClient";

export const attemptLogin = async (phone: string, password: string) => {
  return httpClient.post<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>("/auth/login", {
    phone,
    password,
  });
};

export const createAccount = async (data: any) => {
  return httpClient.post("/auth/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const requestOTP = async (phone: string) => {
  return httpClient.post("/auth/request-otp", { phone });
};

export const verifyOTP = async (phone: string, otp: string) => {
  return httpClient.post<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>("/auth/verify-otp", {
    phone,
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
