import { CITIES } from "@/core/constants";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { VehicleAdFormSteps } from "@/core/types/schema/vehicleAd";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";
import LocationInput from "../../ui/input/location-input";
import SelectInput from "../../ui/input/select-input";
import { renderLocationOption } from "./select-option/render-option";
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
                <View className="flex-row items-center justify-center gap-x-4">
                    <View className="flex-1">
                        <SelectInput
                            control={control}
                            name="province"
                            options={CITIES}
                            renderOption={renderLocationOption}
                            placeholder="Province"
                            icon={<MaterialCommunityIcons name="town-hall" size={24} color="black" />}
                        />
                    </View>
                    <View className="flex-1">
                        <AdTextInput control={control} name="price" error={errors.price?.message} placeholder="Price" keyboardType="number-pad" />
                    </View>
                </View>
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <View className="flex-row items-center justify-center gap-x-2">
                    <View className="flex-1">
                        <LocationInput
                            control={control}
                            errors={errors}
                        />
                    </View>
                    
                    <View className="flex-1">
                        <AdTextInput control={control} name="zip_code" error={errors.zip_code?.message} placeholder="Zip code"
                            icon={<MaterialCommunityIcons name="email-seal-outline" size={24} color="black" className="mt-2" />} />
                    </View>
                </View>
                <View >
                    <Text className="ms-4 text-gray-400">Required</Text>
                </View>
            </View>
            <View>
                <AdTextInput control={control} name="title" error={errors.title?.message} placeholder="Title" />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <AdTextInput
                    control={control}
                    name="description"
                    error={errors.description?.message} placeholder="Advertisement Description"
                    multiline
                    numberOfLines={3}
                    style={{ height: 80 }}
                />
                <Text className="ms-auto text-gray-400 mt-1">Left: 100</Text>
            </View>
        </View>
    )
}