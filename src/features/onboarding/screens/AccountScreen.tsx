import React from "react";
import { View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { spacing } from "@/config/theme";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Account">;

// Wire actual Apple/Google/email auth to Supabase Auth or Firebase Auth per
// the brief's backend choice. This screen only manages local app state for now.
export function AccountScreen({ navigation }: Props) {
  const { setGuest, setName } = useUserStore();

  const continueAs = (guest: boolean, displayName = "") => {
    setGuest(guest);
    if (displayName) setName(displayName);
    navigation.navigate("Plan");
  };

  return (
    <Screen scroll={false} style={{ flex: 1, justifyContent: "center" }}>
      <Text variant="h1">Save your progress</Text>
      <Text muted style={{ marginTop: spacing.xs, marginBottom: spacing.lg }}>
        Create an account to sync across devices, or continue as a guest for now.
      </Text>
      <View style={{ gap: spacing.sm }}>
        <PrimaryButton label="Continue with Apple" onPress={() => continueAs(false, "Apple User")} />
        <PrimaryButton label="Continue with Google" variant="secondary" onPress={() => continueAs(false, "Google User")} />
        <PrimaryButton label="Continue with Email" variant="ghost" onPress={() => continueAs(false, "MoAkram")} />
        <PrimaryButton label="Continue as Guest" variant="ghost" onPress={() => continueAs(true)} />
      </View>
    </Screen>
  );
}
