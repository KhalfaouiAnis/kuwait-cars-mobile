import AdTypeSelector from "@/core/components/forms/ads/shared/ad-type-selector/ad-type-selector";
import AdDraftsModal from "@/core/components/forms/ads/shared/ad-type-selector/drafts-modal";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import { useAdDraftMutations } from "@/core/services/ads/ad.drafts.mutations";
import { canCreateNewDrafts, useAdDraftStore } from "@/core/store/adDrafts.store";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";

export default function NewAdScreen() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false)
  const { isRTL } = useUserPreferencesStore();
  const { initializeSession, drafts } = useAdDraftStore();
  const canCreate = useAdDraftStore(canCreateNewDrafts);
  const { createAdDraft: { mutate: createDraft, isPending } } = useAdDraftMutations();
  const [adType, setAdType] = useState<{ ad_type: string; params: any } | null>(
    null,
  );

  const handleNavigate = async () => {
    if (!canCreate) {
      setVisible(true);
      return;
    }
    if (!adType) {
      return;
    }
    createDraft({
      ad_type: adType.ad_type, content: {
        ad_type: adType.ad_type,
        title: "",
        description: "",
        media: [],
        brand: adType.params?.brand,
        model: adType.params?.model,
        ad_category: adType.params?.ad_category
      }, step_index: 0
    }, {
      onSuccess(data) {
        initializeSession({
          id: data.id,
          content: {
            ad_type: adType.ad_type,
            brand: adType.params?.brand,
            model: adType.params?.model,
            ad_category: adType.params?.ad_category,
          },
          step_index: 0,
          ad_type: data.ad_type,
          updated_at: Date.now(),
        });
        router.navigate({ pathname: `/create/${adType.ad_type}` as any, params: adType.params });
      },
      onError(error) {
        toast.error(error.message)
      },
    });
  };

  useFocusEffect(() => {
    setAdType(null)
    // if (!canCreate) {
    //   setVisible(true);
    // }
  })

  return (
    <Container header={<ProfileHeader title={t("createAd.steps.postAd")} />}>
      <View className="p-4 mx-1 flex-1 dark:bg-black">
        <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Text className="font-inter mb-1 ms-4 dark:text-white text-blue">
            {t("createAd.whatAreYouSelling")}
          </Text>
          <AdTypeSelector
            placeholder={t("createAd.selectYourCategory")}
            selectedValue={adType?.params.label}
            data={CAR_BRAND_TYPES}
            isActive={canCreate}
            onChange={setAdType}
            isRTL={isRTL}
          />
        </View>
        <View className="mt-auto mb-4 items-center gap-6">
          {
            Object.keys(drafts).length > 0 && (
              <TouchableOpacity
                className="py-3 rounded-lg bg-primary-500 disabled:bg-grayish"
                onPress={() => setVisible(true)}
                style={styles.nextButton}
              >
                <Text className="text-center text-xl font-inter-semibold">
                  My drafts
                </Text>
              </TouchableOpacity>
            )
          }

          <TouchableOpacity
            className="py-3 bg-primary-500 disabled:bg-grayish"
            disabled={!canCreate || !adType}
            style={styles.nextButton}
            onPress={handleNavigate}
          >
            <Text className="text-center text-xl font-inter-semibold">
              {isPending ? <ActivityIndicator size="small" /> : t("next")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <AdDraftsModal visible={visible} reachedLimit={!canCreate} onClose={() => setVisible(false)} />
    </Container>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    height: 45,
    width: 200,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    ...boxShadow(4, 6, 20).button
  }
})