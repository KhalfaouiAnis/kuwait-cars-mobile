import { AdStepKey, STEP_FIELD_CONFIGURATION, STEP_VIEWS } from "@/core/components/ui";
import { AD_MASTER_SCHEMA_KEY } from "@/core/types/schema/ads";
import { memo } from "react";
import { ScrollView } from "react-native";

const StepViewRendererInternal = ({ stepKey, adType }: { stepKey: AdStepKey, adType: AD_MASTER_SCHEMA_KEY }) => {
    const ViewComponent = STEP_VIEWS[stepKey];
    const stepFields = STEP_FIELD_CONFIGURATION[adType][stepKey];

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
    (prev, next) => prev.stepKey === next.stepKey && prev.adType === next.adType
) as (props: { stepKey: AdStepKey, adType: AD_MASTER_SCHEMA_KEY }) => React.ReactElement;

export default StepViewRenderer