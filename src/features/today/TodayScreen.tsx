import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { MoodSelector } from "@/components/forms/MoodSelector";
import { TodayListRow } from "@/components/cards/TodayListRow";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { StreakCard } from "@/components/cards/StreakCard";
import { IconButton } from "@/components/buttons/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { CATEGORIES, MEDITATIONS, QUICK_SUPPORT_TOOLS } from "@/data/mockData";
import { greetingForHour } from "@/utils/format";
import { useUserStore } from "@/store/user.store";
import { usePlayerStore } from "@/store/player.store";
import { MoodLabel } from "@/types";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MOOD_FACTORS = ["Work", "Sleep", "Health", "Relationships", "Money", "Family", "Study", "Other"];

export function TodayScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { name, progress, addMoodEntry } = useUserStore();
  const play = usePlayerStore((s) => s.play);
  const [mood, setMood] = useState<MoodLabel | undefined>();
  const [factor, setFactor] = useState<string | null>(null);

  const daily = MEDITATIONS[0];
  const continueItem = MEDITATIONS[1];
  const upNext = MEDITATIONS[2];

  const selectMood = (m: MoodLabel) => {
    setMood(m);
  };

  const selectFactor = (f: string) => {
    setFactor(f);
    if (mood) {
      addMoodEntry({
        id: `${Date.now()}`,
        moodLabel: mood,
        factors: [f],
        createdAt: new Date().toISOString(),
      });
    }
  };

  const openQuickTool = (contentId: string) => {
    const item = MEDITATIONS.find((m) => m.id === contentId);
    if (item) {
      play(item);
      navigation.navigate("Player");
    } else {
      navigation.navigate("Breathing", { patternId: contentId });
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text variant="h2">{greetingForHour()}{name ? `, ${name}` : ""}.</Text>
          <Text muted>How are you feeling today?</Text>
        </View>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <IconButton icon="🤍" onPress={() => {}} size={40} />
          <IconButton icon="🔔" onPress={() => {}} size={40} />
        </View>
      </View>

      <View style={{ marginTop: spacing.lg }}>
        <MoodSelector value={mood} onSelect={selectMood} />
      </View>

      {mood && (
        <View style={{ marginTop: spacing.md }}>
          <Text variant="caption" muted style={{ marginBottom: spacing.sm }}>
            What is influencing your mood?
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOOD_FACTORS.map((f) => (
              <CategoryChip key={f} label={f} selected={factor === f} onPress={() => selectFactor(f)} />
            ))}
          </ScrollView>
        </View>
      )}

      <Text variant="h3" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>
        Your day
      </Text>
      <TodayListRow item={continueItem} status="done" onPress={() => { play(continueItem); navigation.navigate("Player"); }} />
      <TodayListRow item={daily} status="current" onPress={() => { play(daily); navigation.navigate("Player"); }} />
      <TodayListRow item={upNext} status="upcoming" onPress={() => { play(upNext); navigation.navigate("Player"); }} />

      <Text variant="h3" style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>
        Quick Support
      </Text>
      <View style={styles.quickGrid}>
        {QUICK_SUPPORT_TOOLS.map((tool) => (
          <Pressable
            key={tool.id}
            onPress={() => openQuickTool(tool.targetContentId)}
            style={[styles.quickCard, { backgroundColor: theme.card, borderColor: theme.border, ...shadow }]}
          >
            <Text style={{ fontSize: 22 }}>{tool.icon}</Text>
            <Text variant="caption" style={{ marginTop: 4, textAlign: "center" }}>{tool.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text variant="h3" style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>
        Your Progress
      </Text>
      <StreakCard progress={progress} />

      <Text variant="h3" style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>
        Recommended for You
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((c) => (
          <CategoryChip key={c} label={c} />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  quickCard: {
    width: "23%",
    borderWidth: 1,
    borderRadius: radii.md,   // 16px
    paddingVertical: spacing.md,  // 16px — taller quick-tool cards
    alignItems: "center",
    marginBottom: spacing.sm,     // 8px
  },
});
