import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal, MoodEntry, UserProgress } from "@/types";

interface UserState {
  name: string;
  isGuest: boolean;
  onboardingCompleted: boolean;
  selectedGoals: Goal[];
  primaryGoal: Goal | null;
  experienceLevel: "new" | "some" | "regular" | null;
  preferredDurationMinutes: number;
  preferredTime: "morning" | "afternoon" | "evening" | "before_sleep" | "varies" | null;
  situationNote: string;
  moodHistory: MoodEntry[];
  progress: UserProgress;
  setName: (name: string) => void;
  setGuest: (guest: boolean) => void;
  toggleGoal: (goal: Goal) => void;
  setExperienceLevel: (level: UserState["experienceLevel"]) => void;
  setPreferredDuration: (minutes: number) => void;
  setPreferredTime: (time: UserState["preferredTime"]) => void;
  setSituationNote: (note: string) => void;
  addMoodEntry: (entry: MoodEntry) => void;
  completeOnboarding: () => void;
  logSessionComplete: (minutes: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: "",
      isGuest: false,
      onboardingCompleted: false,
      selectedGoals: [],
      primaryGoal: null,
      experienceLevel: null,
      preferredDurationMinutes: 5,
      preferredTime: null,
      situationNote: "",
      moodHistory: [],
      progress: {
        currentStreak: 0,
        longestStreak: 0,
        mindfulMinutesThisWeek: 0,
        totalSessions: 0,
        totalMinutes: 0,
      },
      setName: (name) => set({ name }),
      setGuest: (isGuest) => set({ isGuest }),
      toggleGoal: (goal) => {
        const current = get().selectedGoals;
        const exists = current.includes(goal);
        const next = exists ? current.filter((g) => g !== goal) : [...current, goal];
        set({
          selectedGoals: next,
          primaryGoal: get().primaryGoal ?? (next.length ? next[0] : null),
        });
      },
      setExperienceLevel: (experienceLevel) => set({ experienceLevel }),
      setPreferredDuration: (preferredDurationMinutes) => set({ preferredDurationMinutes }),
      setPreferredTime: (preferredTime) => set({ preferredTime }),
      setSituationNote: (situationNote) => set({ situationNote }),
      addMoodEntry: (entry) => set({ moodHistory: [entry, ...get().moodHistory] }),
      completeOnboarding: () => set({ onboardingCompleted: true }),
      logSessionComplete: (minutes) => {
        const p = get().progress;
        set({
          progress: {
            ...p,
            currentStreak: p.currentStreak + 1,
            longestStreak: Math.max(p.longestStreak, p.currentStreak + 1),
            mindfulMinutesThisWeek: p.mindfulMinutesThisWeek + minutes,
            totalSessions: p.totalSessions + 1,
            totalMinutes: p.totalMinutes + minutes,
          },
        });
      },
    }),
    { name: "calm-path-user", storage: createJSONStorage(() => AsyncStorage) }
  )
);
