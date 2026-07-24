// Thin wrapper so the rest of the app doesn't depend directly on expo-av.
// For production mobile builds with lock-screen controls, swap this for
// `react-native-track-player` (per the product brief) — it requires a
// custom dev client and isn't available on Expo web, which is why the
// MVP here uses expo-av for a single cross-platform (iOS/Android/web) API.
import { Audio, AVPlaybackStatus } from "expo-av";

let sound: Audio.Sound | null = null;

export async function loadAndPlay(uri: string, onStatus?: (s: AVPlaybackStatus) => void) {
  if (sound) {
    await sound.unloadAsync();
    sound = null;
  }
  const { sound: newSound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
  sound = newSound;
  if (onStatus) sound.setOnPlaybackStatusUpdate(onStatus);
  return newSound;
}

export async function pause() {
  if (sound) await sound.pauseAsync();
}

export async function resume() {
  if (sound) await sound.playAsync();
}

export async function seekTo(seconds: number) {
  if (sound) await sound.setPositionAsync(seconds * 1000);
}

export async function setRate(rate: number) {
  if (sound) await sound.setRateAsync(rate, true);
}

export async function unload() {
  if (sound) {
    await sound.unloadAsync();
    sound = null;
  }
}
