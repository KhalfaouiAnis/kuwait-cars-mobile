import { jwtDecode } from "jwt-decode";
import { httpClient } from "../lib/api/httpClient";
import { authStore } from "../lib/stores/auth.store";

type JwtPayload = { userId: string; role: string; exp: number; iat: number };

export const handleTokenValidation = async (): Promise<boolean> => {
  const { accessToken, refreshToken, signOut } = authStore.getState();

  if (!accessToken || !refreshToken) {
    signOut();
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(accessToken);

    if (decoded.exp * 1000 < Date.now()) {
      // Expired: Try refresh
      const refreshResult = await validateAndRefreshToken(refreshToken);
      if (!refreshResult) {
        signOut();
        return false;
      }
    }

    return true;
  } catch (error) {
    console.log({ Auth_Error: error });
    signOut();
    return false;
  }
};

export const validateAndRefreshToken = async (
  refreshToken: string
): Promise<boolean> => {
  try {
    const { data } = await httpClient.post("/auth/refresh-token", {
      refreshToken,
    });

    const { accessToken: newToken } = data;
    authStore.setState({ accessToken: newToken });
    return true;
  } catch {
    return false;
  }
};
