import useUserPreferencesStore from "@/core/store/preferences.store";
import { ProvinceArea, ProvinceOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { ReactNode, useState } from "react";
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
  View,
} from "react-native";

type ProvinceSelectorProps<TForm extends FieldValues> = {
  name: FieldPath<TForm>;
  control: Control<TForm>;
  renderOption: (option: ProvinceArea, selected?: string) => ReactNode;
  options: ProvinceOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  label?: string;
  primary?: boolean;
};

export default function ProvinceSelector<TForm extends FieldValues>({
  control,
  name,
  error,
  options,
  renderOption,
  label,
  required,
  placeholder,
  primary,
}: ProvinceSelectorProps<TForm>) {
  const { t } = useTranslation("common");
  const { isRTL, theme } = useUserPreferencesStore();
  const isDark = theme !== "light";

  const [showModal, setShowModal] = useState(false);
  const {
    field: { onChange, value },
  } = useController({ control, name });

  const renderSelectOption = (option: ProvinceOption, handleSelect: any) => (
    <Pressable onPress={() => handleSelect(option)}>
      {renderOption(
        {
          label: t("provinces." + option.province) || "",
          value: option?.province,
        },
        value?.province,
      )}
    </Pressable>
  );

  const handleSelect = (option: ProvinceOption) => {
    onChange(option);
    setShowModal(false);
  };

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
          "flex-row items-center py-4 ps-3 pe-2 justify-between border dark:border-primary-500 dark:bg-black",
          {
            "border-error": error,
            "border-primary-500 rounded-lg border": primary,
            "border-grayish": !primary && !error,
          },
        )}
        style={primary ? undefined : boxShadow().button}
      >
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="town-hall"
            size={20}
            color={isDark ? "white" : "gray"}
          />
          <Text
            className={`${value?.province ? "text-[#333]" : "text-gray-400"} dark:text-white`}
          >
            {value?.province ? t("provinces." + value?.province) : placeholder}
          </Text>
        </View>
        <View className="flex-row">
          <Ionicons
            name={isRTL ? "chevron-back" : "chevron-forward"}
            size={20}
            color={isDark ? "white" : "black"}
          />
          {required && (
            <View>
              <Text className="text-error">*</Text>
            </View>
          )}
        </View>
      </Pressable>
      {error && <Text className="text-error text-sm ms-2">{error}</Text>}
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="dark:bg-black border bg-transparent border-transparent w-80 overflow-hidden">
              <FlatList
                data={options}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.province}
                renderItem={({ item }) =>
                  renderSelectOption(item, handleSelect)
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
