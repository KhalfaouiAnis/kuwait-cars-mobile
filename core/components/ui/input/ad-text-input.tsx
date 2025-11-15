import { ReactNode } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { TextInput, TextInputProps, View } from 'react-native';

type AdTextInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    icon?: ReactNode,
    value?: string;
    error?: string;
};

export default function AdTextInput<TForm extends FieldValues>({ control, name, error, icon, ...props }: AdTextInputProps<TForm>) {
    return (
        <View className='flex-row items-center justify-between p-3 border-transparent bg-white border'
            style={{
                elevation: 2, shadowColor: 'rgba(0, 0, 0, 0.4)', shadowRadius: 1, shadowOpacity: 0.2, shadowOffset: { width: 4, height: 4 },
            }}
        >
            {
                icon && <View className='ms-2 items-center'>
                    {icon}
                </View>
            }
            <View className='me-3 flex-1'>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="text-[#333]"
                            value={value}
                            numberOfLines={1}
                            onChangeText={(text) => {
                                onChange(text)
                            }}
                            {...props}
                        />
                    )}
                />
            </View>
            {/* {
                    props.keyboardType === "number-pad" && (
                        <View className='w-10'>
                            <Text className='text-gray-500'>KWD</Text>
                        </View>
                    )
                } */}
        </View>
    );
}