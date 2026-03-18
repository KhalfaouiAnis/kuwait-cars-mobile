import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import BackArrow from './shared/back-arrow';

type Props = {
    title: string,
    headerAction?: {
        name: keyof typeof Ionicons.glyphMap,
        onPress: () => void
    }
};

const Header = ({ title, headerAction }: Props) => {
    const { dark } = useTheme()

    return (
        <View className='mb-4 flex flex-row items-center justify-between px-2 '>
            <View className='flex flex-row items-center justify-center'>
                <BackArrow />
                <Text className='mx-2 text-center dark:text-white'>{title}</Text>
            </View>
            {
                headerAction && (
                    <Pressable onPress={headerAction.onPress} >
                        <Ionicons name={headerAction.name} size={24} color={dark ? "white" : "black"} />
                    </Pressable>
                )
            }
        </View>
    );
};

export default Header;