import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, screenPadding, shadowMd } from "@/config/theme";
import { formatDuration } from "@/utils/format";
import { SLEEP_STORIES } from "@/data/mockData";
import { useSettingsStore } from "@/store/settings.store";
import { usePlayerStore } from "@/store/player.store";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export function SleepScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { setThemeMode } = useSettingsStore();
  const play = usePlayerStore((s) => s.play);

  // Sleep tab uses the darker theme while it's focused, per the brief.
  useFocusEffect(
    useCallback(() => {
      setThemeMode("sleep");
      return () => setThemeMode("light");
    }, [])
  );

  const playStory = (story: (typeof SLEEP_STORIES)[number]) => {
    play({
      id: story.id,
      title: story.title,
      description: `A ${story.theme.toLowerCase()} sleep story.`,
      contentType: "sleep_story",
      category: story.theme,
      instructor: { id: story.narrator, name: story.narrator },
      durationSeconds: story.durationSeconds,
      difficulty: "beginner",
      isPremium: false,
      isDownloadable: true,
      coverColor: story.coverColor,
    });
    navigation.navigate("Player");
  };

  return (
    <Screen>
      <Text variant="h1">Sleep</Text>
      <View style={[styles.tonightCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text variant="h3">Tonight's Recommendation</Text>
        <Text muted style={{ marginTop: spacing.xs }}>{SLEEP_STORIES[0].title}</Text>
        <PrimaryButton label="Play" onPress={() => playStory(SLEEP_STORIES[0])} style={{ marginTop: spacing.sm }} />
      </View>

      <Text variant="h3" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>Sleep Stories</Text>
      {SLEEP_STORIES.map((story) => (
        <View key={story.id} style={[styles.storyRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.cover, { backgroundColor: story.coverColor }]} />
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text variant="bodyBold">{story.title}</Text>
            <Text variant="caption" muted>{story.narrator} · {story.theme} · {formatDuration(story.durationSeconds)}</Text>
          </View>
          <PrimaryButton label="▶" onPress={() => playStory(story)} style={{ paddingHorizontal: spacing.md }} />
        </View>
      ))}

      <Text variant="h3" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>Sleep Mixer</Text>
      <View style={[styles.mixerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {["Rain", "Thunder", "Fireplace"].map((sound, i) => (
          <View key={sound} style={styles.mixerRow}>
            <Text>{sound}</Text>
            <Text variant="caption" muted>{[60, 20, 30][i]}%</Text>
          </View>
        ))}
        <PrimaryButton label="Save Mix" variant="ghost" onPress={() => {}} style={{ marginTop: spacing.sm }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tonightCard: {
    borderWidth: 1,
    borderRadius: radii.lg,            // 24px
    padding: screenPadding.horizontal, // 20px
    marginTop: spacing.lg,
    minHeight: 160,
    ...shadowMd,
  },
  storyRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radii.md,   // 16px
    padding: spacing.md,      // 16px inner
    marginBottom: spacing.sm, // 8px gap
  },
  cover: { width: 60, height: 60, borderRadius: radii.sm },  // 60px — Headspace sleep story thumb
  mixerCard: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md },
  mixerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.xs },
});
