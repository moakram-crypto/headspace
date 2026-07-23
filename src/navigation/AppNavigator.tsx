import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { linking } from "@/config/navigation";
import { RootStackParamList } from "@/navigation/types";
import { OnboardingNavigator } from "@/navigation/OnboardingNavigator";
import { MainTabNavigator } from "@/navigation/MainTabNavigator";
import { ContentDetailScreen } from "@/features/explore/ContentDetailScreen";
import { CourseDetailScreen } from "@/features/explore/CourseDetailScreen";
import { PlayerScreen } from "@/features/meditation/PlayerScreen";
import { SessionCompleteScreen } from "@/features/meditation/SessionCompleteScreen";
import { BreathingScreen } from "@/features/breathing/BreathingScreen";
import { FocusScreen } from "@/features/focus/FocusScreen";
import { MoodHistoryScreen } from "@/features/profile/MoodHistoryScreen";
import { AudioMiniPlayer } from "@/components/player/AudioMiniPlayer";
import { useUserStore } from "@/store/user.store";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const onboardingCompleted = useUserStore((s) => s.onboardingCompleted);

  return (
    <NavigationContainer linking={linking}>
      <View style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!onboardingCompleted ? (
            <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
          ) : (
            <>
              <Stack.Screen name="Main" component={MainTabNavigator} />
              <Stack.Screen name="ContentDetail" component={ContentDetailScreen} options={{ headerShown: true, title: "" }} />
              <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ headerShown: true, title: "" }} />
              <Stack.Screen name="Player" component={PlayerScreen} options={{ presentation: "modal" }} />
              <Stack.Screen name="SessionComplete" component={SessionCompleteScreen} />
              <Stack.Screen name="Breathing" component={BreathingScreen} options={{ presentation: "fullScreenModal" }} />
              <Stack.Screen name="Focus" component={FocusScreen} options={{ headerShown: true, title: "Focus" }} />
              <Stack.Screen name="MoodHistory" component={MoodHistoryScreen} options={{ headerShown: true, title: "Mood History" }} />
            </>
          )}
        </Stack.Navigator>
        {onboardingCompleted && <AudioMiniPlayer />}
      </View>
    </NavigationContainer>
  );
}
