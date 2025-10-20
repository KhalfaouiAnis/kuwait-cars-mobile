import { handleTokenValidation } from "../utils/authUtils";

export const bootstrapAsync = async () => {
  await handleTokenValidation();
};
