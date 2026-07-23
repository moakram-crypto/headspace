import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Experience">;

const OPTIONS: { id: "new" | "some" | "regular"; label: string; hint: string }[] = [
  { id: "new", label: "I am completely new", hint: "We'll start with basic breathing and short sessions." },
  { id: "some", label: "I have tried it a few times", hint: "5–10 minute guided sessions." },
  { id: "regular", label: "I meditate regularly", hint: "Longer, less-guided, timer-based sessions." },
];

export function ExperienceScreen({ navigation }: Props) {
  const theme = useTheme();
  const setExperienceLevel = useUserStore((s) => s.setExperienceLevel);

  return (
    <Screen>
      <Text variant="h1">How familiar are you with meditation?</Text>
      <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
        {OPTIONS.map((o) => (
          <Pressable
            key={o.id}
            onPress={() => {
              setExperienceLevel(o.id);
              navigation.navigate("Duration");
            }}
            style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Text variant="bodyBold">{o.label}</Text>
            <Text variant="caption" muted style={{ marginTop: 2 }}>{o.hint}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md },
});
