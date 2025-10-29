import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type AdTextInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    value?: string;
    error?: string;
};

export default function AdTextInput<TForm extends FieldValues>({ control, name, error, ...props }: AdTextInputProps<TForm>) {
    return (
        <View className="w-full">
            <View className='flex-row items-center justify-between border-[#FBFBFB] shadow-bottom-small border-2 p-3'>
                <View className='me-3 flex-1'>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className={`${error ? 'border-red-500' : 'text-[#333]'}`}
                                placeholder='Choose Category'
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
                {
                    props.keyboardType === "number-pad" && (
                        <View className='w-10'>
                            <Text className='text-gray-500'>KWD</Text>
                        </View>
                    )
                }
            </View>
        </View>
    );
}