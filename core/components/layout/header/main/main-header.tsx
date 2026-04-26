import useNotificationStore from "@/core/store/notification.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import BackArrow from "../../../ui/shared/back-arrow";
import { ProfileDrawer } from "../../../ui/shared/profile-drawer";
import ImageSearch from "./image-search";
import TextVoiceSearch from "./voice-search";

const MainHeader = ({
  drawer = false,
  back = true,
}: {
  drawer?: boolean;
  back?: boolean;
}) => {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const isRTL = useUserPreferencesStore(state => state.isRTL);
  const { dark } = useTheme()
  const router = useRouter()

  const handleNavigateToNotifs = () => router.navigate("/notifications")

  return (
    <View
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      className={`mt-8 h-16 flex-row items-center justify-center mx-6`}
    >
      {back && <BackArrow />}
      {drawer && <ProfileDrawer />}
      <View className="flex-1 gap-2 flex-row items-center justify-between rounded-[20px] border-[0.7px] dark:border-[#1B1B1B] border-[#A8A8A8] px-4 mx-4 bg-transparent dark:bg-darkish">
        <TextVoiceSearch />
        <ImageSearch />
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
