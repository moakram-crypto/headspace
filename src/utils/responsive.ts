import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// Base design dimensions (iPhone 14 / 390×844)
const BASE_W = 390;
const BASE_H = 844;

/**
 * rs(size) — linear scale relative to screen width.
 * Use for widths, heights, icon sizes, border radii.
 */
export const rs = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((SCREEN_W / BASE_W) * size));

/**
 * rvs(size) — linear scale relative to screen height.
 * Use for vertical spacing / hero heights.
 */
export const rvs = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((SCREEN_H / BASE_H) * size));

/**
 * ms(size, factor) — moderate scale.
 * Grows slower than rs() — ideal for font sizes so text
 * doesn't become huge on tablets/large phones.
 * factor 0 = no scaling, factor 1 = full linear scaling.
 */
export const ms = (size: number, factor = 0.45): number =>
  Math.round(PixelRatio.roundToNearestPixel(size + (rs(size) - size) * factor));

/**
 * wp(percent) — percentage of screen width.
 */
export const wp = (pct: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((SCREEN_W * pct) / 100));

/**
 * hp(percent) — percentage of screen height.
 */
export const hp = (pct: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((SCREEN_H * pct) / 100));

/** Expose raw screen dimensions for custom calculations */
export const SCREEN = { W: SCREEN_W, H: SCREEN_H };
