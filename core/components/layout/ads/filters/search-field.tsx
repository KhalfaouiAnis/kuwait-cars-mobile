import useUserPreferencesStore from "@/core/store/preferences.store";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";

interface Props {
    setSearchQuery: (text: string) => void;
    searchQuery: string
}

export default function SearchField({ searchQuery, setSearchQuery }: Props) {
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore()
    return (
        <View className="border border-primary-500 p-1 rounded-lg mb-4 flex-row items-center gap-x-1 ps-2">
            <Ionicons name='search-outline' size={18} color="gray" />
            <TextInput
                className="flex-1"
                placeholder={`${t('search')}...`}
                numberOfLines={1}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                style={{
                    textAlign: isRTL ? 'right' : 'left',
                    writingDirection: isRTL ? 'rtl' : 'ltr',
                }}
            />
        </View>
    )
}