import React, { useCallback, useRef, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

type VerificationCodeProps = TextInputProps & {
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  numberOfElements: number
};

export default function VerificationCode({ numberOfElements, onChange, onComplete }: VerificationCodeProps) {
  const [code, setCode] = useState<string[]>(new Array(numberOfElements).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/[0-9]/.test(text) || text === '') {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      const fullCode = newCode.join('');

      onChange?.(fullCode);

      if (text && index < numberOfElements + 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (fullCode.length === numberOfElements) {
        onComplete?.(fullCode);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const setRef = useCallback((index: number) => (instance: TextInput | null) => {
    inputRefs.current[index] = instance;
  }, []);

  return (
    <View className="flex-row justify-center gap-x-2">
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={setRef(index)}
          className="w-[50px] h-[50px] text-center text-lg font-bold rounded-full border-2 border-primary-500 bg-[#F6F6F6] text-black"
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
        />
      ))}
    </View>
  );
}