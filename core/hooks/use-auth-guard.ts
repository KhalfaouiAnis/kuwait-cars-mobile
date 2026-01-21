import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner-native";
import useAuthStore from "../store/auth.store";

export const useAuthGuard = () => {
  const { t } = useTranslation("auth");
  const { isGuest } = useAuthStore();
  const navigation = useRouter();

  const protectAction = (action: () => void) => {
    if (isGuest) {
      toast.warning(t("accountRequired"), {
        description: t("pleaseCreateAccount"),
        duration: 6000,
        actionButtonStyle: {
          borderWidth: 1,
          borderColor: "#FAED02",
          backgroundColor: "transparent",
          paddingHorizontal: 10,
          paddingVertical: 4,
        },
        action: {
          label: t("signUp"),
          onClick: () => navigation.push("/signup"),
        },
      });
      return;
    }
    action();
  };

  return { protectAction };
};
