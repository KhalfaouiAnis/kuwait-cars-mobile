import { CATEGORIES, CITIES } from '@/core/constants';
import { StepProps } from "@/core/types";
import { Text, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";
import SelectInput from "../../ui/input/select-input";
import { renderCategoryOption, renderLocationOption } from "./select-option/render-option";

export default function PostAd({ control, errors }: StepProps) {
    return (
        <View className="gap-y-3">
            <View>
                <Text className="font-semibold mb-2">WHAT ARE YOU SELLING?</Text>
                <SelectInput
                    name="category"
                    control={control}
                    options={CATEGORIES}
                    renderOption={renderCategoryOption}
                    placeholder="Choose Category"
                    error={errors.category?.message}
                />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <Text className="font-semibold mb-2">WHERE IS YOUR LISTING?</Text>
                <SelectInput
                    name="location"
                    control={control}
                    options={CITIES}
                    renderOption={renderLocationOption}
                    error={errors.category?.message}
                    placeholder="Choose your linsting or service location"
                />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <Text className="font-semibold mb-2">INFORMATION</Text>
                <AdTextInput control={control} name="title" error={errors.category?.message} placeholder="Title" />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <AdTextInput control={control} name="price" error={errors.category?.message} placeholder="Price" keyboardType="number-pad" />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
        </View>
    )
}