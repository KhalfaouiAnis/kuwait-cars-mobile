import AdTextInput from "@/core/components/ui/input/ad-text-input";
import SelectInput from "@/core/components/ui/input/select-input";
import InputWithSpeech from "@/core/components/ui/input/text/speech-input";
import { CITIES } from "@/core/constants";
import { AdFormStepProps } from "@/core/types";
import { SparePartAdInterface } from "@/core/types/schema/ads/sparePart";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import LocationPicker from "../../../layout/location/location-picker";
import { renderLocationOption } from "../../../ui/shared/render-option";
import SelectedAdType from "../shared/ad-type-selector/selected-ad-type";

export default function PostAd({ control, errors, isDark }: AdFormStepProps<SparePartAdInterface>) {
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
                <SelectedAdType
                    label={`Spare parts`}
                    icon={<Ionicons name="car-sport-outline" color="gray" size={20} />}
                />
            </View>
            <View>
                <Text className="font-semibold mb-2">WHERE IS YOUR LISTING?</Text>
                <SelectInput
                    control={control}
                    name="province"
                    required
                    options={CITIES}
                    renderOption={(option, selected) => renderLocationOption(option, selected as string)}
                    placeholder="Province"
                    icon={<MaterialCommunityIcons name="town-hall" size={24} color="black" />}
                />
                <View className="flex-row items-center justify-center gap-x-2 my-4">
                    <View className="flex-1">
                        <LocationPicker
                            control={control}
                            errors={errors}
                            isDark={isDark}
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
                label="Title"
                required
                maxLength={30}
                error={errors.title?.message}
                placeholder="Write Your Advertisement Title" />
            <InputWithSpeech
                control={control}
                name="description"
                label="Description"
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
