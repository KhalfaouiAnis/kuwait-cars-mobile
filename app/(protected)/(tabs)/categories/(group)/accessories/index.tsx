import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { View } from "react-native";

export default function AccessoriesScreen() {
    return (
        <Container
            header={<MainHeader drawer back={false} />}
            scrollable
        >
            <View className="mt-4 mx-2 flex-row justify-center gap-3 flex-wrap">
                <CategoryLink href="/categories/4f5f4/" image={IMAGES.BrakesCategory} label="Cars for sale" />
                <CategoryLink href="/categories/4f5f4/" image={IMAGES.EngineCoolingSystemCategory} label="New cars" />
                <CategoryLink href="/categories/4f5f4/" image={IMAGES.AirConditionCategory} label="Motorcycles" />
                <CategoryLink href="/categories/4f5f4/" image={IMAGES.LexusNX250Category} label="Classic cars" />
                <CategoryLink href="/categories/4f5f4/" image={IMAGES.BlackHawkStreetHU01UHPCategory} label="Damaged cars" />
            </View>
        </Container>
    )
}