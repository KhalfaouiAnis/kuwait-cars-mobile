import { STEP_FIELD_REGISTRY, STEP_VIEWS } from "@/core/components/ui";
import { StepKey } from "@/core/types/schema/shared/commun";
import { Control, FieldValues } from "react-hook-form";
import { ScrollView } from "react-native";

interface DynamicStepProps<T extends FieldValues> {
    stepKey: StepKey;
    control: Control<T>;
}

export const DynamicStepRenderer = <T extends FieldValues>({ stepKey, control }: DynamicStepProps<T>) => {
    const ViewComponent = STEP_VIEWS[stepKey];
    const stepFields = STEP_FIELD_REGISTRY[stepKey];

    if (!ViewComponent) return null;

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <ViewComponent
                control={control}
                fields={stepFields}
            />
        </ScrollView>
    );
};