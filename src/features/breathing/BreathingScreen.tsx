import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { IconButton } from "@/components/buttons/IconButton";
import { BreathingCircle } from "@/components/player/BreathingCircle";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { useTheme } from "@/hooks/useTheme";
import { spacing } from "@/config/theme";
import { useSettingsStore } from "@/store/settings.store";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Breathing">;

const PATTERNS = {
  box: { label: "Box Breathing", phases: [["inhale", 4], ["hold", 4], ["exhale", 4], ["hold", 4]] as const },
  relaxing: { label: "Relaxing Breath", phases: [["inhale", 4], ["exhale", 6]] as const },
  "478": { label: "4-7-8", phases: [["inhale", 4], ["hold", 7], ["exhale", 8]] as const },
};

export function BreathingScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const { reducedMotion, toggleReducedMotion, hapticsEnabled, toggleHaptics } = useSettingsStore();
  const [patternKey, setPatternKey] = useState<keyof typeof PATTERNS>("box");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cyclesLeft, setCyclesLeft] = useState(5);
  const [paused, setPaused] = useState(false);

  const pattern = PATTERNS[patternKey];
  const [phaseName, phaseSeconds] = pattern.phases[phaseIndex];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      const next = (phaseIndex + 1) % pattern.phases.length;
      if (next === 0) {
        setCyclesLeft((c) => Math.max(0, c - 1));
      }
      setPhaseIndex(next);
    }, phaseSeconds * 1000);
    return () => clearTimeout(t);
  }, [phaseIndex, paused, patternKey]);

  useEffect(() => {
    if (cyclesLeft === 0) {
      const t = setTimeout(() => navigation.goBack(), 1200);
      return () => clearTimeout(t);
    }
  }, [cyclesLeft]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.textPrimary }}>
      <View style={styles.topRow}>
        <IconButton icon="✕" onPress={() => navigation.goBack()} />
        <Text color="#FFFFFF">{cyclesLeft} cycles left</Text>
        <IconButton icon={paused ? "▶️" : "⏸"} onPress={() => setPaused((p) => !p)} />
      </View>

      <BreathingCircle
        phase={phaseName as any}
        phaseSeconds={phaseSeconds}
        reducedMotion={reducedMotion}
      />

      <View style={{ paddingHorizontal: spacing.lg }}>
        <Text variant="caption" color="#FFFFFF" style={{ marginBottom: spacing.xs, opacity: 0.7 }}>
          Pattern
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {Object.entries(PATTERNS).map(([key, p]) => (
            <CategoryChip
              key={key}
              label={p.label}
              selected={patternKey === key}
              onPress={() => { setPatternKey(key as keyof typeof PATTERNS); setPhaseIndex(0); }}
            />
          ))}
        </View>
        <View style={styles.togglesRow}>
          <IconButton icon={reducedMotion ? "🌙" : "☀️"} onPress={toggleReducedMotion} />
          <IconButton icon={hapticsEnabled ? "📳" : "🔕"} onPress={toggleHaptics} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: spacing.lg },
  togglesRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg, justifyContent: "center" },
});
