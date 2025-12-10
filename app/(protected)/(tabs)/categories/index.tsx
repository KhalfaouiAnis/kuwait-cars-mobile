import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { AD_TYPES } from "@/core/constants/ad";
import { IMAGES } from "@/core/constants/images";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

export default function CategoriesScreen() {
    const { t } = useTranslation("common");

    return (
        <Container header={<MainHeader drawer back={false} />}>
            <ScrollView style={{ marginBottom: 72 }} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                <View className="mt-4 mx-2 flex-row justify-center gap-3 flex-wrap">
                    <CategoryLink href={`/categories/${AD_TYPES.used_cars}/`} image={IMAGES.BrakesCategory} label={t("adCategories.used_cars")} />
                    <CategoryLink href={`/categories/${AD_TYPES.new_cars}/`} image={IMAGES.EngineCoolingSystemCategory} label={t("adCategories.new_cars")} />
                    <CategoryLink href={`/categories/${AD_TYPES.motorcycles}/`} image={IMAGES.AirConditionCategory} label={t("adCategories.motorcycles")} />

                    <CategoryLink href={`/categories/${AD_TYPES.classic_cars}/`} image={IMAGES.LexusNX250Category} label={t("adCategories.classic_cars")} />
                    <CategoryLink href={`/categories/${AD_TYPES.show}/`} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.show")} />
                    <CategoryLink href={`/categories/${AD_TYPES.car_rental_agencies}/`} image={IMAGES.ZerexG05PhosphateCategory} label={t("adCategories.car_rental_agencies")} />

                    <CategoryLink href={`/categories/${AD_TYPES.spare_parts}/`} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.spare_parts")} />
                    <CategoryLink href={`/categories/${AD_TYPES.home_services}/`} image={IMAGES.CarAccessoriesCategory} label={t("adCategories.home_services")} />
                    <CategoryLink href={`/categories/${AD_TYPES.damaged_cars}/`} image={IMAGES.BlackHawkStreetHU01UHPCategory} label={t("adCategories.damaged_cars")} />

                    <CategoryLink href={`/categories/${AD_TYPES.accessories}/`} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.accessories")} />
                    <CategoryLink href={`/categories/${AD_TYPES.logistics}/`} image={IMAGES.BlackHawkStreetHU01UHPCategory} label={t("adCategories.logistics")} />
                    <CategoryLink href={`/categories/${AD_TYPES.rims_and_tires}/`} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.rims_and_tires")} />

                    <CategoryLink href={`/categories/${AD_TYPES.repair_garages}/`} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.repair_garages")} />
                    <CategoryLink href={`/categories/${AD_TYPES.other}/`} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.other")} />
                </View>
            </ScrollView>
        </Container>
    )
}