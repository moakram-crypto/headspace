import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { GoalOption } from "@/types";

interface Props {
  option: GoalOption;
  selected: boolean;
  onPress: () => void;
}

export function GoalCard({ option, selected, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: selected ? theme.primary : theme.card,
          borderColor: selected ? theme.primary : theme.border,
        },
      ]}
    >
      <Text style={{ fontSize: 24 }}>{option.icon}</Text>
      <Text variant="bodyBold" color={selected ? "#FFFFFF" : theme.textPrimary} style={{ marginTop: spacing.xs, textAlign: "center" }}>
        {option.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "47%",
    borderRadius: radii.md,
    borderWidth: 1.5,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: spacing.md,
  },
});
