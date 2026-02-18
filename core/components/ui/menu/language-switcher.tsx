import Flag from "@/assets/svg/flag";
import { SUPPORTED_LANGUAGES } from "@/core/constants";
import { useDropdown } from "@/core/hooks/use-dropdown";
import i18n from "@/core/i18n/i18n";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Language } from "@/core/types";
import { cn } from "@/core/utils/cn";
import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  View
} from "react-native";

type LanguageSwitcherProps = {
  onLanguageChange?: (code: string) => void;
};

export default function LanguageSwitcher({
  onLanguageChange,
}: LanguageSwitcherProps) {
  const { lang: selectedLang, setLang } = useUserPreferencesStore();
  const { close, coords, toggle, isVisible, triggerRef } = useDropdown()

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
        ref={triggerRef}
        key={selectedLang}
        activeOpacity={0.7}
        onPress={toggle}
        className="w-10 h-10 items-center justify-center overflow-hidden"
      >
        <Flag name={selectedLang} size={30} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={isVisible}
        animationType="fade"
      >
        <Pressable
          onPress={close}
          className="flex-1 justify-center items-center bg-black/20">
          <View
            style={{
              top: coords.top,
              left: coords.left - 60,
            }}
            className="absolute bg-white p-4 dark:bg-darkish rounded-lg flex-1">
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
