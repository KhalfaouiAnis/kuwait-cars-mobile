import AppleIcon from "@/assets/svg/apple";
import AuthHeader from "@/core/components/layout/header/auth-header";
import { AuthLink } from "@/core/components/ui/_links/auth-link";
import FacebookButton from "@/core/components/ui/button/FacebookButton";
import GoogleButton from "@/core/components/ui/button/GoogleButton";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { getGuestAccessToken } from "@/core/services/authentication/standard";
import { TokenService } from "@/core/services/token-manager";
import { authStore } from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Index() {
    const { t } = useTranslation("common");
    const { isRTL } = useUserPreferencesStore()
    const router = useRouter();

    const handleGuestSession = async () => {
        const token = await getGuestAccessToken();

        if (!token) {
            return
        }

        TokenService.setAccessToken(token)
        authStore?.getState().createGuestSesssion(token)
        router.push("/categories")
    }

    return (
        <Container>
            <AuthHeader />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerClassName="items-center bg-white dark:bg-darkish pt-4">
                <View className="flex items-center">
                    <Image source={IMAGES.Logo} style={{ width: 175, height: 175, objectFit: 'contain' }} />
                    <Text className="font-inter-bold text-center text-2xl mt-8 dark:text-white">{t("welcome")}</Text>
                    <Text className="font-inter-semibold text-lg text-center dark:text-white">{t("subWelcome")}</Text>
                </View>
                <View className="flex items-center mt-8 gap-y-4">
                    <AuthLink href="/(auth)/signin" label={t("signIn")} />
                    <AuthLink href="/(auth)/signup" label={t("signUp")} />
                    <TouchableOpacity className="border border-primary-500 py-4 w-[300px] rounded-md"
                        onPress={handleGuestSession}>
                        <Text className="font-bold text-center text-base dark:text-white">
                            {t("asAGuest")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[300px]" onPress={handleGuestSession}>
                        <Text className="font-normal text-sm self-end mr-3 dark:text-white">
                            {t("skip")} <Fontisto name={isRTL ? "arrow-left-l" : "arrow-right-l"} size={10} color="gray" />
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
