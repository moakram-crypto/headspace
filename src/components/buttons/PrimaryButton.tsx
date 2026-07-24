import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { radii, typography } from "@/config/theme";

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
}

export function PrimaryButton({ label, onPress, disabled, loading, variant = "primary", style }: Props) {
  const theme = useTheme();
  const bg =
    variant === "primary" ? theme.primary : variant === "secondary" ? theme.secondary : "transparent";
  const textColor = variant === "ghost" ? theme.primary : "#FFFFFF";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        variant === "ghost" && { borderWidth: 1.5, borderColor: theme.primary },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    // Headspace: 56px tall pill buttons
    height: 56,
    paddingHorizontal: 24,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    ...typography.button, // 17px 700, ls 0.2
  },
});
