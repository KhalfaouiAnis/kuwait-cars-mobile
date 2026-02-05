import { DIMENSIONS } from '@/core/constants';
import { useSpeechToForm } from '@/core/hooks/shared/use-speech';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BaseTextInputProps } from '../..';

export default function InputWithSpeech<TForm extends FieldValues>({ control, name, required, label, ...props }: BaseTextInputProps<TForm>) {
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
            {label && <Text className="text-base font-semibold mb-1 ms-5 dark:text-white">{label}</Text>}
            <View
                style={[styles.container, boxShadow().button]}
                className='flex-row items-center justify-between p-3 border border-grayish'
            >
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
                            <Ionicons name="mic-outline" size={24} color={isRecordingForThisField ? "#FFF12E" : "gray"} style={styles.suffixIcon} />
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
