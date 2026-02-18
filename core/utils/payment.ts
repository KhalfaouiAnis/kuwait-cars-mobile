import { Linking } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

const openPaymentPage = async (paymentUrl: string, redirectUrl: string) => {
  if (await InAppBrowser.isAvailable()) {
    return InAppBrowser.openAuth(paymentUrl, redirectUrl, {
      // iOS Properties
      dismissButtonStyle: "cancel",
      preferredBarTintColor: "#4031f7",
      preferredControlTintColor: "white",
      readerMode: false,
      animated: true,
      // Android Properties
      showTitle: false,
      toolbarColor: "#6200EE",
      secondaryToolbarColor: "black",
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      forceCloseOnRedirection: true,
    });
  } else {
    Linking.openURL(paymentUrl);
  }
};

export default openPaymentPage;
