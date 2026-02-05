import MainSearch from "@/core/components/layout/ads/advanced-search/main-search";
import SearchHistory from "@/core/components/layout/ads/advanced-search/search-history";
import useSearchStore from "@/core/store/search.store";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function SearchScreen() {
  const [showNewSearch, setShowNewSearch] = useState(false);
  const { hasHydrated, lastAdvancedSearch } = useSearchStore();

  useFocusEffect(useCallback(() => {
    return () => {
      setShowNewSearch(false);
    }
  }, []));

  if (!hasHydrated) return null;

  const shouldShowHistory = lastAdvancedSearch && !showNewSearch;

  return (
    <View style={{ flex: 1 }}>
      {shouldShowHistory ? (
        <Animated.View
          key="history"
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          style={{ flex: 1 }}
        >
          <SearchHistory onNewSearch={() => setShowNewSearch(true)} />
        </Animated.View>
      ) : (
        <Animated.View
          key="main"
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          style={{ flex: 1 }}
        >
          <MainSearch />
        </Animated.View>
      )}
    </View>
  );
}