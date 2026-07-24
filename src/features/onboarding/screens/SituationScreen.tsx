import React, { useState } from "react";
import { ScrollView, View, TextInput, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/typography/Text";
import { OnboardingLayout, ORANGE } from "@/components/layout/OnboardingLayout";
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
  const { situationNote, setSituationNote } = useUserStore();
  const [text, setText] = useState(situationNote);

  const goNext = () => { setSituationNote(text); navigation.navigate("Experience"); };

  return (
    <OnboardingLayout>
      <Text style={styles.title}>What would you like help with?</Text>
      <Text style={styles.subtitle}>Or tap a suggestion below</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {/* Text input row */}
        <View style={styles.inputWrap}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Tell us what has been happening..."
            placeholderTextColor="#C0C0C8"
            multiline
            style={styles.input}
          />
        </View>

        {/* Suggestion pills */}
        {SUGGESTIONS.map((s) => {
          const selected = text === s;
          return (
            <Pressable
              key={s}
              onPress={() => setText(selected ? "" : s)}
              style={({ pressed }) => [
                styles.row,
                selected && styles.rowSelected,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={[styles.rowText, selected && styles.rowTextSelected]}>{s}</Text>
              <View style={[styles.indicator, selected && styles.indicatorOn]}>
                {selected && <View style={styles.indicatorDot} />}
              </View>
            </Pressable>
          );
        })}

        {/* Buttons */}
        <Pressable
          onPress={goNext}
          style={({ pressed }) => [styles.continueBtn, { opacity: pressed ? 0.85 : 1 }]}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Experience")}
          style={({ pressed }) => [styles.skipBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.skipBtnText}>Skip</Text>
        </Pressable>
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title:    { fontSize: 26, fontWeight: "700", color: "#1F2024", textAlign: "center", letterSpacing: -0.3, lineHeight: 34 },
  subtitle: { fontSize: 16, color: "#8F9098", textAlign: "center", marginTop: 6 },
  list:     { paddingTop: 20, paddingBottom: 16 },

  inputWrap: {
    borderWidth: 1.5, borderColor: "#E8E8E8", borderRadius: 20,
    padding: 16, minHeight: 80, marginBottom: 16, backgroundColor: "#FAFAFA",
  },
  input: { fontSize: 16, color: "#1F2024", minHeight: 48 },

  row: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#E8E8E8",
    borderRadius: 999, height: 62, paddingHorizontal: 22, marginBottom: 10,
  },
  rowSelected:     { borderColor: ORANGE, backgroundColor: "#FFF6EE" },
  rowText:         { fontSize: 17, fontWeight: "500", color: "#1F2024", flex: 1 },
  rowTextSelected: { color: ORANGE, fontWeight: "600" },

  indicator:    { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: "#D1D1D6", backgroundColor: "#F2F2F7", alignItems: "center", justifyContent: "center" },
  indicatorOn:  { borderColor: ORANGE, backgroundColor: ORANGE },
  indicatorDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#FFFFFF" },

  continueBtn:     { height: 56, backgroundColor: ORANGE, borderRadius: 999, alignItems: "center", justifyContent: "center", marginTop: 8 },
  continueBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", letterSpacing: 0.2 },
  skipBtn:         { height: 56, backgroundColor: "#F2F2F7", borderRadius: 999, alignItems: "center", justifyContent: "center", marginTop: 10 },
  skipBtnText:     { fontSize: 17, fontWeight: "600", color: "#1F2024" },
});
