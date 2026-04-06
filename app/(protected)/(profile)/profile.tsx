import ProfileHeader from "@/core/components/layout/header/profile-header";
import { SettingsLink } from "@/core/components/ui/_links/settings-link";
import Switch from "@/core/components/ui/button/switch";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import useAuthStore from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { protectAction } = useAuthGuard();
  const { signOut, user } = useAuthStore();
  const [notifications, setNotifications] = useState(true);
  const { toggleTheme, isRTL } = useUserPreferencesStore();
  const { dark } = useTheme()

  const handleEditProfile = () => {
    protectAction(() => router.navigate("/profile-edit"));
  };

  return (
    <Container
      scrollable
      backgroundColor={dark ? "black" : "#FAED02"}
      header={<ProfileHeader title={t("profile.profile")} />}
    >
      <View className="flex-1 mt-2 bg-white dark:bg-black px-4 py-2">
        <View className="flex-row justify-between w-full px-4 pt-1 pb-3">
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" className="font-inter-medium text-xl dark:text-white">
              {user?.fullname}
            </Text>
            <Text className="my-2 font-inter text-sm text-black dark:text-white">
              {t("profile.viewEditProfile")}
            </Text>
            <View className="flex-row items-start">
              {user?.province.province && (
                <Ionicons name="location-outline" size={20} color="#FAED02" />
              )}
              <Text numberOfLines={1} ellipsizeMode="tail" className="ms-2 text-sm text-black dark:text-white">
                {user?.province?.province
                  ? t(`provinces.${user?.province?.province}`)
                  : ""}
              </Text>
            </View>
          </View>
          <View className="items-end flex-1">
            <View className="relative">
              <Image
                source={
                  user?.avatar
                    ? { uri: user?.avatar.original_url }
                    : IMAGES.DefaultAvatar
                }
                style={{ width: 75, height: 75, borderRadius: 50 }}
                contentFit="cover"
              />
              <View className="absolute -start-7 bottom-1 z-10 bg-white rounded-full p-2">
                <Ionicons name="camera-outline" size={24} />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleEditProfile}
          className="bg-primary-500 rounded-lg mt-2 flex-row px-3 py-2 items-center justify-center gap-1 self-end me-4"
        >
          <Text className="font-inter-medium text-sm text-center">
            {t("profile.editProfile")}
          </Text>
          <Feather name="edit-3" size={16} color="black" />
        </TouchableOpacity>
        <View
          style={{ direction: isRTL ? "rtl" : "ltr" }}
          className="flex-1 py-2 px-4 mt-4 bg-white dark:bg-black gap-y-6"
        >
          <SettingsLink
            isRtl={isRTL}
            href={"/change-password"}
            icon={
              <Feather
                name="key"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.changePassword")}
          />
          <SettingsLink
            isRtl={isRTL}
            onPress={() => protectAction(() => router.navigate("/my-ads"))}
            icon={
              <MaterialCommunityIcons
                name="text-box-multiple-outline"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.myAds")}
          />
          <SettingsLink
            isRtl={isRTL}
            href={"/profile"}
            icon={
              <MaterialCommunityIcons
                name="text-box-multiple-outline"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.officeShowroomServices")}
          />
          <SettingsLink
            isRtl={isRTL}
            href={"/profile"}
            icon={
              <MaterialCommunityIcons
                name="text-box-multiple-outline"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.advertisingPhotographyServices")}
          />
          <SettingsLink
            isRtl={isRTL}
            onPress={() => protectAction(() => router.navigate("/profile"))}
            icon={
              <Ionicons
                name="card"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.myPayments")}
          />
          <SettingsLink
            isRtl={isRTL}
            href={"/recently-viewed"}
            icon={
              <Ionicons
                name="eye-outline"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.recentlyViewed")}
          />
          <SettingsLink
            isRtl={isRTL}
            href={"/general-condition"}
            icon={
              <AntDesign
                name="exclamation-circle"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.generalCondition")}
          />
          <SettingsLink
            isRtl={isRTL}
            href={"/change-language"}
            icon={
              <Ionicons
                name="language-outline"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.language")}
          />

          <View className="w-full flex-row items-center">
            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={24}
              color={dark ? "white" : "black"}
            />
            <Text className="ms-2 me-auto text-black dark:text-white">
              {t("profile.notification")}
            </Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              isRTL={isRTL}
            />
          </View>
          <View className="w-full flex-row items-center">
            <MaterialIcons
              name="dark-mode"
              size={24}
              color={dark ? "white" : "black"}
            />
            <Text className="ms-2 me-auto text-black dark:text-white">
              {t("profile.darkMode")}
            </Text>
            <Switch
              value={dark}
              onValueChange={toggleTheme}
              isRTL={isRTL}
            />
          </View>

          <SettingsLink
            isRtl={isRTL}
            href={"/profile"}
            icon={
              <Ionicons
                name="call-outline"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.contactCustomerService")}
          />
          <SettingsLink
            isRtl={isRTL}
            onPress={signOut}
            icon={
              <Ionicons
                name="log-out-outline"
                size={24}
                color={dark ? "white" : "black"}
              />
            }
            label={t("profile.logout")}
          />
        </View>
      </View>
    </Container>
  );
}
