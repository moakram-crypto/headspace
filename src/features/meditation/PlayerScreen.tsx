import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "@/components/typography/Text";
import { IconButton } from "@/components/buttons/IconButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { formatTime } from "@/utils/format";
import { BACKGROUND_SOUNDS } from "@/data/mockData";
import { usePlayerStore } from "@/store/player.store";
import { useUserStore } from "@/store/user.store";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

const SPEEDS = [0.75, 1, 1.25, 1.5];
const TIMERS = [15, 30, 45, 60];

export function PlayerScreen({ navigation }: Props) {
  const theme = useTheme();
  const {
    current, isPlaying, positionSeconds, backgroundSound, playbackSpeed,
    togglePlay, seek, setBackgroundSound, setPlaybackSpeed, close,
  } = usePlayerStore();
  const logSessionComplete = useUserStore((s) => s.logSessionComplete);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying && current) {
      intervalRef.current = setInterval(() => {
        const next = usePlayerStore.getState().positionSeconds + 1;
        if (next >= current.durationSeconds) {
          clearInterval(intervalRef.current!);
          logSessionComplete(Math.round(current.durationSeconds / 60));
          navigation.replace("SessionComplete", { contentId: current.id, minutes: Math.round(current.durationSeconds / 60) });
        } else {
          seek(next);
        }
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, current?.id]);

  if (!current) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background, alignItems: "center", justifyContent: "center" }}>
        <Text muted>Nothing is playing right now.</Text>
        <PrimaryButton label="Close" onPress={() => navigation.goBack()} style={{ marginTop: spacing.md }} />
      </SafeAreaView>
    );
  }

  const progress = current.durationSeconds ? positionSeconds / current.durationSeconds : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg, flexGrow: 1 }}>
        <View style={styles.topRow}>
          <IconButton icon="⌄" onPress={() => { close(); navigation.goBack(); }} />
          <Text variant="caption" muted>Now Playing</Text>
          <IconButton icon="📶" onPress={() => {}} />
        </View>

        <View style={[styles.illustration, { backgroundColor: current.coverColor }]} />

        <Text variant="h2" style={{ marginTop: spacing.lg, textAlign: "center" }}>{current.title}</Text>
        <Text muted style={{ textAlign: "center", marginTop: 4 }}>{current.instructor.name}</Text>

        <View style={{ marginTop: spacing.lg }}>
          <View style={[styles.progressTrack, { backgroundColor: theme.border }]}>
            <View style={[styles.progressFill, { backgroundColor: theme.primary, width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text variant="caption" muted>{formatTime(positionSeconds)}</Text>
            <Text variant="caption" muted>-{formatTime(current.durationSeconds - positionSeconds)}</Text>
          </View>
        </View>

        <View style={styles.controlsRow}>
          <IconButton icon="⏮15" onPress={() => seek(Math.max(0, positionSeconds - 15))} size={48} />
          <IconButton icon={isPlaying ? "⏸" : "▶️"} onPress={togglePlay} size={72} />
          <IconButton icon="15⏭" onPress={() => seek(Math.min(current.durationSeconds, positionSeconds + 15))} size={48} />
        </View>

        <Text variant="caption" muted style={{ marginTop: spacing.lg, marginBottom: spacing.xs }}>
          Background sound
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {BACKGROUND_SOUNDS.map((s) => (
            <CategoryChip key={s} label={s} selected={backgroundSound === s} onPress={() => setBackgroundSound(s)} />
          ))}
        </ScrollView>

        <Text variant="caption" muted style={{ marginTop: spacing.md, marginBottom: spacing.xs }}>
          Playback speed
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          {SPEEDS.map((s) => (
            <CategoryChip key={s} label={`${s}x`} selected={playbackSpeed === s} onPress={() => setPlaybackSpeed(s)} />
          ))}
        </View>

        <View style={styles.bottomActions}>
          <IconButton icon="🤍" onPress={() => {}} />
          <IconButton icon="⬇️" onPress={() => {}} />
          <IconButton icon="⏱" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  illustration: { height: 220, borderRadius: radii.lg, marginTop: spacing.lg },
  progressTrack: { height: 4, borderRadius: 2, overflow: "hidden" },
  progressFill: { height: 4 },
  timeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.xs },
  controlsRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, marginTop: spacing.lg },
  bottomActions: { flexDirection: "row", justifyContent: "space-around", marginTop: spacing.lg },
});
