import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import { useNavigation } from "@react-navigation/native";

const MENU = [
  "My Journey", "Saved Content", "Downloads", "Mood History", "Daily Plan", "Achievements",
  "Reminders", "Subscription", "Audio Preferences", "App Language", "Privacy", "Help & Support", "Sign Out",
];

// Banner header + icon stat rows + a prominent streak block — mirrors the
// competitive review's profile pattern, redrawn with Calm Path's own colors,
// icons, and copy.
export function ProfileScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { name, isGuest, progress } = useUserStore();

  const avgMinutes = progress.totalSessions > 0 ? Math.round(progress.totalMinutes / progress.totalSessions) : 0;

  const stats = [
    { icon: "⏱", label: "Average session length", value: `${avgMinutes} min` },
    { icon: "🕰", label: "Total mindful minutes", value: `${progress.totalMinutes} min` },
    { icon: "✅", label: "Sessions completed", value: `${progress.totalSessions}` },
  ];

  return (
    <Screen scroll padded={false}>
      <View style={[styles.banner, { backgroundColor: theme.secondary }]}>
        <View style={[styles.avatar, { backgroundColor: theme.card }]}>
          <Text style={{ fontSize: 30 }}>🙂</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text variant="h2">{name || (isGuest ? "Guest" : "Friend")}</Text>
        <Text variant="caption" muted style={{ marginTop: 2 }}>
          {isGuest ? "Guest account" : "Free plan"}
        </Text>

        <Text variant="h3" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>Stats</Text>
        <View style={[styles.statsCard, { backgroundColor: theme.card, borderColor: theme.border, ...shadow }]}>
          {stats.map((s, i) => (
            <View key={s.label} style={[styles.statRow, i > 0 && { borderTopWidth: 1, borderTopColor: theme.border }]}>
              <Text style={{ fontSize: 16 }}>{s.icon}</Text>
              <Text style={{ marginLeft: spacing.sm, flex: 1 }}>{s.label}</Text>
              <Text variant="bodyBold">{s.value}</Text>
            </View>
          ))}
        </View>

        <Text variant="h3" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>Run streak</Text>
        <View style={[styles.streakCard, { backgroundColor: theme.card, borderColor: theme.border, ...shadow }]}>
          <Text style={{ fontSize: 28 }}>🔥</Text>
          <Text variant="h1" style={{ marginTop: spacing.xs }}>{progress.currentStreak}</Text>
          <Text variant="caption" muted>day{progress.currentStreak === 1 ? "" : "s"} in a row</Text>
        </View>

        <View style={{ marginTop: spacing.lg }}>
          {MENU.map((item) => (
            <Pressable
              key={item}
              onPress={() => item === "Mood History" && navigation.navigate("MoodHistory")}
              style={[styles.row, { borderColor: theme.border }]}
            >
              <Text>{item}</Text>
              <Text muted>›</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: { height: 140, alignItems: "center", justifyContent: "center" },
  avatar: { width: 76, height: 76, borderRadius: 38, alignItems: "center", justifyContent: "center" },
  body: { padding: spacing.lg },
  statsCard: { borderWidth: 1, borderRadius: radii.md, overflow: "hidden" },
  statRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  streakCard: { borderWidth: 1, borderRadius: radii.md, alignItems: "center", padding: spacing.lg },
  row: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingVertical: spacing.md, borderBottomWidth: 1,
  },
});
