import SelectInput from "@/core/components/ui/input/select-input";
import { Blocks, CITIES } from "@/core/constants";
import { VehicleAdFormSteps } from "@/core/types/schema/vehicleAd";
import { Text, View } from "react-native";
import { renderLocationOption } from "../../../ui/shared/render-option";

export default function ChooseLocation({ control, errors }: VehicleAdFormSteps) {
    return (
        <View className="gap-y-3">
            <View>
                <Text className="font-semibold mb-2">District</Text>
                <SelectInput
                    control={control}
                    name="location.district"
                    options={CITIES}
                    renderOption={renderLocationOption}
                    error={errors.location?.district?.message} placeholder="Choose District"
                />
            </View>
            <View>
                <Text className="font-semibold mb-2">Area</Text>
                <SelectInput
                    control={control}
                    name="location.area"
                    options={CITIES}
                    renderOption={renderLocationOption}
                    error={errors.location?.area?.message} placeholder="Choose Area"
                />
            </View>
            <View>
                <Text className="font-semibold mb-2">Block</Text>
                <SelectInput
                    control={control}
                    name="location.block"
                    options={Blocks}
                    renderOption={renderLocationOption}
                    error={errors.location?.area?.message} placeholder="Choose Block"
                />
            </View>
        </View>
    )
}