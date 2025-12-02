import { SelectOption } from '@/core/types';
import { clsx } from 'clsx';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Text, View } from 'react-native';
import RadioButton from '../button/radio-button';

type RadioGroupProps<TForm extends FieldValues> = {
    control: Control<TForm>;
    name: FieldPath<TForm>;
    options: SelectOption[]
    label?: string;
    disabled?: boolean;
    fullWidth?: boolean
    bordered?: boolean
}

export default function RadioGroup<TForm extends FieldValues>({ control, name, options, label, disabled, fullWidth, bordered }: RadioGroupProps<TForm>) {
    return (
        <View className='flex-1'>
            {label && <Text className="text-base font-semibold mb-2">{label}</Text>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <View className={clsx('flex-row gap-3 flex-wrap', {
                        "border border-gray-200 p-1": bordered
                    })}>
                        {options.map(option => (
                            <RadioButton
                                key={option.id}
                                label={option.label}
                                selected={value === option.value}
                                onPress={() => onChange(option.value)}
                                disabled={disabled}
                                fullWidth={fullWidth}
                            />
                        ))}
                    </View>
                )}
            />
        </View>
    );
}