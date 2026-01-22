import { useSpeechToForm } from '@/core/hooks/shared/use-speech';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type AudioInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    required?: boolean;
    icon?: ReactNode,
    value?: string;
    error?: string;
    label?: string;
};

export default function InputWithSpeech<TForm extends FieldValues>({ control, name, error, icon, required, label, ...props }: AudioInputProps<TForm>) {
    const { t } = useTranslation("common")
    const { isRTL } = useUserPreferencesStore();

    const {
        field: { onChange, value },
    } = useController({
        control,
        name,
    });

    const { isRecordingForThisField, startListening, stopListening } = useSpeechToForm(name, onChange);

    return (
        <View>
            {label && <Text className="text-base font-semibold mb-1 dark:text-white">{label}</Text>}
            <View className='flex-row items-center justify-between p-3 bordered-box'
                style={[styles.container, boxShadow().button]}
            >
                {
                    icon && <View className='ms-2 items-center'>
                        {icon}
                    </View>
                }
                <View className='flex-1 flex-row items-center justify-between'>
                    <TextInput
                        className="dark:text-gray-100 flex-1"
                        value={value}
                        numberOfLines={1}
                        onChangeText={onChange}
                        style={{
                            writingDirection: isRTL ? "rtl" : "ltr",
                            textAlign: isRTL ? "right" : "left"
                        }}
                        {...props}
                    />
                    <View className='flex-row items-center'>
                        {
                            required && <Text className='text-error text-lg'>*</Text>
                        }
                        <TouchableOpacity hitSlop={10} onPress={isRecordingForThisField ? stopListening : startListening} className='border-none bg-transparent'>
                            {isRecordingForThisField ? (
                                <Text className='text-2xl ms-2'>🛑</Text>
                            ) : (
                                <Ionicons name="mic-outline" size={24} color="gray" style={styles.suffixIcon} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                props.maxLength && (
                    <Text className='ms-auto mt-1 text-sm text-gray-300'>{t("textLeft", { count: props.maxLength - (value?.toString().length || 0) })}</Text>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    suffixIcon: {
        marginStart: 8,
    },
});