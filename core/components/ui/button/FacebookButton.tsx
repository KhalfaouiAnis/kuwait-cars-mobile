import FacebookIcon from '@/assets/svg/facebook';
import { httpClient } from '@/core/lib/api/httpClient';
import useAuthStore from '@/core/lib/stores/auth.store';
import { useRouter } from 'expo-router';
import { Alert, TouchableOpacity } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export default function FacebookButton({ onSuccess }: { onSuccess?: (user: any) => void }) {
    const { signIn } = useAuthStore()
    const router = useRouter();

    const handlePress = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                Alert.alert('Cancelled');
                return;
            }

            const data = await AccessToken.getCurrentAccessToken();
            if (!data?.accessToken) throw new Error('No access token');

            const res = await httpClient.post('/auth/facebook', { idToken: data?.accessToken });

            const { accessToken, refreshToken, user } = res.data
            signIn(accessToken, refreshToken, user)

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
