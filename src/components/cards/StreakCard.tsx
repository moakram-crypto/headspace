import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { UserProgress } from "@/types";

export function StreakCard({ progress }: { progress: UserProgress }) {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.stat}>
        <Text variant="h2">{progress.currentStreak}</Text>
        <Text variant="caption" muted>Day streak</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <View style={styles.stat}>
        <Text variant="h2">{progress.mindfulMinutesThisWeek}</Text>
        <Text variant="caption" muted>Mindful min / wk</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <View style={styles.stat}>
        <Text variant="h2">{progress.totalSessions}</Text>
        <Text variant="caption" muted>Sessions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.md,
    ...shadow,
  },
  stat: { flex: 1, alignItems: "center" },
  divider: { width: 1, marginHorizontal: spacing.sm },
});
