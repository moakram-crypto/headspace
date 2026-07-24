import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";

interface Props {
  phase: "inhale" | "hold" | "exhale" | "rest";
  phaseSeconds: number;
  reducedMotion?: boolean;
}

const PHASE_LABEL: Record<Props["phase"], string> = {
  inhale: "Breathe in",
  hold: "Hold",
  exhale: "Breathe out",
  rest: "Rest",
};

export function BreathingCircle({ phase, phaseSeconds, reducedMotion }: Props) {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (reducedMotion) {
      scale.setValue(phase === "inhale" || phase === "hold" ? 1 : 0.6);
      return;
    }
    const target = phase === "inhale" || phase === "hold" ? 1 : 0.6;
    Animated.timing(scale, {
      toValue: target,
      duration: phaseSeconds * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [phase, phaseSeconds, reducedMotion]);

  return (
    <View style={styles.wrap}>
      <Animated.View
        style={[
          styles.circle,
          { backgroundColor: theme.primary, transform: [{ scale }] },
        ]}
      />
      <View style={styles.labelWrap}>
        <Text variant="h2" color="#FFFFFF">{PHASE_LABEL[phase]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center", height: 280 },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    position: "absolute",
    opacity: 0.85,
  },
  labelWrap: { position: "absolute" },
});
