import { ClassValue, clsx } from "clsx";
import { StyleSheet } from "react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BOX_SHADOW = StyleSheet.create({
  button: {
    borderWidth: 1,
    boxShadow: [
      {
        offsetX: 2,
        offsetY: 2,
        blurRadius: 6,
        spreadDistance: 2,
        color: "rgb(000 000 000 / 0.25)",
      },
    ],
  },
});
