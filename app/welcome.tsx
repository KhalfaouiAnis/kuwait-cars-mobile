import AppleIcon from "@/assets/svg/apple";
import AppLogo from "@/assets/svg/logo";
import AuthHeader from "@/core/components/layout/header/auth-header";
import { AuthLink } from "@/core/components/ui/_links/auth-link";
import FacebookButton from "@/core/components/ui/button/FacebookButton";
import GoogleButton from "@/core/components/ui/button/GoogleButton";
import Container from "@/core/components/ui/container";
import { DIMENSIONS } from "@/core/constants";
import { getGuestAccessToken } from "@/core/services/authentication/standard";
import { TokenService } from "@/core/services/token-manager";
import { authStore } from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Index() {
  const { t } = useTranslation("common");
  const { isRTL } = useUserPreferencesStore();
  const router = useRouter();

  const handleGuestSession = async () => {
    const token = await getGuestAccessToken();
    if (!token) {
      return;
    }
    TokenService.setAccessToken(token);
    authStore?.getState().createGuestSesssion(token);
    router.push("/categories");
  };

  return (
    <Container>
      <AuthHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="items-center bg-white dark:bg-black pt-4"
      >
        <View className="flex items-center">
          <AppLogo size={160} />
          <Text className="font-inter-bold text-center text-2xl mt-8 dark:text-white">
            {t("welcome")}
          </Text>
          <Text className="font-inter text-center text-xs dark:text-white">
            {t("subWelcome")}
          </Text>
        </View>
        <View className="flex items-center mt-8 gap-y-7">
          <AuthLink href="/(auth)/signin" label={t("signIn")} />
          <AuthLink href="/(auth)/signup" label={t("signUp")} />
          <TouchableOpacity
            style={{
              boxShadow: boxShadow(4, 6, 20).button.boxShadow,
              width: DIMENSIONS.width - 80,
            }}
            className="h-[55px] items-center justify-center rounded-3xl border-[0.5px] border-grayish"
            onPress={handleGuestSession}
          >
            <Text
              className="font-inter-semibold text-center dark:text-white"
              style={{ width: DIMENSIONS.width - 80 }}
            >
              {t("asAGuest")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="-mt-3"
            onPress={handleGuestSession}
            style={{ width: DIMENSIONS.width - 80 }}
          >
            <Text
              className="font-normal text-sm self-end mr-3 dark:text-white"
              style={{ flexDirection: isRTL ? "row" : "row" }}
            >
              {t("skip")}{" "}
              <Fontisto
                name={isRTL ? "arrow-left-l" : "arrow-right-l"}
                size={10}
                color="gray"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center py-4">
          <Text className="text-[#B5B5B5] text-sm">{t("orContinueWith")}</Text>
          <View className="flex-row mt-4 gap-x-10">
            <GoogleButton />
            <AppleIcon />
            <FacebookButton />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
