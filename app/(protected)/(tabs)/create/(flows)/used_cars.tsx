import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import AddPhotos from "@/core/components/forms/ads/shared/shared-steps/add-photos";
import AddVideo from "@/core/components/forms/ads/shared/shared-steps/add-video";
import AdPublishSuccess from "@/core/components/forms/ads/shared/shared-steps/success";
import AdDetails from "@/core/components/forms/ads/used-cars/ad-details";
import AdDetailsStep2 from "@/core/components/forms/ads/used-cars/ad-details-step-2";
import ChoosePlan from "@/core/components/forms/ads/used-cars/choose-plan";
import PostAd from "@/core/components/forms/ads/used-cars/post-ad";
import { ProgressButton } from "@/core/components/ui/button/progress-button";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import { useUsedCarAd } from "@/core/hooks/ad/flows/useUsedCarAd";
import { useAuthGuard } from "@/core/hooks/use-auth-guard";
import { initiatePayment } from "@/core/services/ads/ad.service";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { router } from "expo-router";
import { TFunction } from "i18next";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { toast } from "sonner-native";

const getStepTitle = (step: number, t: TFunction) => {
    switch (step) {
        case 1:
        case 5:
            return t("createAd.steps.addedDetails")
        case 2:
        case 3:
            return t("createAd.steps.addMedia")
        case 4:
            return t("createAd.steps.postAd")
        case 6:
            return t("createAd.steps.ChoosePlans")
        default:
            return ""
    }
}

const TOTAL_STEPS = 7;

export default function UsedCarAdScreen() {
    const { control, formState: { errors, dirtyFields }, trigger, reset, setValue, getValues, handleSubmit, onSubmit, totalProgress } = useUsedCarAd()
    const { protectAction } = useAuthGuard();
    const { theme } = useUserPreferencesStore()
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
                    toast.error(`${error[0].message}`)
                }
                if (error.message) {
                    toast.error(t(`validaton.${error.message}`))
                }
            })
        }
    };

    const onFormSubmit = async (data: any) => {
        try {
            await onSubmit(data);
            setCurrentStep(TOTAL_STEPS);
        } catch (err) {
            console.error("Submission failed", err);
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
                    toast.error(t(`validation.${error[0].ref.name}`))
                }
                if (error.ref) {
                    toast.error(t(`validation.${error.ref.name}`))
                }
            })
            return;
        }

        if (isValid && currentStep < TOTAL_STEPS - 1) {
            setCurrentStep((prev) => prev + 1);
        } else if (isValid) {
            protectAction(() => {
                if (getValues("plan.type") === "FREE") {
                    handleSubmit((data) => onFormSubmit({ ...data, is_free: true }), onError)();
                    return;
                }
                initiatePayment({ amount: { currency: "KWD", value: getValues("plan.price") } }).then(res => {
                    handleSubmit((data) => onFormSubmit({ ...data, is_paid: true }), onError)()
                })
            });
        }
    }

    const renderCurrentStep = useCallback(() => {
        switch (currentStep) {
            case 1:
                return <AdDetails control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 2:
                return <AddPhotos control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 3:
                return <AddVideo control={control} errors={errors} setValue={setValue} getValue={getValues} onSkip={() => setCurrentStep((prev) => prev + 1)} isDark={theme !== "light"} />;
            case 4:
                return <PostAd control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 5:
                return <AdDetailsStep2 control={control} errors={errors} setValue={setValue} getValue={getValues} isDark={theme !== "light"} />;
            case 6:
                return <ChoosePlan setValue={setValue} getValue={getValues} control={control} errors={errors} isDark={theme !== "light"} />;
            default:
                return null;
        }
    }, [currentStep, control, errors, getValues, setValue, theme])

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

    if (currentStep === TOTAL_STEPS) return <AdPublishSuccess />;

    return (
        <AdFormContainer title={getStepTitle(currentStep, t)} resetLabel={t("reset")} reset={handleReset} previous={handlePrevious}>
            {renderCurrentStep()}
            <View className="mb-8 pt-3 bg-transparent self-center">
                <ProgressButton
                    onPress={handleNext}
                    progress={totalProgress}
                    isPending={totalProgress > 0 || totalProgress === 100}
                    title={currentStep === TOTAL_STEPS - 1 ? t("submit") : t("next")}
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