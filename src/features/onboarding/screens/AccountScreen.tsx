import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/typography/Text";
import { ORANGE } from "@/components/layout/OnboardingLayout";
import { useUserStore } from "@/store/user.store";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Account">;

export function AccountScreen({ navigation }: Props) {
  const { setGuest, setName } = useUserStore();

  const continueAs = (guest: boolean, displayName = "") => {
    setGuest(guest);
    if (displayName) setName(displayName);
    navigation.navigate("Plan");
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <View style={styles.inner}>
        <Text style={styles.title}>Save your progress</Text>
        <Text style={styles.subtitle}>
          Create an account to sync across devices, or continue as a guest for now.
        </Text>

        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnPrimary, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => continueAs(false, "Apple User")}
          >
            <Text style={styles.btnPrimaryText}>Continue with Apple</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnSecondary, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => continueAs(false, "Google User")}
          >
            <Text style={styles.btnSecondaryText}>Continue with Google</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnGhost, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => continueAs(false, "MoAkram")}
          >
            <Text style={styles.btnGhostText}>Continue with Email</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnGhost, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => continueAs(true)}
          >
            <Text style={styles.btnGhostText}>Continue as Guest</Text>
          </Pressable>
        </View>
      </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5EEE6",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2024",
    textAlign: "center",
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: "#8F9098",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 36,
    lineHeight: 24,
  },
  buttons: {
    gap: 12,
  },
  btn: {
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary:      { backgroundColor: ORANGE },
  btnPrimaryText:  { fontSize: 17, fontWeight: "700", color: "#FFFFFF", letterSpacing: 0.2 },
  btnSecondary:    { backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#E8E8E8" },
  btnSecondaryText:{ fontSize: 17, fontWeight: "600", color: "#1F2024" },
  btnGhost:        { backgroundColor: "transparent", borderWidth: 1.5, borderColor: "#D1D1D6" },
  btnGhostText:    { fontSize: 17, fontWeight: "600", color: "#1F2024" },
});
