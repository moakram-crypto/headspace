import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Platform, View } from "react-native";
import { Text } from "@/components/typography/Text";
import { OnboardingLayout, ORANGE } from "@/components/layout/OnboardingLayout";
import { useUserStore } from "@/store/user.store";
import { requestNotificationPermission } from "@/services/notifications.service";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "PreferredTime">;

const OPTIONS: { id: NonNullable<ReturnType<typeof useUserStore.getState>["preferredTime"]>; label: string }[] = [
  { id: "morning",      label: "Morning" },
  { id: "afternoon",    label: "Afternoon" },
  { id: "evening",      label: "Evening" },
  { id: "before_sleep", label: "Before sleep" },
  { id: "varies",       label: "Different times each day" },
];

export function PreferredTimeScreen({ navigation }: Props) {
  const { preferredTime, setPreferredTime } = useUserStore();

  const choose = async (id: (typeof OPTIONS)[number]["id"]) => {
    setPreferredTime(id);
    if (id !== "varies") {
      const granted = await requestNotificationPermission();
      if (granted && Platform.OS !== "web") {
        Alert.alert("Reminder set", "We'll gently remind you at your preferred time.");
      }
    }
    navigation.navigate("MoodCheckIn");
  };

  return (
    <OnboardingLayout>
      <Text style={styles.title}>When would you like to practice?</Text>
      <Text style={styles.subtitle}>We'll remind you at your preferred time</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {OPTIONS.map((o) => {
          const selected = preferredTime === o.id;
          return (
            <Pressable
              key={o.id}
              onPress={() => choose(o.id)}
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
});
