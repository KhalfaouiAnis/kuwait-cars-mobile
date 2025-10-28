import AdFormContainer from "@/core/components/forms/ad/ad-form-container";
import AddMedia from "@/core/components/forms/ad/add-media";
import ChooseLocation from "@/core/components/forms/ad/choose-location";
import PostAd from "@/core/components/forms/ad/post-ad";
import { useAd } from "@/core/hooks/ad/usAd";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const getStepTitle = (step: number) => {
    switch (step) {
        case 1:
            return "Post an Ad"
        case 2:
            return "Choose Location"
        case 3:
            return "Add Media"
        case 4:
            return "Add Ad Details"
        case 5:
            return "Choose Plans"
        default:
            return ""
    }
}

export default function NewAdScreen() {
    const { control, errors, trigger } = useAd()
    const [currentStep, setCurrentStep] = useState(1);
    const stepTitle = getStepTitle(currentStep)
    const totalSteps = 4;

    const handleNext = async () => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger(['category', 'location', "title", "price"]);
        } else if (currentStep === 2) {
            isValid = await trigger(['location']);
        }
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        }
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <PostAd control={control} errors={errors} />;
            case 2:
                return <ChooseLocation control={control} errors={errors} />;
            case 3:
                return <AddMedia control={control} errors={errors} />;
            default:
                return null;
        }
    };

    return (
        <AdFormContainer title={stepTitle} reset={() => { setCurrentStep(1) }}>
            {renderCurrentStep()}
            <View className="mt-auto mb-4">
                <TouchableOpacity
                    className="py-3 w-full rounded-lg bg-primary-500 disabled:bg-yellow-200"
                    onPress={handleNext}
                    disabled={currentStep >= totalSteps}
                >
                    <Text className="text-center text-xl font-inter-semibold">
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </AdFormContainer>
    )
}