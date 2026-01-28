import useNotificationStore from "@/core/store/notification.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Text, TextInput, View } from "react-native";
import BackArrow from "../../ui/shared/back-arrow";
import { ProfileDrawer } from "../../ui/shared/profile-drawer";

const MainHeader = ({
  drawer = false,
  back = true,
}: {
  drawer?: boolean;
  back?: boolean;
}) => {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const { theme, isRTL } = useUserPreferencesStore();
  const { t } = useTranslation("common");

  return (
    <View
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      className={`mt-1 h-16 flex-row items-center justify-center mx-2`}
    >
      {back && <BackArrow />}
      {drawer && <ProfileDrawer />}
      <View className="flex-1 flex-row items-center justify-between rounded-3xl border border-grayish px-2 mx-2 bg-transparent dark:bg-black">
        <View className="flex-row items-center gap-x-2 flex-1">
          <Ionicons
            name="search-outline"
            size={18}
            color={theme !== "light" ? "white" : "black"}
          />
          <TextInput
            placeholder={`${t("search")}...`}
            className="flex-1 text-black dark:text-white"
            autoCapitalize="none"
          />
        </View>
        <View className="flex-row gap-x-2">
          <Ionicons
            name="mic-outline"
            size={24}
            color={theme !== "light" ? "white" : "black"}
          />
          <Ionicons
            name="camera-outline"
            size={24}
            color={theme !== "light" ? "white" : "black"}
          />
        </View>
      </View>
      <View className="ms-2 relative">
        <MaterialCommunityIcons
          name="bell-ring-outline"
          size={24}
          color={theme !== "light" ? "white" : "black"}
        />
        {unreadCount > 0 && (
          <View className="absolute -top-1 -end-1 bg-error rounded-full h-5 w-5 flex items-center justify-center border border-white">
            <Text className="text-white text-center text-[8px] font-bold">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MainHeader;
