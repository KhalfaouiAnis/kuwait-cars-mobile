import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import AdPublishSuccess from "@/core/components/forms/ads/shared/success";
import AdDetails from "@/core/components/forms/ads/used-cars/ad-details";
import AdDetailsStep2 from "@/core/components/forms/ads/used-cars/ad-details-step-2";
import AddPhotos from "@/core/components/forms/ads/used-cars/add-photos";
import AddVideo from "@/core/components/forms/ads/used-cars/add-video";
import ChoosePlan from "@/core/components/forms/ads/used-cars/choose-plan";
import PostAd from "@/core/components/forms/ads/used-cars/post-ad";
import { ProgressButton } from "@/core/components/ui/button/progress-button";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import { useUsedCarAd } from "@/core/hooks/ad/flows/useUsedCarAd";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { toast } from "sonner-native";

const getStepTitle = (step: number, t: (key: string) => string) => {
    switch (step) {
        case 1:
        case 5:
            return t("steps.addedDetails")
        case 2:
        case 3:
            return t("steps.addMedia")
        case 4:
            return t("steps.postAd")
        case 6:
            return t("steps.ChoosePlans")
        default:
            return ""
    }
}

const TOTAL_STEPS = 6;

export default function UsedCarAdScreen() {
    const { control, errors, trigger, reset, setValue, getValues, dirtyFields, handleSubmit, onSubmit, totalProgress } = useUsedCarAd()
    const { theme, isRTL } = useUserPreferencesStore()
    const { t } = useTranslation("ad_creation")
    const [showDialog, setShowDialog] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

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

    const onError = (err: any) => {
        console.log(err);

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
            isValid = await trigger(["thumbnail", "images"]);
        } else if (currentStep === 3) {
            isValid = await trigger(["video"])
        } else if (currentStep === 4) {
            isValid = await trigger(["title", "description", "price", "province"])
        } else if (currentStep === 5) {
            isValid = await trigger(["additional_number"])
        } else if (currentStep === 6) {
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
            handleSubmit((data) => onSubmit(data), onError)();
        }
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <AdDetails t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 2:
                return <AddPhotos t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 3:
                return <AddVideo t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} onSkip={() => setCurrentStep((prev) => prev + 1)} isDark={theme !== "light"} />;
            case 4:
                return <PostAd t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 5:
                return <AdDetailsStep2 t={t} control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 6:
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
        <AdFormContainer isRTL={isRTL} isDark={theme !== "light"} title={getStepTitle(currentStep, t)} resetLabel={t("Reset")} reset={handleReset} previous={handlePrevious}>
            {renderCurrentStep()}
            <View className="mt-auto mb-4 mx-2">
                <ProgressButton
                    progress={totalProgress}
                    isPending={totalProgress > 0}
                    onPress={handleNext}
                    title={currentStep === TOTAL_STEPS ? t("Submit") : t("Next")}
                />
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