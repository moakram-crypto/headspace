import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text as RNText,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/typography/Text";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "@/navigation/types";
import { useUserStore } from "@/store/user.store";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Welcome">;

const AMBER      = "#F9A825";
const ORANGE     = "#F47B20";
const FACE_COL   = "#1F1F1F";
const BLUE       = "#3B5BDB";   // Headspace "Create an account" blue

// ── Arch geometry (same gentle dome as the reference) ─────────────
// On web the app is pinned to a 390px phone frame, but Dimensions
// returns the full browser window width — so we cap it at 390.
const SW     = Platform.OS === "web" ? 390 : Dimensions.get("window").width;
const EXTRA  = 160;
const ARCH_W = SW + EXTRA * 2;
const ARCH_R = ARCH_W / 2;
// ──────────────────────────────────────────────────────────────────

// Floating decorative icons around the phone mockup
const FLOATS = [
  // left side
  { label: "✦",  top: 36,  left: -20, size: 18, color: "#FFFFFF"  },
  { label: "🌸", top: 64,  left: -56, size: 38                     },
  { label: "🌧️", top: 128, left: -80, size: 42                     },
  { label: "🌑", top: 196, left: -52, size: 44                     },
  { label: "✦",  top: 210, left: -78, size: 12, color: "#FFFFFF"  },
  // right side
  { label: "▶",  top: 48,  right: -52, size: 30, color: ORANGE    },
  { label: "✦",  top: 28,  right: -22, size: 14, color: "#FFE55C" },
  { label: "🌈", top: 100, right: -76, size: 42                    },
  { label: "💎", top: 178, right: -44, size: 30, color: "#FFE55C" },
  { label: "🎵", top: 220, right: -66, size: 38                    },
  // bottom left
  { label: "▶▶", top: 256, left: -48, size: 22, color: "#FFE55C"  },
];

export function WelcomeScreen({ navigation }: Props) {
  const [agreed, setAgreed] = useState(false);
  const setGuest = useUserStore((s) => s.setGuest);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={AMBER} />

      {/* ── Amber header ── */}
      <SafeAreaView edges={["top"]} style={styles.header}>
        {/* Phone mockup + floating icons */}
        <View style={styles.phoneWrap}>
          {/* Floating icons (absolutely positioned around phone) */}
          {FLOATS.map((f, i) => (
            <RNText
              key={i}
              style={[
                styles.float,
                {
                  top:   f.top,
                  left:  f.left  !== undefined ? f.left  : undefined,
                  right: f.right !== undefined ? f.right : undefined,
                  fontSize: f.size,
                  color: f.color ?? undefined,
                },
              ]}
            >
              {f.label}
            </RNText>
          ))}

          {/* Phone shell */}
          <View style={styles.phone}>
            {/* Notch */}
            <View style={styles.notch} />
            {/* Headspace character inside phone */}
            <View style={styles.character}>
              <View style={styles.eyeRow}>
                <View style={styles.eye} />
                <View style={styles.eye} />
              </View>
              <View style={styles.smile} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* ── White dome sheet ── */}
      <View style={styles.archClip}>
        <View style={styles.sheet}>
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Welcome to Headspace</Text>
            <Text style={styles.subtitle}>Support for all of life's moments</Text>

            <View style={{ flex: 1 }} />

            {/* Terms checkbox */}
            <Pressable style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
              <View style={[styles.checkbox, agreed && styles.checkboxOn]}>
                {agreed && <RNText style={styles.checkmark}>✓</RNText>}
              </View>
              <Text style={styles.termsText}>
                I agree to Headspace's{" "}
                <Text style={styles.link}>Terms & Conditions</Text>
                {" "}and acknowledge the{" "}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </Pressable>

            {/* Create account */}
            <Pressable
              onPress={() => {
                if (agreed) navigation.navigate("GoalSelection");
              }}
              style={({ pressed }) => [
                styles.createBtn,
                { opacity: agreed ? (pressed ? 0.85 : 1) : 0.5 },
              ]}
            >
              <Text style={styles.createBtnText}>Create an account</Text>
            </Pressable>

            {/* Log in */}
            <Pressable
              onPress={() => navigation.navigate("Account")}
              style={({ pressed }) => [styles.loginBtn, { opacity: pressed ? 0.7 : 1 }]}
            >
              <Text style={styles.loginBtnText}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const PHONE_W  = 160;
const PHONE_H  = 230;
const CHAR     = 110;

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: AMBER },
  header: { height: 340, alignItems: "center", justifyContent: "center", overflow: "hidden" },

  /* ── Phone mockup + floats ── */
  phoneWrap: {
    width: PHONE_W,
    height: PHONE_H,
    position: "relative",
  },
  float: {
    position: "absolute",
    textAlign: "center",
  },
  phone: {
    width: PHONE_W,
    height: PHONE_H,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  notch: {
    position: "absolute",
    top: 10,
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },

  /* Headspace face character (inside phone) */
  character: {
    width: CHAR,
    height: CHAR,
    borderRadius: CHAR / 2,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  eyeRow: { flexDirection: "row", gap: 14, marginBottom: 2 },
  eye: {
    width: 18,
    height: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    backgroundColor: FACE_COL,
  },
  smile: {
    width: 26,
    height: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: FACE_COL,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopWidth: 0,
    backgroundColor: "transparent",
  },

  /* ── Dome arch ── */
  archClip: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: AMBER,
    marginTop: -40,
  },
  sheet: {
    width: ARCH_W,
    marginLeft: -EXTRA,
    flex: 1,
    borderTopLeftRadius: ARCH_R,
    borderTopRightRadius: ARCH_R,
    backgroundColor: "#FFFFFF",
    paddingTop: 44,
    alignItems: "center",   // centre the content strip
  },
  content: {
    width: SW - 40,   // 20px gutter each side within the 390px phone width
    flex: 1,
    paddingBottom: 32,
  },

  /* ── Text ── */
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#1F2024",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "400",
    color: "#8F9098",
    textAlign: "center",
    marginTop: 8,
    letterSpacing: 0,
  },

  /* ── Terms ── */
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#C0C0C8",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxOn: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },
  checkmark: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  termsText: { flex: 1, fontSize: 14, color: "#4A4A55", lineHeight: 21 },
  link:      { color: BLUE, fontWeight: "500" },

  /* ── Buttons ── */
  createBtn: {
    height: 56,
    backgroundColor: BLUE,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  createBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  loginBtn: {
    height: 56,
    backgroundColor: "#F2F2F7",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtnText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2024",
    letterSpacing: 0,
  },
});
