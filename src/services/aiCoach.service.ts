// Rule-based intent detection for the AI Coach MVP.
// Swap this out for a real LLM call (with the safety-restrictions from the
// product brief enforced server-side) once a backend is wired up.

import { BREATHING, FOCUS_TRACKS, MEDITATIONS, SLEEP_STORIES } from "@/data/mockData";
import { ContentItem } from "@/types";

export interface CoachSuggestion {
  reply: string;
  detectedEmotion: string;
  actions: { label: string; contentId?: string }[];
}

const CRISIS_KEYWORDS = [
  "suicide", "kill myself", "self harm", "self-harm", "end my life", "hurt myself",
];

export function isCrisisMessage(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((k) => lower.includes(k));
}

export function getCoachSuggestion(text: string): CoachSuggestion {
  const lower = text.toLowerCase();

  if (isCrisisMessage(lower)) {
    return {
      reply:
        "It sounds like you're going through something very heavy right now. I'm not able to provide crisis support, but you deserve immediate help from a real person. Please consider contacting a local crisis line or emergency services, or reaching out to someone you trust right now.",
      detectedEmotion: "crisis",
      actions: [],
    };
  }

  if (/(meeting|nervous|presentation|interview)/.test(lower)) {
    return {
      reply:
        "It sounds like you need something short that can calm your body without making you sleepy. Let's try a two-minute breathing reset.",
      detectedEmotion: "nervous",
      actions: [
        { label: "Start breathing exercise", contentId: "b1" },
        { label: "Try a 5-minute meditation", contentId: "m1" },
      ],
    };
  }

  if (/(sleep|can't fall asleep|cannot sleep|insomnia|awake)/.test(lower)) {
    return {
      reply: "Let's help your mind slow down. A sleep story or a wind-down breathing exercise usually helps here.",
      detectedEmotion: "sleep_difficulty",
      actions: [
        { label: "Play a sleep story", contentId: SLEEP_STORIES[0].id },
        { label: "Try 4-7-8 breathing", contentId: "b2" },
      ],
    };
  }

  if (/(anxious|anxiety|panic|worried)/.test(lower)) {
    return {
      reply: "Let's ground you first, then ease the anxious energy with a gentle breathing practice.",
      detectedEmotion: "anxious",
      actions: [
        { label: "Grounding exercise", contentId: "m5" },
        { label: "Panic support breathing", contentId: "b3" },
      ],
    };
  }

  if (/(angry|anger|furious|argument)/.test(lower)) {
    return {
      reply: "That sounds frustrating. A short cooling-down breathing exercise can help before you respond to anything.",
      detectedEmotion: "angry",
      actions: [{ label: "Box breathing", contentId: "b1" }],
    };
  }

  if (/(focus|concentrat|study|deadline|work)/.test(lower)) {
    return {
      reply: "Let's get you into a focused state. Here's a deep work track to help you settle in.",
      detectedEmotion: "distracted",
      actions: [
        { label: "Start Deep Work focus", contentId: "f1" },
        { label: "2-minute pre-work reset", contentId: "f2" },
      ],
    };
  }

  if (/(stress|overwhelm|exhausted|burnt out|burnout)/.test(lower)) {
    return {
      reply: "It sounds like today has been a lot. A short stress-release meditation might help you reset.",
      detectedEmotion: "stressed",
      actions: [{ label: "Let Go of Work Stress", contentId: "m1" }],
    };
  }

  return {
    reply:
      "Thanks for sharing that. Based on what you're describing, a short guided meditation could be a good place to start — or tell me more about how much time you have.",
    detectedEmotion: "neutral",
    actions: [{ label: "Try a 5-minute meditation", contentId: "m2" }],
  };
}

export function findContentById(id?: string): ContentItem | undefined {
  if (!id) return undefined;
  return [...MEDITATIONS, ...BREATHING, ...FOCUS_TRACKS].find((c) => c.id === id);
}
