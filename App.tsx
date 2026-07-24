import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppNavigator } from "@/navigation/AppNavigator";

const queryClient = new QueryClient();
const IS_WEB = Platform.OS === "web";

export default function App() {
  if (IS_WEB) {
    return (
      <GestureHandlerRootView style={styles.webRoot}>
        <View style={styles.phoneShell}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
              <StatusBar style="auto" />
              <AppNavigator />
            </QueryClientProvider>
          </SafeAreaProvider>
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <AppNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  webRoot: {
    flex: 1,
    backgroundColor: "#0d0d1a",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneShell: {
    width: 390,
    height: 844,
    overflow: "hidden",
    borderRadius: 44,
    backgroundColor: "#F5EEE6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.65,
    shadowRadius: 48,
  },
});
