import { useSpeechToForm } from '@/core/hooks/shared/use-speech';
import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from "react";
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

type TextAreaInputProps<TForm extends FieldValues> = TextInputProps & {
    name: FieldPath<TForm>;
    control: Control<TForm>;
    required?: boolean;
    icon?: ReactNode,
    value?: string;
    error?: string;
    label?: string;
};

export default function TextAreaSpeech<TForm extends FieldValues>({ control, name, error, icon, required, label, ...props }: TextAreaInputProps<TForm>) {
    const {
        field: { onChange, value },
    } = useController({
        control,
        name,
    });

    const { isRecordingForThisField, startListening, stopListening } = useSpeechToForm(name, onChange);

    return (
        <View>
            {label && <Text className="text-base font-semibold mb-1 dark:text-white">{label}</Text>}
            <View className='flex-row items-center justify-between p-3 elevation-sm border-transparent border dark:bg-darkish dark:border-primary-500'>
                {
                    icon && <View className='ms-2 items-center'>
                        {icon}
                    </View>
                }
                <View className='flex-1 flex-row items-start relative'>
                    <TextInput
                        className="text-gray-300 dark:text-gray-500 flex-1"
                        value={value}
                        numberOfLines={10}
                        onChangeText={onChange}
                        multiline={true}
                        style={{
                            height: 140,
                            textAlignVertical: "top"
                        }}
                        {...props}
                    />
                    <View className='flex-row items-center'>
                        {
                            required && <Text className='text-error text-lg me-2'>*</Text>
                        }
                    </View>
                    <TouchableOpacity onPress={isRecordingForThisField ? stopListening : startListening} className='border-none bg-transparent absolute end-0 bottom-0'>
                        {isRecordingForThisField ? (
                            <Text className='text-lg'>🛑</Text>
                        ) : (
                            <Ionicons name="mic-outline" size={24} color="gray" style={styles.suffixIcon} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            {
                props.maxLength && (
                    <Text className='ms-auto mt-1 text-sm text-gray-300'>Left: {props.maxLength - (value?.toString().length || 0)}</Text>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    suffixIcon: {
        marginLeft: 8,
    },
});