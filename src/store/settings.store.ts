import { create } from "zustand";

interface SettingsState {
  themeMode: "light" | "sleep";
  reducedMotion: boolean;
  hapticsEnabled: boolean;
  notificationsEnabled: boolean;
  language: string;
  setThemeMode: (mode: "light" | "sleep") => void;
  toggleReducedMotion: () => void;
  toggleHaptics: () => void;
  toggleNotifications: () => void;
  setLanguage: (lang: string) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  themeMode: "light",
  reducedMotion: false,
  hapticsEnabled: true,
  notificationsEnabled: true,
  language: "en",
  setThemeMode: (themeMode) => set({ themeMode }),
  toggleReducedMotion: () => set({ reducedMotion: !get().reducedMotion }),
  toggleHaptics: () => set({ hapticsEnabled: !get().hapticsEnabled }),
  toggleNotifications: () => set({ notificationsEnabled: !get().notificationsEnabled }),
  setLanguage: (language) => set({ language }),
}));
