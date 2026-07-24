import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
  const theme = useTheme();

  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Welcome"), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={[styles.wrap, { backgroundColor: theme.primary }]}>
      <View style={styles.logoCircle}>
        <Text color="#F47B20" style={{ fontSize: 36, fontWeight: "800" }}>hs</Text>
      </View>
      <Text variant="h2" color="#FFFFFF" style={{ marginTop: 20, letterSpacing: -0.3 }}>
        headspace
      </Text>
      <Text color="rgba(255,255,255,0.75)" style={{ marginTop: 8, fontSize: 15, letterSpacing: 0.2 }}>
        Sleep, stress & anxiety relief
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
