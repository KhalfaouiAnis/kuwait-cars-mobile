import clsx from 'clsx';
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

    return (
        <View >
            {label && <Text className="text-base font-semibold mb-1">{label}</Text>}
            <View
                className={clsx('flex-row items-center justify-between border-transparent bg-white border', {
                    "px-3": !extraPadding,
                    "p-3": extraPadding,
                })}
                style={{
                    elevation: 2, shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: { width: 4, height: 4 },
                }}
            >
                {
                    icon && <View className='ms-2 items-center'>
                        {icon}
                    </View>
                }
                <View className='me-3 flex-1 flex-row items-center justify-between'>
                    <TextInput
                        className="text-[#333]"
                        value={value}
                        numberOfLines={1}
                        onChangeText={onChange}
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