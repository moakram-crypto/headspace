import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { MoodLabel } from "@/types";

const MOODS: { id: MoodLabel; icon: string; label: string }[] = [
  { id: "very_low", icon: "😞", label: "Very low" },
  { id: "low", icon: "😕", label: "Low" },
  { id: "okay", icon: "😐", label: "Okay" },
  { id: "good", icon: "🙂", label: "Good" },
  { id: "great", icon: "😄", label: "Great" },
];

export function MoodSelector({
  value,
  onSelect,
}: {
  value?: MoodLabel;
  onSelect: (mood: MoodLabel) => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      {MOODS.map((m) => (
        <Pressable
          key={m.id}
          onPress={() => onSelect(m.id)}
          style={[
            styles.item,
            { backgroundColor: value === m.id ? theme.primary : theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={{ fontSize: 26 }}>{m.icon}</Text>
          <Text variant="caption" color={value === m.id ? "#FFFFFF" : theme.textSecondary} style={{ marginTop: 2 }}>
            {m.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  item: {
    flex: 1,
    marginHorizontal: 3,
    borderRadius: radii.md,
    borderWidth: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
});
