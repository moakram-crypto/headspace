import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { typography } from "@/config/theme";

type Variant = keyof typeof typography;

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
  muted?: boolean;
}

export function Text({ variant = "body", color, muted, style, ...rest }: Props) {
  const theme = useTheme();
  return (
    <RNText
      style={[
        typography[variant],
        { color: color ?? (muted ? theme.textSecondary : theme.textPrimary) },
        style,
      ]}
      {...rest}
    />
  );
}
