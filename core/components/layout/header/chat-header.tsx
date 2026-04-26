import { IMAGES } from '@/core/constants/images';
import { boxShadow } from '@/core/utils/cn';
import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import BackArrow from '../../ui/shared/back-arrow';
import { BlockCTA } from '../communication/ad-cta/block-user';
import { CallCTA } from '../communication/ad-cta/call';
import { ContactCTA } from '../communication/ad-cta/contact';
import { WhatsappCTA } from '../communication/ad-cta/whatsapp';

const ChatHeader = () => {
    return (
        <View className='mt-8 flex-row items-center justify-center px-4 mb-2'>
            <BackArrow />
            <View
                style={boxShadow(0, 4, 4).button}
                className='flex-row gap-1 items-center justify-center border border-primary-500 rounded-xl py-2'>
                <View className="rounded-full items-center justify-center p-1 me-1">
                    <Image source={IMAGES.AvatarVideoBoy} style={{ width: 40, height: 40 }} contentFit="contain" />
                </View>
                <View>
                    <Text numberOfLines={2} ellipsizeMode='tail' className='flex-shrink font-inter-semibold text-sm text-start dark:text-white max-w-20'>
                        AHMED MARKET MOUHAMED
                    </Text>
                </View>
                <View className='flex-1 flex-row gap-1 items-center'>
                    <BlockCTA variant='icon' />
                    <CallCTA variant='icon' />
                    <WhatsappCTA variant='icon' />
                    <ContactCTA variant='icon' />
                </View>
            </View>
        </View>
    );
};

export default ChatHeader;