import React from "react";
import { View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { GoalListRow } from "@/components/cards/GoalListRow";
import { spacing } from "@/config/theme";
import { GOAL_OPTIONS } from "@/data/mockData";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "GoalSelection">;

export function GoalSelectionScreen({ navigation }: Props) {
  const { selectedGoals, toggleGoal } = useUserStore();

  return (
    <Screen>
      <Text variant="h1">What are you trying to achieve?</Text>
      <Text muted style={{ marginTop: spacing.xs, marginBottom: spacing.lg }}>
        Choose everything you would like help with. Your first pick becomes your primary goal.
      </Text>
      <View>
        {GOAL_OPTIONS.map((option) => (
          <GoalListRow
            key={option.id}
            option={option}
            selected={selectedGoals.includes(option.id)}
            onPress={() => toggleGoal(option.id)}
          />
        ))}
      </View>
      <PrimaryButton
        label="Continue"
        disabled={selectedGoals.length === 0}
        onPress={() => navigation.navigate("Situation")}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}
