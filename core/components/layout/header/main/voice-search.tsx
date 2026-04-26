import { BaseTextInputProps } from "@/core/components/ui";
import { DIMENSIONS } from '@/core/constants';
import { useSpeechToForm } from '@/core/hooks/shared/use-speech';
import useUserPreferencesStore from '@/core/store/preferences.store';
import useSearchStore from "@/core/store/search.store";
import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TextInputChangeEvent, TouchableOpacity, View } from 'react-native';

export default function TextVoiceSearch() {
    const [text, setText] = useState("");
    const handleChange = (event: TextInputChangeEvent) => setText(event.nativeEvent.text);
    const applyFilters = useSearchStore(state => state.applyFilters)
    const { isRecordingForThisField, startListening, stopListening } = useSpeechToForm("search_by_voice", handleChange);

    const { dark } = useTheme();
    const { t } = useTranslation("common");

    const handleSearch = () => {

    }

    return (
        <View className="flex-row items-center gap-x-2 flex-1">
            <Ionicons
                size={18}
                name="search-outline"
                color={dark ? "#B3B3B3" : "#000000b3"}
            />
            <TextInput
                value={text}
                autoCapitalize="none"
                onChange={handleChange}
                placeholder={`${t("search")}...`}
                className="flex-1 text-black placeholder:text-[#A8A8A8] dark:text-white dark:placeholder:text-[#A8A8A8]"
            />
            <TouchableOpacity hitSlop={6} onPress={isRecordingForThisField ? stopListening : startListening}>
                <Ionicons name="mic-outline" size={22} color={isRecordingForThisField ? "#FFF12E" : dark ? "#ffffffb3" : "#000000b3"} />
            </TouchableOpacity>
        </View>
    )
}

export function InputWithSpeech<TForm extends FieldValues>({ control, name, required, label, placeholder, ...props }: BaseTextInputProps<TForm>) {
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore();

    const {
        field: { onChange, value }, fieldState: { error }
    } = useController({
        control,
        name,
    });

    const { isRecordingForThisField, startListening, stopListening } = useSpeechToForm("search_by_voice", onChange);

    return (
        <View
            style={[styles.container, boxShadow().button, { borderColor: error ? "#FF123D" : "#A8A8A8" }]}
            className='flex-row items-center justify-between border-[0.5px]'
        >
            <View className='flex-1 flex-row items-center justify-between'>
                <TextInput
                    {...props}
                    className="dark:text-gray-100 flex-1 font-inter"
                    placeholder={t(placeholder || "")}
                    onChangeText={onChange}
                    numberOfLines={1}
                    value={value}
                    style={{
                        writingDirection: isRTL ? "rtl" : "ltr",
                        textAlign: isRTL ? "right" : "left"
                    }}
                />
                <View className='flex-row items-center'>
                    {
                        required && <Text className='text-error text-lg'>*</Text>
                    }
                    <TouchableOpacity hitSlop={10} onPress={isRecordingForThisField ? stopListening : startListening}>
                        <Ionicons name="mic-outline" size={24} color={isRecordingForThisField ? "#FFF12E" : "black"} style={styles.suffixIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 60,
        borderRadius: 20,
        ...boxShadow().button,
        width: DIMENSIONS.width - 60,
    },
    suffixIcon: {
        marginStart: 4,
    },
});
