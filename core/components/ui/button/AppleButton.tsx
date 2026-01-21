import AppleIcon from '@/assets/svg/apple';
import { ACC_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '@/core/constants';
import { handleAppleLoginRequest } from '@/core/services/authentication/oauth';
import { authStore } from '@/core/store/auth.store';
import { storage } from '@/core/store/storage';
import { useRouter } from 'expo-router';
import { Alert, Platform, TouchableOpacity } from 'react-native';

export default function AppleButton({ onSuccess }: { onSuccess?: (user: any) => void }) {
    const router = useRouter();

    if (Platform.OS !== 'ios') return null;

    const handlePress = async () => {
        try {
            const { accessToken, refreshToken, user } = await handleAppleLoginRequest()

            storage.set(ACC_TOKEN_STORAGE_KEY, accessToken);
            storage.set(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
            authStore.setState({ user })

            onSuccess?.(user)
            router.replace('/categories');
        } catch (error: unknown) {
            console.log({ error });
            Alert.alert("Error");
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} className='items-center justify-center flex'>
            <AppleIcon />
        </TouchableOpacity>
    );
}
