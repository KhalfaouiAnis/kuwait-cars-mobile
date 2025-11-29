import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import AdPublishSuccess from "@/core/components/forms/ads/shared/success";
import AdDetails from "@/core/components/forms/ads/used-cars/ad-details";
import AdDetailsStep2 from "@/core/components/forms/ads/used-cars/ad-details-step-2";
import AddMedia from "@/core/components/forms/ads/used-cars/add-media";
import ChoosePlan from "@/core/components/forms/ads/used-cars/choose-plan";
import PostAd from "@/core/components/forms/ads/used-cars/post-ad";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import UploadProgress from "@/core/components/ui/shared/upload-progress";
import { useUsedCarAd } from "@/core/hooks/ad/flows/useUsedCarAd";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

const getStepTitle = (step: number) => {
    switch (step) {
        case 1:
            return "Ad Details"
        case 2:
            return "Add Media"
        case 3:
        case 4:
            return "Post an Ad"
        case 5:
            return "Choose Plans"
        default:
            return ""
    }
}
const totalSteps = 5;

export default function UsedCarAdScreen() {
    // const { ad_type } = useLocalSearchParams<{ ad_type: string }>();
    const { control, errors, trigger, reset, setValue, getValues, dirtyFields, handleSubmit, onSubmit, isSubmitting } = useUsedCarAd()
    const [showDialog, setShowDialog] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const stepTitle = getStepTitle(currentStep)

    const handlePrevious = () => {
        if (currentStep === 1) {
            if (Object.keys(dirtyFields).length > 0) {
                setShowDialog(true)
                return "invalid-form";
            }
            return "route"
        }
        setCurrentStep(currentStep - 1)
        return "steps"
    }

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([_, error]) => {
                if (Array.isArray(error) && error.length > 0) {
                    toast.error(`${error[0].message}`)
                }
                if (error.message) {
                    toast.error(`${error.message}`)
                }
            })
        }
    };

    const handleNext = async () => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger(['year', 'exterior_color', "mileage"]);
        } else if (currentStep === 2) {
            isValid = await trigger(['video', "thumbnail", "images"]);
        } else if (currentStep === 3) {
            isValid = await trigger(["exterior_color", "mileage"])
        } else if (currentStep === 4) {
            isValid = await trigger(["title", "description", "additional_number"])
        } else if (currentStep === 5) {
            isValid = await trigger(["plan"])
        }

        console.log(errors.video?.duration?.message);

        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([_, error]) => {
                if (Array.isArray(error) && error.length > 0) {
                    toast.error(`${error[0].message}`)
                }
                if (error.message) {
                    toast.error(`${error.message}`)
                }
            })
        }

        if (isValid && currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else if (isValid) {
            setIsUploading(true);
            setUploadProgress(0);
            handleSubmit((data) => onSubmit(data, (progressEvent) => {
                if (progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                }
            }), onError)();
            setUploadProgress(100);
        }
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <AdDetails control={control} errors={errors} />;
            case 2:
                return <AddMedia control={control} errors={errors} setValue={setValue} getValue={getValues} />;
            case 3:
                return <PostAd control={control} errors={errors} setValue={setValue} />;
            case 4:
                return <AdDetailsStep2 control={control} errors={errors} />;
            case 5:
                return <ChoosePlan setValue={setValue} getValue={getValues} control={control} errors={errors} />;
            default:
                return null;
        }
    };

    const handleReset = () => {
        reset()
        setCurrentStep(1)
    }

    const handleLeave = () => {
        setShowDialog(false)
        reset()
        router.canGoBack() && router.back()
    }

    const handleStay = () => {
        setShowDialog(false)
    }

    if (currentStep > totalSteps) return <AdPublishSuccess />

    return (
        <AdFormContainer title={stepTitle} reset={handleReset} previous={handlePrevious}>
            {
                isUploading && uploadProgress < 100 && (
                    <View className="mb-1">
                        <UploadProgress uploadProgress={uploadProgress} />
                    </View>
                )
            }
            {renderCurrentStep()}
            <View className="mt-auto mb-4">
                <TouchableOpacity
                    className="py-3 w-full rounded-lg bg-primary-500 disabled:bg-yellow-200"
                    onPress={handleNext}
                    disabled={isSubmitting}
                >
                    <Text className="text-center text-xl font-inter-semibold">
                        {isSubmitting ? <ActivityIndicator size="small" color="black" /> : currentStep === 5 ? "Submit" : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
            <LeaveDialog
                onLeave={handleLeave}
                onStay={handleStay}
                show={showDialog}
            />
        </AdFormContainer>
    )
}