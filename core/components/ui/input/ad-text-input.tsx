import { DIMENSIONS } from '@/core/constants';
import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow, cn } from '@/core/utils/cn';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type AdTextInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    extraPadding?: boolean
    fullWidth?: boolean;
    required?: boolean;
    icon?: ReactNode,
    label?: string;
    value?: string;
    error?: string;
};

export default function AdTextInput<TForm extends FieldValues>({ control, name, label, error, icon, required, extraPadding, fullWidth = true, ...props }: AdTextInputProps<TForm>) {
    const { field: { onChange, value } } = useController({ control, name });
    const { isRTL } = useUserPreferencesStore();

    return (
        <View>
            {label && <Text className="text-base font-semibold mb-1 ms-5 dark:text-white">{label}</Text>}
            <View
                className={cn('flex-row items-center self-center justify-between border border-grayish', {
                    "px-3 py-1": !extraPadding,
                    "p-3": extraPadding,
                })}
                style={[styles.wrapper, { width: fullWidth ? DIMENSIONS.width - 60 : undefined }]}
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