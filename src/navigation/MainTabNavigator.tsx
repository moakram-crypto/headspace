import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MainTabParamList } from "@/navigation/types";
import { TodayScreen } from "@/features/today/TodayScreen";
import { ExploreScreen } from "@/features/explore/ExploreScreen";
import { AICoachScreen } from "@/features/aiCoach/AICoachScreen";
import { SleepScreen } from "@/features/sleep/SleepScreen";
import { ProfileScreen } from "@/features/profile/ProfileScreen";
import { useUserStore } from "@/store/user.store";

const Tab = createBottomTabNavigator<MainTabParamList>();

const ACTIVE   = "#1F2024";
const INACTIVE = "#A0A0A8";

type IconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<keyof MainTabParamList, { active: IconName; inactive: IconName }> = {
  Today:   { active: "home",           inactive: "home-outline" },
  Explore: { active: "grid",           inactive: "grid-outline" },
  AICoach: { active: "chatbubble",     inactive: "chatbubble-outline" },
  Sleep:   { active: "moon",           inactive: "moon-outline" },
  Profile: { active: "person",         inactive: "person-outline" },
};

export function MainTabNavigator() {
  const name = useUserStore((s) => s.name);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor:   ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: ({ focused, size }) => {
          const set = ICONS[route.name as keyof MainTabParamList];
          const iconName = focused ? set.active : set.inactive;
          return <Ionicons name={iconName} size={24} color={focused ? ACTIVE : INACTIVE} />;
        },
      })}
    >
      <Tab.Screen name="Today"   component={TodayScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="AICoach" component={AICoachScreen} options={{ title: "Coach" }} />
      <Tab.Screen name="Sleep"   component={SleepScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: name || "Profile" }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    height: Platform.OS === "ios" ? 82 : 64,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 28 : 10,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    marginTop: 2,
  },
});
