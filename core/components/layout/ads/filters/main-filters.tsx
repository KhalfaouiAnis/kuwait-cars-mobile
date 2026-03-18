import AppModal from "@/core/components/ui/dialog/modal";
import useSearchStore, { CombinedFilterKeys, FilterState } from "@/core/store/search.store";
import { FilterConfigItem } from "@/core/types";
import { FontAwesome6, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
import Reset from "../reset";
import { SortingContent } from "../sorting/sorting";
import FilterButton from "./filter-button";
import { SmartFilterContent } from "./filter-content";
import { PriceFilterContent } from "./price-filter";

interface Props {
  isDark: boolean;
  setView: Dispatch<SetStateAction<"horizontal" | "vertical">>;
  filterConfig: Record<string, FilterConfigItem>;
}

export const MainFilters = ({ isDark, setView, filterConfig }: Props) => {
  const { t } = useTranslation("common");
  const { ad_type } = useLocalSearchParams<{ ad_type: string }>();
  const { syncDraftToApplied, applyFilters, resetDraftFilter, appliedFilters } = useSearchStore();
  const [activeKey, setActiveKey] = useState<keyof typeof filterConfig | null>(null);

  const handleOpen = (key: keyof typeof filterConfig) => {
    syncDraftToApplied();
    setActiveKey(key);
  };

  return (
    <>
      <ScrollView
        horizontal
        contentContainerClassName="px-6 gap-3 mb-1"
        showsHorizontalScrollIndicator={false}
      >
        {Object.entries(filterConfig).map(([filterKey, config]) => {
          return (
            <FilterButton
              key={filterKey}
              title={config.title}
              handleOpen={() => handleOpen(filterKey)}
              active={!!appliedFilters[filterKey as keyof FilterState]}
            />
          )
        })}
        <FilterButton
          title={"price"}
          active={!!appliedFilters.price}
          handleOpen={() => handleOpen("price")}
        />
      </ScrollView>
      <View className="flex-row items-center my-3 gap-x-4 ps-6">
        <Pressable
          className="flex-row items-center gap-x-2 dark:bg-black"
          onPress={() =>
            setView((prevState) =>
              prevState === "horizontal" ? "vertical" : "horizontal",
            )
          }
        >
          <Fontisto
            name="nav-icon-list-a"
            size={16}
            color={isDark ? "rgb(255 255 255 / 0.75)" : "black"}
          />
          <Text className="text-black text-sm dark:text-white/70">{t("changeView")}</Text>
        </Pressable>
        <Pressable
          className="flex-row items-center gap-x-2 dark:bg-black"
          onPress={() => handleOpen("sorting")}
        >
          <MaterialCommunityIcons
            name="sort"
            size={18}
            color={isDark ? "rgb(255 255 255 / 0.75)" : "black"}
          />
          <Text className="text-black text-sm dark:text-white/70">{t("sort.sortBy")}</Text>
        </Pressable>
        <Pressable>
          <View className="ml-2 dark:border-transparent dark:border-b-[#ffffffb3] flex-row items-center dark:bg-black">
            <FontAwesome6
              name="sliders"
              size={16}
              style={{ fontWeight: "bold" }}
              color={isDark ? "rgb(255 255 255 / 0.75)" : "black"}
            />
            <Text className="ms-2 text-black text-sm dark:text-white/70">
              {t("advancedSearch.filters")}
            </Text>
          </View>
        </Pressable>
        {ad_type && (
          <Text className="text-[#D3D3D3] dark:text-white ms-auto me-3">
            {t(`adCategories.${ad_type}`)}
          </Text>
        )}
      </View>
      <AppModal
        visible={!!activeKey}
        onClose={() => {
          applyFilters();
          setActiveKey(null);
        }}
        header={<Reset reset={() => resetDraftFilter(activeKey as CombinedFilterKeys)} />}
        renderContent={() => {
          if (!activeKey) return null;

          if (activeKey === "price") {
            return <PriceFilterContent />;
          } else if (activeKey === "sorting") {
            return <SortingContent />;
          }
          if (activeKey)
            return (
              <SmartFilterContent
                activeKey={activeKey as never}
                filterConfig={filterConfig}
              />
            );
        }}
      />
    </>
  );
};
