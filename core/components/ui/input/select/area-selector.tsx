import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { AreaOption, ProvinceArea } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { ReactNode, useCallback, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";

type AreaSelectorProps<TForm extends FieldValues> = {
  name: FieldPath<TForm>;
  control: Control<TForm>;
  renderProvinceAreaOption: (option: ProvinceArea, selected?: string) => ReactNode;
  options: AreaOption[];
  placeholder?: string;
  error?: string;
  label?: string;
};

export default function AreaSelect<TForm extends FieldValues>({
  control,
  name,
  error,
  options,
  renderProvinceAreaOption,
  label,
  placeholder,
}: AreaSelectorProps<TForm>) {
  const { t } = useTranslation("common");
  const { isRTL, theme } = useUserPreferencesStore();
  const isDark = theme !== "light";
  const [showModal, setShowModal] = useState(false);
  const {
    field: { onChange, value },
  } = useController({ control, name });

  const renderSelectOption = (option: AreaOption, handleSelect: any) => (
    <Pressable onPress={() => handleSelect(option)}>
      {renderProvinceAreaOption(
        { label: t("areas." + option.area), value: option?.area },
        value?.area,
      )}
    </Pressable>)

  const handleSelect = (option: AreaOption) => {
    onChange(option);
    setShowModal(false)
  }

  const renderItem = ({ item }: { item: AreaOption }) => (
    renderSelectOption(item, handleSelect)
  )
  const keyExtractor = useCallback((item: AreaOption) => item.area, []);

  return (
    <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {label && (
        <Text className="text-base font-semibold ps-6 mb-1 dark:text-white text-black">
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => setShowModal(true)}
        className={clsx(
          "flex-row items-center self-center ps-3 dark:border-[#46464640] dark:bg-[#1B1B1B80] justify-between rounded-3xl border border-grayish bg-transparent",
          {
            "border-error": error,
          },
        )}
        style={{
          boxShadow: boxShadow().button.boxShadow,
          width: DIMENSIONS.width - 60,
          height: 60,
        }}
      >
        <View className="flex-row items-center gap-2 ms-2">
          <MaterialIcons
            name="location-city"
            size={20}
            color={isDark ? "white" : "gray"}
          />
          <Text className={`${value?.area ? "text-[#333]" : "text-gray-400"} dark:text-white ms-2`}>
            {value?.area ? t("areas." + value?.area) : placeholder}
          </Text>
        </View>
        <Ionicons
          size={20}
          className="me-3"
          color={isDark ? "white" : "black"}
          name={isRTL ? "chevron-back" : "chevron-forward"}
        />
      </Pressable>
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View className="dark:bg-black flex-1  justify-center items-center bg-black/30  border border-transparent pb-safe pt-safe overflow-hidden">
            {options.length > 0 && <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-4 bg-white p-4 mb-safe rounded-xl"
            />}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
