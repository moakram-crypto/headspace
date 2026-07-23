import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, View, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { SearchBar } from "@/components/forms/SearchBar";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { ContentCard } from "@/components/cards/ContentCard";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing, shadow } from "@/config/theme";
import { BREATHING, FOCUS_TRACKS, MEDITATIONS } from "@/data/mockData";
import { useNavigation } from "@react-navigation/native";

const SECTIONS = [
  { title: "Meditation", data: MEDITATIONS },
  { title: "Breathing", data: BREATHING },
  { title: "Focus", data: FOCUS_TRACKS },
];

const TOP_TYPES = [
  { id: "meditation", label: "Meditate", icon: "🧘" },
  { id: "breathing", label: "Breathe", icon: "🌬️" },
  { id: "focus", label: "Focus", icon: "🎯" },
  { id: "sleep", label: "Sleep", icon: "🌙" },
];

const SUGGESTED_SEARCHES = [
  "Meditation for work stress", "5-minute anxiety relief", "Sleep story", "Focus music", "Breathing before meeting",
];

export function ExploreScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string | null>(null);

  const filteredSections = useMemo(() => {
    return SECTIONS
      .filter((section) => (activeSectionTitle ? section.title === activeSectionTitle : true))
      .map((section) => ({
        ...section,
        data: section.data.filter((item) => {
          const matchesQuery = query
            ? item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.category.toLowerCase().includes(query.toLowerCase())
            : true;
          const matchesFilter = activeFilter ? item.category === activeFilter : true;
          return matchesQuery && matchesFilter;
        }),
      }))
      .filter((s) => s.data.length > 0);
  }, [query, activeFilter, activeSectionTitle]);

  return (
    <Screen>
      <Text variant="h1">Explore</Text>
      <View style={{ marginTop: spacing.md }}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      {!query && (
        <>
          <View style={styles.typeRow}>
            {TOP_TYPES.map((t) => {
              const sectionTitle = t.label === "Meditate" ? "Meditation" : t.label === "Breathe" ? "Breathing" : "Focus";
              const selected = t.id !== "sleep" && activeSectionTitle === sectionTitle;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => {
                    if (t.id === "sleep") {
                      navigation.navigate("Sleep");
                    } else {
                      setActiveSectionTitle(selected ? null : sectionTitle);
                    }
                  }}
                  style={[
                    styles.typeChip,
                    { backgroundColor: selected ? theme.primary : theme.card, borderColor: selected ? theme.primary : theme.border },
                  ]}
                >
                  <Text style={{ fontSize: 16 }}>{t.icon}</Text>
                  <Text variant="caption" color={selected ? "#FFFFFF" : theme.textPrimary} style={{ marginLeft: 6 }}>
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={() => setActiveFilter(null)}
            style={[styles.featured, { backgroundColor: theme.primary }]}
          >
            <Text variant="caption" color="#FFFFFF" style={{ opacity: 0.85 }}>Featured collection</Text>
            <Text variant="h3" color="#FFFFFF" style={{ marginTop: 2 }}>Your Mind Matters</Text>
            <Text variant="caption" color="#FFFFFF" style={{ marginTop: 2, opacity: 0.9 }}>
              Resources to help you prioritize your mental health.
            </Text>
          </Pressable>

          <Text variant="caption" muted style={{ marginTop: spacing.lg, marginBottom: spacing.xs }}>Suggested searches</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {SUGGESTED_SEARCHES.map((s) => (
              <CategoryChip key={s} label={s} onPress={() => setQuery(s)} />
            ))}
          </ScrollView>
        </>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.md }}>
        {["Stress", "Sleep", "Anxiety", "Focus", "Morning", "Work"].map((c) => (
          <CategoryChip key={c} label={c} selected={activeFilter === c} onPress={() => setActiveFilter(activeFilter === c ? null : c)} />
        ))}
      </ScrollView>

      {filteredSections.map((section) => (
        <View key={section.title} style={{ marginTop: spacing.lg }}>
          <Text variant="h3" style={{ marginBottom: spacing.sm }}>{section.title}</Text>
          {section.data.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate("ContentDetail", { contentId: item.id })}
            />
          ))}
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  typeRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  typeChip: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: radii.pill,
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
  },
  featured: { borderRadius: radii.lg, padding: spacing.lg, marginTop: spacing.md, ...shadow },
});
