import Flag from "@/assets/svg/flag";
import { SUPPORTED_LANGUAGES } from "@/core/constants";
import i18n from "@/core/i18n/i18n";
import useUserPreferencesStore from "@/core/store/preferences.store";
import { Language } from "@/core/types";
import { cn } from "@/core/utils/cn";
import React, { useRef, useState } from "react";
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
  const { lang: selectedLang, setLang, isRTL } = useUserPreferencesStore();
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [isMeasured, setIsMeasured] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef<View | null>(null);

  const openDropdown = () => {
    setIsMeasured(false);
    iconRef.current && iconRef.current.measure((x, y, width, height, pageX, pageY) => {
      setDropdownPos({ top: pageY + height, left: 20 });
      setIsMeasured(true);
      setIsOpen(true);
    });
  };

  const handleSelect = (lang: Language) => {
    setLang(lang.code);
    setIsOpen(false);
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
        ref={iconRef}
        key={selectedLang}
        activeOpacity={0.7}
        onPress={openDropdown}
        className="w-10 h-10 items-center justify-center overflow-hidden"
      >
        <Flag name={selectedLang} size={30} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
      >
        <Pressable
          className="flex-1 justify-center items-center bg-black/20" onPress={() => setIsOpen(false)}>
          <View
            style={{
              top: dropdownPos.top,
              start: isRTL ? dropdownPos.left : undefined,
              end: isRTL ? undefined : dropdownPos.left,
              opacity: isMeasured ? 1 : 0
            }}
            className="absolute bg-white p-4 dark:bg-black rounded-lg flex-1">
            <FlatList
              keyExtractor={(item) => item.code}
              data={SUPPORTED_LANGUAGES}
              contentContainerClassName="gap-y-4 px-4"
              renderItem={renderItem}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
