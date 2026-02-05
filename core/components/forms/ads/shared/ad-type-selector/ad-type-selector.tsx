import { DIMENSIONS } from "@/core/constants";
import { AD_TYPES } from "@/core/constants/ad";
import { DataItem } from "@/core/types/schema/shared";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type AdTypeSelectorProps = {
  onChange: (value: { ad_type: string; params: any } | null) => void;
  data: DataItem[];
  isRTL: boolean;
  selectedValue?: string;
  placeholder?: string;
};

export default function AdTypeSelector({
  data,
  onChange,
  placeholder,
  selectedValue,
  isRTL,
}: AdTypeSelectorProps) {
  const { t } = useTranslation("car_categories");
  const [showModal, setShowModal] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  }, [expandedPaths])

  const renderItem = useCallback((
    item: any,
    level: number,
    path: string[],
    handleSelect: any,
  ) => {
    const itemPath = [...path, item.value].join(";");
    const isExpanded = expandedPaths.has(itemPath);

    const children = item.regions || item.brands || item.models || [];
    const hasChildren = children.length > 0;

    const isLeaf = !hasChildren;

    if (isLeaf) {
      return (
        <TouchableOpacity
          style={styles.selectButton}
          className="flex-row items-center self-center my-1.5 px-5"
          onPress={() => {
            if (AD_TYPES.used_cars === path[0]) {
              const [brand, model] = item.value.split("/");
              handleSelect({
                ad_type: AD_TYPES.used_cars,
                params: { model, brand, label: t(item.label) },
              });
            } else if (AD_TYPES.motorcycles === path[0]) {
              const [ad_category, brand] = item.value.split("/");
              handleSelect({
                ad_type: AD_TYPES.motorcycles,
                params: { ad_category, brand, label: t(item.label) },
              });
            } else if (AD_TYPES.parts_accessories === path[0]) {
              handleSelect({
                ad_type: AD_TYPES.parts_accessories,
                params: { regison: item.value, label: t(item.label) },
              });
            } else if (AD_TYPES.home_services === path[0]) {
              handleSelect({
                ad_type: AD_TYPES.home_services,
                params: { ad_category: item.value, label: t(item.label) },
              });
            } else {
              handleSelect({
                ad_type: item.value,
                params: { label: t(item.label) },
              });
            }
          }}
        >
          <Ionicons name={item?.icon} size={20} color="gray" />
          <Text className="flex-1 ms-4 text-sm font-semibold">
            {t(item.label)}
          </Text>
          <Ionicons
            className="justify-start"
            name={isRTL ? "chevron-back" : "chevron-forward"}
            size={20}
          />
        </TouchableOpacity>
      );
    }

    return (
      <>
        <TouchableOpacity
          style={[styles.selectButton, {backgroundColor: level === 0 && isExpanded ? "#D9D9D9" : undefined}]}
          className="flex-row self-center items-center my-1.5 px-5"
          onPress={() => hasChildren && toggleExpand(itemPath)}
        >
          <Ionicons name={item?.icon} size={20} color="gray" />
          <Text className="flex-1 ms-4 text-sm font-semibold">
            {t(item.label)}
          </Text>
          <Ionicons
            name={
              isExpanded
                ? "chevron-down"
                : isRTL
                  ? "chevron-back"
                  : "chevron-forward"
            }
            size={20}
            style={{ marginStart: level + 6 }}
          />
        </TouchableOpacity>
        {isExpanded &&
          hasChildren &&
          children.map((child: any, idx: number) => (
            <View style={{ marginStart: level + 26 }} key={idx}>
              {renderItem(
                child,
                level + 1,
                [...path, item.value],
                handleSelect,
              )}
            </View>
          ))}
      </>
    )
  }, [expandedPaths, isRTL, t, toggleExpand])

  const handleSelect = (value: any) => {
    onChange(value);
    setShowModal(false);
  };

  const keyExtractor = useCallback((_: any, index: number) => index.toString(), [])

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => setShowModal(true)}
      className={"relative self-center justify-center border-grayish"}
    >
      <Text className="text-grayish dark:text-white ms-4" pointerEvents="none">
        {selectedValue ? t(selectedValue) : placeholder}
      </Text>
      <View className="flex-row items-center absolute end-2.5">
        <Ionicons
          name={isRTL ? "chevron-back" : "chevron-forward"}
          size={22}
        />
        <Text className="text-error">*</Text>
      </View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowModal(false)}
          className="flex-1 justify-end bg-black/20"
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { }}
            className="bg-white dark:bg-black pt-6 mb-10 rounded-t-3xl p-2 w-full h-[86%] min-h-0 px-4"
          >
            <FlashList
              data={data}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-6 px-6"
              renderItem={({ item }) => renderItem(item, 0, [], handleSelect)}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 45,
    borderWidth: 0.5,
    borderRadius: 20,
    ...boxShadow().button,
    width: DIMENSIONS.width - 60,
  },
  selectButton: {
    height: 45,
    borderRadius: 20,
    ...boxShadow(0, 4, 4).button,
  },
});
