import { FLOW_CONFIGS } from "@/core/components/ui";
import { AD_MASTER_SCHEMA_KEY, AD_MASTER_SCHEMAS } from "@/core/types/schema/ads";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, View } from "react-native";
import StepViewRenderer from "./step-renderer";

interface Props {
    ad_type: AD_MASTER_SCHEMA_KEY,
    initialData: any,
    adId: string
}

const EditFormController = ({ ad_type, initialData, adId }: Props) => {
    const flowKey = FLOW_CONFIGS[ad_type] ? ad_type : 'common';
    const [stepIndex, setStepIndex] = useState(0);
    const stepKey = FLOW_CONFIGS[flowKey][stepIndex];

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(AD_MASTER_SCHEMAS[ad_type] as any),
        defaultValues: initialData,
    });

    const onNext = async (data: any) => {
        const isLastStep = stepIndex === FLOW_CONFIGS[flowKey].length - 1;

        if (isLastStep) {
            // 1. Final Update API Call
        } else {
            // 2. Standard Forward logic (including Media Uploads if changed)
            setStepIndex(prev => prev + 1);
        }
    };

    return (
        <View>
            <StepViewRenderer stepKey={stepKey} control={control} />
            <Button title="Save Changes" onPress={handleSubmit(onNext)} />
        </View>
    );
};

export default EditFormController;