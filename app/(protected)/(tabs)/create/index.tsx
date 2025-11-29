import AdTypeSelector from "@/core/components/forms/ads/shared/ad-type-selector/ad-type-selector";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { Ad_CATEGORIES, CAR_BRAND_TYPES } from "@/core/constants/ad";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NewAdScreen() {
    const [adType, setAdType] = useState<string>("")
    const router = useRouter();

    const handleNavigate = () => {
        if (!adType && adType?.length === 0) return;
        const { ad_type, pathname } = getAdMetadata(adType.split(";"))
        router.push({ pathname: pathname as any, params: { ad_type } })
    }

    return (
        <Container header={<ProfileHeader title="Post an Ad" />}>
            <View className="p-4 flex-1">
                <View>
                    <Text className="font-semibold mb-2">WHAT ARE YOU SELLING?</Text>
                    <AdTypeSelector
                        data={CAR_BRAND_TYPES}
                        selectedValue={adType}
                        required
                        onChange={type => setAdType(type)}
                        placeholder="Select Your adType"
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

function getAdMetadata(adData: string[]) {
    return {
        ad_type: adData[0],
        pathname: getPathname(adData[0])
    }
}

function getPathname(ad_type: string) {
    if ([Ad_CATEGORIES[0], Ad_CATEGORIES[4], Ad_CATEGORIES[4], Ad_CATEGORIES[11], Ad_CATEGORIES[13]].includes(ad_type)) return "/create/" + ad_type
    return "/create/commun"
}