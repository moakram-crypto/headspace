import React, { useState } from "react";
import { TextInput, View, ScrollView, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { MoodSelector } from "@/components/forms/MoodSelector";
import { OnboardingLayout, ORANGE } from "@/components/layout/OnboardingLayout";
import { useUserStore } from "@/store/user.store";
import { MoodLabel } from "@/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "MoodCheckIn">;

export function MoodCheckInScreen({ navigation }: Props) {
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
    <OnboardingLayout>
      <Text style={styles.title}>How have you been feeling recently?</Text>
      <Text style={styles.subtitle}>Pick your current mood</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <MoodSelector value={mood} onSelect={setMood} />

        <Text style={styles.label}>What is affecting your mood? (optional)</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Work, sleep, relationships..."
          placeholderTextColor="#C0C0C8"
          style={styles.input}
        />

        <Pressable
          onPress={continueNext}
          style={({ pressed }) => [
            styles.continueBtn,
            { opacity: !mood ? 0.45 : pressed ? 0.85 : 1 },
          ]}
          disabled={!mood}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title:    { fontSize: 26, fontWeight: "700", color: "#1F2024", textAlign: "center", letterSpacing: -0.3, lineHeight: 34 },
  subtitle: { fontSize: 16, color: "#8F9098", textAlign: "center", marginTop: 6 },
  list:     { paddingTop: 24, paddingBottom: 16 },

  label: { fontSize: 14, color: "#8F9098", marginTop: 24, marginBottom: 8 },
  input: {
    borderWidth: 1.5, borderColor: "#E8E8E8", borderRadius: 20,
    padding: 16, fontSize: 16, color: "#1F2024", backgroundColor: "#FAFAFA",
  },

  continueBtn:     { height: 56, backgroundColor: ORANGE, borderRadius: 999, alignItems: "center", justifyContent: "center", marginTop: 24 },
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", letterSpacing: 0.2 },
});
