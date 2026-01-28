import AppModal from "@/core/components/ui/dialog/modal";
import { FilterConfigItem } from "@/core/constants/ad";
import useSearchStore, { CombinedFilterKeys } from "@/core/store/search.store";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
import Reset from "../reset";
import { SortingContent } from "../sorting/sorting";
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
  const [activeKey, setActiveKey] = useState<keyof typeof filterConfig | null>(
    null,
  );
  const { syncDraftToApplied, applyFilters, resetDraftFilter } =
    useSearchStore();

  const handleOpen = (key: keyof typeof filterConfig) => {
    syncDraftToApplied();
    setActiveKey(key);
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pe-2"
      >
        <Pressable>
          <View className="ml-2 border border-[#EFEFEF] p-2 rounded-3xl flex-row items-center dark:bg-black">
            <Ionicons
              name="filter"
              size={16}
              color={isDark ? "white" : "black"}
              style={{ fontWeight: "bold" }}
            />
            <Text className="ms-2 text-black dark:text-white">
              {t("advancedSearch.filters")}
            </Text>
          </View>
        </Pressable>
        {Object.entries(filterConfig).map(([key, config]) => (
          <Pressable key={key} onPress={() => handleOpen(key as any)}>
            <View className="ml-2 border border-[#EFEFEF] p-2 rounded-3xl flex-row items-center dark:bg-black">
              <Text className="ms-2 text-black dark:text-white">
                {t(`advancedSearch.${config.title}`)}
              </Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={isDark ? "white" : "black"}
                style={{ fontWeight: "900", paddingTop: 2 }}
              />
            </View>
          </Pressable>
        ))}
        <Pressable onPress={() => handleOpen("price")}>
          <View className="ml-2 border border-[#EFEFEF] p-2 rounded-3xl flex-row items-center dark:bg-black">
            <Text className="ms-2 text-black dark:text-white">
              {t("advancedSearch.price")}
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={isDark ? "white" : "black"}
              style={{ fontWeight: "bold" }}
            />
          </View>
        </Pressable>
      </ScrollView>
      <View className="flex-row items-center mt-2 gap-x-2 px-2">
        <Pressable
          className="border border-[#EFEFEF] p-2 rounded-3xl flex-row items-center gap-x-2 dark:bg-black"
          onPress={() =>
            setView((prevState) =>
              prevState === "horizontal" ? "vertical" : "horizontal",
            )
          }
        >
          <Fontisto
            name="nav-icon-list-a"
            size={16}
            color={isDark ? "white" : "black"}
          />
          <Text className="text-black dark:text-white">{t("changeView")}</Text>
        </Pressable>
        <Pressable
          className="border border-[#EFEFEF] p-2 rounded-3xl flex-row items-center gap-x-2 dark:bg-black"
          onPress={() => handleOpen("sorting")}
        >
          <MaterialCommunityIcons
            name="sort"
            size={18}
            color={isDark ? "white" : "black"}
          />
          <Text className="text-black dark:text-white">{t("sort.sortBy")}</Text>
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
        header={
          <Reset
            reset={() => resetDraftFilter(activeKey as CombinedFilterKeys)}
          />
        }
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
                activeKey={activeKey}
                filterConfig={filterConfig}
              />
            );
        }}
      />
    </>
  );
};
