import useUserPreferencesStore from '@/core/store/preferences.store';
import { boxShadow, cn } from '@/core/utils/cn';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type AdTextInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    label?: string;
    required?: boolean;
    icon?: ReactNode,
    value?: string;
    error?: string;
    extraPadding?: boolean
};

export default function AdTextInput<TForm extends FieldValues>({ control, name, label, error, icon, required, extraPadding, ...props }: AdTextInputProps<TForm>) {
    const { field: { onChange, value } } = useController({ control, name });
    const { isRTL } = useUserPreferencesStore();

    return (
        <View >
            {label && <Text className="text-base font-semibold mb-1 dark:text-white">{label}</Text>}
            <View
                className={cn('flex-row items-center justify-between bordered-box', {
                    "px-3 py-1": !extraPadding,
                    "p-3": extraPadding,
                })}
                style={boxShadow().button}
            >
                {
                    icon && <View className='ms-2 items-center'>
                        {icon}
                    </View>
                }
                <View className='me-3 flex-1 flex-row items-center justify-between'>
                    <TextInput
                        className="text-[#333] dark:text-white flex-1"
                        value={value}
                        numberOfLines={1}
                        onChangeText={onChange}
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