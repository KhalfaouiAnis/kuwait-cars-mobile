import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import { DynamicStepRenderer } from "@/core/components/forms/ads/shared/step-renderer";
import { FLOW_CONFIGS } from "@/core/components/ui";
import { ProgressButton } from "@/core/components/ui/button/progress-button";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import { useAdDraftStore } from "@/core/store/ad-draft.store";
import { StepKey, StepSchemas } from "@/core/types/schema/shared/commun";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { TFunction } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const getStepTitle = (step: StepKey, t: TFunction) => {
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

export default function CreateAdScreen() {
    const { ad_type } = useLocalSearchParams<{ ad_type: string }>();
    const flowKey = FLOW_CONFIGS[ad_type] ? ad_type : 'commun';
    const [showDialog, setShowDialog] = useState(false);
    const { t } = useTranslation("common")

    const { drafts, updateDraft, setStep, clearDraft } = useAdDraftStore();
    const currentDraft = drafts[ad_type] || { data: {}, currentStepIndex: 0 };
    const stepKey = FLOW_CONFIGS[flowKey][currentDraft.currentStepIndex];

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


    const { control, reset, formState: { errors, dirtyFields }, handleSubmit } = useForm({
        resolver: zodResolver(StepSchemas[stepKey] as any),
        defaultValues: currentDraft.data,
        mode: "onSubmit",
    });

    const handleReset = () => {
        console.log(currentDraft.currentStepIndex);

        reset()
        setStep(ad_type, 0)
        clearDraft(ad_type)
    }

    const handlePrevious = () => {
        if (currentDraft.currentStepIndex === 1) {
            if (Object.keys(dirtyFields).length > 0) {

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

    const onNext = async (data: any) => {
        try {
            let finalData = { ...data };

            // 1. Check if we are on a media step
            if (stepKey === 'media' && data.images) {
                // 2. Identify which images are local (need upload) vs already uploaded
                const uploadPromises = data.images.map(async (uri: string) => {
                    if (uri.startsWith('http')) return uri; // Already uploaded

                    // const compressed = await compressImage(uri);
                    // return await uploadToCloudinary(compressed);
                });

                finalData.images = await Promise.all(uploadPromises);
            }

            // 3. Persist everything to Zustand/MMKV at once
            updateDraft(ad_type, finalData);
            setStep(ad_type, currentDraft.currentStepIndex + 1);

        } catch (error) {
            // Alert.alert("Upload Failed", "Could not save media. Please try again.");
        } finally {
            // setLoading(false);
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
        reset()
        router.canGoBack() && router.back()
    }

    const handleStay = () => {
        setShowDialog(false)
    }

    return (
        <AdFormContainer title={getStepTitle(stepKey, t)} resetLabel={t("reset")} reset={handleReset} previous={handlePrevious}>
            <DynamicStepRenderer
                stepKey={stepKey}
                control={control}
            />
            <View className="mb-4 self-center">
                <ProgressButton
                    onPress={onNext}
                    progress={50}
                    isPending={false}
                    title={stepKey === "choose_plan" ? t("submit") : t("next")}
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
