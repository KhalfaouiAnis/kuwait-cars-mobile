import { DIMENSIONS } from "@/core/constants";
import { SelectOption } from "@/core/types";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SelectInputProps<TForm extends FieldValues> = {
  name: FieldPath<TForm>;
  control: Control<TForm>;
  renderOption: (
    option: SelectOption,
    selected?: boolean,
  ) => ReactNode;
  options: SelectOption[];
  onChangeText?: (text: string) => void;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  error?: string;
  isDark?: boolean;
  isRTL?: boolean;
  translatedValue?: boolean;
};

export default function AdSelectInput<TForm extends FieldValues>({
  control,
  name,
  error,
  options,
  renderOption,
  required,
  isDark,
  isRTL,
  translatedValue,
  placeholder,
}: SelectInputProps<TForm>) {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation("common");
  const {
    field: { onChange, value },
  } = useController({ control, name });

  const renderSelectOption = (option: SelectOption, handleSelect: any) => (
    <Pressable onPress={() => handleSelect(option.value)}>
      {renderOption(option, value)}
    </Pressable>
  );

  const handleSelect = (value: string) => {
    onChange(value);
    setShowModal(false);
  };

  function displayLabel() {
    if (!value || value === "") return placeholder;
    if (translatedValue && value) return t(`colors.${value}`);
    return value;
  }

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => setShowModal(true)}
      className={clsx("relative items-center self-center justify-center border-[0.5px] border-grayish", {
        "border-error": error,
      })}
    >
      <Text className={`${value ? "text-black" : "text-gray-400"} dark:text-white`}>
        {displayLabel()}
      </Text>
      <View className="flex-row items-center absolute end-2.5">
        {required && (
          <View>
            <Text className="text-error">*</Text>
          </View>
        )}
        <Ionicons
          name={isRTL ? "chevron-back" : "chevron-forward"}
          size={20}
          color={isDark ? "white" : "black"}
        />
      </View>
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowModal(false)}
          className="flex-1 justify-end bg-black/20"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => { }}
            className="bg-white dark:bg-black pt-6 mb-10 rounded-t-3xl p-4 w-full -max-h-screen-safe-or-80 min-h-0"
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderSelectOption(item, handleSelect)}
              contentContainerClassName="pb-4 px-1.5 gap-y-2"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    borderRadius: 20,
    ...boxShadow().button,
    width: DIMENSIONS.width - 60,
  }
});