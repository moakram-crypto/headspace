import React from "react";
import { ScrollView, Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/typography/Text";
import { OnboardingLayout, ORANGE } from "@/components/layout/OnboardingLayout";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Plan">;

const PLAN = [
  "Two-minute breathing reset",
  "Understanding your thoughts",
  "Body relaxation",
  "Managing daily stress",
  "Improving concentration",
  "Evening wind-down",
  "Weekly reflection",
];

export function PlanScreen(_props: Props) {
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const finish = () => completeOnboarding();

  return (
    <OnboardingLayout>
      <Text style={styles.title}>Your Calm Starter Plan</Text>
      <Text style={styles.subtitle}>A simple 7-day plan built from what you told us.</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {PLAN.map((item, i) => (
          <View key={item} style={styles.row}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayText}>Day {i + 1}</Text>
            </View>
            <Text style={styles.rowLabel}>{item}</Text>
          </View>
        ))}

        <Pressable
          onPress={finish}
          style={({ pressed }) => [styles.btn, styles.btnPrimary, { opacity: pressed ? 0.85 : 1 }]}
        >
          <Text style={styles.btnPrimaryText}>Start My First Session</Text>
        </Pressable>

        <Pressable
          onPress={finish}
          style={({ pressed }) => [styles.btn, styles.btnGhost, { opacity: pressed ? 0.85 : 1 }]}
        >
          <Text style={styles.btnGhostText}>Explore the App</Text>
        </Pressable>
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title:    { fontSize: 26, fontWeight: "700", color: "#1F2024", textAlign: "center", letterSpacing: -0.3, lineHeight: 34 },
  subtitle: { fontSize: 16, color: "#8F9098", textAlign: "center", marginTop: 6 },
  list:     { paddingTop: 24, paddingBottom: 16 },

  row: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#E8E8E8",
    borderRadius: 999, height: 62, paddingHorizontal: 22, marginBottom: 10,
    gap: 14,
  },
  dayBadge: {
    backgroundColor: "#FFF0E0", borderRadius: 999,
    paddingHorizontal: 12, paddingVertical: 4,
  },
  dayText:  { fontSize: 13, fontWeight: "700", color: ORANGE },
  rowLabel: { fontSize: 16, fontWeight: "500", color: "#1F2024", flex: 1 },

  btn: { height: 56, borderRadius: 999, alignItems: "center", justifyContent: "center", marginTop: 10 },
  btnPrimary:     { backgroundColor: ORANGE },
  btnPrimaryText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", letterSpacing: 0.2 },
  btnGhost:       { backgroundColor: "transparent", borderWidth: 1.5, borderColor: "#D1D1D6" },
  btnGhostText:   { fontSize: 17, fontWeight: "600", color: "#1F2024" },
});
