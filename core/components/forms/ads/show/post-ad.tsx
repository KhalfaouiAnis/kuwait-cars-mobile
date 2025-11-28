import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { AdFormStepProps } from "@/core/types";
import { ShowCarAdInterface } from "@/core/types/schema/ads/showCar";
import { ScrollView, Text, View } from "react-native";
import VehicleMarkSelector from "../shared/ad-type-selector/vehicle-mark-selector";

export default function PostAd({ control, errors }: AdFormStepProps<ShowCarAdInterface>) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 10, rowGap: 8 }}
        >
            <View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2">WHAT ARE YOU SELLING?</Text>
                    <Text className="text-sm text-gray-300">Show Car</Text>
                </View>
                <VehicleMarkSelector
                    data={CAR_BRAND_TYPES}
                    control={control}
                    name="ad_type"
                />
            </View>
            <InputWithSpeech
                control={control}
                name="title"
                required
                maxLength={30}
                error={errors.title?.message}
                placeholder="Write Your Advertisement Title" />
            <InputWithSpeech
                control={control}
                name="description"
                maxLength={500}
                multiline
                required
                numberOfLines={4}
                error={errors.description?.message}
                placeholder="Write Your Advertisement Description"
            />
        </ScrollView>
    )
}
