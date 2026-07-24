import React from "react";
import { View, ScrollView, Pressable, StyleSheet, Platform, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/typography/Text";
import { useUserStore } from "@/store/user.store";
import { useNavigation } from "@react-navigation/native";

const SW      = Platform.OS === "web" ? 390 : Dimensions.get("window").width;
const PAD     = 20;
const HEADER_H = 95;
const AVATAR_R = 44; // radius (88px diameter)

/* Concentric arcs: outermost (index 0) = darkest, innermost = lightest.
   Each arc is a full circle whose center sits at y = HEADER_H.
   overflow:hidden on the arc wrapper clips everything below HEADER_H,
   revealing only the top dome of each circle. */
const ARCS = [
  { color: "#8B0000", r: SW * 0.9 + 180 },
  { color: "#C0390B", r: SW * 0.9 + 110 },
  { color: "#E8572A", r: SW * 0.9 + 45  },
  { color: "#F47B20", r: SW * 0.9       },
  { color: "#F9A825", r: SW * 0.9 - 60  },
];

export function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { name, isGuest, progress } = useUserStore();

  const avgMinutes = progress.totalSessions > 0
    ? Math.round(progress.totalMinutes / progress.totalSessions)
    : 5;

  const displayName = name || (isGuest ? "Guest" : "Friend");

  const stats = [
    { icon: "⏳", bg: "#FCE4EC", label: "Average meditation length", value: `${avgMinutes} minutes` },
    { icon: "📊", bg: "#E3F2FD", label: "Total meditation time",     value: `${progress.totalMinutes || 15} minutes` },
    { icon: "▶️",  bg: "#E8F5E9", label: "Sessions completed",        value: `${progress.totalSessions || 3} sessions` },
  ];

  return (
    <View style={styles.root}>

      {/* ── Arc header + floating avatar ── */}
      <View style={styles.headerOuter}>

        {/* Arc container — overflow:hidden clips arcs to dome shape */}
        <View style={styles.arcWrap}>
          {ARCS.map((arc, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                width:  arc.r * 2,
                height: arc.r * 2,
                borderRadius: arc.r,
                backgroundColor: arc.color,
                left: SW / 2 - arc.r,
                top:  HEADER_H - arc.r,
                zIndex: i + 1,
              }}
            />
          ))}

          {/* Settings button — above arcs */}
          <SafeAreaView edges={["top"]} style={styles.topBar}>
            <Pressable style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={20} color="#1F2024" />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* Avatar — floats over the header bottom edge */}
        <View style={styles.avatarWrap}>
          {/* Yellow moon circle (behind) */}
          <View style={styles.avatarYellow} />
          {/* Blue character circle */}
          <View style={styles.avatarBlue}>
            <View style={styles.faceRow}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            <View style={styles.smile} />
          </View>
        </View>
      </View>

      {/* ── Body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.nameText}>{displayName}</Text>
        <Text style={styles.joinedText}>Joined in {new Date().getFullYear()}</Text>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Stats</Text>
        {stats.map((s) => (
          <View key={s.label} style={styles.statRow}>
            <View style={[styles.statIconWrap, { backgroundColor: s.bg }]}>
              <Text style={{ fontSize: 20 }}>{s.icon}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          </View>
        ))}

        {/* Run streak */}
        <Text style={styles.sectionTitle}>Run streak</Text>
        <View style={styles.streakRow}>
          <Text style={{ fontSize: 38 }}>⛳</Text>
          <Text style={styles.streakDays}>{progress.currentStreak || 1} day</Text>
          <Ionicons name="eye-outline" size={24} color="#8F9098" />
        </View>

        {/* Guest pass */}
        <Text style={styles.sectionTitle}>Headspace 30-Day Guest Pass</Text>
        <View style={styles.passCard}>
          <Text style={styles.passSub}>Bring friends along the journey</Text>
          <Text style={styles.passTitle}>Send free access to new members</Text>

          {/* Decorative character blobs */}
          <View style={styles.blobRow}>
            <View style={[styles.blob, { backgroundColor: "#42A5F5", left: -10 }]}>
              <View style={styles.blobFaceRow}>
                <View style={styles.blobEye} /><View style={styles.blobEye} />
              </View>
              <View style={styles.blobSmile} />
            </View>
            <View style={[styles.blob, { backgroundColor: "#F47B20", right: -10 }]}>
              <View style={styles.blobFaceRow}>
                <View style={styles.blobEye} /><View style={styles.blobEye} />
              </View>
              <View style={styles.blobSmile} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },

  /* Header outer — no overflow clip so avatar can bleed below */
  headerOuter: { marginBottom: AVATAR_R + 8 },

  /* Arc clip container */
  arcWrap: {
    height: HEADER_H,
    backgroundColor: "#8B0000",  // fallback behind all arcs
    overflow: "hidden",
  },
  topBar: {
    position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
    paddingHorizontal: PAD, paddingTop: 8,
  },
  settingsBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  /* Avatar — absolute, centered, bleeds below arcWrap */
  avatarWrap: {
    position: "absolute",
    bottom: -(AVATAR_R + 8),
    alignSelf: "center",
    width:  AVATAR_R * 2 + 20,
    height: AVATAR_R * 2 + 20,
    zIndex: 30,
  },
  avatarYellow: {
    position: "absolute",
    right: 0, bottom: 0,
    width: AVATAR_R * 1.6,
    height: AVATAR_R * 1.6,
    borderRadius: AVATAR_R * 0.8,
    backgroundColor: "#FFD740",
  },
  avatarBlue: {
    position: "absolute",
    left: 0, top: 0,
    width:  AVATAR_R * 2,
    height: AVATAR_R * 2,
    borderRadius: AVATAR_R,
    backgroundColor: "#42A5F5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  faceRow: { flexDirection: "row", gap: 8, marginBottom: 5 },
  eye: {
    width: 12, height: 7,
    borderTopLeftRadius: 6, borderTopRightRadius: 6,
    backgroundColor: "#1A237E",
  },
  smile: {
    width: 18, height: 9,
    borderBottomLeftRadius: 9, borderBottomRightRadius: 9,
    borderWidth: 2.5, borderColor: "#1A237E",
    borderTopWidth: 0,
  },

  /* Body */
  scroll: { flex: 1 },
  body:   { paddingHorizontal: PAD, paddingTop: 8, paddingBottom: 40 },

  nameText:   { fontSize: 28, fontWeight: "700", color: "#1F2024", textAlign: "center", letterSpacing: -0.3 },
  joinedText: { fontSize: 15, color: "#8F9098", textAlign: "center", marginTop: 4, marginBottom: 28 },

  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#1F2024", marginBottom: 16, marginTop: 4 },

  statRow:     { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  statIconWrap:{ width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  statValue:   { fontSize: 18, fontWeight: "700", color: "#1F2024" },
  statLabel:   { fontSize: 13, color: "#8F9098", marginTop: 2 },

  streakRow:  { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 32 },
  streakDays: { fontSize: 32, fontWeight: "700", color: "#1F2024", flex: 1 },

  passCard: {
    backgroundColor: "#FFD740", borderRadius: 20,
    padding: 22, overflow: "hidden", minHeight: 170,
  },
  passSub:   { fontSize: 13, color: "#5A4000", marginBottom: 6 },
  passTitle: { fontSize: 18, fontWeight: "700", color: "#3A2800", maxWidth: "60%" },

  blobRow: { position: "absolute", bottom: 0, left: 0, right: 0, height: 110, flexDirection: "row" },
  blob: {
    position: "absolute", bottom: -24,
    width: 120, height: 120, borderRadius: 60,
    alignItems: "center", justifyContent: "center",
  },
  blobFaceRow: { flexDirection: "row", gap: 8, marginBottom: 4, marginTop: 20 },
  blobEye:  { width: 10, height: 6, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: "rgba(0,0,0,0.35)" },
  blobSmile:{ width: 16, height: 8, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderWidth: 2, borderColor: "rgba(0,0,0,0.35)", borderTopWidth: 0 },
});
