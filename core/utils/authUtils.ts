import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { httpClient } from "../lib/api/httpClient";
import { getAuthState, setAuthState } from "../lib/stores/auth.store";

type JwtPayload = { userId: string; role: string; exp: number; iat: number };

export const handleTokenValidation = async (): Promise<boolean> => {
  const { accessToken, refreshToken, signOut } = getAuthState();

  if (!accessToken || !refreshToken) {
    router.replace("/signin");
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);

    if (decoded.exp * 1000 < Date.now()) {
      // Expired: Try refresh
      const { data } = await httpClient.post("/auth/refresh-token", {
        refreshToken,
      });

      if (!data) {
        signOut();
        // router.replace("/signin");
        return false;
      }

      const { accessToken: newToken } = data;
      setAuthState({ accessToken: newToken });
    }

    // Valid → authenticated
    return true;
  } catch (error) {
    console.log({ "Auth_Error": error });

    signOut();
    // router.replace("/signin");
    return false;
  }
};
