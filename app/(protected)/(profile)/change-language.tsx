import Flag from "@/assets/svg/flag";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import Checkbox from "@/core/components/ui/input/checkbox";
import { SUPPORTED_LANGUAGES } from "@/core/constants";
import i18n from "@/core/i18n/i18n";
import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { Language } from "@/core/types";
import { clsx } from "clsx";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ChangeLanguageScreen() {
    const router = useRouter();
    const { setLang, lang: currentLang } = useUserPreferencesStore();
    const { t } = useTranslation();

    const handleSelect = async (lang: Language) => {
        setLang(lang.code);
        i18n.changeLanguage(lang.code);
        router.push("/profile")
    }

    const renderItem = (item: Language) => (
        <TouchableOpacity
            key={item.code}
            className={clsx("flex-row items-center justify-between w-64 px-4 py-2 mt-4 rounded-lg bg-white", {
                "border border-zinc-300": currentLang === item.code,
                "border-b-2 border-r border-gray-200": currentLang !== item.code
            })}
            onPress={() => handleSelect(item)}
        >
            <Flag name={item.code} />
            <Text className="text-base text-gray-900 font-medium">{t(item.name)}</Text>
            <Checkbox checked={item.code === currentLang} />
        </TouchableOpacity>
    );

    return (
        <Container header={<ProfileHeader title="Choose Language" />}>
            <View className="items-center rounded-lg border border-primary-500 m-2 dark:bg-darkish">
                <ScrollView showsVerticalScrollIndicator={false} className="my-6">
                    {SUPPORTED_LANGUAGES.map(lang => renderItem(lang))}
                </ScrollView>
            </View>
        </Container>
    );
}
