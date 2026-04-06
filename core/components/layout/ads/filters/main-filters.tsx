import AppModal from "@/core/components/ui/dialog/modal";
import useSearchStore, { CombinedFilterKeys, FilterState } from "@/core/store/search.store";
import { FilterConfigItem } from "@/core/types";
import { FontAwesome6, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
import RedDot from "../advanced-search/red-dot";
import Reset from "../reset";
import { SortingContent } from "../sorting/sorting";
import FilterButton from "./filter-button";
import { SmartFilterContent } from "./filter-content";
import { PriceFilterContent } from "./price-filter";

interface Props {
  showReset?: boolean
  showAdType?: boolean
  filterConfig: Record<string, FilterConfigItem>;
  setView: Dispatch<SetStateAction<"horizontal" | "vertical">>;
}

function isNotEmpty(item: any) {
  if (typeof item === "string") return !!item;

  return item?.length > 0
}

export const MainFilters = ({ showReset, showAdType, setView, filterConfig }: Props) => {
  const { dark } = useTheme()
  const { t } = useTranslation("common");
  const { ad_type } = useLocalSearchParams<{ ad_type: string }>();
  const [activeKey, setActiveKey] = useState<keyof typeof filterConfig | null>(null);
  const { syncDraftToApplied, applyFilters, resetDraftFilter, resetAll } = useSearchStore();
  const appliedFilters = useSearchStore(state => state.appliedFilters);

  const handleOpen = (key: keyof typeof filterConfig) => {
    syncDraftToApplied();
    setActiveKey(key);
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-6 gap-4 mb-1"
      >
        {Object.entries(filterConfig).map(([filterKey, config]) => {
          const isActive = isNotEmpty(appliedFilters[filterKey as keyof FilterState]);
          return (
            <View key={filterKey} className="flex-row items-center gap-1">
              {isActive && filterKey === "brand" && <RedDot />}
              <FilterButton
                active={isActive}
                title={config.title}
                handleOpen={() => handleOpen(filterKey)}
                disabled={filterKey === "model" && appliedFilters["brand"]?.length === 0}
              />
            </View>
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
          className="flex-row items-center gap-x-1 dark:bg-black"
          onPress={() =>
            setView((prevState) =>
              prevState === "horizontal" ? "vertical" : "horizontal",
            )
          }
        >
          <Fontisto
            size={16}
            name="nav-icon-list-a"
            color={dark ? "rgb(255 255 255 / 0.75)" : "black"}
          />
          <Text className="text-black text-sm dark:text-white/70">{t("changeView")}</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOpen("sorting")}
          className="flex-row items-center gap-x-1 dark:bg-black"
        >
          <RedDot />
          <MaterialCommunityIcons
            size={18}
            name="sort"
            color={dark ? "rgb(255 255 255 / 0.75)" : "black"}
          />
          <Text className="text-black text-sm dark:text-white/70">{t("sort.sortBy")}</Text>
        </Pressable>
        <Pressable className="flex-row items-center gap-x-1 dark:bg-black">
          <RedDot />
          <FontAwesome6
            size={16}
            name="sliders"
            style={{ fontWeight: "bold" }}
            color={dark ? "rgb(255 255 255 / 0.75)" : "black"}
          />
          <Text className="ms-2 text-black text-sm dark:text-white/70">
            {t("advancedSearch.filters")}
          </Text>
        </Pressable>
        {showAdType && ad_type && (
          <Text className="text-[#D3D3D3] dark:text-white ms-auto me-3">
            {t(`adCategories.${ad_type}`)}
          </Text>
        )}
        {showReset && <Reset
          reset={resetAll}
          disabled={!isNotEmpty(appliedFilters["brand"]) && !isNotEmpty(appliedFilters["model"]) && !isNotEmpty(appliedFilters["year"]) && !isNotEmpty(appliedFilters["cylinders"]) && !isNotEmpty(appliedFilters["province"]) && !isNotEmpty(appliedFilters["transmission"])}
        />}
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
