import AppleIcon from '@/assets/svg/apple';
import { httpClient } from '@/core/lib/api/httpClient';
import useAuthStore from '@/core/lib/stores/auth.store';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useRouter } from 'expo-router';
import { Alert, Platform, TouchableOpacity } from 'react-native';

export default function AppleButton({ onSuccess }: { onSuccess?: (user: any) => void }) {
    const { signIn } = useAuthStore()
    const router = useRouter();

    if (Platform.OS !== 'ios') return null; // iOS only

    const handlePress = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            const { identityToken, fullName } = appleAuthRequestResponse;

            if (!identityToken) throw new Error('No identity token');

            const res = await httpClient.post('/auth/facebook', { identityToken, fullName });

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
            <AppleIcon />
        </TouchableOpacity>
    );
}
