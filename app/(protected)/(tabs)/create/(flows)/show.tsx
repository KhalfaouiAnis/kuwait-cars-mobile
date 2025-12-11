import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import AdPublishSuccess from "@/core/components/forms/ads/shared/success";
import AdDetails from "@/core/components/forms/ads/show/ad-details";
import AddPhotos from "@/core/components/forms/ads/show/add-photos";
import AddVideo from "@/core/components/forms/ads/show/add-video";
import ChoosePlan from "@/core/components/forms/ads/show/choose-plan";
import PostAd from "@/core/components/forms/ads/show/post-ad";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import UploadProgress from "@/core/components/ui/shared/upload-progress";
import { useShowCarAd } from "@/core/hooks/ad/flows/useShowCarAd";
import useUserPreferencesStore from "@/core/lib/stores/preferences.store";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

const getStepTitle = (step: number, t: (key: string) => string) => {
    switch (step) {
        case 1:
            return t("steps.postAd")
        case 2:
            return t("steps.addMedia")
        case 3:
        case 4:
            return t("steps.addedDetails")
        case 5:
            return t("steps.ChoosePlans")
        default:
            return ""
    }
}

const TOTAL_STEPS = 5;

export default function NewAdScreen() {
    const { control, errors, trigger, reset, setValue, getValues, dirtyFields, handleSubmit, onSubmit, isSubmitting } = useShowCarAd()
    const { theme } = useUserPreferencesStore()
    const { t } = useTranslation("ad_creation")
    const [showDialog, setShowDialog] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

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
        // if (Object.keys(errors).length > 0) {
        //     Object.entries(errors).forEach(([_, error]) => {
        //         if (Array.isArray(error) && error.length > 0) {
        //             toast.error(`${error[0].message}`)
        //         }
        //         if (error.message) {
        //             toast.error(`${error.message}`)
        //         }
        //     })
        // }
    };

    const handleNext = async () => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger(['description', "title"]);
        } else if (currentStep === 2) {
            isValid = await trigger(["thumbnail", "images"]);
        } else if (currentStep === 3) {
            isValid = await trigger(["video", "sound_effect"])
        } else if (currentStep === 4) {
            isValid = await trigger(["hide_license_plate"])
        } else if (currentStep === 5) {
            isValid = await trigger(["plan"])
        }

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

        if (isValid && currentStep < TOTAL_STEPS) {
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
                return <PostAd t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 2:
                return <AddPhotos t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 3:
                return <AddVideo t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} onSkip={() => setCurrentStep((prev) => prev + 1)} isDark={theme !== "light"} />;
            case 4:
                return <AdDetails t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 5:
                return <ChoosePlan t={t} setValue={setValue} getValue={getValues} control={control} errors={errors} isDark={theme !== "light"} />;
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

    if (currentStep > TOTAL_STEPS) return <AdPublishSuccess />

    return (
        <AdFormContainer title={getStepTitle(currentStep, t)} reset={handleReset} resetLabel={t("Reset")} previous={handlePrevious}>
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
                        {isSubmitting ? <ActivityIndicator size="small" color="black" /> : currentStep === TOTAL_STEPS ? "Submit" : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
            <LeaveDialog
                onLeave={handleLeave}
                onStay={handleStay}
                show={showDialog}
                t={t}
            />
        </AdFormContainer>
    )
}