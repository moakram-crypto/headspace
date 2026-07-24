import { create } from "zustand";
import { ContentItem } from "@/types";

interface PlayerState {
  current: ContentItem | null;
  isPlaying: boolean;
  positionSeconds: number;
  backgroundSound: string;
  playbackSpeed: number;
  sleepTimerMinutes: number | null;
  play: (item: ContentItem) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  setBackgroundSound: (sound: string) => void;
  setPlaybackSpeed: (speed: number) => void;
  setSleepTimer: (minutes: number | null) => void;
  close: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  current: null,
  isPlaying: false,
  positionSeconds: 0,
  backgroundSound: "None",
  playbackSpeed: 1,
  sleepTimerMinutes: null,
  play: (item) => set({ current: item, isPlaying: true, positionSeconds: 0 }),
  togglePlay: () => set({ isPlaying: !get().isPlaying }),
  seek: (positionSeconds) => set({ positionSeconds }),
  setBackgroundSound: (backgroundSound) => set({ backgroundSound }),
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),
  setSleepTimer: (sleepTimerMinutes) => set({ sleepTimerMinutes }),
  close: () => set({ current: null, isPlaying: false, positionSeconds: 0 }),
}));
