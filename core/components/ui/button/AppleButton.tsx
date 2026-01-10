import AppleIcon from '@/assets/svg/apple';
import { httpClient } from '@/core/api/httpClient';
import { ACC_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '@/core/constants';
import { authStore } from '@/core/store/auth.store';
import { storage } from '@/core/store/storage';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useRouter } from 'expo-router';
import { Alert, Platform, TouchableOpacity } from 'react-native';

export default function AppleButton({ onSuccess }: { onSuccess?: (user: any) => void }) {
    const router = useRouter();

    if (Platform.OS !== 'ios') return null;

    const handlePress = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            const { identityToken } = appleAuthRequestResponse;

            if (!identityToken) throw new Error('No identity token');

            const res = await httpClient.post('/auth/apple', { idToken: identityToken });

            const { accessToken, refreshToken, user } = res.data
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
