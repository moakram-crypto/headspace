import React, { useState } from "react";
import {
  View, ScrollView, TextInput, Pressable, StyleSheet, Platform, Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/typography/Text";
import { useNavigation } from "@react-navigation/native";

const SW = Platform.OS === "web" ? 390 : Dimensions.get("window").width;
const PAD = 20;
const CARD_W = (SW - PAD * 2 - 12) / 2;

const BG      = "#F5EEE6";
const SEARCH  = "#EDE8E1";
const CARD_BG = "#EDE8E1";

const CATEGORIES = [
  { id: "meditate", label: "Meditate", color: "#F47B20", bg: "#FFF0E6", icon: "radio-button-on"   as const, iconColor: "#F47B20" },
  { id: "sleep",    label: "Sleep",    color: "#7B5EA7", bg: "#F0EBF8", icon: "moon"               as const, iconColor: "#7B5EA7" },
  { id: "move",     label: "Move",     color: "#2E8B57", bg: "#E8F5EE", icon: "play-forward"       as const, iconColor: "#2E8B57" },
  { id: "focus",    label: "Focus",    color: "#2979D9", bg: "#E8F0FD", icon: "musical-notes"      as const, iconColor: "#2979D9" },
];

const PROGRAMS = [
  {
    id: "cbt",
    title: "CBT for Mood & Anxiety",
    meta: "20 sessions · 10 min a day",
    gradientTop: "#F06292",
    gradientBot: "#F47B20",
    emoji: "🧠",
  },
  {
    id: "sleep",
    title: "Finding Your Best Sleep",
    meta: "18 sessions · 10 min a day",
    gradientTop: "#3B5BDB",
    gradientBot: "#5C6BC0",
    emoji: "😴",
  },
  {
    id: "stress",
    title: "Managing Daily Stress",
    meta: "15 sessions · 5 min a day",
    gradientTop: "#43A047",
    gradientBot: "#26C6DA",
    emoji: "🌿",
  },
];

export function ExploreScreen() {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState("");

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: BG }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Search bar */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color="#8F9098" style={{ marginRight: 8 }} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Headspace"
            placeholderTextColor="#8F9098"
            style={styles.searchInput}
          />
        </View>

        {/* 2×2 Category grid */}
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={({ pressed }) => [styles.catCard, { opacity: pressed ? 0.85 : 1 }]}
              onPress={() => {
                if (cat.id === "sleep") navigation.navigate("Sleep");
              }}
            >
              <View style={[styles.catIconWrap, { backgroundColor: cat.bg }]}>
                <Ionicons name={cat.icon} size={22} color={cat.iconColor} />
              </View>
              <Text style={styles.catLabel}>{cat.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Featured Collection */}
        <Text style={styles.sectionTitle}>Featured Collection</Text>
        <Pressable style={styles.featuredCard}>
          {/* Decorative blobs */}
          <View style={styles.featuredBlob1} />
          <View style={styles.featuredBlob2} />
          <View style={styles.featuredDiamond}>
            <Text style={{ fontSize: 18 }}>✦</Text>
          </View>
          <Text style={styles.featuredTitle}>Your Mind Matters</Text>
          <Text style={styles.featuredSub}>
            Prioritize your mind with resources to feel happier at h...
          </Text>
        </Pressable>

        {/* Guided Programs */}
        <View style={styles.guidedSection}>
          <Text style={styles.sectionTitle}>Guided Programs</Text>
          <Text style={styles.guidedDesc}>
            A structured mix of mindfulness activities and practices used in therapy, proven to help you feel better.
          </Text>

          {PROGRAMS.map((prog) => (
            <Pressable
              key={prog.id}
              style={({ pressed }) => [
                styles.programCard,
                { backgroundColor: prog.gradientTop, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              {/* Right emoji avatar */}
              <View style={styles.programEmoji}>
                <Text style={{ fontSize: 40 }}>{prog.emoji}</Text>
              </View>
              <View style={{ flex: 1, paddingRight: 80 }}>
                <Text style={styles.programTitle}>{prog.title}</Text>
                <View style={styles.programMeta}>
                  <Ionicons name="tv-outline" size={13} color="rgba(255,255,255,0.85)" />
                  <Text style={styles.programMetaText}>{prog.meta}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: BG },
  scroll:  { flex: 1 },
  content: { paddingHorizontal: PAD, paddingTop: 16, paddingBottom: 32 },

  /* Search */
  searchWrap: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: SEARCH, borderRadius: 999,
    paddingHorizontal: 16, height: 48, marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 16, color: "#1F2024" },

  /* 2×2 grid */
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 28 },
  catCard: {
    width: CARD_W, backgroundColor: CARD_BG,
    borderRadius: 16, height: 64,
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, gap: 12,
  },
  catIconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  catLabel:    { fontSize: 16, fontWeight: "600", color: "#1F2024" },

  /* Featured */
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#1F2024", marginBottom: 14 },
  featuredCard: {
    backgroundColor: "#F9A825", borderRadius: 20,
    padding: 24, minHeight: 140, marginBottom: 28,
    overflow: "hidden", justifyContent: "flex-end",
  },
  featuredBlob1: {
    position: "absolute", right: -20, bottom: -30,
    width: 130, height: 130, borderRadius: 65,
    backgroundColor: "#F47B20", opacity: 0.6,
  },
  featuredBlob2: {
    position: "absolute", right: 60, bottom: -50,
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: "#FFD54F", opacity: 0.5,
  },
  featuredDiamond: { position: "absolute", right: 28, top: 24 },
  featuredTitle: { fontSize: 20, fontWeight: "700", color: "#FFFFFF", marginBottom: 6 },
  featuredSub:   { fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 20 },

  /* Guided Programs */
  guidedSection: {
    backgroundColor: "#EDE8E1", borderRadius: 20,
    padding: 20,
  },
  guidedDesc: { fontSize: 14, color: "#5A5A6A", lineHeight: 22, marginBottom: 16, marginTop: -4 },
  programCard: {
    borderRadius: 16, padding: 20, marginBottom: 12,
    flexDirection: "row", alignItems: "center",
    minHeight: 80, overflow: "hidden",
  },
  programEmoji: {
    position: "absolute", right: 16, bottom: 0, top: 0,
    justifyContent: "center",
  },
  programTitle:    { fontSize: 16, fontWeight: "700", color: "#FFFFFF", marginBottom: 6 },
  programMeta:     { flexDirection: "row", alignItems: "center", gap: 5 },
  programMetaText: { fontSize: 13, color: "rgba(255,255,255,0.85)" },
});
