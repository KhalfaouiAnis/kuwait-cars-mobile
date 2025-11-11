import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { ScrollView, View } from "react-native";

export default function CategoriesScreen() {
    return (
        <Container header={<MainHeader drawer back={false} />}>
            <ScrollView style={{ marginBottom: 80 }} showsVerticalScrollIndicator={false}>
                <View className="mt-4 mx-2 flex-row justify-center gap-3 flex-wrap">
                    <CategoryLink href="/categories/4f5f4/" image={images.BrakesCategory} label="Cars for sale" />
                    <CategoryLink href="/categories/4f5f4/" image={images.CarAccessoriesCategory} label="Home services" />
                    <CategoryLink href="/categories/4f5f4/" image={images.EngineCoolingSystemCategory} label="New cars" />

                    <CategoryLink href="/categories/4f5f4/" image={images.ZerexG05PhosphateCategory} label="Car Rental Agencies" />
                    <CategoryLink href="/categories/4f5f4/" image={images.AirConditionCategory} label="Motorcycles" />
                    <CategoryLink href="/categories/4f5f4/" image={images.LexusNX250Category} label="Classic cars" />

                    <CategoryLink href="/categories/4f5f4/" image={images.BlackHawkStreetHU01UHPCategory} label="Damaged cars" />
                    <CategoryLink href="/categories/4f5f4/" image={images.BMW3SeriesE46Category} label="Rims and tires" />
                    <CategoryLink href="/categories/4f5f4/" image={images.BMW3SeriesE46Category} label="spare parts" />

                    <CategoryLink href="/categories/4f5f4/" image={images.BlackHawkStreetHU01UHPCategory} label="Logistics" />
                    <CategoryLink href="/categories/4f5f4/" image={images.BMW3SeriesE46Category} label="Repair garages" />
                    <CategoryLink href="/categories/4f5f4/" image={images.BMW3SeriesE46Category} label="offer" />

                    <CategoryLink href="/categories/4f5f4/" image={images.BMW3SeriesE46Category} label="Accessories" />
                    <CategoryLink href="/categories/4f5f4/" image={images.BMW3SeriesE46Category} label="Other" />
                </View>
            </ScrollView>
        </Container>
    )
}