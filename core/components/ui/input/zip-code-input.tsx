import { ZIP_CODES } from '@/core/constants';
import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';
import { Control, FieldPath, FieldValues, useController, UseFormSetError } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type ZipCodeInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    setError?: UseFormSetError<TForm>,
    label?: string;
    icon?: ReactNode,
    value?: string;
    error?: string;
    extraPadding?: boolean
};

export default function ZipCodeInput<TForm extends FieldValues>({ control, name, setError, label, error, icon, extraPadding, ...props }: ZipCodeInputProps<TForm>) {
    const { field: { onChange, value } } = useController({ control, name });
    const [text, setText] = useState("")

    function handleBlur() {
        const code = ZIP_CODES.find(zip => zip.code === Number(text));
        console.log(code);

        if (!code) {
            setError?.(name, { type: "value", message: "Invalid zip code" });
            return;
        }
        onChange(code)
    }

    return (
        <View >
            {label && <Text className="text-base font-semibold mb-1 dark:text-white">{label}</Text>}
            <View
                className={clsx('flex-row items-center justify-between elevation-sm border-transparent border dark:border-primary-500 dark:bg-darkish', {
                    "px-3 py-1": !extraPadding,
                    "p-3": extraPadding,
                })}
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
                        onChangeText={setText}
                        onBlur={handleBlur}
                        {...props}
                    />
                </View>
            </View>
        </View>
    );
}