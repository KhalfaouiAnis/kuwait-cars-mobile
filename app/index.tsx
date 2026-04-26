import Flag from "@/assets/svg/flag";
import AppLogo from "@/assets/svg/logo";
import Container from "@/core/components/ui/container";
import { DIMENSIONS, SUPPORTED_LANGUAGES } from "@/core/constants";
import { useViewTrackerCleanup } from "@/core/hooks/ad/useViewTracker";
import i18n from "@/core/i18n/i18n";
import { authStore } from "@/core/store/auth.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Language } from "@/core/types";
import { cn } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Redirect, useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  useViewTrackerCleanup();
  const router = useRouter();
  const { dark } = useTheme()
  const { user, isGuest, isReady, _hasHydrated } = authStore();
  const { setLang, lang: currentLang, isRTL } = useUserPreferencesStore();

  const handleSelect = async (lang: Language) => {
    setLang(lang.code);
    i18n.changeLanguage(lang.code);
    router.push("/welcome");
  };

  const renderItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={styles.button}
      className={cn(
        "flex-row items-center justify-between px-5  border bg-white dark:border-[#46464640]",
        { "dark:bg-[#1B1B1B29] border-black": currentLang === item.code },
        { "dark:bg-darkish border-grayish": currentLang !== item.code },
        { "flex-row-reverse": isRTL },
        { "flex-row": !isRTL },
      )}
      onPress={() => handleSelect(item)}
    >
      <Flag name={item.code} size={38} />
      <Text className="text-base font-inter-bold dark:text-white">
        {item.name}
      </Text>
      <Ionicons
        size={20}
        color={dark ? "white" : "black"}
        name={isRTL ? "chevron-back" : "chevron-forward"}
      />
    </TouchableOpacity>
  );

  if (!isReady || !_hasHydrated) return null;

  if (user || isGuest) return <Redirect href="/categories" />;

  return (
    <Container>
      <View className="flex-1 items-center mt-2 w-full dark:bg-black">
        <FlatList
          renderItem={renderItem}
          className="flex-1 w-full"
          data={SUPPORTED_LANGUAGES}
          keyExtractor={(item) => item.code}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="items-center gap-6 pb-4"
          ListHeaderComponent={
            <View className="flex items-center pt-4 mb-6">
              <AppLogo size={150} />
            </View>
          }
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    borderRadius: 22,
    width: DIMENSIONS.width - 100,
    boxShadow: [
      {
        offsetX: 4,
        offsetY: 6,
        blurRadius: 20,
        spreadDistance: 0,
        color: "rgb(168 168 168 / 1)",
      },
    ],
  },
});
