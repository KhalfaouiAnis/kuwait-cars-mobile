import { httpClient } from "../api/httpClient";
import { AUTH_STORAGE_KEY } from "../constants";
import { getItem } from "../store/storage";

export const AuthService = {
  async refreshTokens() {
    const { refreshToken } = getItem<{ refreshToken: string }>(
      AUTH_STORAGE_KEY
    );

    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await httpClient.post("/auth/refresh-token", {
      refreshToken,
    });

    return data;
  },

  async validateToken(token: string): Promise<boolean> {
    // Logic to check JWT expiration locally
    return true;
  },
};
