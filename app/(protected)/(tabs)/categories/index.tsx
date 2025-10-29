import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { images } from "@/core/constants/images";
import { View } from "react-native";

export default function CategoriesScreen() {
    return (
        <Container
            header={<MainHeader drawer back={false} />}
            scrollable
        >
            <View className="mt-4 mx-2 flex-row justify-center gap-3 flex-wrap">
                <CategoryLink href="/categories/4f5f4/" image={images.BrakesCategory} label="Brakes" />
                <CategoryLink href="/categories/4f5f4/" image={images.CarAccessoriesCategory} label="Car Accessories" />
                <CategoryLink href="/categories/4f5f4/" image={images.EngineCoolingSystemCategory} label="Engine cooling" />
                <CategoryLink href="/categories/4f5f4/" image={images.ZerexG05PhosphateCategory} label="Zerex Phosphate" />
                <CategoryLink href="/categories/4f5f4/" image={images.AirConditionCategory} label="Air Condition" />
                <CategoryLink href="/categories/4f5f4/" image={images.LexusNX250Category} label="Lexus NX250" />
                <CategoryLink href="/categories/4f5f4/" image={images.BlackHawkStreetHU01UHPCategory} label="Black Hawk Street" />
                <CategoryLink href="/categories/4f5f4/" image={images.BMW3SeriesE46Category} label="BMW 3 Series" />
            </View>
        </Container>
    )
}