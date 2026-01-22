import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";
import BackArrow from "../../ui/shared/back-arrow";
import { ProfileDrawer } from "../../ui/shared/profile-drawer";

const MainHeader = ({
  drawer = false,
  back = true,
}: {
  drawer?: boolean;
  back?: boolean;
}) => {
  const { theme, isRTL } = useUserPreferencesStore();
  const { t } = useTranslation("common");

  return (
    <View
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      className={`mt-1 h-16 flex-row items-center justify-center mx-2`}
    >
      {back && <BackArrow />}
      {drawer && <ProfileDrawer />}
      <View className="flex-1 flex-row items-center justify-between rounded-xl border border-primary-500 px-2 ms-1 bg-transparent dark:bg-black">
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
      <View className="ms-2">
        <MaterialCommunityIcons
          name="bell-ring-outline"
          size={24}
          color={theme !== "light" ? "white" : "black"}
        />
      </View>
    </View>
  );
};

export default MainHeader;
