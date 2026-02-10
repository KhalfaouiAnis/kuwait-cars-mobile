import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import StepViewRenderer from "@/core/components/forms/ads/shared/step-renderer";
import { AdStepKey, FLOW_CONFIGS, STEP_FIELD_REGISTRY } from "@/core/components/ui";
import { ProgressButton } from "@/core/components/ui/button/progress-button";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import { useUploadMedia } from "@/core/hooks/shared/use-upload-media";
import { useAdDraftMutations } from "@/core/services/ads/ad.drafts.mutations";
import { UploadFileType } from "@/core/services/ads/ad.mutations";
import { useAdDraftStore } from "@/core/store/adDrafts.store";
import { AD_MASTER_SCHEMA_KEY, AD_MASTER_SCHEMAS } from "@/core/types/schema/ads";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
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
    const { totalProgress, setFileProgress, upload } = useUploadMedia();
    const { syncDraft: { mutate: updateDraft, isPending } } = useAdDraftMutations();
    const [showDialog, setShowDialog] = useState(false);
    const { t } = useTranslation("common")

    const flow = FLOW_CONFIGS[ad_type] || FLOW_CONFIGS['common']
    const { drafts, activeId, saveStep, updateActiveDraftContent } = useAdDraftStore();
    const currentDraft = drafts[activeId!];
    const flowKey = FLOW_CONFIGS[ad_type] ? ad_type : 'common';
    const currentStepKey = flow[currentDraft.step_index];

    const methods = useForm({
        resolver: zodResolver(AD_MASTER_SCHEMAS[currentDraft.ad_type as AD_MASTER_SCHEMA_KEY]),
        defaultValues: currentDraft.content || {},
        mode: "onTouched",
    });

    const { reset, trigger, getValues, setValue, formState: { dirtyFields } } = methods;

    const handleReset = () => {
        saveStep(0)
        updateActiveDraftContent(null);
        reset(currentDraft.content)
    }

    const handleBack = () => {
        if (currentDraft.step_index === 0) {
            if (Object.keys(dirtyFields).length > 0) {
                setShowDialog(true)
                return "invalid-form";
            }
            return "route"
        }
        if (currentDraft.step_index > 0) {
            saveStep(currentDraft.step_index - 1);
        }
        return "steps"
    }

    const onNext = async () => {
        const currentStepFields = Object.keys(STEP_FIELD_REGISTRY[currentStepKey]);
        const isStepValid = await trigger(currentStepFields);

        if (isStepValid) {
            const hasChanges = currentStepFields.some(field => dirtyFields[field]);
            console.log({ hasChanges });

            if (hasChanges) {
                try {
                    if (currentStepKey === 'media') {
                        const medias: UploadFileType[] = []
                        getValues(currentStepFields).map(mediaCollection => mediaCollection.forEach((media: any) => {
                            medias.push({
                                file: { ...media },
                                signingParams: { mediaType: "image" }
                            })
                        }))
                        const uploadResponse = await upload(medias);
                        setValue("media", uploadResponse)
                    }
                    const currentData = getValues();

                    updateActiveDraftContent(currentData);
                    if (currentDraft.step_index < flow.length - 1) {
                        updateDraft({ ...currentDraft, content: currentData }, {
                            onSuccess() {
                                reset(currentData, { keepValues: true })
                                saveStep(currentDraft.step_index + 1);
                            },
                        });
                    } else {
                        // If it's the last step, trigger the Payment/Submit flow
                        // console.log(currentData);
                    }
                } catch (error) {
                    if (isAxiosError(error)) {
                        console.log(Object.values(error));
                    }
                }
            } else {
                if (currentDraft.step_index < flow.length - 1) {
                    // updateDraft(currentDraft);
                    saveStep(currentDraft.step_index + 1);
                }
            }
        }
    };

    const handleLeave = () => {
        setShowDialog(false)
        reset(currentDraft.content)
        router.canGoBack() && router.back()
    }

    const handleStay = () => {
        setShowDialog(false)
    }

    return (
        <AdFormContainer title={getStepTitle(currentStepKey, t)} resetLabel={t("reset")} reset={handleReset} previous={handleBack}>
            <FormProvider {...methods}>
                <StepViewRenderer stepKey={currentStepKey} />
            </FormProvider>
            <View className="mb-4 self-center">
                <ProgressButton
                    progress={totalProgress}
                    onPress={onNext}
                    isPending={isPending}
                    title={currentDraft.step_index === flow.length ? t("submit") : t("next")}
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
