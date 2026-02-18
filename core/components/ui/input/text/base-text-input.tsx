import { DIMENSIONS } from '@/core/constants';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow, cn } from '@/core/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BaseTextInputProps } from '../..';

export default function BaseTextInput<TForm extends FieldValues>({
    control, name, label, translatedLabel, icon, customIcon, endIcon, required, fullWidth = true, placeholder, translatedPlaceholder, ...props
}: BaseTextInputProps<TForm>) {
    const { field: { onChange, value }, fieldState: { error } } = useController({ control, name });
    const [showPassword, setShowPassword] = useState(false);
    const { isRTL } = useUserPreferencesStore();
    const { t } = useTranslation("common");
    const { dark } = useTheme()

    const displayedLabel = translatedLabel ? translatedLabel : label ? t(label) : undefined
    const displayedPlaceholder = translatedPlaceholder ? translatedPlaceholder : placeholder ? t(placeholder) : undefined

    return (
        <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {displayedLabel && <Text className="font-inter-medium text-blue font-semibold ms-2 dark:text-white">{t(displayedLabel)}</Text>}
            <View
                className="flex-row items-center dark:border-[#46464640] dark:bg-[#1B1B1B80] px-3"
                style={
                    [
                        styles.wrapper,
                        {
                            width: fullWidth ? DIMENSIONS.width - 60 : undefined, borderWidth: 0.5,
                            borderColor: error ? "#FF123D" : "#A8A8A8"
                        }
                    ]}
            >
                {customIcon ? (
                    customIcon
                ) : (
                    <Ionicons
                        name={icon}
                        size={22}
                        color={error ? "#D80027" : dark ? "white" : "black"}
                    />
                )}
                <View className='flex-1 flex-row items-center justify-between'>
                    <TextInput
                        {...props}
                        numberOfLines={1}
                        className={cn(
                            "flex-1 overflow-hidden text-[#333] dark:text-white ms-2 font-inter",
                            { "text-error dark:text-error": error },
                        )}
                        placeholder={displayedPlaceholder}
                        placeholderTextColor="#A8A8A8"
                        onChangeText={onChange}
                        value={value as string}
                        secureTextEntry={props.secureTextEntry && !showPassword}
                        style={{
                            writingDirection: isRTL ? "rtl" : "ltr",
                            textAlign: isRTL ? "right" : "left"
                        }}
                    />
                    <View className="flex-row mx-2 gap-4 items-center">
                        {endIcon && (
                            <Pressable
                                hitSlop={6}
                                onPress={() => setShowPassword((prevState) => !prevState)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : endIcon}
                                    size={22}
                                    color={error ? "#D80027" : dark ? "#B3B3B3" : "#677185"}
                                />
                            </Pressable>
                        )}
                        {required && (<Text className="text-error">*</Text>)}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 60,
        borderRadius: 20,
        ...boxShadow().button,
    }
});