import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
export const isSmallDevice = SCREEN_HEIGHT < 640;

console.log({ SCREEN_HEIGHT });

const hScale = shortDimension / guidelineBaseWidth;
const vScale = longDimension / guidelineBaseHeight;

export function horizontalScale(val: any) {
  return hScale * val;
}

export function verticalScale(val: any) {
  return vScale * val;
}

export const isIOS = Platform.OS === "ios";

export function fontScale(size: any) {
  const newSize = hScale * size;
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export function normalFontScale(size: any) {
  const newSize = hScale * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

let paddingMedium = horizontalScale(20);

export const layoutStyles = {
  paddingMedium,
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
};
