import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { GoalOption } from "@/types";

interface Props {
  option: GoalOption;
  selected: boolean;
  onPress: () => void;
}

// Single-column selectable row (icon + label + trailing check) — the
// competitive review showed this reads faster than a 2-column icon grid for
// longer option lists, so onboarding goal selection uses it here.
export function GoalListRow({ option, selected, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        { backgroundColor: selected ? theme.primary : theme.card, borderColor: selected ? theme.primary : theme.border },
      ]}
    >
      <Text style={{ fontSize: 18 }}>{option.icon}</Text>
      <Text
        variant="bodyBold"
        color={selected ? "#FFFFFF" : theme.textPrimary}
        style={{ marginLeft: spacing.sm, flex: 1 }}
      >
        {option.label}
      </Text>
      <View
        style={[
          styles.check,
          selected
            ? { backgroundColor: "#FFFFFF", borderColor: "#FFFFFF" }
            : { borderColor: theme.border },
        ]}
      >
        {selected && <Text style={{ fontSize: 12, color: theme.primary }}>✓</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
