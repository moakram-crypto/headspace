import React, { useState } from "react";
import { View, ScrollView, TextInput, StyleSheet } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { Text } from "@/components/typography/Text";
import { IconButton } from "@/components/buttons/IconButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { AIMessageBubble } from "@/components/aiCoach/AIMessageBubble";
import { CategoryChip } from "@/components/cards/CategoryChip";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { getCoachSuggestion } from "@/services/aiCoach.service";
import { AIMessage } from "@/types";
import { usePlayerStore } from "@/store/player.store";
import { MEDITATIONS, BREATHING, FOCUS_TRACKS } from "@/data/mockData";
import { useNavigation } from "@react-navigation/native";

const QUICK_PROMPTS = [
  "I feel stressed", "I cannot sleep", "I am overthinking", "I feel anxious",
  "I need to focus", "I feel angry", "I have no motivation", "I need a quick reset",
];

const ALL_CONTENT = [...MEDITATIONS, ...BREATHING, ...FOCUS_TRACKS];

export function AICoachScreen() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const play = usePlayerStore((s) => s.play);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      message: "How are you feeling today? Tell me what's happening, and I'll help you choose a suitable exercise.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [lastActions, setLastActions] = useState<{ label: string; contentId?: string }[]>([]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: AIMessage = { id: `${Date.now()}-u`, role: "user", message: text, createdAt: new Date().toISOString() };
    const suggestion = getCoachSuggestion(text);
    const aiMsg: AIMessage = {
      id: `${Date.now()}-a`,
      role: "assistant",
      message: suggestion.reply,
      detectedEmotion: suggestion.detectedEmotion,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setLastActions(suggestion.actions);
    setInput("");
  };

  const runAction = (contentId?: string) => {
    if (!contentId) return;
    const item = ALL_CONTENT.find((c) => c.id === contentId);
    if (item?.contentType === "breathing") {
      navigation.navigate("Breathing", { patternId: contentId });
    } else if (item) {
      play(item);
      navigation.navigate("Player");
    }
  };

  return (
    <Screen scroll={false} padded={false} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: spacing.lg }}>
        <Text variant="h1">AI Coach</Text>
        <ScrollView style={{ marginTop: spacing.md, flex: 1 }} contentContainerStyle={{ paddingBottom: spacing.md }}>
          {messages.map((m) => (
            <AIMessageBubble key={m.id} message={m} />
          ))}
          {lastActions.length > 0 && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.sm }}>
              {lastActions.map((a) => (
                <PrimaryButton key={a.label} label={a.label} variant="secondary" onPress={() => runAction(a.contentId)} />
              ))}
            </View>
          )}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.sm }}>
          {QUICK_PROMPTS.map((p) => (
            <CategoryChip key={p} label={p} onPress={() => send(p)} />
          ))}
        </ScrollView>

        <View style={[styles.inputRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Tell me what's going on..."
            placeholderTextColor={theme.textSecondary}
            style={[styles.input, { color: theme.textPrimary }]}
            onSubmitEditing={() => send(input)}
          />
          <IconButton icon="🎙️" onPress={() => {}} size={38} />
          <IconButton icon="➤" onPress={() => send(input)} size={38} />
        </View>
        <Text variant="caption" muted style={{ marginTop: spacing.xs }}>
          Calm Path offers general wellness support and is not a substitute for professional care.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: radii.pill, paddingLeft: spacing.md, paddingRight: 4 },
  input: { flex: 1, fontSize: 16, paddingVertical: spacing.sm },
});
