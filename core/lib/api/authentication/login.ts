import { User, UserRole } from "@/core/types";
import { SignupInterface } from "@/core/types/schema/auth";
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

export const createAccount = async (data: SignupInterface) => {
  return httpClient.post<{ user: User }>("/auth/register", data);
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

export const getGuestAccessToken = async () => {
  try {
    const { data } = await httpClient.post<{
      role: UserRole.GUEST;
      token: string;
    }>("/auth/guest");
    return data.token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
