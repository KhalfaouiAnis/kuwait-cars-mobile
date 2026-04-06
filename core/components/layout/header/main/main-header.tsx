import useNotificationStore from "@/core/store/notification.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import BackArrow from "../../../ui/shared/back-arrow";
import { ProfileDrawer } from "../../../ui/shared/profile-drawer";
import ImageSearch from "./image-search";
import VoiceSearch from "./voice-search";

const MainHeader = ({
  drawer = false,
  back = true,
}: {
  drawer?: boolean;
  back?: boolean;
}) => {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const isRTL = useUserPreferencesStore(state => state.isRTL);
  const { t } = useTranslation("common");
  const { dark } = useTheme()
  const router = useRouter()

  const handleNavigateToNotifs = () => router.navigate("/notifications")

  return (
    <View
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      className={`mt-1 h-16 flex-row items-center justify-center mx-6`}
    >
      {back && <BackArrow />}
      {drawer && <ProfileDrawer />}
      <View className="flex-1 flex-row items-center justify-between rounded-[20px] border-[0.5px] dark:border-[#1B1B1B] border-[#A8A8A8] px-4 mx-4 bg-transparent dark:bg-darkish">
        <View className="flex-row items-center gap-x-2 flex-1">
          <Ionicons
            size={18}
            name="search-outline"
            color={dark ? "#B3B3B3" : "#000000b3"}
          />
          <TextInput
            placeholder={`${t("search")}...`}
            className="flex-1 text-black placeholder:text-[#A8A8A8] dark:text-white dark:placeholder:text-[#A8A8A8]"
            autoCapitalize="none"
          />
        </View>
        <View className="flex-row gap-x-2">
          <VoiceSearch />
          <ImageSearch />
        </View>
      </View>
      <Pressable
        className="ms-1 relative"
        onPress={handleNavigateToNotifs}
        accessibilityLabel={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
      >
        <MaterialCommunityIcons
          size={26}
          name="bell-ring-outline"
          color={dark ? "#ffffffb3" : "#677185"}
        />
        <View
          style={{ ...boxShadow(0, 4, 4, 0).button }}
          className="absolute -top-1 -end-4 bg-error rounded-full h-5 w-5 flex items-center justify-center"
        >
          <Text className="text-white text-center text-[8px] font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MainHeader;
