import MainHeader from "@/core/components/layout/header/main-header";
import NewCategoryLink from "@/core/components/ui/_links/new-category-link";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import Container from "@/core/components/ui/container";
import { AD_TYPES } from "@/core/constants/ad";
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

export default function CategoriesScreen() {
    const { t } = useTranslation("common");

    return (
        <Container header={<MainHeader drawer back={false} />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-4 mx-2 gap-y-4 flex-row justify-center gap-6">
                    <NewCategoryLink href={`/categories/${AD_TYPES.used_cars}/`} params={{ ad_type: AD_TYPES.used_cars }} image={IMAGES.BrakesCategory} label={t("X_AI")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.new_cars}/`} params={{ ad_type: AD_TYPES.new_cars }} image={IMAGES.EngineCoolingSystemCategory} label={t("AI photo editor")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.motorcycles}/`} params={{ ad_type: AD_TYPES.motorcycles }} image={IMAGES.AirConditionCategory} label={t("tier size")} />
                </View>
                <View className="w-full items-center px-2 mt-4">
                    <View className="w-full h-[55px] rounded-[22px] border">
                    </View>
                    <Text className="font-inter mt-2">Display only</Text>
                </View>
                <View
                    style={boxShadow(4, 6, 20, 0, "rgba(168 168 168 / 1)").button}
                    className="mt-4 gap-y-4 flex-row justify-center gap-6 flex-wrap rounded-t-[36px] bg-white pt-6"
                >
                    <View className="w-full items-center px-2">
                        <View className="w-full h-[90px] rounded-[35px] border" />
                        <Text className="font-inter mt-2">Used car sale</Text>
                    </View>
                    <NewCategoryLink href={`/categories/${AD_TYPES.used_cars}/`} params={{ ad_type: AD_TYPES.used_cars }} image={IMAGES.BrakesCategory} label={t("adCategories.used_cars")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.new_cars}/`} params={{ ad_type: AD_TYPES.new_cars }} image={IMAGES.EngineCoolingSystemCategory} label={t("adCategories.new_cars")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.motorcycles}/`} params={{ ad_type: AD_TYPES.motorcycles }} image={IMAGES.AirConditionCategory} label={t("adCategories.motorcycles")} />

                    <NewCategoryLink href={`/categories/${AD_TYPES.classic_cars}/`} params={{ ad_type: AD_TYPES.classic_cars }} image={IMAGES.LexusNX250Category} label={t("adCategories.classic_cars")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.show}/`} params={{ ad_type: AD_TYPES.show }} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.show")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.car_rental_agencies}/`} params={{ ad_type: AD_TYPES.car_rental_agencies }} image={IMAGES.ZerexG05PhosphateCategory} label={t("adCategories.car_rental_agencies")} />

                    <NewCategoryLink href={`/categories/${AD_TYPES.spare_parts}/`} params={{ ad_type: AD_TYPES.spare_parts }} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.spare_parts")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.home_services}/`} params={{ ad_type: AD_TYPES.home_services }} image={IMAGES.CarAccessoriesCategory} label={t("adCategories.home_services")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.damaged_cars}/`} params={{ ad_type: AD_TYPES.damaged_cars }} image={IMAGES.BlackHawkStreetHU01UHPCategory} label={t("adCategories.damaged_cars")} />

                    <NewCategoryLink href={`/categories/${AD_TYPES.accessories}/`} params={{ ad_type: AD_TYPES.accessories }} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.accessories")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.logistics}/`} params={{ ad_type: AD_TYPES.logistics }} image={IMAGES.BlackHawkStreetHU01UHPCategory} label={t("adCategories.logistics")} />
                    <NewCategoryLink href={`/categories/${AD_TYPES.rims_and_tires}/`} params={{ ad_type: AD_TYPES.rims_and_tires }} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.rims_and_tires")} />

                    <NewCategoryLink href={`/categories/${AD_TYPES.repair_garages}/`} params={{ ad_type: AD_TYPES.repair_garages }} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.repair_garages")} />
                    <NewCategoryLink href="/categories/other/" params={{ ad_type: AD_TYPES.Other }} image={IMAGES.BMW3SeriesE46Category} label={t("adCategories.Other")} />

                    <View
                        className="w-full items-center px-2 rounded-[15px]"
                        style={boxShadow(0, 0, 22.9, 0, "rgba(000 000 000 / 0.2)").button}
                    >
                        <View className="items-center justify-center w-full h-[240px] rounded-[15px]">
                            <Text>Hello</Text>
                        </View>
                    </View>
                </View>
                <View className="gap-y-1 mt-6 mb-24">
                    <Text className="font-inter-semibold ms-3">
                        {t("Last seen")}
                    </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View
                            style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
                            className="bg-white rounded-2xl py-1 my-4 px-2 flex-row gap-x-2 items-center border border-transparent dark:bg-black ms-4 me-4">
                            <Image
                                source={IMAGES.CarHyunday}
                                style={{ height: 80, width: 130, borderRadius: 16 }}
                                contentFit="cover"
                            />
                            <View className="gap-y-5">
                                <Text
                                    className="font-inter-medium max-w-36 dark:text-white"
                                    numberOfLines={2}
                                >
                                    Mercedes Benz C-Class - 2023
                                </Text>
                                <View className="flex-row items-center justify-end">
                                    <Text className="me-10 font-inter-medium dark:text-white">
                                        $52500
                                    </Text>
                                    <FavoriteButton
                                        isFavorite={false}
                                        onPress={() => { }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View
                            style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
                            className="bg-white rounded-2xl py-1 my-4 px-2 flex-row gap-x-2 items-center border border-transparent dark:bg-black me-4">
                            <Image
                                source={IMAGES.CarHyunday}
                                style={{ height: 80, width: 130, borderRadius: 16 }}
                                contentFit="cover"
                            />
                            <View className="gap-y-5">
                                <Text
                                    className="font-inter-medium max-w-36 dark:text-white"
                                    numberOfLines={2}
                                >
                                    Mercedes Benz C-Class - 2023
                                </Text>
                                <View className="flex-row items-center justify-end">
                                    <Text className="me-10 font-inter-medium dark:text-white">
                                        $52500
                                    </Text>
                                    <FavoriteButton
                                        isFavorite={false}
                                        onPress={() => { }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </Container>
    )
}