import AdFormContainer from "@/core/components/forms/ads/shared/ad-form-container";
import StepViewRenderer from "@/core/components/forms/ads/shared/step-renderer";
import { AdStepKey, FLOW_CONFIGS } from "@/core/components/ui";
import { ProgressButton } from "@/core/components/ui/button/progress-button";
import LeaveDialog from "@/core/components/ui/dialog/leave-confirm-dialog";
import { useDraftForm } from "@/core/hooks/ad/useDraftForm";
import { AD_MASTER_SCHEMA_KEY } from "@/core/types/schema/ads";
import { Redirect, useLocalSearchParams } from "expo-router";
import { TFunction } from "i18next";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const getStepTitle = (step: AdStepKey, t: TFunction) => {
    switch (step) {
        case "basic_info":
            return t("createAd.steps.addedDetails")
        case "media":
        case "video":
        case "show_video":
            return t("createAd.steps.addMedia")
        case "detailed_info":
        case "detailed_info_2":
            return t("createAd.steps.postAd")
        case "choose_plan":
            return t("createAd.steps.ChoosePlans")
        default:
            return ""
    }
}

const flow_types = Object.keys(FLOW_CONFIGS)

export default function CreateAdScreenMasterController() {
    const { ad_type } = useLocalSearchParams<{ ad_type: string }>();
    const { t } = useTranslation("common")

    const adType = flow_types.includes(ad_type) ? ad_type as AD_MASTER_SCHEMA_KEY : "common"

    const flow = FLOW_CONFIGS[adType]

    const { methods, currentDraft, showDialog, loading, handleBack, handleStay, handleLeave, handleNext, handleReset } = useDraftForm()
    const currentStepKey = flow[currentDraft.step_index];

    if (!currentDraft) return <Redirect href="/create" />;

    return (
        <AdFormContainer title={getStepTitle(currentStepKey, t)} resetLabel={t("reset")} reset={handleReset} previous={handleBack}>
            <FormProvider {...methods}>
                <StepViewRenderer stepKey={currentStepKey} adType={adType} />
            </FormProvider>
            <View className="mb-4 self-center">
                <ProgressButton
                    isPending={loading}
                    onPress={handleNext}
                    title={currentDraft.step_index === flow.length - 1 ? t("submit") : t("next")}
                />
            </View>
            <LeaveDialog
                show={showDialog}
                onStay={handleStay}
                onLeave={handleLeave}
            />
        </AdFormContainer>
    );
}
