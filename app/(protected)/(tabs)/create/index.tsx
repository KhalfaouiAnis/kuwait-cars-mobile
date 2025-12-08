import AdTypeSelector from "@/core/components/forms/ads/shared/ad-type-selector/ad-type-selector";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { AD_TYPES, CAR_BRAND_TYPES } from "@/core/constants/ad";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NewAdScreen() {
    const [adType, setAdType] = useState<any>(null)
    const router = useRouter();

    const handleNavigate = () => {
        if (!adType) return;

        const { pathname, params } = getAdMetadata(adType)
        console.log(params);
        router.push({ pathname: pathname as any, params })
    }

    return (
        <Container header={<ProfileHeader title="Post an Ad" />}>
            <View className="p-4 flex-1 dark:bg-darkish">
                <View>
                    <Text className="font-semibold mb-2 dark:text-white">WHAT ARE YOU SELLING?</Text>
                    <AdTypeSelector
                        data={CAR_BRAND_TYPES}
                        selectedValue={adType?.label}
                        onChange={type => setAdType(type)}
                        placeholder="Select Your Category"
                    />
                </View>
                <View className="mt-auto mb-4">
                    <TouchableOpacity
                        className="py-3 w-full rounded-lg bg-primary-500 disabled:bg-yellow-200"
                        onPress={handleNavigate}
                        disabled={!adType}
                    >
                        <Text className="text-center text-xl font-inter-semibold">
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
}

function getAdMetadata(params: { path: string, params: any }) {
    return {
        pathname: getPathname(params.path),
        params: params.params
    }
}

function getPathname(ad_type: string) {
    if ([AD_TYPES.used_cars, AD_TYPES.motorcycles, AD_TYPES.spare_parts, AD_TYPES.show].includes(ad_type)) return "/create/" + ad_type
    return "/create/commun"
}