import { FIELD_COMPONENTS, FieldBlueprint } from "@/core/components/ui";
import { memo } from "react";
import { Control, FieldValues } from "react-hook-form";

interface FieldProps<T extends FieldValues> {
    config: FieldBlueprint<T>;
    control: Control<T>;
}

const StepFieldInternal = <T extends FieldValues>({ config, control }: FieldProps<T>) => {
    const Component = FIELD_COMPONENTS[config.type] as React.ComponentType<any>;

    if (!Component) {
        console.warn(`Component for type "${config.type}" not found.`);
        return null;
    }

    return (
        <Component
            {...(config as any)}
            control={control}
        />
    );
}

const StepField = memo(StepFieldInternal) as <T extends FieldValues>(
  props: FieldProps<T>
) => React.ReactElement;

export default StepField