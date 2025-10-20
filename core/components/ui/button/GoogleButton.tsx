import GoogleIcon from '@/assets/svg/google';
import { httpClient } from '@/core/lib/api/httpClient';
import useAuthStore from '@/core/lib/stores/auth.store';
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { Alert, TouchableOpacity } from 'react-native';

GoogleSignin.configure({
    webClientId: 'your-web-client-id.googleusercontent.com',
    offlineAccess: true,
});

type CustomGoogleButtonProps = {
    onSuccess?: (user: any) => void
};

export default function GoogleButton({ onSuccess }: CustomGoogleButtonProps) {
    const { signIn } = useAuthStore()
    const router = useRouter();

    const handlePress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { data } = await GoogleSignin.signIn();

            const res = await httpClient.post('/auth/google', { idToken: data?.idToken });

            const { accessToken, refreshToken, user } = res.data
            signIn(accessToken, refreshToken, user)

            onSuccess?.(user)
            router.replace('/categories');
        } catch (error: unknown) {
            if (isErrorWithCode(error)) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    Alert.alert('Cancelled');
                } else {
                    Alert.alert('Error', 'Google sign-in failed');
                }
            }
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} className='items-center justify-center flex'>
            <GoogleIcon />
        </TouchableOpacity>
    );
}
