import * as NavigationBar from "expo-navigation-bar";
import { setStatusBarHidden } from "expo-status-bar";
import { Platform } from "react-native";

export const hideSystemBars = async (hideStatusBar: boolean = true) => {
  if (Platform.OS === "android") {
    await NavigationBar.setVisibilityAsync("hidden");
    if (hideStatusBar) {
      setStatusBarHidden(true, "fade");
    }
  }
};

export const showSystemBars = async () => {
  if (Platform.OS === "android") {
    await NavigationBar.setVisibilityAsync("visible");
    setStatusBarHidden(false, "none");
  }
};
