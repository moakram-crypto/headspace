import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { IconButton } from "@/components/buttons/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, screenPadding, shadowMd } from "@/config/theme";
import { formatDuration } from "@/utils/format";
import { ContentItem } from "@/types";

interface Props {
  item: ContentItem;
  onPress: () => void;
  onFavourite?: () => void;
  favourited?: boolean;
}

export function ContentCard({ item, onPress, onFavourite, favourited }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border, opacity: pressed ? 0.92 : 1 },
      ]}
    >
      <View style={[styles.cover, { backgroundColor: item.coverColor }]} />
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text variant="h3" numberOfLines={1} style={{ flex: 1 }}>
            {item.title}
          </Text>
          {onFavourite && (
            <IconButton icon={favourited ? "❤️" : "🤍"} onPress={onFavourite} size={32} />
          )}
        </View>
        <Text variant="caption" muted numberOfLines={2} style={{ marginTop: 2 }}>
          {item.description}
        </Text>
        <View style={styles.metaRow}>
          <Text variant="caption" muted>
            {formatDuration(item.durationSeconds)} · {item.difficulty}
          </Text>
          {item.isPremium && (
            <View style={[styles.badge, { backgroundColor: theme.secondary }]}>
              <Text variant="caption" color="#FFFFFF">
                Premium
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,      // 16px
    borderWidth: 1,
    marginBottom: spacing.md,    // 16px gap between cards
    overflow: "hidden",
    ...shadowMd,
  },
  cover: { height: 120, width: "100%" },   // Headspace card image height
  body: { padding: screenPadding.horizontal },  // 20px inner padding
  headerRow: { flexDirection: "row", alignItems: "center" },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,        // 8px
  },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radii.pill },
});
