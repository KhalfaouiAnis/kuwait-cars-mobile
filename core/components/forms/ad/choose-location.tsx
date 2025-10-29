import { CITIES } from "@/core/constants";
import { StepProps } from "@/core/types";
import { Text, View } from "react-native";
import AdTextInput from "../../ui/input/ad-text-input";
import SelectInput from "../../ui/input/select-input";
import { renderLocationOption } from "./select-option/render-option";

export default function ChooseLocation({ control, errors }: StepProps) {
    return (
        <View className="gap-y-3">
            <View>
                <Text className="font-semibold mb-2">District</Text>
                <SelectInput
                    control={control}
                    name="category"
                    options={CITIES}
                    renderOption={renderLocationOption}
                    error={errors.category?.message} placeholder="Choose District"
                />
            </View>
            <View>
                <Text className="font-semibold mb-2">Area</Text>
                <SelectInput
                    control={control}
                    name="location"
                    options={CITIES}
                    renderOption={renderLocationOption}
                    error={errors.category?.message} placeholder="Choose Area"
                />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
            <View>
                <Text className="font-semibold mb-2">Block</Text>
                <AdTextInput control={control} name="title" error={errors.category?.message} placeholder="Choose Block" />
                <Text className="ms-4 text-gray-400">Required</Text>
            </View>
        </View>
    )
}