import { AdStepKey, STEP_FIELD_REGISTRY, STEP_VIEWS } from "@/core/components/ui";
import { memo } from "react";
import { ScrollView } from "react-native";

const StepViewRendererInternal = ({ stepKey }: { stepKey: AdStepKey }) => {
    const ViewComponent = STEP_VIEWS[stepKey];
    const stepFields = STEP_FIELD_REGISTRY[stepKey];

    if (!ViewComponent) return null;

    return (
        <ScrollView
            className="flex-1 px-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <ViewComponent fields={stepFields} />
        </ScrollView>
    );
};

const StepViewRenderer = memo(
    StepViewRendererInternal,
    (prev, next) => prev.stepKey === next.stepKey
) as (props: { stepKey: AdStepKey }) => React.ReactElement;

export default StepViewRenderer