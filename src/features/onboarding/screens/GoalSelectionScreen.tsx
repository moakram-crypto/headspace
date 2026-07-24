import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/typography/Text";
import { screenPadding } from "@/config/theme";
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

// Colours from the screenshot
const AMBER   = "#F9A825";   // golden yellow header background
const ORANGE  = "#F47B20";   // character circle
const FACE_COLOR = "#3D2318"; // dark brown for face lines

export function GoalSelectionScreen({ navigation }: Props) {
  const { selectedGoals, toggleGoal } = useUserStore();

  const handleSelect = (id: string) => {
    toggleGoal(id);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={AMBER} />

      {/* ── Orange header with character ── */}
      <View style={styles.header}>
        <SafeAreaView edges={["top"]} style={styles.headerInner}>
          <View style={styles.character}>
            {/* Closed eyes */}
            <View style={styles.eyeRow}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            {/* Smile */}
            <View style={styles.smile} />
          </View>
        </SafeAreaView>
      </View>

      {/* ── White curved sheet ── */}
      <View style={styles.sheet}>
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
                {/* Radio indicator */}
                <View style={[styles.indicator, selected && styles.indicatorSelected]}>
                  {selected && <View style={styles.indicatorDot} />}
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Continue — only visible when something is selected */}
        {selectedGoals.length > 0 && (
          <Pressable
            onPress={() => navigation.navigate("Situation")}
            style={styles.continueBtn}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: AMBER },

  /* ── Header ── */
  header: {
    backgroundColor: AMBER,
    height: 260,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
  headerInner: { alignItems: "center" },

  /* Headspace face character */
  character: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  eyeRow: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 4,
  },
  /* Closed-eye arch: dome shape = flat bottom, curved top */
  eye: {
    width: 22,
    height: 11,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    backgroundColor: FACE_COLOR,
  },
  /* Smile: U-shape — border on bottom + sides, no top border */
  smile: {
    width: 30,
    height: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderColor: FACE_COLOR,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    backgroundColor: "transparent",
  },

  /* ── White sheet ── */
  sheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 32,
    paddingHorizontal: screenPadding.horizontal,
    paddingBottom: 24,
    marginTop: -32,
  },

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
