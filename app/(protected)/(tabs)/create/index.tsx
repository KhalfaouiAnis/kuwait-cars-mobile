import AdTypeSelector from "@/core/components/forms/ads/shared/ad-type-selector/ad-type-selector";
import AdDraftsModal from "@/core/components/forms/ads/shared/ad-type-selector/drafts-modal";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { useAdDraftMutations } from "@/core/services/ads/ad.drafts.mutations";
import { useAdDraftStore } from "@/core/store/adDrafts.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

export default function NewAdScreen() {
  const { t } = useTranslation("common");
  const { createAdDraft: { mutate: createDraft, isPending } } = useAdDraftMutations();
  const { isRTL } = useUserPreferencesStore();
  const { canCreateNewDraft, initializeSession } = useAdDraftStore()

  const [adType, setAdType] = useState<{ ad_type: string; params: any } | null>(
    null,
  );

  const router = useRouter();

  const handleNavigate = async () => {
    if (!adType || !canCreateNewDraft()) {
      return;
    }
    createDraft({ ad_type: adType.ad_type, content: {}, step_index: 0 }, {
      onSuccess(data) {
        initializeSession({
          id: data.id,
          ad_type: data.ad_type,
          step_index: 0,
          content: {},
          updated_at: Date.now()
        });
        router.navigate({ pathname: `/create/${adType.ad_type}` as any, params: adType.params });
      },
      onError(error) {
        toast.error(error.message)
      },
    });
  };

  return (
    <Container header={<ProfileHeader title={t("createAd.steps.postAd")} />}>
      <View className="p-4 mx-1 flex-1 dark:bg-black">
        <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Text className="font-semibold mb-4 ms-4 dark:text-white text-blue">
            {t("createAd.whatAreYouSelling")}
          </Text>
          <AdTypeSelector
            placeholder={t("createAd.selectYourCategory")}
            selectedValue={adType?.params.label}
            isActive={canCreateNewDraft()}
            data={CAR_BRAND_TYPES}
            onChange={setAdType}
            isRTL={isRTL}
          />
        </View>
        <View className="mt-auto mb-4 items-center">
          <TouchableOpacity
            className="py-3 rounded-lg bg-primary-500 disabled:bg-grayish"
            disabled={!adType?.ad_type || !canCreateNewDraft()}
            style={styles.nextButton}
            onPress={handleNavigate}
          >
            <Text className="text-center text-xl font-inter-semibold">
              {isPending ? <ActivityIndicator size="small" /> : t("next")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!canCreateNewDraft() && (<AdDraftsModal visible={!canCreateNewDraft()} />)}
    </Container>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    ...boxShadow(4, 6, 20).button
  }
})