import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { VehicleAdFormSteps } from "@/core/types/schema/vehicleAd";
import { Text, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";
import LocationInput from "../../ui/input/location-input";
import VehicleMarkSelector from "./select-option/vehicle-mark-selector";

export default function PostAd({ control, errors }: VehicleAdFormSteps) {
    return (
        <View className="gap-y-3">
            <View>
                <Text className="font-semibold mb-2">WHAT ARE YOU SELLING?</Text>
                <VehicleMarkSelector
                    data={CAR_BRAND_TYPES}
                    control={control}
                    name="car.mark"
                />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <Text className="font-semibold mb-2">WHERE IS YOUR LISTING?</Text>
                <LocationInput
                    control={control}
                    errors={errors}
                />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <Text className="font-semibold mb-2">INFORMATION</Text>
                <AdTextInput control={control} name="title" error={errors.title?.message} placeholder="Title" />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <AdTextInput control={control} name="price" error={errors.price?.message} placeholder="Price" keyboardType="number-pad" />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
        </View>
    )
}