export type NavigationTab = 'home' | 'planner' | 'tutor' | 'learning' | 'progress';

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  accentBg: string;
  iconName: string;
  progress: number; // 0 to 100
  chaptersCount: number;
  notesCount: number;
  lastStudied: string;
  instructor: string;
  room?: string;
}

export interface TimetableItem {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  timeStart: string;
  timeEnd: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Study Session' | 'Quiz' | 'Discussion';
  status: 'upcoming' | 'ongoing' | 'completed';
  instructor?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  dueDate: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  weight: string;
}

export interface ExamCountdown {
  id: string;
  title: string;
  subjectName: string;
  examDate: string;
  daysLeft: number;
  readinessPct: number;
  topicsTotal: number;
  topicsMastered: number;
  type: 'Midterm' | 'Final' | 'Lab Test' | 'Quiz';
}

export interface TaskItem {
  id: string;
  title: string;
  subjectName: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  category: 'assignment' | 'revision' | 'reading' | 'practice';
  estimatedMinutes: number;
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'ai';
  timestamp: string;
  content: string;
  subject?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  keyTakeaways?: string[];
  followUpSuggestions?: string[];
}

export interface NoteItem {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  updatedAt: string;
  readTimeMinutes: number;
  tags: string[];
  excerpt: string;
  content: string;
  isBookmarked: boolean;
}

export interface FlashcardDeck {
  id: string;
  subjectName: string;
  title: string;
  cardsCount: number;
  masteredCount: number;
  lastReviewed: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'streak' | 'hours' | 'focus' | 'mastery';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  iconName: string;
  unlockedDate?: string;
}

export interface WeeklyStudyData {
  day: string;
  dateStr: string;
  hours: number;
  targetHours: number;
  deepFocusPct: number;
}

export interface UserProfile {
  name: string;
  title: string;
  university: string;
  avatarUrl: string;
  currentStreak: number;
  bestStreak: number;
  totalStudyHours: number;
  todayStudyMinutes: number;
  dailyGoalMinutes: number;
  ranking: string;
}
