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
      <Text variant="h1" color="#FFFFFF">Calm Path</Text>
      <Text color="#FFFFFF" style={{ marginTop: 8 }}>A calmer day starts here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center" },
});
