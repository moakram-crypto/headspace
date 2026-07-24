import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search meditations, sleep, focus...",
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.textPrimary }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    height: 46,
    justifyContent: "center",
  },
  input: { fontSize: 16 },
});
