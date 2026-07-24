import React from "react";
import { ScrollView, Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/typography/Text";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Experience">;

const OPTIONS: { id: "new" | "some" | "regular"; label: string; hint: string }[] = [
  { id: "new",     label: "I am completely new",         hint: "We'll start with basic breathing and short sessions." },
  { id: "some",    label: "I have tried it a few times", hint: "5–10 minute guided sessions." },
  { id: "regular", label: "I meditate regularly",         hint: "Longer, less-guided, timer-based sessions." },
];

export function ExperienceScreen({ navigation }: Props) {
  const setExperienceLevel = useUserStore((s) => s.setExperienceLevel);

  return (
    <OnboardingLayout>
      <Text style={styles.title}>How familiar are you with meditation?</Text>
      <Text style={styles.subtitle}>Pick the one that fits you best</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {OPTIONS.map((o) => (
          <Pressable
            key={o.id}
            onPress={() => { setExperienceLevel(o.id); navigation.navigate("Duration"); }}
            style={({ pressed }) => [styles.row, { opacity: pressed ? 0.85 : 1 }]}
          >
            <View style={styles.rowText}>
              <Text style={styles.label}>{o.label}</Text>
              <Text style={styles.hint}>{o.hint}</Text>
            </View>
            <View style={styles.indicator} />
          </Pressable>
        ))}
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title:    { fontSize: 26, fontWeight: "700", color: "#1F2024", textAlign: "center", letterSpacing: -0.3, lineHeight: 34 },
  subtitle: { fontSize: 16, color: "#8F9098", textAlign: "center", marginTop: 6 },
  list:     { paddingTop: 24, paddingBottom: 16 },

  row: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#E8E8E8",
    borderRadius: 999, minHeight: 62, paddingHorizontal: 22, paddingVertical: 14, marginBottom: 10,
  },
  rowText:   { flex: 1, marginRight: 12 },
  label:     { fontSize: 17, fontWeight: "500", color: "#1F2024" },
  hint:      { fontSize: 13, color: "#8F9098", marginTop: 2 },
  indicator: { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: "#D1D1D6", backgroundColor: "#F2F2F7" },
});
