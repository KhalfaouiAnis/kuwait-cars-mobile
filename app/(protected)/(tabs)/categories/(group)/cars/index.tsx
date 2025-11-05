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
                <CategoryLink href="/categories/4f5f4/" image={images.BrakesCategory} label="Cars for sale" />
                <CategoryLink href="/categories/4f5f4/" image={images.EngineCoolingSystemCategory} label="New cars" />
                <CategoryLink href="/categories/4f5f4/" image={images.AirConditionCategory} label="Motorcycles" />
                <CategoryLink href="/categories/4f5f4/" image={images.LexusNX250Category} label="Classic cars" />
                <CategoryLink href="/categories/4f5f4/" image={images.BlackHawkStreetHU01UHPCategory} label="Damaged cars" />
            </View>
        </Container>
    )
}