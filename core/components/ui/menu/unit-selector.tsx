import { DIMENSIONS } from "@/core/constants";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type UnitSelectorProps<TForm extends FieldValues> = {
  control: Control<TForm>;
  name: FieldPath<TForm>;
  onSelect?: (code: string) => void;
}

const UNIT_OPTIONS = [
  { value: 'KM' },
  { value: 'ML' },
];

export default function UnitSelector<TForm extends FieldValues>({ control, name, onSelect }: UnitSelectorProps<TForm>) {
  const { field: { onChange, value } } = useController({ control, name });
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, right: 0 });
  const [isMeasured, setIsMeasured] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isRTL } = useUserPreferencesStore();
  const iconRef = useRef<View | null>(null);
  const { t } = useTranslation("common")

  const handleSelect = (unit: string) => {
    setIsOpen(false);
    onChange(unit)
    onSelect?.(unit);
  };

  const renderItem = ({ item: { value } }: { item: { value: string } }) => (
    <TouchableOpacity
      className="flex-row items-center border-b border-gray-200"
      onPress={() => handleSelect(value)}
      activeOpacity={0.7}
    >
      <Text className="text-base text-gray-700 font-medium">{t(`unit.${value}`)}</Text>
    </TouchableOpacity>
  );

  const openDropdown = () => {
    setIsMeasured(false);
    iconRef.current && iconRef.current.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPos({ top: pageY + height + 20, left: DIMENSIONS.width - 320, right: DIMENSIONS.width - 114 });
      setIsMeasured(true);
      setIsOpen(true);
    });
  };

  return (
    <View
      collapsable={false}
      style={styles.wrapper}
      className='flex-1 items-center justify-center border border-grayish px-6'
    >
      <TouchableOpacity
        hitSlop={30}
        ref={iconRef}
        activeOpacity={0.7}
        onPress={openDropdown}
        className="flex-row items-center gap-2 overflow-hidden"
      >
        <Text className="text-base text-gray-600 dark:text-white font-medium">{t(`unit.${value}`) || t("unit.KM")}</Text>
        <Ionicons name='chevron-down' size={20} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/20" onPress={() => setIsOpen(false)}
        >
          <View
            style={{
              top: dropdownPos.top,
              start: isRTL ? dropdownPos.right : undefined,
              end: isRTL ? undefined : dropdownPos.left,
              opacity: isMeasured ? 1 : 0
            }}
            className="absolute bg-white p-4 dark:bg-darkish rounded-lg flex-1">
            <FlatList
              contentContainerClassName="gap-y-4 px-4"
              keyExtractor={(item) => item.value}
              renderItem={renderItem}
              data={UNIT_OPTIONS}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 45,
    borderRadius: 20,
    width: 95,
    ...boxShadow().button,
  }
});