import AdCategoryIndex from "@/core/components/layout/ads/ad-listing-index";
import { AD_TYPES } from "@/core/constants/ad";
import { useMotorcyclesFilterConfig } from "@/core/hooks/ad/useFilterConfig";
import useSearchStore from "@/core/store/search.store";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function OtherCategoryScreen() {
  const setExternalFilter = useSearchStore((state) => state).setExternalFilter;
  const filterConfig = useMotorcyclesFilterConfig()

  useFocusEffect(
    useCallback(() => {
      setExternalFilter("ad_type", AD_TYPES.Other);
    }, [setExternalFilter]),
  );

  return (
    <AdCategoryIndex filterConfig={filterConfig} />
  );
}
