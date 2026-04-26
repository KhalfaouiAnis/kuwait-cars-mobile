import Flag from "@/assets/svg/flag";
import { SUPPORTED_LANGUAGES } from "@/core/constants";
import i18n from "@/core/i18n/i18n";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Language } from "@/core/types";
import { cn } from "@/core/utils/cn";
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useDropdown } from "react-native-anchor-dropdown";

type LanguageSwitcherProps = {
  onLanguageChange?: (code: string) => void;
};

export default function LanguageSwitcher({
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { lang: selectedLang, setLang } = useUserPreferencesStore();
  const {
    triggerRef,
    coords,
    isVisible,
    onDropdownLayout,
    close,
    open,
  } = useDropdown({ maxHeight: 300, gap: 8, placement: "auto" });

  const handleSelect = (lang: Language) => {
    setLang(lang.code);
    close();
    i18n.changeLanguage(lang.code);
    onLanguageChange?.(lang.code);
  };

  const renderItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      className={cn("flex-row items-center rounded-full", {
        "border-2 border-error": selectedLang === item.code
      })}
      onPress={() => handleSelect(item)}
      activeOpacity={0.7}
    >
      <Flag name={item.code} size={30} />
    </TouchableOpacity>
  );

  return (
    <View collapsable={false}>
      <TouchableOpacity
        onPress={open}
        ref={triggerRef}
        key={selectedLang}
        activeOpacity={0.7}
        className="w-10 h-10 items-center justify-center overflow-hidden"
      >
        <Flag name={selectedLang} size={30} />
      </TouchableOpacity>
      <Modal
        transparent
        visible={isVisible}
        animationType="fade"
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={close} className="flex-1">
          <View
            onLayout={onDropdownLayout}
            className="bg-white dark:bg-darkish"
            style={[{ ...coords, left: "80%" }, styles.dropdown]}
          >
            <FlatList
              contentContainerClassName="gap-y-4 px-4"
              keyExtractor={(item) => item.code}
              data={SUPPORTED_LANGUAGES}
              renderItem={renderItem}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    borderRadius: 20,
    width: "auto",
    padding: 4,
  },
  listContent: {
    gap: 12,
    padding: 6,
    paddingBottom: 12,
  },
});