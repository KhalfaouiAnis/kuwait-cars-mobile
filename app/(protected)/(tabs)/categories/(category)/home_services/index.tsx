import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function HomeServicesCategoriesScreen() {
    const { ad_type } = useLocalSearchParams<{ ad_type: string }>()
    const { t } = useTranslation("car_categories")

    return (
        <Container header={<MainHeader back />} scrollable>
            <View className="mt-4">
                <Text className="text-center font-semibold text-xl">{t("HomeServicesCategories")}</Text>
            </View>
            <View className="mt-4 mx-2 p-4 flex-row justify-start gap-3 flex-wrap">
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        href="/categories/home_services/washing"
                        image={IMAGES.BrakesCategory}
                        params={{ ad_type, ad_category: 'washing' }}
                        label={t("Washing")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        href="/categories/home_services/protection"
                        image={IMAGES.EngineCoolingSystemCategory}
                        params={{ ad_type, ad_category: 'protection' }}
                        label={t("Protection")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        href="/categories/home_services/batteries"
                        image={IMAGES.AirConditionCategory}
                        params={{ ad_type, ad_category: 'batteries' }}
                        label={t("Batteries")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        href="/categories/home_services/check"
                        image={IMAGES.LexusNX250Category}
                        params={{ ad_type, ad_category: 'check' }}
                        label={t("Check")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        href="/categories/home_services/keys"
                        image={IMAGES.LexusNX250Category}
                        params={{ ad_type, ad_category: 'keys' }}
                        label={t("Keys")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        href="/categories/home_services/insurance"
                        image={IMAGES.LexusNX250Category}
                        params={{ ad_type, ad_category: 'insurance' }}
                        label={t("Insurance")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        href="/categories/home_services/other"
                        image={IMAGES.LexusNX250Category}
                        params={{ ad_type, ad_category: 'other' }}
                        label={t("Other")} />
                </View>
            </View>
        </Container>
    )
}