import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { IconButton } from "@/components/buttons/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { spacing } from "@/config/theme";
import { formatDuration } from "@/utils/format";
import { BREATHING, COURSES, FOCUS_TRACKS, MEDITATIONS } from "@/data/mockData";
import { usePlayerStore } from "@/store/player.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ContentDetail">;

const ALL = [...MEDITATIONS, ...BREATHING, ...FOCUS_TRACKS, ...COURSES.flatMap((c) => c.sessions)];

const TYPE_ICON: Record<string, string> = {
  meditation: "🧘", breathing: "🌬️", focus: "🎯", sleep_story: "🌙", music: "🎵", course: "📚",
};

// Full-bleed hero + icon meta row — matches the competitive review's content
// detail pattern (edge-to-edge illustration, no card frame around it).
export function ContentDetailScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const play = usePlayerStore((s) => s.play);
  const item = ALL.find((c) => c.id === route.params.contentId);

  if (!item) {
    return (
      <Screen>
        <Text>Content not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll padded={false}>
      <View style={[styles.cover, { backgroundColor: item.coverColor }]} />
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text variant="h1" style={{ flex: 1 }}>{item.title}</Text>
          <IconButton icon="🤍" onPress={() => {}} />
          <IconButton icon="⤴" onPress={() => {}} />
        </View>
        <View style={styles.metaRow}>
          <Text>{TYPE_ICON[item.contentType] ?? "🧘"}</Text>
          <Text variant="caption" muted style={{ marginLeft: 6 }}>
            {item.contentType.replace("_", " ")} · {formatDuration(item.durationSeconds)}
          </Text>
        </View>
        <Text muted style={{ marginTop: spacing.sm }}>{item.description}</Text>
        <Text variant="caption" muted style={{ marginTop: spacing.sm }}>
          By {item.instructor.name} · {item.difficulty}
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
          <PrimaryButton
            label="Start"
            onPress={() => { play(item); navigation.navigate("Player", { contentId: item.id }); }}
            style={{ flex: 1 }}
          />
          <PrimaryButton label="Download" variant="ghost" onPress={() => {}} style={{ flex: 1 }} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cover: { height: 260, width: "100%" },
  body: { padding: spacing.lg },
  headerRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: spacing.sm },
});
