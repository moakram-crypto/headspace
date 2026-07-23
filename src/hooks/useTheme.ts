import { useSettingsStore } from "@/store/settings.store";
import { lightTheme, sleepTheme } from "@/config/theme";

export function useTheme() {
  const mode = useSettingsStore((s) => s.themeMode);
  return mode === "sleep" ? sleepTheme : lightTheme;
}
