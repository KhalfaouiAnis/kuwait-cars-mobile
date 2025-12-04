import AppleIcon from "@/assets/svg/apple";
import AuthHeader from "@/core/components/forms/auth/auth-header";
import { AuthLink } from "@/core/components/ui/_links/auth-link";
import FacebookButton from "@/core/components/ui/button/FacebookButton";
import GoogleButton from "@/core/components/ui/button/GoogleButton";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { getAnonymousAccessToken } from "@/core/lib/api/authentication/login";
import { authStore } from "@/core/lib/stores/auth.store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Index() {
    const router = useRouter();

    const handleAnonymousSession = async () => {
        const token = await getAnonymousAccessToken();

        if (!token) {
            return
        }
        authStore.getState().createAnonymousSesssion(token)
        router.push("/categories")
    }

    return (
        <Container>
            <AuthHeader />
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerClassName="items-center bg-white">
                <View className="flex items-center">
                    <Image source={IMAGES.Logo} style={{ width: 175, height: 175, objectFit: 'contain' }} />
                    <Text className="font-inter-bold text-3xl mt-12 dark:text-white">Welcome to Kuwait Car</Text>
                    <Text className="font-inter-semibold text-lg dark:text-white">Your Trusted Vehicle Sale</Text>
                </View>
                <View className="flex items-center mt-8 gap-y-4">
                    <AuthLink href="/(auth)/signin" label="Sign In" />
                    <AuthLink href="/(auth)/signup" label="Sign Up" />
                    <TouchableOpacity className="border border-primary-500 py-4 w-[300px] rounded-md"
                        onPress={handleAnonymousSession}>
                        <Text className="font-bold text-center text-base dark:text-white">
                            As a Guest
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[300px]"
                        onPress={handleAnonymousSession}>
                        <Text className="font-normal text-sm self-end mr-3 dark:text-white">
                            Skip →
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex items-center py-4">
                    <Text className="text-[#B5B5B5] text-sm">or continue with</Text>
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
