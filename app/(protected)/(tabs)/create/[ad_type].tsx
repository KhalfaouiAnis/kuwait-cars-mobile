import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import StepViewRenderer from "@/core/components/forms/ads/shared/step-renderer";
import { AdStepKey, FLOW_CONFIGS, STEP_FIELD_REGISTRY } from "@/core/components/ui";
import { ProgressButton } from "@/core/components/ui/button/progress-button";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import { useAdDraftStore } from "@/core/store/ad-draft.store";
import { AD_MASTER_SCHEMA_KEY, AD_MASTER_SCHEMAS } from "@/core/types/schema/ads";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { TFunction } from "i18next";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const getStepTitle = (step: AdStepKey, t: TFunction) => {
    switch (step) {
        case "basic_info":
            return t("createAd.steps.addedDetails")
        case "media":
        case "video":
            return t("createAd.steps.addMedia")
        case "detailed_info":
            return t("createAd.steps.postAd")
        case "choose_plan":
            return t("createAd.steps.ChoosePlans")
        default:
            return ""
    }
}

export default function CreateAdScreenMasterController() {
    const { ad_type } = useLocalSearchParams<{ ad_type: AD_MASTER_SCHEMA_KEY }>();
    const flow = FLOW_CONFIGS[ad_type] || FLOW_CONFIGS['common']
    const [showDialog, setShowDialog] = useState(false);
    const { t } = useTranslation("common")

    const { drafts, updateDraft, setStep, clearDraft } = useAdDraftStore();
    const currentDraft = drafts[ad_type] || { data: {}, currentStepIndex: 0 };
    const flowKey = FLOW_CONFIGS[ad_type] ? ad_type : 'common';
    const currentStepKey = flow[currentDraft.currentStepIndex];

    console.log(currentDraft.currentStepIndex);
    

    //       const { activeId, drafts, updateActiveContent, saveStep } = useDraftStore();
    //   const currentDraft = drafts[activeId!];

    //   const { mutate: syncToServer, isPending } = useMutation({
    //     mutationFn: (payload: any) => api.put(`/drafts/${activeId}`, payload),
    //     onSuccess: () => console.log("Cloud Backup Sync Successful")
    //   });

    //   const onNext = async (data: any) => {
    //     // 1. Process local media if on media step
    //     const processedData = await maybeProcessMedia(data); 

    //     // 2. Sync to MMKV (Instant)
    //     updateActiveContent(processedData);
    //     const nextStep = currentDraft.stepIndex + 1;
    //     saveStep(nextStep);

    //     // 3. Sync to Prisma via React Query (Background)
    //     syncToServer({
    //       content: processedData,
    //       stepIndex: nextStep
    //     });
    //   };


    const methods = useForm({
        resolver: zodResolver(AD_MASTER_SCHEMAS[flowKey]),
        defaultValues: currentDraft.data,
        mode: "onTouched",
    });

    const handleReset = () => {
        methods.reset()
        setStep(ad_type, 0)
        clearDraft(ad_type)
    }

    const handlePrevious = () => {
        if (currentDraft.currentStepIndex === 0) {
            if (Object.keys(methods.formState.dirtyFields).length > 0) {
                setShowDialog(true)
                return "invalid-form";
            }
            return "route"
        }
        if (currentDraft.currentStepIndex > 0) {
            setStep(ad_type, currentDraft.currentStepIndex - 1);
        }
        return "steps"
    }

    const onNext = async () => {
        const currentStepFields = Object.keys(STEP_FIELD_REGISTRY[currentStepKey]);
        
        const isStepValid = await methods.trigger(currentStepFields);
        console.log(currentStepFields);
        console.log({isStepValid});

        if (isStepValid) {
            // 3. Sync the WHOLE form state to Zustand/MMKV
            const formData = methods.getValues();
            updateDraft(ad_type, formData);
            // goToNextStep();
            try {
                // 1. Check if we are on a media step
                if (currentStepKey === 'media') {
                }

                if (currentDraft.currentStepIndex < flow.length - 1) {
                    setStep(ad_type, currentDraft.currentStepIndex + 1);
                } else {
                    // If it's the last step, trigger the Payment/Submit flow
                    console.log(formData);
                }

            } catch (error) {
                console.log(error);
                // Alert.alert("Upload Failed", "Could not save media. Please try again.");
            }
        }

    };

    const handleBack = () => {
        if (currentDraft.currentStepIndex > 0) {
            setStep(ad_type, currentDraft.currentStepIndex - 1);
        } else {
            // We are at the very first step, user is trying to exit the flow
            // Alert.alert(
            //     "Unsaved Changes",
            //     "We've saved your progress as a draft. Are you sure you want to exit?",
            //     [
            //         { text: "Keep Editing", style: "cancel" },
            //         {
            //             text: "Exit",
            //             style: "destructive",
            //             onPress: () => router.back()
            //         },
            //     ]
            // );
        }
    };

    const handleLeave = () => {
        setShowDialog(false)
        methods.reset()
        router.canGoBack() && router.back()
    }

    const handleStay = () => {
        setShowDialog(false)
    }

    return (
        <AdFormContainer title={getStepTitle(currentStepKey, t)} resetLabel={t("reset")} reset={handleReset} previous={handlePrevious}>
            <FormProvider {...methods}>
                <StepViewRenderer
                    stepKey={currentStepKey}
                />
            </FormProvider>
            <View className="mb-4 self-center">
                <ProgressButton
                    progress={50}
                    isPending={false}
                    onPress={onNext}
                    title={currentStepKey === "choose_plan" ? t("submit") : t("next")}
                />
            </View>
            <LeaveDialog
                onLeave={handleLeave}
                onStay={handleStay}
                show={showDialog}
            />
        </AdFormContainer>
    );
}
