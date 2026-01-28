import { Linking } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";

const openPaymentPage = async (url: string) => {
  if (await InAppBrowser.isAvailable()) {
    await InAppBrowser.open(url, {
      dismissButtonStyle: "cancel",
      preferredBarTintColor: "#453AA4",
      showTitle: true,
      toolbarColor: "#6200EE",
    });
  } else {
    Linking.openURL(url);
  }
};

export default openPaymentPage;
