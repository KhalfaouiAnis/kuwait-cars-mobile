import { DIMENSIONS } from '@/core/constants';
import { useSpeechToForm } from '@/core/hooks/shared/use-speech';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BaseTextInputProps } from '../..';

export default function TextAreaSpeech<TForm extends FieldValues>({ control, name, icon, required, label, placeholder, ...props }: BaseTextInputProps<TForm>) {
    const { isRTL } = useUserPreferencesStore();
    const { t } = useTranslation("common")
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
                className='justify-between border-[0.5px]'
                style={[styles.container, boxShadow().button, { borderColor: error ? "#FF123D" : "#A8A8A8" }]}
            >
                <View className='flex-1 flex-row items-start'>
                    <TextInput
                        {...props}
                        className="dark:text-gray-100 flex-1 font-inter"
                        placeholder={t(placeholder || "")}
                        onChangeText={onChange}
                        numberOfLines={10}
                        multiline={true}
                        value={value}
                        style={{
                            writingDirection: isRTL ? "rtl" : "ltr",
                            textAlign: isRTL ? "right" : "left",
                            textAlignVertical: "top",
                        }}
                    />
                    <View className='items-center justify-between h-full py-2'>
                        {
                            required && <Text className='text-error text-lg me-2'>*</Text>
                        }
                        <TouchableOpacity hitSlop={10} onPress={isRecordingForThisField ? stopListening : startListening} >
                            <Ionicons name="mic-outline" size={24} color={isRecordingForThisField ? "#FFF12E" : "black"} />
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
        flexDirection: 'row',
        alignSelf: "center",
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 170,
        width: DIMENSIONS.width - 60,
        ...boxShadow().button,
    }
});