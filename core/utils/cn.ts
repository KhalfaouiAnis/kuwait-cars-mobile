import { ClassValue, clsx } from "clsx";
import { StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BOX_SHADOW = StyleSheet.create({
  button: {
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 9,
        spreadDistance: 0,
        color: "rgb(000 000 000 / 0.25)",
      },
    ],
  },
});
