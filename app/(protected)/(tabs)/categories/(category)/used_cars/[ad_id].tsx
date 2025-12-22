import Container from "@/core/components/ui/container";
import { IMAGES } from "@/core/constants/images";
import useUserPreferencesStore from "@/core/store/preferences.store";
import useRecentlyViewedStore from "@/core/store/recently-viewed-ad.store";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function UsedCarDetailsScreen() {
    const { isRTL } = useUserPreferencesStore()
    const { ad_id } = useLocalSearchParams();
    const addView = useRecentlyViewedStore((state) => state.addView);

    useEffect(() => {
        if (ad_id) {
            addView(ad_id as string);
        }
    }, [ad_id, addView]);

    return (
        <Container scrollable header={
            <View className="flex-row items-center justify-between mb-2 mt-4 px-4">
                <Pressable onPress={() => router.back()}><Ionicons name={isRTL ? 'chevron-forward' : 'chevron-back'} size={22} /></Pressable>
                <View className="flex-row items-center gap-x-3">
                    <Pressable><Ionicons name="flag" size={22} color={"red"} /></Pressable>
                    <Feather name="share-2" size={22} color="black" />
                    <Pressable><Ionicons name="star-outline" size={22} /></Pressable>
                </View>
            </View>
        }>
            <View className="flex-1 p-1">
                <View className="">
                    <Image source={IMAGES.CarHyunday} style={{ height: 260, objectFit: "cover", borderRadius: 8 }} />
                    <View className="w-full rounded-lg flex-row gap-x-2 items-center justify-center bg-[#EFE4E4] mt-[2px] py-2">
                        <View className="p-2 rounded-lg bg-white">
                            <Image source={IMAGES.CarHyunday} style={{ height: 70, width: 90, objectFit: "cover", borderRadius: 8 }} />
                        </View>
                        <View className="p-2 rounded-lg bg-white">
                            <Image source={IMAGES.CarMercedes} style={{ height: 70, width: 90, objectFit: "cover", borderRadius: 8 }} />
                        </View>
                        <View className="p-2 rounded-lg bg-white">
                            <Image source={IMAGES.CarChevrolet} style={{ height: 70, width: 90, objectFit: "cover", borderRadius: 8 }} />
                        </View>
                    </View>
                    <View className="px-4">
                        <View className="gap-y-2 py-1">
                            <Text className="font-inter-semibold">CHEVEROLET CORVETTE</Text>
                            <View className="flex-row items-center justify-between">
                                <Text className="font-inter-medium text-lg">Hyunday Tucson</Text>
                                <Text className="font-inter-semibold text-lg">$52500</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="location-outline" size={22} />
                                <Text className="font-inter text-base">Kuwait</Text>
                                <Text className="font-inter text-gray-400 ms-1">1km</Text>
                            </View>
                        </View>
                        <View className="border-y border-gray-200 gap-y-2 py-3">
                            <View className="flex-row items-center justify-between">
                                <Text className="font-inter-bold">Specification</Text>
                                <Text className="font-inter text-xs text-gray-400">07/10/2025</Text>
                            </View>
                            <View className="flex-row items-center justify-center gap-x-3">
                                <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-4 ">
                                    <Text className="font-inter-semibold">2023</Text>
                                    <Text>Year</Text>
                                </View>
                                <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-4 ">
                                    <Text className="font-inter-semibold">Km</Text>
                                    <Text className="text-sm text-gray-400">192.354</Text>
                                </View>
                                <View className="border border-primary-500 rounded-md items-center justify-center py-1 px-4 ">
                                    <Text className="font-inter-semibold">MANUAL</Text>
                                    <Text>Transmission</Text>
                                </View>
                            </View>
                        </View>
                        <View className="gap-y-1 py-3">
                            <Text className="font-inter-bold">Description</Text>
                            <Text numberOfLines={3} className="font-inter font-light text-start">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempora corrupti repudiandae,
                                aut eius recusandae placeat laboriosam omnis officiis vel sed aspernatur voluptatibus vero dolor
                                aliquid quidem, nobis debitis nihil.
                            </Text>
                        </View>
                        <View>
                            <View className="flex-row items-center border border-primary-500 rounded-lg p-2 gap-x-2">
                                <Image source={IMAGES.Mohamed} style={{ borderRadius: 50, width: 40, height: 40, objectFit: 'cover' }} />
                                <View>
                                    <Text className="font-inter-semibold">Abu Mohamed</Text>
                                    <Text>Since 2025</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center justify-center gap-x-6 mt-3">
                                <View className="border border-primary-500 py-1 px-3 rounded-lg items-center min-w-24">
                                    <Ionicons name="chatbox-ellipses-outline" size={24} color={"#00A6DA"} />
                                    <Text className="font-inter text-xs">Chat</Text>
                                </View>
                                <View className="border border-primary-500 py-1 px-3 rounded-lg items-center min-w-24">
                                    <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                                    <Text className="font-inter text-xs">WhatsApp</Text>
                                </View>
                                <View className="border border-primary-500 py-1 px-3 rounded-lg items-center min-w-24">
                                    <Ionicons name="call-outline" size={24} color={"#25D366"} />
                                    <Text className="font-inter text-xs">Contact</Text>
                                </View>
                            </View>
                        </View>
                        <View className="gap-y-1 mt-2 mb-4">
                            <Text className="font-inter-semibold">Similar ads</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View className="bg-white rounded-xl py-1 px-2 flex-row gap-x-2 items-center border border-transparent elevation-sm me-4">
                                    <Image source={IMAGES.CarChevrolet} style={{ height: 80, width: 130, objectFit: "cover", borderRadius: 8 }} />
                                    <View className="gap-y-5">
                                        <Text className="font-inter-medium max-w-36" numberOfLines={2}>Mercedes Benz C-Class - 2023</Text>
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
                    </View>
                </View>
            </View>
        </Container>
    )
}