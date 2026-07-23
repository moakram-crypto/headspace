import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { MainTabParamList } from "@/navigation/types";
import { useTheme } from "@/hooks/useTheme";
import { TodayScreen } from "@/features/today/TodayScreen";
import { ExploreScreen } from "@/features/explore/ExploreScreen";
import { AICoachScreen } from "@/features/aiCoach/AICoachScreen";
import { SleepScreen } from "@/features/sleep/SleepScreen";
import { ProfileScreen } from "@/features/profile/ProfileScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, string> = {
  Today: "🏠",
  Explore: "🔍",
  AICoach: "💬",
  Sleep: "🌙",
  Profile: "👤",
};

export function MainTabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>{ICONS[route.name as keyof MainTabParamList]}</Text>,
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="AICoach" component={AICoachScreen} options={{ title: "AI Coach" }} />
      <Tab.Screen name="Sleep" component={SleepScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
