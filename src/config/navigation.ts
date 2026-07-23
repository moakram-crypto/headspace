import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "@/navigation/types";

// Enables deep links + correct URL routing when running on web
// (`expo start --web`) so every screen is reachable via its own URL.
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/"), "https://calmpath.app", "calmpath://"],
  config: {
    screens: {
      Onboarding: {
        screens: {
          Splash: "",
          Welcome: "welcome",
          GoalSelection: "onboarding/goals",
          Situation: "onboarding/situation",
          Experience: "onboarding/experience",
          Duration: "onboarding/duration",
          PreferredTime: "onboarding/time",
          MoodCheckIn: "onboarding/mood",
          Account: "onboarding/account",
          Plan: "onboarding/plan",
        },
      },
      Main: {
        screens: {
          Today: "today",
          Explore: "explore",
          AICoach: "coach",
          Sleep: "sleep",
          Profile: "profile",
        },
      },
      ContentDetail: "content/:contentId",
      CourseDetail: "course/:courseId",
      Player: "player",
      SessionComplete: "complete",
      Breathing: "breathing",
      Focus: "focus",
      MoodHistory: "profile/mood-history",
    },
  },
};
