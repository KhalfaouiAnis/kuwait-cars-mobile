import AdDetails from "@/core/components/forms/ads/commun/ad-details";
import ChoosePlan from "@/core/components/forms/ads/commun/choose-plan";
import PostAd from "@/core/components/forms/ads/commun/post-ad";
import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import AddPhotos from "@/core/components/forms/ads/shared/shared-steps/add-photos";
import AddVideo from "@/core/components/forms/ads/shared/shared-steps/add-video";
import { ProgressButton } from "@/core/components/ui/button/progress-button";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import { useCommunAd } from "@/core/hooks/ad/flows/useCommunAd";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { router } from "expo-router";
import { TFunction } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { toast } from "sonner-native";

const getStepTitle = (step: number, t: TFunction) => {
    switch (step) {
        case 1:
            return t("createAd.steps.postAd")
        case 2:
        case 3:
            return t("createAd.steps.addMedia")
        case 4:
            return t("createAd.steps.addedDetails")
        case 5:
            return t("createAd.steps.ChoosePlans")
        default:
            return ""
    }
}

const TOTAL_STEPS = 5;

export default function NewAdScreen() {
    const { control, errors, dirtyFields, totalProgress, trigger, reset, setValue, getValues, handleSubmit, onSubmit } = useCommunAd()
    const { theme } = useUserPreferencesStore()
    const { protectAction } = useAuthGuard();
    const { t } = useTranslation("common")
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
                    toast.error(t(`validation.${error[0].message}`))
                }
                if (error.message) {
                    toast.error(t(`validation.${error.message}`))
                }
            })
        }
    };

    const handleNext = async () => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger(['province', "title", "description", "price"]);
        } else if (currentStep === 2) {
            isValid = await trigger(["thumbnail", "images"]);
        } else if (currentStep === 3) {
            isValid = await trigger(["video"])
        } else if (currentStep === 4) {
            isValid = await trigger(["additional_number"])
        } else if (currentStep === 5) {
            isValid = await trigger(["plan"])
        }

        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([_, error]) => {
                if (Array.isArray(error) && error.length > 0) {
                    toast.error(t(`validation.${error[0].message}`))
                }
                if (error.message) {
                    toast.error(t(`validation.${error.message}`))
                }
            })
        }

        if (isValid && currentStep < TOTAL_STEPS) {
            setCurrentStep((prev) => prev + 1);
        } else if (isValid) {
            protectAction(() => handleSubmit((data) => onSubmit(data), onError)());
        }
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <PostAd control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 2:
                return <AddPhotos control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 3:
                return <AddVideo control={control} errors={errors} setValue={setValue} getValue={getValues} onSkip={() => setCurrentStep((prev) => prev + 1)} isDark={theme !== "light"} />;
            case 4:
                return <AdDetails control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 5:
                return <ChoosePlan setValue={setValue} getValue={getValues} control={control} errors={errors} isDark={theme !== "light"} />;
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

    return (
        <AdFormContainer title={getStepTitle(currentStep, t)} reset={handleReset} resetLabel={t("reset")} previous={handlePrevious}>
            {renderCurrentStep()}
            <View className="mt-auto mb-4 mx-2">
                <ProgressButton
                    progress={totalProgress}
                    isPending={totalProgress > 0 || totalProgress === 100}
                    onPress={handleNext}
                    title={currentStep === TOTAL_STEPS ? t("submit") : t("next")}
                />
            </View>
            <LeaveDialog
                onLeave={handleLeave}
                onStay={handleStay}
                show={showDialog}
            />
        </AdFormContainer>
    )
}