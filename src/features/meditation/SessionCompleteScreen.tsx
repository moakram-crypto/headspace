import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "SessionComplete">;

const FEELINGS = ["Much better", "Better", "The same", "Worse"];

// Original reflective lines — not sourced from any other app's copy.
const REFLECTIONS = [
  "Showing up counts, even on the days it feels small.",
  "You don't have to feel calm to be doing this right.",
  "A few minutes of attention is still attention well spent.",
];

// Split into two short steps (check-in, then a stats reveal) rather than one
// dense screen — mirrors the competitive review's habit of separating
// reflection from the progress reveal, kept intentionally brief here.
export function SessionCompleteScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const progress = useUserStore((s) => s.progress);
  const [feeling, setFeeling] = useState<string | null>(null);
  const [step, setStep] = useState<0 | 1>(0);
  const quote = REFLECTIONS[progress.totalSessions % REFLECTIONS.length];

  if (step === 0) {
    return (
      <Screen scroll={false} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.badge, { backgroundColor: theme.secondary }]}>
          <Text style={{ fontSize: 40 }}>✨</Text>
        </View>
        <Text variant="h1" style={{ marginTop: spacing.lg, textAlign: "center" }}>
          You completed {route.params.minutes} mindful minutes.
        </Text>
        <Text muted style={{ marginTop: spacing.sm }}>How do you feel now?</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.md }}>
          {FEELINGS.map((f) => (
            <PrimaryButton
              key={f}
              label={f}
              variant={feeling === f ? "primary" : "ghost"}
              onPress={() => setFeeling(f)}
            />
          ))}
        </View>
        <PrimaryButton
          label="Continue"
          disabled={!feeling}
          onPress={() => setStep(1)}
          style={{ marginTop: spacing.xl, minWidth: 220 }}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll={false} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="caption" muted>Your streak</Text>
      <Text variant="h1" style={{ fontSize: 56, marginTop: spacing.xs }}>{progress.currentStreak}</Text>
      <Text muted>day{progress.currentStreak === 1 ? "" : "s"} in a row</Text>

      <View style={styles.dotsRow}>
        <View style={[styles.dot, { backgroundColor: theme.primary }]} />
        <View style={[styles.dot, { backgroundColor: theme.border }]} />
      </View>

      <Text style={{ marginTop: spacing.xl, textAlign: "center", fontStyle: "italic" }} color={theme.textSecondary}>
        "{quote}"
      </Text>

      <Text variant="caption" muted style={{ marginTop: spacing.lg }}>
        {progress.mindfulMinutesThisWeek} mindful minutes this week
      </Text>
      <PrimaryButton
        label="Finish"
        onPress={() => navigation.navigate("Main")}
        style={{ marginTop: spacing.xl, minWidth: 220 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: { width: 88, height: 88, borderRadius: 44, alignItems: "center", justifyContent: "center" },
  dotsRow: { flexDirection: "row", gap: 6, marginTop: spacing.md },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
