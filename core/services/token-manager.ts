import { ACC_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "../constants";
import { storage } from "../store/storage";

export const TokenService = {
  getAccessToken: () => storage.getString(ACC_TOKEN_STORAGE_KEY),
  getRefreshToken: () => storage.getString(REFRESH_TOKEN_STORAGE_KEY),

  setAccessToken: (accessToken: string) =>
    storage.set(ACC_TOKEN_STORAGE_KEY, accessToken),
  setRefreshToken: (refreshToken: string) =>
    storage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken),

  removeAccessToken: () => storage.remove(ACC_TOKEN_STORAGE_KEY),
  removeRefreshToken: () => storage.remove(REFRESH_TOKEN_STORAGE_KEY),

  setTokens: function (accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },
  
  clearTokens: function () {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};
