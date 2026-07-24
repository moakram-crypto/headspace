import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/typography/Text";
import { useTheme } from "@/hooks/useTheme";
import { radii, spacing } from "@/config/theme";
import { AIMessage } from "@/types";

export function AIMessageBubble({ message }: { message: AIMessage }) {
  const theme = useTheme();
  const isUser = message.role === "user";
  return (
    <View style={[styles.row, { justifyContent: isUser ? "flex-end" : "flex-start" }]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isUser ? theme.primary : theme.card,
            borderColor: theme.border,
            borderTopLeftRadius: isUser ? radii.md : 4,
            borderTopRightRadius: isUser ? 4 : radii.md,
          },
        ]}
      >
        <Text color={isUser ? "#FFFFFF" : theme.textPrimary}>{message.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginBottom: spacing.sm },
  bubble: {
    maxWidth: "80%",
    borderWidth: 1,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
