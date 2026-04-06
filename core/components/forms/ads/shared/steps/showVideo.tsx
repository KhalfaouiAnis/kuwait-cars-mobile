import { BaseStepViewProps } from "@/core/components/ui";
import { FieldValues, useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";
import StepField from "../step-field";

export default function ShowVideo<T extends FieldValues>({ fields }: BaseStepViewProps<T>) {
    const { control } = useFormContext()
    const video = useWatch({ control, name: "video" })

    return <View className="gap-6">
        <StepField config={fields.video} />
        {video && <StepField config={fields.sound_effect} />}
    </View>
};