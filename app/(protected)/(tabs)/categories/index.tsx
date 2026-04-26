import ThreeDots from "@/assets/svg/ThreeDots";
import MainHeader from "@/core/components/layout/header/main/main-header";
import NewCategoryLink from "@/core/components/ui/_links/new-category-link";
import SocialLinks from "@/core/components/ui/_links/SocialLinks";
import SpecialcategoryLink from "@/core/components/ui/_links/special-category-link";
import { FavoriteButton } from "@/core/components/ui/button/favorite-button";
import Container from "@/core/components/ui/container";
import { DIMENSIONS } from "@/core/constants";
import { AD_TYPES } from "@/core/constants/ad";
import { IMAGES } from "@/core/constants/images";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CategoriesScreen() {
    const { isRTL } = useUserPreferencesStore()
    const { t } = useTranslation("common");
    const router = useRouter()

    return (
        // <Container header={<MainHeader drawer back={false} />}>
        <Container header={
            <MainHeader drawer back={false} />
            // <AutocompleteSearch
            //     placeholder="Search by title or description…"
            //     onSelect={(dataset) => {
            //         console.log(dataset);
            //         // navigate, populate a form, etc.
            //     }}
            // />
        }>
            <ScrollView showsVerticalScrollIndicator={false} style={{ direction: isRTL ? "rtl" : "ltr" }}>
                <View className="mt-6 px-6 flex-row items-center justify-between">
                    <SpecialcategoryLink label="X AI Cars" />
                    <SpecialcategoryLink label="Photo editor" />
                    <SpecialcategoryLink label="X Tier size" />
                </View>
                <Pressable
                    className="w-full items-center px-6 mt-4"
                    onPress={() => router.navigate("/categories/show")}
                >
                    <View className="w-full h-[75px] rounded-[22px] bg-white dark:border-[#46464640] border-[0.5px] border-grayish">
                    </View>
                    <Text className="font-inter mt-0.5 text-rose">X SHOW CARS</Text>
                </Pressable>
                <View
                    style={boxShadow(4, 6, 20, 0, "rgba(168 168 168 / 1)").button}
                    className="mt-4 rounded-t-[36px] bg-white dark:bg-darkish pt-6 pb-24"
                >
                    <View className="gap-y-6 flex-row items-start justify-between flex-wrap px-4">
                        <View className="w-full flex-row gap-4 px-1 mb-2">
                            <Link className="flex-1 items-center" href={{ pathname: "/categories/used_cars", params: { ad_type: AD_TYPES.used_cars } }} asChild>
                                <Pressable className="flex-1 items-center">
                                    <View className="w-full h-[90px] rounded-[35px] dark:border-[#46464640] border-[0.7px] border-grayish dark:bg-black" />
                                    <Text className="font-inter mt-2 text-blue dark:text-cyan">Used car sale</Text>
                                </Pressable>
                            </Link>
                            <Pressable
                                className="flex-1 items-center"
                            >
                                <View className="w-full h-[90px] rounded-[35px] dark:border-[#46464640] border-[0.7px] border-grayish dark:bg-black" />
                                <Text className="font-inter mt-2 text-blue dark:text-cyan">Quick Sale Videos</Text>
                            </Pressable>
                        </View>
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

                    {/* EMPTY BIG BOX */}
                    <View
                        className="relative self-center dark:bg-white"
                        style={{
                            boxShadow: boxShadow(0, 0, 22.9, 0, "rgba(000 000 000 / 0.2)").button.boxShadow,
                            width: DIMENSIONS.width - 30, height: 240, borderRadius: 25, marginTop: 40
                        }}
                    >
                        <View style={{
                            position: "absolute",
                            left: "46%",
                            bottom: 6,
                        }}>
                            <ThreeDots />
                        </View>
                    </View>

                    <TouchableOpacity className="p-1 rounded-full bg-[#00A6DA] self-end me-5 mt-2">
                        <Ionicons name="add" size={20} />
                    </TouchableOpacity>

                    {/* QUICK SALE VIEOS */}
                    <View className="dark:bg-darkish my-12 ms-2" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                        <Text className="font-inter-medium mb-2 text-base ms-6 text-orange">
                            {t("Quick Sale Videos")}
                        </Text>
                        <ScrollView
                            horizontal
                            // contentContainerClassName="py-4"
                            contentContainerStyle={{ marginVertical: 16 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View
                                style={[boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button, {
                                    width: 200, height: 300
                                }]}
                                className="bg-white rounded-[22px] ms-2 me-2">
                            </View>
                            <View
                                style={[boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button, {
                                    width: 200, height: 300
                                }]}
                                className="bg-white rounded-[22px] ms-2 me-2">
                            </View>
                            <View
                                style={[boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button, {
                                    width: 200, height: 300
                                }]}
                                className="bg-white rounded-[22px] ms-2 me-2">
                            </View>
                        </ScrollView>
                    </View>

                    {/* HIGHLAGHTED ADS */}
                    <View className="dark:bg-darkish ms-2" style={{ direction: isRTL ? "rtl" : "ltr" }}>
                        <Text className="font-inter-medium text-base ms-6 text-orange">
                            {t("Highlighted ads")}
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="ps-3"
                        >
                            <View
                                style={boxShadow(0, 4, 4).button}
                                className="bg-white rounded-[20px] p-1 my-4 items-center border-[0.5px] border-grayish dark:border-[#46464640] dark:bg-black/50 me-4">
                                <Image
                                    source={IMAGES.CarHyunday}
                                    style={{ height: 130, width: 158, borderRadius: 20 }}
                                    contentFit="cover"
                                />
                                <View className="px-2 mt-3">
                                    <View className="flex-row gap-1 items-center">
                                        <Image
                                            style={{ height: 12, width: 12, borderRadius: 100 }}
                                            source={IMAGES.CarMercedesLogo}
                                            contentFit="fill"
                                        />
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            className="font-inter-medium text-sm max-w-36 dark:text-white"
                                        >
                                            Chevrxyz - Corvette
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center justify-end">
                                        <View className="justify-center">
                                            <Text className="font-inter text-sm max-w-36 dark:text-white">
                                                C-Class
                                            </Text>
                                            <Text className="font-inter text-sm max-w-36 dark:text-white">
                                                2023
                                            </Text>
                                            <Text className="me-10 font-inter text-sm dark:text-cyan text-blue">
                                                KWD 52500
                                            </Text>
                                        </View>
                                        <FavoriteButton
                                            onPress={() => { }}
                                            isFavorite={false}
                                            size={30}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View
                                style={boxShadow(0, 4, 4).button}
                                className="bg-white rounded-[20px] p-1 my-4 items-center border-[0.5px] border-grayish dark:border-[#46464640] dark:bg-black/50 me-4">
                                <Image
                                    source={IMAGES.CarHyunday}
                                    style={{ height: 130, width: 158, borderRadius: 20 }}
                                    contentFit="cover"
                                />
                                <View className="px-2 mt-3">
                                    <View className="flex-row gap-1 items-center">
                                        <Image
                                            style={{ height: 12, width: 12, borderRadius: 100 }}
                                            source={IMAGES.CarMercedesLogo}
                                            contentFit="fill"
                                        />
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            className="font-inter-medium text-sm max-w-36 dark:text-white"
                                        >
                                            Chevrxyz - Corvette
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center justify-end">
                                        <View className="justify-center">
                                            <Text className="font-inter text-sm max-w-36 dark:text-white">
                                                C-Class
                                            </Text>
                                            <Text className="font-inter text-sm max-w-36 dark:text-white">
                                                2023
                                            </Text>
                                            <Text className="me-10 font-inter text-sm dark:text-cyan text-blue">
                                                KWD 52500
                                            </Text>
                                        </View>
                                        <FavoriteButton
                                            onPress={() => { }}
                                            isFavorite={false}
                                            size={30}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View
                                style={boxShadow(0, 4, 4).button}
                                className="bg-white rounded-[20px] p-1 my-4 items-center border-[0.5px] border-grayish dark:border-[#46464640] dark:bg-black/50 me-4">
                                <Image
                                    source={IMAGES.CarHyunday}
                                    style={{ height: 130, width: 158, borderRadius: 20 }}
                                    contentFit="cover"
                                />
                                <View className="px-2 mt-3">
                                    <View className="flex-row gap-1 items-center">
                                        <Image
                                            style={{ height: 12, width: 12, borderRadius: 100 }}
                                            source={IMAGES.CarMercedesLogo}
                                            contentFit="fill"
                                        />
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            className="font-inter-medium text-sm max-w-36 dark:text-white"
                                        >
                                            Chevrxyz - Corvette
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center justify-end">
                                        <View className="justify-center">
                                            <Text className="font-inter text-sm max-w-36 dark:text-white">
                                                C-Class
                                            </Text>
                                            <Text className="font-inter text-sm max-w-36 dark:text-white">
                                                2023
                                            </Text>
                                            <Text className="me-10 font-inter text-sm dark:text-cyan text-blue">
                                                KWD 52500
                                            </Text>
                                        </View>
                                        <FavoriteButton
                                            onPress={() => { }}
                                            isFavorite={true}
                                            size={30}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* EMPTY BIG BOX */}
                    <View
                        className="self-center dark:bg-white"
                        style={{
                            boxShadow: boxShadow(0, 0, 22.9, 0, "rgba(000 000 000 / 0.2)").button.boxShadow,
                            width: DIMENSIONS.width - 30, height: 240, borderRadius: 25, marginTop: 40
                        }}
                    >
                        <View style={{
                            position: "absolute",
                            left: "46%",
                            bottom: 6,
                        }}>
                            <ThreeDots />
                        </View>
                    </View>
                    <TouchableOpacity className="p-1 dark:bg-black bg-white self-end me-5 mt-2 rounded-3xl py-1 border border-grayish dark:border-grayish/20">
                        <Text className="dark:text-[#FBFBFB] text-xs font-inter">Add Ad +</Text>
                    </TouchableOpacity>

                    {/* LAST SEEN */}
                    <View className="dark:bg-darkish ms-2" style={{ direction: isRTL ? "rtl" : "ltr", marginTop: 40 }}>
                        <Text className="font-inter-medium text-base ms-6 text-orange">
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
                                <View className="pe-2 ms-2">
                                    <View className="flex-row gap-1 items-center">
                                        <Image
                                            style={{ height: 14, width: 14, borderRadius: 100 }}
                                            source={IMAGES.CarMercedesLogo}
                                            contentFit="contain"
                                        />
                                        <Text className="font-inter max-w-36 dark:text-white" numberOfLines={2}>
                                            MERCEDES BENZ
                                        </Text>
                                    </View>
                                    <View className="justify-between">
                                        <View>
                                            <Text className="font-inter text-base max-w-36 dark:text-white">
                                                C-CLASS
                                            </Text>
                                            <Text className="font-inter text-base max-w-36 dark:text-white">
                                                2023
                                            </Text>
                                            <Text className="font-inter text-base dark:text-cyan text-blue">
                                                KWD 52500
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="self-end">
                                        <FavoriteButton
                                            onPress={() => { }}
                                            isFavorite={true}
                                            size={30}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View
                                style={boxShadow(0, 0, 12.9, 0, "rgba(000 000 000 / 0.2)").button}
                                className="bg-white rounded-2xl p-1 my-4 flex-row gap-x-2 items-center border border-transparent dark:border-[#46464640] dark:bg-black/50 ms-2 me-4">
                                <Image
                                    style={{ height: 130, width: 170, borderRadius: 15 }}
                                    source={IMAGES.CarHyunday}
                                    contentFit="cover"
                                />
                                <View className="pe-2 ms-2">
                                    <View className="flex-row gap-1 items-center">
                                        <Image
                                            style={{ height: 14, width: 14, borderRadius: 100 }}
                                            source={IMAGES.CarMercedesLogo}
                                            contentFit="contain"
                                        />
                                        <Text className="font-inter max-w-36 dark:text-white" numberOfLines={2}>
                                            MERCEDES BENZ
                                        </Text>
                                    </View>
                                    <View className="justify-between">
                                        <View>
                                            <Text className="font-inter text-base max-w-36 dark:text-white">
                                                C-CLASS
                                            </Text>
                                            <Text className="font-inter text-base max-w-36 dark:text-white">
                                                2023
                                            </Text>
                                            <Text className="font-inter text-base dark:text-cyan text-blue">
                                                KWD 52500
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="self-end">
                                        <FavoriteButton
                                            onPress={() => { }}
                                            isFavorite={false}
                                            size={30}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    {/* EMPTY BIG BOX */}
                    <View
                        className="self-center dark:bg-white"
                        style={{
                            boxShadow: boxShadow(0, 0, 22.9, 0, "rgba(000 000 000 / 0.2)").button.boxShadow,
                            width: DIMENSIONS.width - 30, height: 240, borderRadius: 25, marginTop: 40,
                        }}
                    >
                        <View style={{
                            position: "absolute",
                            left: "46%",
                            bottom: 6,
                        }}>
                            <ThreeDots />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ marginBottom: 80 }}
                        className="p-1 dark:bg-black bg-white self-end me-5 mt-2 rounded-3xl py-1 border border-grayish dark:border-grayish/20">
                        <Text className="dark:text-[#FBFBFB] text-xs font-inter">Add Ad +</Text>
                    </TouchableOpacity>

                    {/* SOCIAL LINKS */}
                    <SocialLinks />
                </View>
            </ScrollView>
        </Container>
    )
}