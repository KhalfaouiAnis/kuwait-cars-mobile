import { FLOW_CONFIGS, STEP_FIELD_CONFIGURATION } from "@/core/components/ui";
import { APP_SCHEMA } from "@/core/constants";
import { useAdDraftMutations } from "@/core/services/ads/ad.drafts.mutations";
import { UploadFileType } from "@/core/services/ads/ad.mutations";
import { initiatePayment } from "@/core/services/ads/ad.service";
import { processLicensePlates } from "@/core/services/cloud/lisence-plate";
import { useAdDraftStore } from "@/core/store/adDrafts.store";
import useAuthStore from "@/core/store/auth.store";
import { SubscriptionDetail } from "@/core/types";
import {
  AD_MASTER_SCHEMA_KEY,
  AD_MASTER_SCHEMAS,
} from "@/core/types/schema/ads";
import { MediaAsset } from "@/core/types/schema/shared";
import { delay } from "@/core/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner-native";
import { useUploadMedia } from "../shared/use-upload-media";
import { usePayment } from "./usePayment";

export const useDraftForm = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { startPayment, isProcessing } = usePayment();
  const [showDialog, setShowDialog] = useState(false);
  const {
    drafts,
    activeId,
    saveStep,
    removeDraft,
    setActiveDraft,
    updateActiveDraftContent,
  } = useAdDraftStore();
  const { loading: isProcessingMedia, setLoading, upload } = useUploadMedia();
  const {
    syncDraft: { mutate: updateDraft, isPending: isUpdatingDraft },
    promoteAdDraft: { mutate: promoteAd, isPending: isPromoting },
  } = useAdDraftMutations();
  const currentDraft = drafts[activeId!];

  const flow =
    FLOW_CONFIGS[currentDraft?.ad_type as AD_MASTER_SCHEMA_KEY] ||
    FLOW_CONFIGS["common"];

  const currentStepKey = flow[currentDraft?.step_index ?? 0];

  const SCHEMA =
    AD_MASTER_SCHEMAS[currentDraft.ad_type as AD_MASTER_SCHEMA_KEY] ||
    AD_MASTER_SCHEMAS["common"];

  const methods = useForm({
    resolver: zodResolver(SCHEMA),
    values: currentDraft?.content || {},
    mode: "all",
  });

  const {
    reset,
    trigger,
    setValue,
    getValues,
    formState: { dirtyFields },
  } = methods;

  const finalizeAdCreation = async () => {
    setLoading(true);
    promoteAd(currentDraft.id, {
      onSuccess() {
        router.replace("/create/success");
        setTimeout(() => {
          removeDraft(currentDraft.id);
          setActiveDraft(null);
        }, 0);
      },
      onError(error) {
        toast.error("Promotion failed. Please try again.");
        console.error(error);
      },
      onSettled() {
        setLoading(false);
      },
    });
  };

  const handleUpdateDraft = async () => {
    const currentData = getValues();
    if (currentDraft.step_index < flow.length - 1) {
      updateDraft(
        {
          ...currentDraft,
          content: currentData,
          step_index: currentDraft.step_index + 1,
        },
        {
          onSuccess() {
            reset(currentData, { keepValues: true });
            saveStep(currentDraft.step_index + 1);
          },
        },
      );
    } else {
      const value = getValues("plan.price");
      if (value && value > 0) {
        const paymentUrl = await initiatePayment(
          {
            amount: { currency: "KWD", value },
            customer: {
              fullName: user?.fullname,
              phoneNumber: user?.phone,
            },
          },
          currentDraft.ad_type,
          currentDraft.id,
        );
        await startPayment(paymentUrl, APP_SCHEMA, finalizeAdCreation);
      } else {
        await finalizeAdCreation();
      }
    }
  };

  const handleNext = async () => {
    const currentStep = (STEP_FIELD_CONFIGURATION[
      currentDraft.ad_type as AD_MASTER_SCHEMA_KEY
    ] || STEP_FIELD_CONFIGURATION["common"])[currentStepKey];
    const currentStepFields = Object.keys(currentStep!);

    const isStepValid = await trigger(currentStepFields);

    if (isStepValid) {
      const hasChanges = currentStepFields.some((field) => dirtyFields[field]);

      if (hasChanges) {
        try {
          if (currentStepKey === "media") {
            const { hide_license_plate, media } = getValues();

            const medias: UploadFileType[] = [];

            media.forEach((file: MediaAsset) => {
              medias.push({
                file,
                signingParams: { mediaType: "image" },
              });
            });

            const uploadResponse = await upload(
              medias.filter((m) => !m.file.transformed_url),
            );

            if (hide_license_plate) {
              const carsWithHiddenLisences =
                await processLicensePlates(uploadResponse);
              setValue("media", filterUris(carsWithHiddenLisences));
            } else {
              setValue("media", filterUris(uploadResponse));
            }
          } else if (["video", "show_video"].includes(currentStepKey)) {
            const video = getValues(currentStepFields)[0] as MediaAsset;
            const plan = getValues("plan") as SubscriptionDetail;
            const duration = video?.duration;

            if (plan.price === 0 && duration && duration > 0) {
              setValue("video", undefined);
              setValue("sound_effect", undefined);
              toast.error("Free plan. Video will be skipped automatically !");
              await delay(1000);
            } else if (
              plan.price > 0 &&
              duration &&
              duration > plan.videoDuration * 1000
            ) {
              toast.error(`Max video duration is ${plan.videoDuration}s.`);
              return;
            } else if (video && video.transformed_url) {
              toast.info("Uploading video, please wait...");
              const medias: UploadFileType[] = [
                {
                  file: video,
                  signingParams: { mediaType: "video" },
                },
              ];
              const uploadResponse = await upload(medias);
              setValue("video", uploadResponse[0]);
            }
          }
          await handleUpdateDraft();
        } catch (error) {
          console.log(error);
          if (isAxiosError(error)) {
            console.log(Object.values(error));
          }
        } finally {
          setLoading(false);
        }
      } else {
        if (currentDraft.step_index < flow.length - 1) {
          saveStep(currentDraft.step_index + 1);
        } else {
          await handleUpdateDraft();
        }
      }
    }
  };

  const handleBack = () => {
    if (currentDraft.step_index === 0) {
      if (Object.keys(dirtyFields).length > 0) {
        setShowDialog(true);
        return "invalid-form";
      }
      return "route";
    }
    if (currentDraft.step_index > 0) {
      saveStep(currentDraft.step_index - 1);
    }
    return "steps";
  };

  const handleLeave = () => {
    setShowDialog(false);
    reset(currentDraft.content);
    router.canGoBack() && router.back();
  };

  const handleStay = () => {
    setShowDialog(false);
  };

  const handleReset = () => {
    reset(currentDraft.content);
    updateActiveDraftContent(null);
    saveStep(0);
  };

  if (!currentDraft) {
    return {
      methods,
      showDialog: false,
      currentDraft: null,
      loading: false,
      handleBack: () => "route",
      handleNext: async () => {},
      handleReset: () => {},
      handleStay: () => {},
      handleLeave: () => {},
      setShowDialog: () => {},
    };
  }

  return {
    methods,
    showDialog,
    currentDraft,
    loading:
      isProcessingMedia || isUpdatingDraft || isProcessing || isPromoting,
    handleBack,
    handleNext,
    handleReset,
    handleStay,
    handleLeave,
    setShowDialog,
  };
};

const filterUris = (data: MediaAsset[]) => {
  return data.map((asset) => {
    if (asset.transformed_url || asset.original_url) {
      const { uri, ...rest } = asset;
      return rest;
    }
    return asset;
  });
};
