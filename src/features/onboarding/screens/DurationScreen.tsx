import React from "react";
import { ScrollView, Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/typography/Text";
import { OnboardingLayout, ORANGE } from "@/components/layout/OnboardingLayout";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Duration">;

const OPTIONS = [
  { minutes: 2,  label: "2 minutes" },
  { minutes: 5,  label: "5 minutes" },
  { minutes: 10, label: "10 minutes" },
  { minutes: 15, label: "15 minutes" },
  { minutes: 20, label: "20+ minutes" },
  { minutes: 0,  label: "It changes every day" },
];

export function DurationScreen({ navigation }: Props) {
  const { preferredDurationMinutes, setPreferredDuration } = useUserStore();

  return (
    <OnboardingLayout>
      <Text style={styles.title}>How much time can you give yourself?</Text>
      <Text style={styles.subtitle}>Pick a session length that works for you</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {OPTIONS.map((o) => {
          const selected = preferredDurationMinutes === o.minutes;
          return (
            <Pressable
              key={o.label}
              onPress={() => { setPreferredDuration(o.minutes); navigation.navigate("PreferredTime"); }}
              style={({ pressed }) => [
                styles.row,
                selected && styles.rowSelected,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={[styles.rowText, selected && styles.rowTextSelected]}>{o.label}</Text>
              <View style={[styles.indicator, selected && styles.indicatorOn]}>
                {selected && <View style={styles.indicatorDot} />}
              </View>
            </Pressable>
          );
        })}

        <Text style={styles.footnote}>
          You can always adjust the duration before starting any session.
        </Text>
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
    borderRadius: 999, height: 62, paddingHorizontal: 22, marginBottom: 10,
  },
  rowSelected:     { borderColor: ORANGE, backgroundColor: "#FFF6EE" },
  rowText:         { fontSize: 17, fontWeight: "500", color: "#1F2024" },
  rowTextSelected: { color: ORANGE, fontWeight: "600" },

  indicator:    { width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: "#D1D1D6", backgroundColor: "#F2F2F7", alignItems: "center", justifyContent: "center" },
  indicatorOn:  { borderColor: ORANGE, backgroundColor: ORANGE },
  indicatorDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#FFFFFF" },

  footnote: { fontSize: 13, color: "#8F9098", textAlign: "center", marginTop: 8, lineHeight: 20 },
});
