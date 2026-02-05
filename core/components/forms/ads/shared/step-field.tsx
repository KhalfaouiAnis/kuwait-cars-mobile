import { FIELD_COMPONENTS, FieldBlueprint } from "@/core/components/ui";
import { Control, FieldValues } from "react-hook-form";
import { View } from "react-native";

interface FieldProps<T extends FieldValues> {
    config: FieldBlueprint<T>;
    control: Control<T>;
}

const StepField = <T extends FieldValues>({ config, control, ...rest }: FieldProps<T>) => {
    const Component = FIELD_COMPONENTS[config.type] as React.ComponentType<any>;

    if (!Component) {
        console.warn(`Component for type "${config.type}" not found.`);
        return null;
    }

    return (
        <View {...rest}>
            <Component
                {...(config as any)}
                control={control}
            />
        </View>
    );
};

export default StepField