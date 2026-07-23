import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "@/navigation/types";
import { SplashScreen } from "@/features/onboarding/screens/SplashScreen";
import { WelcomeScreen } from "@/features/onboarding/screens/WelcomeScreen";
import { GoalSelectionScreen } from "@/features/onboarding/screens/GoalSelectionScreen";
import { SituationScreen } from "@/features/onboarding/screens/SituationScreen";
import { ExperienceScreen } from "@/features/onboarding/screens/ExperienceScreen";
import { DurationScreen } from "@/features/onboarding/screens/DurationScreen";
import { PreferredTimeScreen } from "@/features/onboarding/screens/PreferredTimeScreen";
import { MoodCheckInScreen } from "@/features/onboarding/screens/MoodCheckInScreen";
import { AccountScreen } from "@/features/onboarding/screens/AccountScreen";
import { PlanScreen } from "@/features/onboarding/screens/PlanScreen";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      <Stack.Screen name="Situation" component={SituationScreen} />
      <Stack.Screen name="Experience" component={ExperienceScreen} />
      <Stack.Screen name="Duration" component={DurationScreen} />
      <Stack.Screen name="PreferredTime" component={PreferredTimeScreen} />
      <Stack.Screen name="MoodCheckIn" component={MoodCheckInScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Plan" component={PlanScreen} />
    </Stack.Navigator>
  );
}
