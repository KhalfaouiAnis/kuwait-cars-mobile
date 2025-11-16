import AdTypeSelector from "@/core/components/forms/ad/select-option/ad-type-selector";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function NewAdScreen() {
    const [category, setCategory] = useState("")
    const router = useRouter();

    const handleNavigate = () => {
        if (!category) return;
        router.push({ pathname: "/create/flowOne", params: { category_id: category } })
    }

    return (
        <Container header={<ProfileHeader title="Post an Ad" />}>
            <View className="p-4 flex-1">
                <View>
                    <Text className="font-semibold mb-2">WHAT ARE YOU SELLING?</Text>
                    <AdTypeSelector
                        data={CAR_BRAND_TYPES}
                        selectedValue={category}
                        onChange={(value) => setCategory(value)}
                    />
                    <Text className="ms-4 text-gray-400">Required</Text>
                </View>
                <View className="mt-auto mb-4">
                    <TouchableOpacity
                        className="py-3 w-full rounded-lg bg-primary-500 disabled:bg-yellow-200"
                        onPress={handleNavigate}
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