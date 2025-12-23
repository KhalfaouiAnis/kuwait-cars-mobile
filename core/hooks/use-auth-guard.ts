import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import useAuthStore from "../store/auth.store";

export const useAuthGuard = () => {
  const { isGuest } = useAuthStore();
  const navigation = useRouter();

  const protectAction = (action: () => void) => {
    if (isGuest) {
      toast.warning("Account Required", {
        description: "Please create an account to use this feature.",
        duration: 6000,
        action: {
          label: "Sign Up",
          onClick: () => navigation.push("/require-signin"),
        },
      });
      return;
    }
    action();
  };

  return { protectAction };
};
