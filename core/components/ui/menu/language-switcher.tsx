import { SUPPORTED_LANGUAGES } from '@/core/constants';
import i18n from '@/core/i18n/i18n';
import useUserPreferencesStore from '@/core/lib/stores/preferences.store';
import { LanguageCode } from '@/core/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

type LanguageSwitcherProps = {
    onLanguageChange?: (code: string) => void; // Optional callback
};

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const {lang: selectedLang, setLang} = useUserPreferencesStore();
    const { t } = useTranslation();

    const handleSelect = (lang: typeof SUPPORTED_LANGUAGES[0]) => {
        setLang(lang.code as LanguageCode);
        setIsOpen(false);
        i18n.changeLanguage(lang.code);
        onLanguageChange?.(lang.code);
    };

    const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

    const renderItem = ({ item }: { item: typeof SUPPORTED_LANGUAGES[0] }) => (
        <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
        >
            <Text className="mr-3 text-xl">{item.flag}</Text>
            <Text className="flex-1 text-base text-gray-900 font-medium">{t(item.name)}</Text>
            {selectedLang === item.code && (
                <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
            )}
        </TouchableOpacity>
    );

    return (
        <View>
            <TouchableOpacity
                key={selectedLang}
                className="w-10 h-10 rounded-full border border-gray-100 items-center justify-center overflow-hidden"
                onPress={() => setIsOpen(true)}
                activeOpacity={0.7}
            >
                <Text className="text-2xl leading-none">{currentLang.flag}</Text>
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white rounded-lg w-80 max-h-64 overflow-hidden">
                            <FlatList
                                data={SUPPORTED_LANGUAGES}
                                keyExtractor={(item) => item.code}
                                renderItem={renderItem}
                                className='max-h-64'
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
