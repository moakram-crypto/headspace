import React, { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { IconButton } from "@/components/buttons/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { COURSES } from "@/data/mockData";
import { formatDuration } from "@/utils/format";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "CourseDetail">;

// Full-bleed cover + numbered session picker — mirrors the competitive
// review's course pattern (numbered circles for session progress, a teacher
// row above the session list), redrawn with Calm Path's own instructors.
export function CourseDetailScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const course = COURSES.find((c) => c.id === route.params.courseId);
  const [activeSession, setActiveSession] = useState(0);

  if (!course) return <Screen><Text>Course not found.</Text></Screen>;

  const instructors = Array.from(new Set(course.sessions.map((s) => s.instructor.name)));

  return (
    <Screen scroll padded={false}>
      <View style={[styles.cover, { backgroundColor: course.sessions[0]?.coverColor ?? theme.primary }]} />
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text variant="h1" style={{ flex: 1 }}>{course.title}</Text>
          <IconButton icon="🤍" onPress={() => {}} />
          <IconButton icon="⬇️" onPress={() => {}} />
        </View>
        <Text variant="caption" muted style={{ marginTop: spacing.xs }}>
          📚 Course · {course.sessions.length} sessions · {course.difficulty}
        </Text>
        <Text muted style={{ marginTop: spacing.sm }}>{course.description}</Text>

        <Text variant="caption" muted style={{ marginTop: spacing.lg, marginBottom: spacing.xs }}>
          Choose your teacher
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {instructors.map((name) => (
            <View key={name} style={[styles.teacherPill, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.avatar, { backgroundColor: theme.secondary }]}>
                <Text style={{ fontSize: 14 }}>🙂</Text>
              </View>
              <Text variant="caption" style={{ marginLeft: 6 }}>{name}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sessionRow}>
          {course.sessions.map((session, i) => {
            const state = i < activeSession ? "done" : i === activeSession ? "current" : "upcoming";
            return (
              <Pressable key={session.id} onPress={() => setActiveSession(i)} style={styles.sessionDotWrap}>
                <View
                  style={[
                    styles.sessionDot,
                    state === "current" && { backgroundColor: theme.primary },
                    state === "done" && { backgroundColor: theme.success },
                    state === "upcoming" && { borderWidth: 1.5, borderColor: theme.border },
                  ]}
                >
                  <Text variant="caption" color={state === "upcoming" ? theme.textSecondary : "#FFFFFF"}>
                    {state === "done" ? "✓" : i + 1}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <PrimaryButton
          label={`Session ${activeSession + 1}: ${course.sessions[activeSession].title}`}
          onPress={() => navigation.navigate("ContentDetail", { contentId: course.sessions[activeSession].id })}
          style={{ marginTop: spacing.lg }}
        />

        <Text variant="caption" muted style={{ marginTop: spacing.lg, marginBottom: spacing.xs }}>
          All sessions
        </Text>
        {course.sessions.map((session, i) => (
          <Pressable
            key={session.id}
            onPress={() => navigation.navigate("ContentDetail", { contentId: session.id })}
            style={[styles.row, { borderColor: theme.border, backgroundColor: theme.card, ...shadow }]}
          >
            <Text variant="bodyBold">{i + 1}. {session.title}</Text>
            <Text variant="caption" muted>{formatDuration(session.durationSeconds)}{session.isPremium ? " · Premium" : ""}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cover: { height: 220, width: "100%" },
  body: { padding: spacing.lg },
  headerRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  teacherPill: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: radii.pill,
    paddingVertical: 6, paddingHorizontal: spacing.sm, marginRight: spacing.sm,
  },
  avatar: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  sessionRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.lg },
  sessionDotWrap: { alignItems: "center" },
  sessionDot: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  row: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm },
});
