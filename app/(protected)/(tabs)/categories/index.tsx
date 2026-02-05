import MainHeader from "@/core/components/layout/header/main-header";
import NewCategoryLink from "@/core/components/ui/_links/new-category-link";
import SpecialcategoryLink from "@/core/components/ui/_links/special-category-link";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import Container from "@/core/components/ui/container";
import { DIMENSIONS } from "@/core/constants";
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
                <View className="mt-12 px-4 gap-y-4 flex-row items-center justify-between">
                    <SpecialcategoryLink label="X AI" />
                    <SpecialcategoryLink label="Photo editor" />
                    <SpecialcategoryLink label="Tier size" />
                </View>
                <View className="w-full items-center px-4 mt-4">
                    <View className="w-full h-[55px] rounded-[22px] bg-white dark:border-[#46464640] border border-grayish">
                    </View>
                    <Text className="font-inter mt-0.5 dark:text-white">Display only</Text>
                </View>
                <View
                    style={boxShadow(4, 6, 20, 0, "rgba(168 168 168 / 1)").button}
                    className="mt-4 rounded-t-[36px] bg-white dark:bg-darkish pt-6 pb-48"
                >
                    <View className="gap-y-6 flex-row items-center justify-between flex-wrap px-4">
                        <View className="w-full items-center">
                            <View className="w-full h-[90px] rounded-[35px] dark:border-[#46464640] border dark:bg-white" />
                            <Text className="font-inter mt-2 dark:text-white">Used car sale</Text>
                        </View>
                        {/* <NewCategoryLink href={`/categories/${AD_TYPES.used_cars}/`} params={{ ad_type: AD_TYPES.used_cars }} image={IMAGES.BrakesCategory} label={t("adCategories.used_cars")} /> */}
                        <NewCategoryLink href={`/categories/${AD_TYPES.new_cars}/`} params={{ ad_type: AD_TYPES.new_cars }} image={IMAGES.BrakesCategory} label={t("adCategories.new_cars")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.motorcycles}/`} params={{ ad_type: AD_TYPES.motorcycles }} image={IMAGES.BrakesCategory} label={t("adCategories.motorcycles")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.classic_cars}/`} params={{ ad_type: AD_TYPES.classic_cars }} image={IMAGES.BrakesCategory} label={t("adCategories.classic_cars")} />

                        <NewCategoryLink href={`/categories/${AD_TYPES.car_rental_agencies}/`} params={{ ad_type: AD_TYPES.car_rental_agencies }} image={IMAGES.BrakesCategory} label={t("adCategories.car_rental_agencies")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.home_services}/`} params={{ ad_type: AD_TYPES.home_services }} image={IMAGES.BrakesCategory} label={t("adCategories.home_services")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.damaged_cars}/`} params={{ ad_type: AD_TYPES.damaged_cars }} image={IMAGES.BrakesCategory} label={t("adCategories.damaged_cars")} />

                        <NewCategoryLink href={`/categories/${AD_TYPES.parts_accessories}/`} params={{ ad_type: AD_TYPES.parts_accessories }} image={IMAGES.BrakesCategory} label={t("adCategories.parts_accessories")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.logistics}/`} params={{ ad_type: AD_TYPES.logistics }} image={IMAGES.BrakesCategory} label={t("adCategories.logistics")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.rims_and_tires}/`} params={{ ad_type: AD_TYPES.rims_and_tires }} image={IMAGES.BrakesCategory} label={t("adCategories.rims_and_tires")} />

                        <NewCategoryLink href="/categories/other/" params={{ ad_type: AD_TYPES.Other }} image={IMAGES.BrakesCategory} label={t("adCategories.Other")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.repair_garages}/`} params={{ ad_type: AD_TYPES.repair_garages }} image={IMAGES.BrakesCategory} label={t("adCategories.repair_garages")} />
                        <NewCategoryLink href={`/categories/${AD_TYPES.transport_delivery}/`} params={{ ad_type: AD_TYPES.transport_delivery }} image={IMAGES.BrakesCategory} label={t("adCategories.transport_delivery")} />
                    </View>
                    <View
                        className="items-center mx-auto justify-center my-8 rounded-[15px] dark:border-[#46464640] dark:bg-white"
                        style={{
                            boxShadow: boxShadow(0, 0, 22.9, 0, "rgba(000 000 000 / 0.2)").button.boxShadow,
                            width: DIMENSIONS.width - 10, height: 240
                        }}
                    >
                    </View>
                    <View className="dark:bg-darkish mt-1">
                        <Text className="font-inter-medium text-lg ms-3 dark:text-white">
                            {t("Last seen")}
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View
                                style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
                                className="bg-white rounded-2xl p-1 my-4 flex-row gap-x-2 items-center border border-transparent dark:border-[#46464640] dark:bg-black/50 ms-2 me-4">
                                <Image
                                    style={{ height: 130, width: 170, borderRadius: 15 }}
                                    source={IMAGES.CarHyunday}
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
                                className="bg-white rounded-2xl p-1 my-4 flex-row gap-x-2 items-center border border-transparent dark:border-[#46464640] dark:bg-black/50 me-4">
                                <Image
                                    source={IMAGES.CarHyunday}
                                    style={{ height: 130, width: 170, borderRadius: 15 }}
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
                </View>
            </ScrollView>
        </Container>
    )
}