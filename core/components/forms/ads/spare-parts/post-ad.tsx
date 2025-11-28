import AdTextInput from "@/core/components/ui/input/ad-text-input";
import LocationInput from "@/core/components/ui/input/location-input";
import SelectInput from "@/core/components/ui/input/select-input";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import { CITIES } from "@/core/constants";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { AdFormStepProps } from "@/core/types";
import { SparePartAdInterface } from "@/core/types/schema/ads/sparePart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { renderLocationOption } from "../../../ui/shared/render-option";
import VehicleMarkSelector from "../shared/ad-type-selector/vehicle-mark-selector";

export default function PostAd({ control, errors }: AdFormStepProps<SparePartAdInterface>) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-white"
            contentContainerStyle={{ paddingBottom: 10, rowGap: 8 }}
        >
            <View>
                <View className="flex-row items-center justify-between">
                    <Text className="font-semibold mb-2">WHAT ARE YOU SELLING?</Text>
                    <Text className="text-sm text-gray-300">Used Cars</Text>
                </View>
                <VehicleMarkSelector
                    data={CAR_BRAND_TYPES}
                    control={control}
                    name="ad_type"
                />
            </View>
            <View>
                <Text className="font-semibold mb-2">WHERE IS YOUR LISTING?</Text>
                <SelectInput
                    control={control}
                    name="province"
                    required
                    options={CITIES}
                    renderOption={renderLocationOption}
                    placeholder="Province"
                    icon={<MaterialCommunityIcons name="town-hall" size={24} color="black" />}
                />
                <View className="flex-row items-center justify-center gap-x-2 my-4">
                    <View className="flex-1">
                        <LocationInput
                            control={control as any}
                            errors={errors}
                        />
                    </View>
                    <View className="flex-1">
                        <AdTextInput control={control} name="zip_code" error={errors.zip_code?.message} placeholder="Zip code"
                            icon={<MaterialCommunityIcons name="email-seal-outline" size={24} color="black" className="mt-2" />} />
                    </View>
                </View>
            </View>
            <AdTextInput control={control} name="price" error={errors.price?.message} placeholder="Write Your Price"
                required label="Price" keyboardType="number-pad" />
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
