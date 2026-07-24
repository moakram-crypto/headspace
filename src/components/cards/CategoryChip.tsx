import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";

export function CategoryChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { backgroundColor: selected ? theme.primary : theme.card, borderColor: theme.border },
      ]}
    >
      <Text variant="caption" color={selected ? "#FFFFFF" : theme.textPrimary}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,  // 24px — Headspace chips have generous horizontal padding
    paddingVertical: spacing.sm,    // 8px vertical
    borderRadius: radii.pill,
    borderWidth: 1,
    marginRight: spacing.sm,        // 8px gap between chips
    height: 36,                     // fixed chip height for consistent row alignment
    justifyContent: "center",
  },
});
