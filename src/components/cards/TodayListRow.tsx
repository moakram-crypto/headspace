import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { formatDuration } from "@/utils/format";
import { ContentItem } from "@/types";

export type RowStatus = "done" | "current" | "upcoming";

interface Props {
  item: ContentItem;
  status: RowStatus;
  onPress: () => void;
}

// Single-column list row with a leading status indicator (done / current /
// upcoming) — mirrors the "Start your day" list pattern from the brief's
// competitive review, redrawn with Calm Path's own colors and cards.
export function TodayListRow({ item, status, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: theme.card, borderColor: theme.border, opacity: pressed ? 0.9 : 1, ...shadow },
      ]}
    >
      <View style={styles.indicatorWrap}>
        {status === "done" && (
          <View style={[styles.dot, { backgroundColor: theme.success }]}>
            <Text color="#FFFFFF" style={{ fontSize: 11 }}>✓</Text>
          </View>
        )}
        {status === "current" && <View style={[styles.dot, { backgroundColor: theme.primary }]} />}
        {status === "upcoming" && <View style={[styles.ring, { borderColor: theme.border }]} />}
      </View>

      <View style={[styles.cover, { backgroundColor: item.coverColor }]} />

      <View style={{ flex: 1, marginLeft: spacing.sm }}>
        <Text variant="bodyBold" numberOfLines={1}>{item.title}</Text>
        <Text variant="caption" muted numberOfLines={1}>
          {item.contentType.replace("_", " ")} · {formatDuration(item.durationSeconds)}
        </Text>
      </View>
      <Text muted>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radii.md,   // 16px
    padding: spacing.md,      // 16px inner padding — Headspace list rows
    marginBottom: spacing.sm, // 8px gap between rows
  },
  indicatorWrap: { width: 20, alignItems: "center", marginRight: spacing.sm },
  dot: { width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  ring: { width: 18, height: 18, borderRadius: 9, borderWidth: 2 },
  cover: { width: 56, height: 56, borderRadius: radii.sm },  // 56px thumb — Headspace list art
});
