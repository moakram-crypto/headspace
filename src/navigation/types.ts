export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  GoalSelection: undefined;
  Situation: undefined;
  Experience: undefined;
  Duration: undefined;
  PreferredTime: undefined;
  MoodCheckIn: undefined;
  Account: undefined;
  Plan: undefined;
};

export type MainTabParamList = {
  Today: undefined;
  Explore: undefined;
  AICoach: undefined;
  Sleep: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ContentDetail: { contentId: string };
  CourseDetail: { courseId: string };
  Player: { contentId?: string } | undefined;
  SessionComplete: { contentId: string; minutes: number };
  Breathing: { patternId?: string };
  Focus: undefined;
  MoodHistory: undefined;
};
