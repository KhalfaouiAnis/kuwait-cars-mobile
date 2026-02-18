import { useState } from "react";
import { InAppBrowser, RedirectResult } from "react-native-inappbrowser-reborn";
import { toast } from "sonner-native";
const PAYMENT_TIMEOUT = 300000;
const OPTIONS = {
  showTitle: false,
  enableUrlBarHiding: true,
  enableDefaultShare: false,
  ephemeralWebSession: false,
  // iOS Properties
  dismissButtonStyle: "cancel",
  preferredBarTintColor: "#4031f7",
  preferredControlTintColor: "white",
  readerMode: false,
  animated: true,
  // Android Properties
  toolbarColor: "#6200EE",
  secondaryToolbarColor: "black",
  forceCloseOnRedirection: true,
};

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const startPayment = async (
    paymentUrl: string,
    redirectScheme: string,
    onSuccess: () => Promise<void>,
  ) => {
    setIsProcessing(true);

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("PAYMENT_TIMEOUT")), PAYMENT_TIMEOUT),
      );

      const browserPromise = InAppBrowser.openAuth(
        paymentUrl,
        redirectScheme,
        OPTIONS,
      );

      if (await InAppBrowser.isAvailable()) {
        const result = (await Promise.race([
          browserPromise,
          timeoutPromise,
        ])) as RedirectResult;
        if (result.type === "success" && "url" in result) {
          const urlParams = new URL(result.url).searchParams;
          const status = urlParams.get("status");

          if (status === "success") {
            await onSuccess();
          } else {
            toast.error("Payment flagged as error by gateway");
          }
        }
      }
    } catch (error) {
      console.error("InAppBrowser Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return { startPayment, isProcessing };
};
