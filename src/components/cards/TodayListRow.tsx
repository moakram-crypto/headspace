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
    borderRadius: radii.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  indicatorWrap: { width: 18, alignItems: "center", marginRight: spacing.xs },
  dot: { width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  ring: { width: 16, height: 16, borderRadius: 8, borderWidth: 2 },
  cover: { width: 44, height: 44, borderRadius: radii.sm },
});
