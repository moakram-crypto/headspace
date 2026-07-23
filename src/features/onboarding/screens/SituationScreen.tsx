import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { IconButton } from "@/components/buttons/IconButton";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Situation">;

const SUGGESTIONS = [
  "Work has been stressful",
  "I cannot fall asleep",
  "I keep overthinking",
  "I need help concentrating",
  "I feel emotionally exhausted",
];

export function SituationScreen({ navigation }: Props) {
  const theme = useTheme();
  const { situationNote, setSituationNote } = useUserStore();
  const [text, setText] = useState(situationNote);

  const goNext = () => {
    setSituationNote(text);
    navigation.navigate("Experience");
  };

  return (
    <Screen>
      <Text variant="h1">What would you like help with right now?</Text>
      <View style={[styles.inputWrap, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Tell us what has been happening..."
          placeholderTextColor={theme.textSecondary}
          multiline
          style={[styles.input, { color: theme.textPrimary }]}
        />
        <IconButton icon="🎙️" onPress={() => {}} size={36} />
      </View>
      <Text variant="caption" muted style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>
        Or tap a suggestion
      </Text>
      <View style={{ gap: spacing.sm }}>
        {SUGGESTIONS.map((s) => (
          <Pressable
            key={s}
            onPress={() => setText(s)}
            style={[styles.suggestion, { borderColor: theme.border, backgroundColor: theme.card }]}
          >
            <Text>{s}</Text>
          </Pressable>
        ))}
      </View>
      <PrimaryButton label="Continue" onPress={goNext} style={{ marginTop: spacing.lg }} />
      <PrimaryButton
        label="Skip"
        variant="ghost"
        onPress={() => navigation.navigate("Experience")}
        style={{ marginTop: spacing.sm }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    borderRadius: radii.md,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: 90,
  },
  input: { flex: 1, fontSize: 16, minHeight: 60 },
  suggestion: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md },
});
