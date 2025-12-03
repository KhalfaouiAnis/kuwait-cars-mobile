import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { AD_TYPES } from "@/core/constants/ad";
import { IMAGES } from "@/core/constants/images";
import { ScrollView, View } from "react-native";

export default function CategoriesScreen() {
    return (
        <Container header={<MainHeader drawer back={false} />}>
            <ScrollView style={{ marginBottom: 72 }} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                <View className="mt-4 mx-2 flex-row justify-center gap-3 flex-wrap">
                    <CategoryLink href={`/categories/${AD_TYPES.used_cars}/`} image={IMAGES.BrakesCategory} label="Used cars" />
                    <CategoryLink href={`/categories/${AD_TYPES.new_cars}/`} image={IMAGES.EngineCoolingSystemCategory} label="New cars" />
                    <CategoryLink href={`/categories/${AD_TYPES.motorcycles}/`} image={IMAGES.AirConditionCategory} label="Motorcycles" />

                    <CategoryLink href={`/categories/${AD_TYPES.classic_cars}/`} image={IMAGES.LexusNX250Category} label="Classic cars" />
                    <CategoryLink href={`/categories/${AD_TYPES.show}/`} image={IMAGES.BMW3SeriesE46Category} label="Show car" />
                    <CategoryLink href={`/categories/${AD_TYPES.car_rental_agencies}/`} image={IMAGES.ZerexG05PhosphateCategory} label="Car Rental Agencies" />

                    <CategoryLink href={`/categories/${AD_TYPES.spare_parts}/`} image={IMAGES.BMW3SeriesE46Category} label="Part car" />
                    <CategoryLink href={`/categories/${AD_TYPES.home_services}/`} image={IMAGES.CarAccessoriesCategory} label="Home services for car" />
                    <CategoryLink href={`/categories/${AD_TYPES.damaged_cars}/`} image={IMAGES.BlackHawkStreetHU01UHPCategory} label="Damaged cars" />

                    <CategoryLink href={`/categories/${AD_TYPES.accessories}/`} image={IMAGES.BMW3SeriesE46Category} label="Accessories" />
                    <CategoryLink href={`/categories/${AD_TYPES.logistics}/`} image={IMAGES.BlackHawkStreetHU01UHPCategory} label="Winch + External charging" />
                    <CategoryLink href={`/categories/${AD_TYPES.rims_and_tires}/`} image={IMAGES.BMW3SeriesE46Category} label="Rims and tires" />

                    <CategoryLink href={`/categories/${AD_TYPES.repair_garages}/`} image={IMAGES.BMW3SeriesE46Category} label="Repair garages" />
                    <CategoryLink href={`/categories/${AD_TYPES.other}/`} image={IMAGES.BMW3SeriesE46Category} label="Other" />
                </View>
            </ScrollView>
        </Container>
    )
}