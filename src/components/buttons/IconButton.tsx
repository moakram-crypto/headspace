import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { radii } from "@/config/theme";

interface Props {
  icon: string;
  onPress: () => void;
  size?: number;
  active?: boolean;
}

export function IconButton({ icon, onPress, size = 44, active }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: radii.pill,
          backgroundColor: active ? theme.primary : theme.card,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.45 }}>{icon}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
});
