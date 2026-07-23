export type ContentType = "meditation" | "course" | "sleep_story" | "breathing" | "music" | "focus";

export interface ContentRow {
  id: string;
  title: string;
  type: ContentType;
  category: string;
  instructor: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isPremium: boolean;
  isPublished: boolean;
}

export const CONTENT: ContentRow[] = [
  { id: "m1", title: "Let Go of Work Stress", type: "meditation", category: "Stress", instructor: "Maya Lin", duration: "5 min", difficulty: "beginner", isPremium: false, isPublished: true },
  { id: "m2", title: "Calm Your Mind", type: "meditation", category: "Anxiety", instructor: "Theo Banks", duration: "10 min", difficulty: "beginner", isPremium: false, isPublished: true },
  { id: "m3", title: "Morning Clarity", type: "meditation", category: "Morning", instructor: "Amara Osei", duration: "8 min", difficulty: "beginner", isPremium: true, isPublished: true },
  { id: "b1", title: "Box Breathing", type: "breathing", category: "Stress", instructor: "Calm Path", duration: "3 min", difficulty: "beginner", isPremium: false, isPublished: true },
  { id: "s1", title: "The Lighthouse Keeper", type: "sleep_story", category: "Ocean", instructor: "Theo Banks", duration: "30 min", difficulty: "beginner", isPremium: false, isPublished: true },
  { id: "f1", title: "Deep Work", type: "focus", category: "Work", instructor: "Calm Path", duration: "25 min", difficulty: "beginner", isPremium: false, isPublished: false },
];

export interface UserRow {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Premium" | "AI Premium";
  streak: number;
  joined: string;
}

export const USERS: UserRow[] = [
  { id: "u1", name: "Mo Akram", email: "moakram@bastionex.net", plan: "AI Premium", streak: 12, joined: "2026-05-02" },
  { id: "u2", name: "Sara Kim", email: "sara.kim@example.com", plan: "Premium", streak: 4, joined: "2026-06-11" },
  { id: "u3", name: "James Patel", email: "james.p@example.com", plan: "Free", streak: 0, joined: "2026-07-01" },
];

export interface SubscriptionRow {
  id: string;
  userEmail: string;
  plan: string;
  status: "active" | "trialing" | "cancelled";
  renews: string;
}

export const SUBSCRIPTIONS: SubscriptionRow[] = [
  { id: "sub1", userEmail: "moakram@bastionex.net", plan: "AI Premium — Annual", status: "active", renews: "2027-01-15" },
  { id: "sub2", userEmail: "sara.kim@example.com", plan: "Premium — Monthly", status: "trialing", renews: "2026-08-01" },
];

export const CATEGORIES = ["Stress", "Sleep", "Anxiety", "Focus", "Confidence", "Relationships", "Burnout", "Morning", "Work", "Students"];

export const DASHBOARD_STATS = {
  dau: 1284,
  onboardingCompletionRate: 0.78,
  firstSessionCompletionRate: 0.64,
  trialToPaidConversion: 0.19,
  totalContent: CONTENT.length,
  totalUsers: USERS.length,
};
