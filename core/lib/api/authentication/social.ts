import useAuthStore from "@/core/lib/stores/auth.store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { httpClient } from "../httpClient";

GoogleSignin.configure({
  //   scopes: [
  //     "email",
  //     "profile",
  //     "https://www.googleapis.com/auth/user.phonenumbers.read",
  //     "https://www.googleapis.com/auth/user.addresses.read",
  //   ],
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

    useAuthStore.setState({
      accessToken,
      refreshToken,
      user,
      isAuthenticated: true,
      authType: "GOOGLE",
    });

    return user.phone;
  } catch (error: unknown) {
    throw error;
  }
};
