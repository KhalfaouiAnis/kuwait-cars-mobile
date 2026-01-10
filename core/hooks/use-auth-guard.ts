import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";
import useAuthStore from "../store/auth.store";

export const useAuthGuard = () => {
  const { t } = useTranslation("auth")
  const { isGuest } = useAuthStore();
  const navigation = useRouter();

  const protectAction = (action: () => void) => {
    if (isGuest) {
      toast.warning("Account Required", {
        description: "Please create an account to use this feature.",
        duration: 6000,
        action: {
          label: t("signUp"),
          onClick: () => navigation.push("/require-signin"),
        },
      });
      return;
    }
    action();
  };

  return { protectAction };
};
