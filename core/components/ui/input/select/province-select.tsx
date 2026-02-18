import { DIMENSIONS } from "@/core/constants";
import { useDropdown } from "@/core/hooks/use-dropdown";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { ProvinceArea, ProvinceOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { clsx } from "clsx";
import React, { ReactNode, useCallback } from "react";
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
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ProvinceSelectProps<TForm extends FieldValues> = {
  name: FieldPath<TForm>;
  control: Control<TForm>;
  renderOption: (option: ProvinceArea, selected?: string) => ReactNode;
  options: ProvinceOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  label?: string;
};

export default function ProvinceSelect<TForm extends FieldValues>({
  control,
  name,
  error,
  options,
  renderOption,
  label,
  required,
  placeholder,
}: ProvinceSelectProps<TForm>) {
  const { isRTL } = useUserPreferencesStore();
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation("common");
  const { dark } = useTheme()
  const { triggerRef, coords, open, close, isVisible } = useDropdown()
  const { field: { onChange, value }, } = useController({ control, name });

  const renderSelectOption = useCallback((option: ProvinceOption, handleSelect: any) => (
    <Pressable onPress={() => handleSelect(option)}>
      {renderOption(
        {
          label: t("provinces." + option.province) || "",
          value: option?.province,
        },
        value?.province,
      )}
    </Pressable>
  ), [renderOption, t, value?.province])

  const handleSelect = useCallback((option: ProvinceOption) => {
    onChange(option);
    close()
  }, [onChange, close])

  const renderItem = ({ item }: { item: ProvinceOption }) => (
    renderSelectOption(item, handleSelect)
  )

  const keyExtractor = useCallback((item: ProvinceOption) => item.province, []);

  return (
    <View
      collapsable={false}
      style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {label && (
        <Text className="text-base font-semibold ps-6 mb-1 dark:text-white text-black">
          {label}
        </Text>
      )}
      <Pressable
        ref={triggerRef}
        onPress={open}
        className={clsx(
          "flex-row items-center self-center ps-3 dark:border-[#46464640] dark:bg-[#1B1B1B80] justify-between rounded-3xl border-[0.5px] border-grayish bg-transparent",
          {
            "border-error": error,
          },
        )}
        style={{
          boxShadow: boxShadow().button.boxShadow,
          width: DIMENSIONS.width - 60,
          height: 55
        }}
      >
        <View className="flex-row items-center gap-2 ms-2">
          <MaterialCommunityIcons
            name="town-hall"
            size={20}
            color={dark ? "white" : "black"}
          />
          <Text className={`${value?.province ? "text-[#333] dark:text-white" : "text-[#C7C7CD]"} ms-2 font-inter`}>
            {value?.province ? t("provinces." + value?.province) : placeholder}
          </Text>
        </View>
        <View className="flex-row mx-4  items-center">
          <Ionicons
            name={isRTL ? "chevron-back" : "chevron-forward"}
            size={20}
            color={dark ? "white" : "black"}
          />
          {required && (
            <View>
              <Text className="text-error">*</Text>
            </View>
          )}
        </View>
      </Pressable>
      {error && <Text className="text-error text-sm ms-2 mt-2">{t(`validation.${error}`)}</Text>}
      <Modal
        transparent
        visible={isVisible}
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable
          onPress={close}
          className="flex-1 justify-center items-center bg-black/10"
        >
          <View
            style={{
              top: coords.top,
              bottom: bottom + 10,
              [isRTL ? "left" : "right"]: coords.left,
              borderRadius: 20,
              ...boxShadow().button
            }}
            className="absolute bg-white p-4 dark:bg-darkish rounded-lg"
          >
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              contentContainerClassName="gap-3 p-1.5 pb-3"
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
