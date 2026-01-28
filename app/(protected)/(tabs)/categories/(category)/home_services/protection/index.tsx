import AdCategoryIndex from "@/core/components/layout/ads/ad-listing-index";
import { AD_TYPES } from "@/core/constants/ad";
import { useMotorcyclesFilterConfig } from "@/core/hooks/ad/useFilterConfig";
import useSearchStore from "@/core/store/search.store";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

export default function HomeServicesCategoryScreen() {
  const setExternalFilter = useSearchStore((state) => state.setExternalFilter);
  const { ad_category } = useLocalSearchParams<{ ad_category: string }>();
  const filterConfig = useMotorcyclesFilterConfig();

  useFocusEffect(
    useCallback(() => {
      setExternalFilter("ad_type", AD_TYPES.home_services);
      setExternalFilter("ad_category", ad_category);
    }, [setExternalFilter, ad_category]),
   );
 
   return (
     <AdCategoryIndex filterConfig={filterConfig} />
   );
}
