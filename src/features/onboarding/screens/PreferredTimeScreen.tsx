import React from "react";
import { Alert, Pressable, View, StyleSheet, Platform } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import { requestNotificationPermission } from "@/services/notifications.service";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "PreferredTime">;

const OPTIONS: { id: NonNullable<ReturnType<typeof useUserStore.getState>["preferredTime"]>; label: string }[] = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
  { id: "before_sleep", label: "Before sleep" },
  { id: "varies", label: "Different times each day" },
];

export function PreferredTimeScreen({ navigation }: Props) {
  const theme = useTheme();
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
    <Screen>
      <Text variant="h1">When would you like to practice?</Text>
      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        {OPTIONS.map((o) => (
          <Pressable
            key={o.id}
            onPress={() => choose(o.id)}
            style={[
              styles.card,
              { backgroundColor: preferredTime === o.id ? theme.primary : theme.card, borderColor: theme.border },
            ]}
          >
            <Text color={preferredTime === o.id ? "#FFFFFF" : theme.textPrimary}>{o.label}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radii.md, padding: spacing.md },
});
