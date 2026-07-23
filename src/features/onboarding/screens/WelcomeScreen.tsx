import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { spacing } from "@/config/theme";
import { useTheme } from "@/hooks/useTheme";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";
import { useUserStore } from "@/store/user.store";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Welcome">;

export function WelcomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const setGuest = useUserStore((s) => s.setGuest);

  return (
    <Screen scroll={false}>
      <View style={styles.hero}>
        <View style={[styles.heroCircle, { backgroundColor: theme.secondary }]} />
      </View>
      <Text variant="h1" style={{ marginTop: spacing.lg }}>
        Feel better, one small step at a time.
      </Text>
      <Text muted style={{ marginTop: spacing.sm }}>
        Personalized meditation, sleep and focus support designed around your day.
      </Text>
      <View style={{ marginTop: spacing.xl }}>
        <PrimaryButton
          label="Get Started"
          onPress={() => {
            setGuest(true);
            navigation.navigate("GoalSelection");
          }}
        />
        <PrimaryButton
          label="I Already Have an Account"
          variant="ghost"
          onPress={() => navigation.navigate("Account")}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", marginTop: spacing.lg },
  heroCircle: { width: 160, height: 160, borderRadius: 80, opacity: 0.5 },
});
