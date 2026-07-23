import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { MoodSelector } from "@/components/forms/MoodSelector";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import { MoodLabel } from "@/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "MoodCheckIn">;

export function MoodCheckInScreen({ navigation }: Props) {
  const theme = useTheme();
  const addMoodEntry = useUserStore((s) => s.addMoodEntry);
  const [mood, setMood] = useState<MoodLabel | undefined>();
  const [note, setNote] = useState("");

  const continueNext = () => {
    if (mood) {
      addMoodEntry({
        id: `${Date.now()}`,
        moodLabel: mood,
        factors: [],
        note,
        createdAt: new Date().toISOString(),
      });
    }
    navigation.navigate("Account");
  };

  return (
    <Screen>
      <Text variant="h1">How have you been feeling recently?</Text>
      <View style={{ marginTop: spacing.lg }}>
        <MoodSelector value={mood} onSelect={setMood} />
      </View>
      <Text variant="caption" muted style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>
        What is affecting your mood? (optional)
      </Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Work, sleep, relationships..."
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.textPrimary }]}
      />
      <PrimaryButton label="Continue" disabled={!mood} onPress={continueNext} style={{ marginTop: spacing.lg }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md, fontSize: 16 },
});
