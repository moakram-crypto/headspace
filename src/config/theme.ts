// Headspace-inspired theme. Two modes: Light (default) and Sleep (dark).

export const lightTheme = {
  mode: "light" as const,
  background: "#F5EEE6",   // Headspace warm cream
  surface: "#FFFFFF",
  card: "#FDF8F3",
  primary: "#F47B20",      // Headspace signature orange
  primaryDark: "#D96A12",
  secondary: "#3BBCB8",    // Headspace teal accent
  textPrimary: "#1F2024",  // near-black
  textSecondary: "#8F9098",
  success: "#5DAD72",
  warning: "#F4B720",
  danger: "#E05252",
  border: "#EAE3DA",
  overlay: "rgba(31,32,36,0.45)",
};

export const sleepTheme = {
  mode: "sleep" as const,
  background: "#141928",   // Headspace midnight navy
  surface: "#1C2340",
  card: "#232B4A",
  primary: "#F47B20",      // keep orange as CTA
  primaryDark: "#D96A12",
  secondary: "#7B6FD4",    // soft indigo/purple for sleep
  textPrimary: "#F0EEF8",
  textSecondary: "#9899B8",
  success: "#5DAD72",
  warning: "#F4B720",
  danger: "#E08787",
  border: "#2C3358",
  overlay: "rgba(0,0,0,0.6)",
};

export type Theme = typeof lightTheme;

export const fontFamily = "System";

// Headspace iOS typography — matched from app screens
// Base: 390pt canvas (iPhone 14). SF Pro Rounded feel via System font.
export const typography = {
  // Large screen titles — e.g. "Good morning, Vikas"
  h1: {
    fontSize: 32,
    fontWeight: "800" as const,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  // Section headers — e.g. "Your day", "Explore"
  h2: {
    fontSize: 24,
    fontWeight: "700" as const,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  // Card titles / subsection labels
  h3: {
    fontSize: 18,
    fontWeight: "600" as const,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  // Standard body text
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  // Emphasised body (card subtitles, bold labels)
  bodyBold: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  // Metadata, tags, timestamps
  caption: {
    fontSize: 13,
    fontWeight: "500" as const,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  // CTA button labels
  button: {
    fontSize: 17,
    fontWeight: "700" as const,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  // Overline / category labels (ALL CAPS feel)
  overline: {
    fontSize: 11,
    fontWeight: "700" as const,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: "uppercase" as const,
  },
};

// Border radii — Headspace uses generous rounding
export const radii = {
  xs: 8,   // small pills, tags
  sm: 12,  // thumbnails, small cards
  md: 16,  // standard cards
  lg: 24,  // hero banners, large cards
  xl: 32,  // modal sheets, featured cards
  pill: 999,
};

// 8-pt spacing grid — matches Headspace's rhythm
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Screen edge padding — Headspace uses 20px horizontal gutter
export const screenPadding = {
  horizontal: 20,
  vertical: 16,
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.07,
  shadowRadius: 8,
  elevation: 2,
};

export const shadowMd = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.12,
  shadowRadius: 16,
  elevation: 4,
};
