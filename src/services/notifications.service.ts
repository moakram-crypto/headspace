import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function scheduleDailyReminder(hour: number, minute: number, body: string) {
  if (Platform.OS === "web") return; // scheduled local notifications are mobile-only
  await Notifications.scheduleNotificationAsync({
    content: { title: "Calm Path", body },
    trigger: { hour, minute, repeats: true },
  });
}

export async function cancelAllReminders() {
  if (Platform.OS === "web") return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
