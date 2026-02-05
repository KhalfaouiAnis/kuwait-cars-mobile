import { FLOW_CONFIGS } from "@/core/components/ui";
import { StepSchemas } from "@/core/types/schema/shared/commun";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, View } from "react-native";
import { DynamicStepRenderer } from "./step-renderer";

interface Props {
    ad_type: string,
    initialData: any,
    adId: string
}

const EditFormController = ({ ad_type, initialData, adId }: Props) => {
    const flowKey = FLOW_CONFIGS[ad_type] ? ad_type : 'COMMUN';
    const [stepIndex, setStepIndex] = useState(0);
    const stepKey = FLOW_CONFIGS[flowKey][stepIndex];

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(StepSchemas[stepKey] as any),
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
            <DynamicStepRenderer stepKey={stepKey} control={control} />
            <Button title="Save Changes" onPress={handleSubmit(onNext)} />
        </View>
    );
};

export default EditFormController;