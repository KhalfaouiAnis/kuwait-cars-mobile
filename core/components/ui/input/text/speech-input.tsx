import { DIMENSIONS } from '@/core/constants';
import { useSpeechToForm } from '@/core/hooks/shared/use-speech';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BaseTextInputProps } from '../..';

export default function InputWithSpeech<TForm extends FieldValues>({ control, name, required, label, placeholder, ...props }: BaseTextInputProps<TForm>) {
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore();

    const {
        field: { onChange, value }, fieldState: { error }
    } = useController({
        control,
        name,
    });

    const { isRecordingForThisField, startListening, stopListening } = useSpeechToForm(name, onChange);

    return (
        <View>
            {label && <Text className="font-inter-medium text-blue ms-2 dark:text-white">{t(label)}</Text>}
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
            {
                props.maxLength && (
                    <Text className='ms-auto me-4 mt-1 text-sm text-gray-300'>{t("textLeft", { count: props.maxLength - (value?.toString().length || 0) })}</Text>
                )
            }
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
