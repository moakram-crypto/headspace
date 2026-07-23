export type ContentType =
  | "meditation"
  | "course"
  | "sleep_story"
  | "breathing"
  | "music"
  | "soundscape"
  | "focus";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Instructor {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  category: string;
  instructor: Instructor;
  durationSeconds: number;
  difficulty: Difficulty;
  isPremium: boolean;
  isDownloadable: boolean;
  coverColor: string; // placeholder for original illustration cover
  audioUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  isPremium: boolean;
  sessions: ContentItem[];
}

export interface SleepStory {
  id: string;
  title: string;
  narrator: string;
  theme: string;
  durationSeconds: number;
  coverColor: string;
}

export type Goal =
  | "reduce_stress"
  | "sleep_better"
  | "manage_anxiety"
  | "improve_focus"
  | "feel_happier"
  | "build_confidence"
  | "learn_meditation"
  | "stop_overthinking"
  | "manage_anger"
  | "recover_from_burnout"
  | "build_healthy_habits"
  | "improve_relationships"
  | "increase_energy"
  | "morning_routine"
  | "relax_before_bed";

export interface GoalOption {
  id: Goal;
  label: string;
  icon: string; // emoji placeholder for original iconography
}

export type MoodLabel =
  | "very_low"
  | "low"
  | "okay"
  | "good"
  | "great";

export interface MoodEntry {
  id: string;
  moodLabel: MoodLabel;
  factors: string[];
  note?: string;
  createdAt: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  message: string;
  detectedEmotion?: string;
  recommendedContentId?: string;
  createdAt: string;
}

export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  mindfulMinutesThisWeek: number;
  totalSessions: number;
  totalMinutes: number;
}
