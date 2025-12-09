import { Alert, Linking } from "react-native";

export const initiateWhatsAppChat = async (phoneNumber: any) => {
  const formattedPhoneNumber = phoneNumber.replace(/[\s\-\+\(\)]/g, "");

  const url = `wa.me${formattedPhoneNumber}`;

  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  } catch (error) {
    console.log(error);

    Alert.alert("An error occurred");
  }
};
