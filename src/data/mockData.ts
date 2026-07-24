import { ContentItem, Course, GoalOption, SleepStory } from "@/types";

export const GOAL_OPTIONS: GoalOption[] = [
  { id: "reduce_stress", label: "Reduce stress", icon: "🌿" },
  { id: "sleep_better", label: "Sleep better", icon: "🌙" },
  { id: "manage_anxiety", label: "Manage anxiety", icon: "💛" },
  { id: "improve_focus", label: "Improve focus", icon: "🎯" },
  { id: "feel_happier", label: "Feel happier", icon: "😊" },
  { id: "build_confidence", label: "Build confidence", icon: "✨" },
  { id: "learn_meditation", label: "Learn meditation", icon: "🧘" },
  { id: "stop_overthinking", label: "Stop overthinking", icon: "🧠" },
  { id: "manage_anger", label: "Manage anger", icon: "🔥" },
  { id: "recover_from_burnout", label: "Recover from burnout", icon: "🩹" },
  { id: "build_healthy_habits", label: "Build healthy habits", icon: "📈" },
  { id: "improve_relationships", label: "Improve relationships", icon: "🤝" },
  { id: "increase_energy", label: "Increase energy", icon: "⚡" },
  { id: "morning_routine", label: "Morning routine", icon: "🌅" },
  { id: "relax_before_bed", label: "Relax before bedtime", icon: "🛏️" },
];

const instructor = (name: string) => ({ id: name.toLowerCase().replace(/\s/g, "-"), name });

export const CATEGORIES = [
  "Stress", "Sleep", "Anxiety", "Focus", "Confidence",
  "Relationships", "Burnout", "Morning", "Work", "Students",
];

export const MEDITATIONS: ContentItem[] = [
  { id: "m1", title: "Let Go of Work Stress", description: "A short guided meditation to help you mentally disconnect after work.", contentType: "meditation", category: "Stress", instructor: instructor("Maya Lin"), durationSeconds: 300, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#C97064" },
  { id: "m2", title: "Calm Your Mind", description: "Settle racing thoughts with a gentle body-and-breath check-in.", contentType: "meditation", category: "Anxiety", instructor: instructor("Theo Banks"), durationSeconds: 600, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#B9A6DC" },
  { id: "m3", title: "Morning Clarity", description: "Start the day with a settled, focused mind.", contentType: "meditation", category: "Morning", instructor: instructor("Amara Osei"), durationSeconds: 480, difficulty: "beginner", isPremium: true, isDownloadable: true, coverColor: "#E8B04B" },
  { id: "m4", title: "Body Scan Reset", description: "Release physical tension held from a long day.", contentType: "meditation", category: "Stress", instructor: instructor("Maya Lin"), durationSeconds: 720, difficulty: "intermediate", isPremium: true, isDownloadable: true, coverColor: "#7FB77E" },
  { id: "m5", title: "Grounding for Anxiety", description: "A steadying practice for when anxious thoughts spiral.", contentType: "meditation", category: "Anxiety", instructor: instructor("Theo Banks"), durationSeconds: 300, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#D9695F" },
];

export const BREATHING: ContentItem[] = [
  { id: "b1", title: "Box Breathing", description: "Four equal phases to steady your nervous system.", contentType: "breathing", category: "Stress", instructor: instructor("Calm Path"), durationSeconds: 180, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#C97064" },
  { id: "b2", title: "4-7-8 Breathing", description: "A longer exhale to trigger the body's relaxation response.", contentType: "breathing", category: "Sleep", instructor: instructor("Calm Path"), durationSeconds: 180, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#8C7BC4" },
  { id: "b3", title: "Panic Support Breathing", description: "Slow, guided breathing for moments of acute stress.", contentType: "breathing", category: "Anxiety", instructor: instructor("Calm Path"), durationSeconds: 120, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#D9695F" },
];

export const FOCUS_TRACKS: ContentItem[] = [
  { id: "f1", title: "Deep Work", description: "Ambient soundscape for sustained concentration.", contentType: "focus", category: "Work", instructor: instructor("Calm Path"), durationSeconds: 1500, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#1F2A44" },
  { id: "f2", title: "Pre-Meeting Calm", description: "A two-minute reset before you're on camera.", contentType: "focus", category: "Work", instructor: instructor("Amara Osei"), durationSeconds: 120, difficulty: "beginner", isPremium: false, isDownloadable: true, coverColor: "#B9A6DC" },
];

export const SLEEP_STORIES: SleepStory[] = [
  { id: "s1", title: "The Lighthouse Keeper", narrator: "Theo Banks", theme: "Ocean", durationSeconds: 1800, coverColor: "#12172B" },
  { id: "s2", title: "Night Train to Nowhere", narrator: "Maya Lin", theme: "Travel", durationSeconds: 1500, coverColor: "#232A4D" },
  { id: "s3", title: "The Quiet Orchard", narrator: "Amara Osei", theme: "Nature", durationSeconds: 1620, coverColor: "#8C7BC4" },
];

export const COURSES: Course[] = [
  {
    id: "c1",
    title: "Managing Stress",
    description: "Learn practical mindfulness techniques to respond to pressure more calmly.",
    category: "Stress",
    difficulty: "beginner",
    isPremium: true,
    sessions: [
      "Understanding stress", "Breathing through pressure", "Recognizing triggers",
      "Calming physical tension", "Managing difficult thoughts", "Creating mental space",
      "Work stress", "Emotional recovery", "Building resilience", "Moving forward",
    ].map((title, i) => ({
      id: `c1-${i + 1}`,
      title,
      description: `Session ${i + 1} of Managing Stress.`,
      contentType: "meditation",
      category: "Stress",
      instructor: instructor("Maya Lin"),
      durationSeconds: 300 + i * 30,
      difficulty: "beginner",
      isPremium: i > 1,
      isDownloadable: true,
      coverColor: "#C97064",
    })),
  },
];

export const BACKGROUND_SOUNDS = ["None", "Rain", "Ocean", "Forest", "Fireplace", "Soft wind", "White noise"];

export const QUICK_SUPPORT_TOOLS = [
  { id: "calm_me", label: "Calm Me", icon: "🌿", targetContentId: "m2" },
  { id: "help_sleep", label: "Help Me Sleep", icon: "🌙", targetContentId: "s1" },
  { id: "help_focus", label: "Help Me Focus", icon: "🎯", targetContentId: "f1" },
  { id: "feel_anxious", label: "I Feel Anxious", icon: "💛", targetContentId: "b3" },
];
