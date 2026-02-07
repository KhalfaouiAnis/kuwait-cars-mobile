import AdTypeSelector from "@/core/components/forms/ads/shared/ad-type-selector/ad-type-selector";
import ProfileHeader from "@/core/components/layout/header/profile-header";
import Container from "@/core/components/ui/container";
import { CAR_BRAND_TYPES } from "@/core/constants/ad";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewAdScreen() {
  const { t } = useTranslation("common");
  const { isRTL } = useUserPreferencesStore();
  // const { data: serverDrafts } = useAdDraftsQuery();

  const [adType, setAdType] = useState<{ ad_type: string; params: any } | null>(
    null,
  );

  const router = useRouter();

  const handleNavigate = () => {
    if (!adType) return;
    // if (serverDrafts && serverDrafts.length >= MAX_DRAFTS_COUNT) {
    //   Alert.alert("Limit Reached", "You can only have 5 drafts. Delete one to continue.");
    //   return;
    // }
    //   API to create new draft
    //   initializeSession({
    //   id: newId,
    //   category: cat,
    //   stepIndex: 0,
    //   content: {},
    //   updatedAt: Date.now()
    // });
    const { ad_type, params } = adType;
    router.navigate({ pathname: `/create/${ad_type}` as any, params });
  };

  useFocusEffect(() => { setAdType(null) })

  return (
    <Container header={<ProfileHeader title={t("createAd.steps.postAd")} />}>
      <View className="p-4 mx-1 flex-1 dark:bg-black">
        <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
          <Text className="font-semibold mb-4 dark:text-white text-blue">
            {t("createAd.whatAreYouSelling")}
          </Text>
          <AdTypeSelector
            data={CAR_BRAND_TYPES}
            selectedValue={adType?.params.label}
            onChange={setAdType}
            placeholder={t("createAd.selectYourCategory")}
            isRTL={isRTL}
          />
        </View>
        <View className="mt-auto mb-4 items-center">
          <TouchableOpacity
            className="py-3 rounded-lg bg-primary-500 disabled:bg-yellow-200"
            style={styles.nextButton}
            onPress={handleNavigate}
            disabled={!adType}
          >
            <Text className="text-center text-xl font-inter-semibold">
              {t("next")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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