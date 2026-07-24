import React from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/typography/Text";
import { OnboardingLayout, ORANGE } from "@/components/layout/OnboardingLayout";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "GoalSelection">;

// Headspace-style goal options (no icons — plain text like the original)
const GOALS = [
  { id: "mindful",   label: "Be present and mindful" },
  { id: "stress",    label: "Reduce stress" },
  { id: "anxiety",   label: "Manage anxiety" },
  { id: "sleep",     label: "Sleep soundly" },
  { id: "calm",      label: "Feel calm and relaxed" },
  { id: "other",     label: "Something else" },
];


export function GoalSelectionScreen({ navigation }: Props) {
  const { selectedGoals, toggleGoal } = useUserStore();

  const handleSelect = (id: string) => {
    toggleGoal(id);
  };

  return (
    <OnboardingLayout>
        {/* Title */}
        <Text style={styles.title}>What's on your mind?</Text>
        <Text style={styles.subtitle}>I want to...</Text>

        {/* Goal rows */}
        <ScrollView
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {GOALS.map((goal) => {
            const selected = selectedGoals.includes(goal.id);
            return (
              <Pressable
                key={goal.id}
                onPress={() => handleSelect(goal.id)}
                style={({ pressed }) => [
                  styles.row,
                  selected && styles.rowSelected,
                  { opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Text style={[styles.rowText, selected && styles.rowTextSelected]}>
                  {goal.label}
                </Text>
                <View style={[styles.indicator, selected && styles.indicatorSelected]}>
                  {selected && <View style={styles.indicatorDot} />}
                </View>
              </Pressable>
            );
          })}

          {/* Continue — only visible when something is selected */}
          {selectedGoals.length > 0 && (
            <Pressable
              onPress={() => navigation.navigate("Situation")}
              style={styles.continueBtn}
            >
              <Text style={styles.continueBtnText}>Continue</Text>
            </Pressable>
          )}
        </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2024",
    textAlign: "center",
    letterSpacing: -0.3,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#8F9098",
    textAlign: "center",
    marginTop: 6,
    letterSpacing: 0,
  },

  list: { marginTop: 24 },
  listContent: { paddingBottom: 16 },

  /* Goal pill row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#EBEBEB",
    borderRadius: 999,       // full pill
    height: 62,
    paddingHorizontal: 22,
    marginBottom: 10,
  },
  rowSelected: {
    borderColor: ORANGE,
    backgroundColor: "#FFF5EE",
  },
  rowText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#1F2024",
    letterSpacing: 0,
  },
  rowTextSelected: {
    color: ORANGE,
    fontWeight: "600",
  },

  /* Radio circle */
  indicator: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#D1D1D6",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorSelected: {
    borderColor: ORANGE,
    backgroundColor: ORANGE,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },

  /* Continue button */
  continueBtn: {
    marginTop: 8,
    height: 56,
    backgroundColor: ORANGE,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
});
