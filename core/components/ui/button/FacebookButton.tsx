import FacebookIcon from '@/assets/svg/facebook';
import { ACC_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '@/core/constants';
import { handleFacebookLoginRequest } from '@/core/services/authentication/oauth';
import { authStore } from '@/core/store/auth.store';
import { storage } from '@/core/store/storage';
import { useRouter } from 'expo-router';
import { Alert, TouchableOpacity } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';

export default function FacebookButton({ onSuccess }: { onSuccess?: (user: any) => void }) {
    const router = useRouter();

    const handlePress = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                Alert.alert('Cancelled');
                return;
            }

            const { accessToken, refreshToken, user } = await handleFacebookLoginRequest()

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
            <FacebookIcon />
        </TouchableOpacity>
    );
}
