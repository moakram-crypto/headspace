import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { IconButton } from "@/components/buttons/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { usePlayerStore } from "@/store/player.store";
import { useNavigation } from "@react-navigation/native";

export function AudioMiniPlayer() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { current, isPlaying, togglePlay } = usePlayerStore();

  if (!current) return null;

  return (
    <Pressable
      onPress={() => navigation.navigate("Player")}
      style={[styles.wrap, { backgroundColor: theme.card, borderColor: theme.border, ...shadow }]}
    >
      <View style={[styles.cover, { backgroundColor: current.coverColor }]} />
      <View style={{ flex: 1, marginLeft: spacing.sm }}>
        <Text variant="bodyBold" numberOfLines={1}>{current.title}</Text>
        <Text variant="caption" muted numberOfLines={1}>{current.instructor.name}</Text>
      </View>
      <IconButton icon={isPlaying ? "⏸" : "▶️"} onPress={togglePlay} size={40} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  cover: { width: 44, height: 44, borderRadius: radii.sm },
});
