// Original brand theme for Calm Path — no visual assets or exact colors copied
// from Headspace or any other product. Two modes: Light (default) and Sleep.

export const lightTheme = {
  mode: "light" as const,
  background: "#FBF4EC", // warm cream
  surface: "#FFFFFF",
  card: "#FFF8F0",
  primary: "#C97064", // soft coral
  primaryDark: "#B25A50",
  secondary: "#B9A6DC", // lavender
  textPrimary: "#1F2A44", // dark navy
  textSecondary: "#6B7280",
  success: "#7FB77E", // soft green
  warning: "#E8B04B",
  danger: "#D9695F",
  border: "#EDE2D3",
  overlay: "rgba(31,42,68,0.4)",
};

export const sleepTheme = {
  mode: "sleep" as const,
  background: "#12172B", // midnight navy
  surface: "#1B2140",
  card: "#232A4D",
  primary: "#8C7BC4", // muted purple
  primaryDark: "#6F5FA8",
  secondary: "#E8C468", // warm gold
  textPrimary: "#F5F3F9", // soft white
  textSecondary: "#A9AECB",
  success: "#7FB77E",
  warning: "#E8B04B",
  danger: "#E08787",
  border: "#2E3560",
  overlay: "rgba(0,0,0,0.55)",
};

export type Theme = typeof lightTheme;

export const typography = {
  fontFamily: "System", // swap for Nunito Sans / Manrope / DM Sans / Plus Jakarta Sans
  h1: { fontSize: 28, fontWeight: "700" as const },
  h2: { fontSize: 22, fontWeight: "700" as const },
  h3: { fontSize: 18, fontWeight: "600" as const },
  body: { fontSize: 16, fontWeight: "400" as const },
  bodyBold: { fontSize: 16, fontWeight: "600" as const },
  caption: { fontSize: 13, fontWeight: "400" as const },
  button: { fontSize: 16, fontWeight: "700" as const },
};

export const radii = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
};
