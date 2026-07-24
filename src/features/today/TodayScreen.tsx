import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/typography/Text";
import { MoodSelector } from "@/components/forms/MoodSelector";
import { TodayListRow } from "@/components/cards/TodayListRow";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { StreakCard } from "@/components/cards/StreakCard";
import { IconButton } from "@/components/buttons/IconButton";
import { OnboardingLayout, ORANGE } from "@/components/layout/OnboardingLayout";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { CATEGORIES, MEDITATIONS, QUICK_SUPPORT_TOOLS } from "@/data/mockData";
import { greetingForHour } from "@/utils/format";
import { useUserStore } from "@/store/user.store";
import { usePlayerStore } from "@/store/player.store";
import { MoodLabel } from "@/types";
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

  const selectMood = (m: MoodLabel) => setMood(m);

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
    if (item) { play(item); navigation.navigate("Player"); }
    else { navigation.navigate("Breathing", { patternId: contentId }); }
  };

  return (
    <OnboardingLayout>
      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>{greetingForHour()}{name ? `, ${name}` : ""}.</Text>
          <Text style={styles.greetingSub}>How are you feeling today?</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <IconButton icon="🤍" onPress={() => {}} size={40} />
          <IconButton icon="🔔" onPress={() => {}} size={40} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {/* Mood */}
        <MoodSelector value={mood} onSelect={selectMood} />

        {mood && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionLabel}>What is influencing your mood?</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              {MOOD_FACTORS.map((f) => (
                <CategoryChip key={f} label={f} selected={factor === f} onPress={() => selectFactor(f)} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Your Day */}
        <Text style={styles.sectionTitle}>Your day</Text>
        <TodayListRow item={continueItem} status="done"     onPress={() => { play(continueItem); navigation.navigate("Player"); }} />
        <TodayListRow item={daily}        status="current"  onPress={() => { play(daily);        navigation.navigate("Player"); }} />
        <TodayListRow item={upNext}       status="upcoming" onPress={() => { play(upNext);       navigation.navigate("Player"); }} />

        {/* Quick Support */}
        <Text style={styles.sectionTitle}>Quick Support</Text>
        <View style={styles.quickGrid}>
          {QUICK_SUPPORT_TOOLS.map((tool) => (
            <Pressable
              key={tool.id}
              onPress={() => openQuickTool(tool.targetContentId)}
              style={[styles.quickCard, { backgroundColor: theme.card, borderColor: theme.border, ...shadow }]}
            >
              <Text style={{ fontSize: 22 }}>{tool.icon}</Text>
              <Text style={styles.quickLabel}>{tool.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Progress */}
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <StreakCard progress={progress} />

        {/* Recommended */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((c) => (
            <CategoryChip key={c} label={c} />
          ))}
        </ScrollView>
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  greeting:    { fontSize: 22, fontWeight: "700", color: "#1F2024", letterSpacing: -0.2 },
  greetingSub: { fontSize: 14, color: "#8F9098", marginTop: 2 },

  list: { paddingTop: 16, paddingBottom: 24 },

  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1F2024", marginTop: 20, marginBottom: 10 },
  sectionLabel: { fontSize: 13, color: "#8F9098" },

  quickGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  quickCard: {
    width: "23%", borderWidth: 1, borderRadius: radii.md,
    paddingVertical: spacing.md, alignItems: "center", marginBottom: spacing.sm,
  },
  quickLabel: { fontSize: 11, color: "#1F2024", marginTop: 4, textAlign: "center" },
});
