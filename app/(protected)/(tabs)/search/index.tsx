import SearchItem from "@/core/components/layout/ads/advanced-search/search-item";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { Ad_CATEGORIES } from "@/core/constants/ad";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useAdvancedSearchStore from "@/core/store/search.store";
import { AntDesign, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SearchScreen() {
    const { appliedFilters: { ad_type }, setExternalFilter } = useAdvancedSearchStore()
    const { t } = useTranslation("common")
    const { theme } = useUserPreferencesStore()
    const isDark = theme !== "light"

    return (
        <Container header={<ProfileHeader title={t(`advancedSearch.chooseYourCar`)} />}>
            <View className="p-2 mx-1">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        Ad_CATEGORIES.map(category => (
                            <Pressable key={category} onPress={() => setExternalFilter("ad_type", category)}>
                                <View className={`mr-2 border border-gray-200 bg-white p-2 rounded-lg flex-row items-center dark:bg-darkish ${ad_type === category ? "border-primary-500" : ""}`}>
                                    <Text className="mr-2 text-black dark:text-white">{t(`adCategories.${category}`)}</Text>
                                </View>
                            </Pressable>
                        ))
                    }
                </ScrollView>
                <View className="mt-6 gap-y-4">
                    <SearchItem
                        content={<></>}
                        label={t(`advancedSearch.location`)}
                        isDark={isDark}
                        icon={<Octicons name="location" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label={t(`advancedSearch.brand_model`)}
                        isDark={isDark}
                        icon={<Ionicons name="car-sport" size={20} color={isDark ? "white" : "gray"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label={t(`advancedSearch.budget`)}
                        isDark={isDark}
                        icon={<AntDesign name="dollar" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label={t(`advancedSearch.model_year`)}
                        isDark={isDark}
                        icon={<Ionicons name="calendar" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label={t(`advancedSearch.kms_driven`)}
                        isDark={isDark}
                        icon={<MaterialCommunityIcons name="signal-distance-variant" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <SearchItem
                        content={<></>}
                        label={t(`advancedSearch.color`)}
                        isDark={isDark}
                        icon={<Ionicons name="color-palette-outline" size={20} color={isDark ? "white" : "black"} />}
                    />
                    <TouchableOpacity className="rounded-lg bg-primary-500 py-4 mx-2 mt-6 px-12">
                        <Text className="text-center font-inter-semibold">{t(`advancedSearch.offersFound`, { OffersCount: 200 })}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}