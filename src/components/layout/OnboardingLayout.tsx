/**
 * Shared layout for onboarding screens.
 * Renders the amber header with the Headspace character + the white curved sheet.
 * Pass screen content as children — they render inside the white sheet.
 */
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const AMBER     = "#F9A825";
export const ORANGE    = "#F47B20";
export const FACE_COL  = "#3D2318";

interface Props {
  children: React.ReactNode;
}

export function OnboardingLayout({ children }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={AMBER} />

      {/* Amber header with character */}
      <View style={styles.header}>
        <SafeAreaView edges={["top"]} style={styles.headerInner}>
          <View style={styles.character}>
            <View style={styles.eyeRow}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            <View style={styles.smile} />
          </View>
        </SafeAreaView>
      </View>

      {/* White curved sheet */}
      <View style={styles.sheet}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: AMBER },

  header: {
    backgroundColor: AMBER,
    height: 220,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
  headerInner: { alignItems: "center" },

  character: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  eyeRow: { flexDirection: "row", gap: 16, marginBottom: 2 },
  eye: {
    width: 20,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: FACE_COL,
  },
  smile: {
    width: 28,
    height: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    borderColor: FACE_COL,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopWidth: 0,
    backgroundColor: "transparent",
  },

  sheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -32,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
