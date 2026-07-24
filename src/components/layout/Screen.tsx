import React from "react";
import { ScrollView, View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { screenPadding, spacing } from "@/config/theme";

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  padded?: boolean;
  /** Remove horizontal padding (e.g. for full-bleed hero banners) */
  noPadX?: boolean;
}

export function Screen({ children, scroll = true, style, padded = true, noPadX = false }: Props) {
  const theme = useTheme();
  const Container = scroll ? ScrollView : View;

  const contentStyle = padded
    ? {
        paddingHorizontal: noPadX ? 0 : screenPadding.horizontal, // 20px — Headspace standard gutter
        paddingTop: screenPadding.vertical,                         // 16px top
        paddingBottom: spacing.xxl * 2,                             // 96px bottom (above tab bar)
      }
    : undefined;

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.background }]}>
      <Container
        style={styles.flex}
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={style}>{children}</View>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
