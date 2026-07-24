import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { formatTime } from "@/utils/format";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Focus">;

const DURATIONS = [{ label: "25 min", seconds: 1500 }, { label: "50 min", seconds: 3000 }, { label: "90 min", seconds: 5400 }];
const TASK_TYPES = ["Work", "Study", "Reading", "Writing", "Planning", "Creativity"];

export function FocusScreen({ navigation }: Props) {
  const theme = useTheme();
  const [taskType, setTaskType] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState(1500);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (remaining === null) return;
    if (remaining <= 0) { setDone(true); return; }
    const t = setTimeout(() => setRemaining((r) => (r ?? 0) - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  if (done) {
    return (
      <Screen scroll={false} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="h2" style={{ textAlign: "center" }}>
          You completed a {Math.round(durationSeconds / 60)}-minute focus session.
        </Text>
        <Text muted style={{ marginTop: spacing.sm }}>Did you complete your task?</Text>
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
          <PrimaryButton label="Yes" onPress={() => navigation.goBack()} />
          <PrimaryButton label="Not yet" variant="ghost" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  if (remaining !== null) {
    return (
      <Screen scroll={false} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text variant="h1">{formatTime(remaining)}</Text>
        <Text muted style={{ marginTop: spacing.xs }}>Focusing on {taskType ?? "your task"}</Text>
        <PrimaryButton label="End Session" variant="ghost" onPress={() => setDone(true)} style={{ marginTop: spacing.xl }} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text variant="h1">What are you focusing on?</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md }}>
        {TASK_TYPES.map((t) => (
          <CategoryChip key={t} label={t} selected={taskType === t} onPress={() => setTaskType(t)} />
        ))}
      </View>

      <Text variant="h3" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>Duration</Text>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        {DURATIONS.map((d) => (
          <CategoryChip key={d.label} label={d.label} selected={durationSeconds === d.seconds} onPress={() => setDurationSeconds(d.seconds)} />
        ))}
      </View>

      <PrimaryButton label="Start Focus Session" onPress={() => setRemaining(durationSeconds)} style={{ marginTop: spacing.xl }} />
    </Screen>
  );
}
