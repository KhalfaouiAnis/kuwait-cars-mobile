import Flag from "@/assets/svg/flag";
import Container from "@/core/components/ui/container";
import { SUPPORTED_LANGUAGES } from "@/core/constants";
import { images } from "@/core/constants/images";
import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { Language } from "@/core/types";
import { cn } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { setLang, lang: currentLang } = useUserPreferencesStore();
  const { t } = useTranslation();

  const handleSelect = async (lang: Language) => {
    // setLang(lang.code);
    // i18n.changeLanguage(lang.code);
    router.push("/profile")
  }

  const renderItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      className={cn("flex-row items-center justify-between w-64 px-4 py-2 my-2 rounded-lg bg-[#FFFFFFB2] ", {
        "border border-zinc-300": currentLang === item.code,
        "border-b-4 border-r-2 border-gray-200": currentLang !== item.code,
      })}
      onPress={() => handleSelect(item)}
    >
      <Flag name={item.code} />
      <Text className="text-base text-gray-900 font-medium">{t(item.name)}</Text>
      <Ionicons name="chevron-forward" size={20} />
    </TouchableOpacity>
  );

  return (
    <Container backgroundColor="#FAED02">
      <View className="flex-1 items-center mt-6 gap-y-2 w-full">
        <FlatList
          data={SUPPORTED_LANGUAGES}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
          className='flex-1 w-full'
          showsVerticalScrollIndicator={false}
          contentContainerClassName="items-center"
          ListHeaderComponent={
            <View className="flex items-center mb-6">
              <Image source={images.Logo}
                style={{ width: 175, height: 175, objectFit: 'contain', borderRadius: 100, borderWidth: 4 }} />
            </View>
          }
        />
      </View>
    </Container>
  );
}
