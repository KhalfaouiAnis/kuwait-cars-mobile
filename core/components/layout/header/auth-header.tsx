import { router } from "expo-router";
import { View } from "react-native";
import LanguageSwitcher from "../../ui/menu/language-switcher";
import BackArrow from "../../ui/shared/back-arrow";

const AuthHeader = () => {
  const handleNavigate = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/welcome");
    }
  };

  return (
    <View className="mt-8 flex-row items-center justify-between px-4">
      <BackArrow navigate={handleNavigate} ignoreRTL />
      <LanguageSwitcher />
    </View>
  );
};

export default AuthHeader;
