import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { Text, View } from "react-native";

export default function MotorcycleCategoriesScreen() {
    return (
        <Container header={<MainHeader back />} scrollable>
            <View className="mt-4">
                <Text className="text-center font-semibold text-xl">Home services Categories</Text>
            </View>
            <View className="mt-4 mx-2 p-4 flex-row justify-start gap-3 flex-wrap">
                <View className="w-[48%]">
                    <CategoryLink fullWidth href="/categories/home_services/washing" image={IMAGES.BrakesCategory} label="Washing and polishing" />
                </View>
                <View className="w-[48%]">
                    <CategoryLink fullWidth href="/categories/home_services/protection" image={IMAGES.EngineCoolingSystemCategory} label="Protection and shading" />
                </View>
                <View className="w-[48%]">
                    <CategoryLink fullWidth href="/categories/home_services/batteries" image={IMAGES.AirConditionCategory} label="Tire repair, batteries" />
                </View>
                <View className="w-[48%]">
                    <CategoryLink fullWidth href="/categories/home_services/check" image={IMAGES.LexusNX250Category} label="Check, oil, filter" />
                </View>
                <View className="w-[48%]">
                    <CategoryLink fullWidth href="/categories/home_services/keys" image={IMAGES.LexusNX250Category} label="Keys and remote" />
                </View>
                <View className="w-[48%]">
                    <CategoryLink fullWidth href="/categories/home_services/insurance" image={IMAGES.LexusNX250Category} label="Insurance" />
                </View>
                <View className="w-[48%]">
                    <CategoryLink fullWidth href="/categories/home_services/other" image={IMAGES.LexusNX250Category} label="Other" />
                </View>
            </View>
        </Container>
    )
}