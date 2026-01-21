import { httpClient } from "@/core/api/httpClient";
import {
  ACC_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/core/constants";
import { authStore } from "@/core/store/auth.store";
import { storage } from "@/core/store/storage";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken } from "react-native-fbsdk-next";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

export const handleGoogleLoginRequest = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { data } = await GoogleSignin.signIn();

    if (!data?.idToken) return;

    const res = await httpClient.post("/auth/google", {
      idToken: data?.idToken,
    });

    const { accessToken, refreshToken, user } = res.data;

    storage.set(ACC_TOKEN_STORAGE_KEY, accessToken);
    storage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    authStore.setState({
      user,
      authType: "GOOGLE",
    });

    return user.phone;
  } catch (error: unknown) {
    throw error;
  }
};

export const handleFacebookLoginRequest = async () => {
  const data = await AccessToken.getCurrentAccessToken();
  if (!data?.accessToken) throw new Error("No access token");

  const res = await httpClient.post("/auth/facebook", {
    accessToken: data?.accessToken,
  });

  return res.data;
};

export const handleAppleLoginRequest = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const { identityToken } = appleAuthRequestResponse;

  if (!identityToken) throw new Error("No identity token");

  const res = await httpClient.post("/auth/apple", { idToken: identityToken });

  return res.data;
};
