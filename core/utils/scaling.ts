import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BASE_WIDTH = 428;
const BASE_HEIGHT = 919;

export const scaleWidth = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const scaleHeight = (size: number) =>
  (SCREEN_HEIGHT / BASE_HEIGHT) * size;
export const scaleFont = (size: number) =>
  PixelRatio.roundToNearestPixel(scaleWidth(size));
