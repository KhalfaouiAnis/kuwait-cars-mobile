import Flag from '@/assets/svg/flag';
import { SUPPORTED_LANGUAGES } from '@/core/constants';
import i18n from '@/core/i18n/i18n';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { Language } from '@/core/types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Checkbox from '../input/checkbox';

type LanguageSwitcherProps = {
    onLanguageChange?: (code: string) => void;
};

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { lang: selectedLang, setLang } = useUserPreferencesStore();
    const { t } = useTranslation();

    const handleSelect = (lang: Language) => {
        setLang(lang.code);
        setIsOpen(false);
        i18n.changeLanguage(lang.code);
        onLanguageChange?.(lang.code);
    };

    const renderItem = ({ item }: { item: Language }) => (
        <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-200 dark:border-primary-500"
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
        >
            <Flag name={item.code} size={36} />
            <Text className="flex-1 text-base text-gray-900 dark:text-white font-medium ml-4">{t(item.name)}</Text>
            {selectedLang === item.code && (
                <Checkbox checked={item.code === selectedLang} />
            )}
        </TouchableOpacity>
    );

    return (
        <View>
            <TouchableOpacity
                key={selectedLang}
                className="w-10 h-10 items-center justify-center overflow-hidden"
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
            >
                <Flag name={selectedLang} size={30} />
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white dark:bg-darkish dark:border-primary-500 dark:border rounded-lg w-80 overflow-hidden">
                            <FlatList
                                data={SUPPORTED_LANGUAGES}
                                keyExtractor={(item) => item.code}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
