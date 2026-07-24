import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";

const MOOD_ICON: Record<string, string> = {
  very_low: "😞", low: "😕", okay: "😐", good: "🙂", great: "😄",
};

export function MoodHistoryScreen() {
  const theme = useTheme();
  const moodHistory = useUserStore((s) => s.moodHistory);

  const stressfulDays = moodHistory.filter((m) => m.moodLabel === "very_low" || m.moodLabel === "low").length;

  return (
    <Screen>
      <Text variant="h1">Mood History</Text>

      {stressfulDays > 2 ? (
        <Text muted style={{ marginTop: spacing.sm }}>
          You have recorded more stressful days recently. Consider using a short daily reset, or speaking with
          someone you trust.
        </Text>
      ) : (
        <Text muted style={{ marginTop: spacing.sm }}>
          Your mood has been fairly steady lately — keep up whatever's working.
        </Text>
      )}

      <View style={{ marginTop: spacing.lg }}>
        {moodHistory.length === 0 && <Text muted>No mood check-ins yet.</Text>}
        {moodHistory.map((entry) => (
          <View key={entry.id} style={[styles.row, { borderColor: theme.border, backgroundColor: theme.card }]}>
            <Text style={{ fontSize: 22 }}>{MOOD_ICON[entry.moodLabel]}</Text>
            <View style={{ marginLeft: spacing.sm, flex: 1 }}>
              <Text variant="bodyBold">{entry.moodLabel.replace("_", " ")}</Text>
              {entry.factors.length > 0 && (
                <Text variant="caption" muted>Influenced by: {entry.factors.join(", ")}</Text>
              )}
              <Text variant="caption" muted>{new Date(entry.createdAt).toLocaleDateString()}</Text>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm },
});
