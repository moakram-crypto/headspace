import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Duration">;

const OPTIONS = [
  { minutes: 2, label: "2 minutes" },
  { minutes: 5, label: "5 minutes" },
  { minutes: 10, label: "10 minutes" },
  { minutes: 15, label: "15 minutes" },
  { minutes: 20, label: "20+ minutes" },
  { minutes: 0, label: "It changes every day" },
];

export function DurationScreen({ navigation }: Props) {
  const theme = useTheme();
  const { preferredDurationMinutes, setPreferredDuration } = useUserStore();

  return (
    <Screen>
      <Text variant="h1">How much time can you usually give yourself?</Text>
      <View style={styles.grid}>
        {OPTIONS.map((o) => (
          <Pressable
            key={o.label}
            onPress={() => {
              setPreferredDuration(o.minutes);
              navigation.navigate("PreferredTime");
            }}
            style={[
              styles.chip,
              {
                backgroundColor: preferredDurationMinutes === o.minutes ? theme.primary : theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text color={preferredDurationMinutes === o.minutes ? "#FFFFFF" : theme.textPrimary}>
              {o.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text variant="caption" muted style={{ marginTop: spacing.md }}>
        You can always adjust the duration before starting any session.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.lg },
  chip: { borderWidth: 1, borderRadius: radii.pill, paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
});
