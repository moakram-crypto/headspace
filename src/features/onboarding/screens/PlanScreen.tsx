import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Plan">;

const PLAN = [
  "Two-minute breathing reset",
  "Understanding your thoughts",
  "Body relaxation",
  "Managing daily stress",
  "Improving concentration",
  "Evening wind-down",
  "Weekly reflection",
];

export function PlanScreen(_props: Props) {
  const theme = useTheme();
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);

  // Flipping `onboardingCompleted` causes AppNavigator to swap its whole
  // Stack.Navigator from the Onboarding flow to the Main tabs (conditional
  // rendering, not an explicit navigate) — see src/navigation/AppNavigator.tsx.
  const finish = () => {
    completeOnboarding();
  };

  return (
    <Screen>
      <Text variant="h1">Your Calm Starter Plan</Text>
      <Text muted style={{ marginTop: spacing.xs, marginBottom: spacing.lg }}>
        A simple 7-day plan built from what you told us.
      </Text>
      {PLAN.map((item, i) => (
        <View key={item} style={[styles.row, { borderColor: theme.border, backgroundColor: theme.card }]}>
          <Text variant="bodyBold" color={theme.primary}>Day {i + 1}</Text>
          <Text style={{ marginTop: 2 }}>{item}</Text>
        </View>
      ))}
      <PrimaryButton label="Start My First Session" onPress={finish} style={{ marginTop: spacing.lg }} />
      <PrimaryButton label="Explore the App" variant="ghost" onPress={finish} style={{ marginTop: spacing.sm }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm },
});
