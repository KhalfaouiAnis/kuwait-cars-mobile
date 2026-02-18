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
  const router = useRouter();
  useViewTrackerCleanup();
  const { user, isGuest, isReady, _hasHydrated } = authStore();
  const { setLang, lang: currentLang, isRTL } = useUserPreferencesStore();
  const { dark } = useTheme()

  const handleSelect = async (lang: Language) => {
    setLang(lang.code);
    i18n.changeLanguage(lang.code);
    router.push("/welcome");
  };

  const renderItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      style={
        currentLang === item.code
          ? [{ ...styles.buttonSelected, boxShadow: dark ? styles.button.boxShadow : styles.buttonSelected.boxShadow }, { flexDirection: isRTL ? "row-reverse" : "row" }]
          : [{ ...styles.button, boxShadow: dark ? undefined : styles.button.boxShadow }, { flexDirection: isRTL ? "row-reverse" : "row" }]
      }
      className={cn(
        "flex-row items-center justify-between px-5 h-[55px] my-1.5 rounded-3xl border border-grayish bg-white dark:border-[#46464640]",
        { "dark:bg-[#1B1B1B29]": currentLang === item.code },
        { "dark:bg-darkish": currentLang !== item.code },
      )}
      onPress={() => handleSelect(item)}
    >
      <Flag name={item.code} />
      <Text className="text-base font-inter-bold dark:text-white">
        {item.name}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={dark ? "white" : "black"}
      />
    </TouchableOpacity>
  );

  if (!isReady || !_hasHydrated) return null;

  if (user || isGuest) return <Redirect href="/categories" />;

  return (
    <Container>
      <View className="flex-1 items-center mt-2 w-full dark:bg-black">
        <FlatList
          data={SUPPORTED_LANGUAGES}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
          className="flex-1 w-full"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="items-center gap-4 pb-4"
          ListHeaderComponent={
            <View className="flex items-center pt-4 mb-6">
              <AppLogo size={160} />
            </View>
          }
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
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
  buttonSelected: {
    width: DIMENSIONS.width - 100,
    boxShadow: [
      {
        offsetX: 7,
        offsetY: 7,
        blurRadius: 0,
        spreadDistance: 0,
        color: "rgba(168, 168, 168, 1)",
      },
    ],
  },
});
