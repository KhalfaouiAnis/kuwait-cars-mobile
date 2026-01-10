import ProfileHeader from "@/core/components/layout/header/profile-header";
import { SettingsLink } from "@/core/components/ui/_links/settings-link";
import Switch from "@/core/components/ui/button/switch";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
    const { t } = useTranslation("common");
    const router = useRouter()
    const { signOut, user } = useAuthStore();
    const { theme, toggleTheme } = useUserPreferencesStore()
    const { protectAction } = useAuthGuard();

    const handleEditProfile = () => {
        protectAction(() => router.navigate("/profile-edit"))
    }

    return (
        <Container
            scrollable
            backgroundColor={theme !== "light" ? "black" : "#FAED02"}
            header={<ProfileHeader title={t("profile.profile")} />}
        >
            <View className="flex-1 mt-2 bg-white dark:bg-darkish px-4 py-2">
                <View className="flex-row justify-between w-full border border-primary-500 rounded-lg px-4 pt-1 pb-3">
                    <View>
                        <Text className="font-inter-bold text-xl text-black dark:text-white">{user?.fullname}</Text>
                        <Text className="my-2 font-inter text-black dark:text-white">{t("profile.viewEditProfile")}</Text>
                        <View className="flex-row items-start">
                            <Ionicons name="location-outline" size={20} color="#FAED02" />
                            <Text className="ms-2 text-black dark:text-white">{user?.province?.province ? t(`provinces.${user?.province?.province}`) : ""}</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <View className="relative">
                            <Image
                                source={user?.avatar
                                    ? { uri: user?.avatar.original_url }
                                    : IMAGES.DefaultAvatar}
                                style={{ width: 75, height: 75, borderRadius: 50 }}
                                contentFit="cover"
                            />
                            <View className="absolute -start-7 bottom-1 z-10 bg-white rounded-full p-2">
                                <Ionicons name="camera-outline" size={24} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={(handleEditProfile)} className="bg-primary-500 rounded-lg w-full mt-4">
                            <View className="flex-row px-3 py-2 items-center justify-center gap-1">
                                <Text className="font-inter-semibold text-sm">{t("profile.editProfile")}</Text>
                                <Feather name="edit-3" size={16} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-1 py-2 px-4 mt-4 border bg-white dark:bg-darkish border-primary-500 rounded-lg gap-y-6">
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/change-password"}
                        icon={<Feather name="key" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.changePassword")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/my-ads"}
                        icon={<MaterialCommunityIcons name="text-box-multiple-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.myAds")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/my-ads"}
                        icon={<MaterialCommunityIcons name="text-box-multiple-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.officeShowroomServices")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/my-ads"}
                        icon={<MaterialCommunityIcons name="text-box-multiple-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.advertisingPhotographyServices")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/my-ads"}
                        icon={<Ionicons name="card" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.myPayments")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/recently-viewed"}
                        icon={<Ionicons name="eye-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.recentlyViewed")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/general-condition"}
                        icon={<AntDesign name="exclamation-circle" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.generalCondition")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/change-language"}
                        icon={<Ionicons name="language-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.language")}
                    />

                    <View className="w-full flex-row items-center">
                        <MaterialCommunityIcons name="bell-ring-outline" size={24} color={theme !== "light" ? "white" : "black"} />
                        <Text className="ms-2 me-auto text-black dark:text-white">{t("profile.notification")}</Text>
                        <Switch value={true} onValueChange={() => { }} />
                    </View>
                    <View className="w-full flex-row items-center">
                        <MaterialIcons name="dark-mode" size={24} color={theme !== "light" ? "white" : "black"} />
                        <Text className="ms-2 me-auto text-black dark:text-white">{t("profile.darkMode")}</Text>
                        <Switch value={theme !== "light"} onValueChange={toggleTheme} />
                    </View>

                    <SettingsLink
                        isDark={theme !== "light"}
                        href={"/"}
                        icon={<Ionicons name="call-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.contactCustomerService")}
                    />
                    <SettingsLink
                        isDark={theme !== "light"}
                        onPress={signOut}
                        icon={<Ionicons name="log-out-outline" size={24} color={theme !== "light" ? "white" : "black"} />}
                        label={t("profile.logout")}
                    />
                </View>
            </View>
        </Container>
    )
}