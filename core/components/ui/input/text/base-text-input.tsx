import { DIMENSIONS } from '@/core/constants';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow } from '@/core/utils/cn';
import { FieldValues, useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { BaseTextInputProps } from '../..';

export default function BaseTextInput<TForm extends FieldValues>({ control, name, label, icon, required, fullWidth = true, ...props }: BaseTextInputProps<TForm>) {
    const { field: { onChange, value } , fieldState: { error } } = useController({ control, name });
    const { isRTL } = useUserPreferencesStore();

    return (
        <View>
            {label && <Text className="text-base font-semibold mb-1 ms-5 dark:text-white">{label}</Text>}
            <View
                className="flex-row items-center self-center justify-between border-grayish"
                style={[styles.wrapper, { width: fullWidth ? DIMENSIONS.width - 60 : undefined, borderWidth: 0.5 }]}
            >
                {
                    icon && <View className='ms-2 items-center'>
                        {icon}
                    </View>
                }
                <View className='me-3 flex-1 flex-row items-center justify-between'>
                    <TextInput
                        className="text-[#333] dark:text-white flex-1"
                        onChangeText={onChange}
                        numberOfLines={1}
                        value={value}
                        style={{
                            writingDirection: isRTL ? "rtl" : "ltr",
                            textAlign: isRTL ? "right" : "left"
                        }}
                        {...props}
                    />
                    {
                        required && <Text className='text-error text-lg'>*</Text>
                    }
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