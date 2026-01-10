import MainHeader from "@/core/components/layout/header/main-header";
import CategoryLink from "@/core/components/ui/_links/category-link";
import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function MotorcycleCategoriesScreen() {
    const { ad_type } = useLocalSearchParams<{ ad_type: string }>()
    const { t } = useTranslation("car_categories")

    return (
        <Container header={<MainHeader back />}>
            <View className="mt-4">
                <Text className="text-center font-semibold text-xl">{t("BikesCategories")}</Text>
            </View>
            <View className="mt-4 mx-2 p-4 flex-row justify-start gap-3 flex-wrap">
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        params={{ ad_type, ad_category: 'sport' }}
                        href="/categories/motorcycles/sport"
                        image={IMAGES.BrakesCategory}
                        label={t("SportsMotorcycles")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        params={{ ad_type, ad_category: 'quad' }}
                        href="/categories/motorcycles/quad"
                        image={IMAGES.EngineCoolingSystemCategory}
                        label={t("QuadBikes")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        params={{ ad_type, ad_category: 'bikes' }}
                        href="/categories/motorcycles/bikes"
                        image={IMAGES.AirConditionCategory}
                        label={t("Bicycles")} />
                </View>
                <View className="w-[48%]">
                    <CategoryLink
                        fullWidth
                        params={{ ad_type, ad_category: 'scooter' }}
                        href="/categories/motorcycles/scooter"
                        image={IMAGES.LexusNX250Category}
                        label={t("Scooter")} />
                </View>
            </View>
            <View className="mt-4">
                <Text className="text-center font-semibold text-xl mb-4">New arrivals</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent elevation-sm me-4">
                        <Image source={IMAGES.CarChevrolet} style={{ height: 80, width: 130, objectFit: "cover", borderRadius: 8 }} />
                        <View className="gap-y-5">
                            <Text className="font-inter-medium max-w-36" numberOfLines={2}>Honda Beat - 2023</Text>
                            <View className="flex-row items-center justify-end">
                                <Text className="me-10 font-inter-medium">$52500</Text>
                                <Pressable>
                                    <Ionicons name="star-outline" size={20} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent elevation-sm me-4">
                        <Image source={IMAGES.CarChevrolet} style={{ height: 80, width: 130, objectFit: "cover", borderRadius: 8 }} />
                        <View className="gap-y-5">
                            <Text className="font-inter-medium max-w-36" numberOfLines={2}>Chevrolet Corvette - 2023</Text>
                            <View className="flex-row items-center justify-end">
                                <Text className="me-10 font-inter-medium">$52500</Text>
                                <Pressable>
                                    <Ionicons name="star-outline" size={20} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent elevation-sm me-4">
                        <Image source={IMAGES.CarChevrolet} style={{ height: 80, width: 130, objectFit: "cover", borderRadius: 8 }} />
                        <View className="gap-y-5">
                            <Text className="font-inter-medium max-w-36" numberOfLines={2}>Toyota - 2021</Text>
                            <View className="flex-row items-center justify-end">
                                <Text className="me-10 font-inter-medium">$52500</Text>
                                <Pressable>
                                    <Ionicons name="star-outline" size={20} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Container>
    )
}