import { boxShadow, cn } from '@/core/utils/cn';
import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import { BaseRadioInputProps } from '..';
import RadioButton from '../button/radio-button';

export default function RadioGroup<TForm extends FieldValues>({ control, name, options, label, disabled, fullWidth, bordered, borderRadius, square }: BaseRadioInputProps<TForm>) {
    const { field: { onChange, value } } = useController({ control, name });

    return (
        <View className='flex-1'>
            {label && <Text className="text-base font-semibold mb-2 dark:text-white">{label}</Text>}
            <View
                className={cn('flex-row gap-3 flex-wrap', { "border border-grayish rounded-[20px] p-0.5 px-1.5 dark:border-primary-500": bordered })}
                style={bordered ? boxShadow().button : undefined}
            >
                {options.map(option => (
                    <RadioButton
                        square={square}
                        key={option.id}
                        disabled={disabled}
                        label={option.label}
                        fullWidth={fullWidth}
                        borderRadius={borderRadius}
                        selected={value === option.value}
                        onPress={() => onChange(option.value)}
                    />
                ))}
            </View>
        </View>
    );
}