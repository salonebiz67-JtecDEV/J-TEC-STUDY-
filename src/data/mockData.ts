import {
  UserProfile,
  Subject,
  TimetableItem,
  Assignment,
  ExamCountdown,
  TaskItem,
  TutorMessage,
  NoteItem,
  FlashcardDeck,
  AchievementBadge,
  WeeklyStudyData,
} from '../types';

export const mockUserProfile: UserProfile = {
  name: 'Alex Morgan',
  title: 'B.Sc. Computer Science',
  university: 'Faculty of Engineering & Tech',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  currentStreak: 14,
  bestStreak: 26,
  totalStudyHours: 148.5,
  todayStudyMinutes: 228, // 3h 48m
  dailyGoalMinutes: 300,  // 5h 00m
  ranking: 'Top 5% Student',
};

export const mockSubjects: Subject[] = [
  {
    id: 'cs-algo',
    name: 'Algorithms & Data Structures',
    code: 'CS 301',
    color: '#8B5CF6',
    accentBg: 'rgba(139, 92, 246, 0.15)',
    iconName: 'Binary',
    progress: 84,
    chaptersCount: 12,
    notesCount: 24,
    lastStudied: 'Today, 10:15 AM',
    instructor: 'Prof. Julian Vance',
    room: 'Hall B-204',
  },
  {
    id: 'cs-ml',
    name: 'Machine Learning Foundations',
    code: 'CS 410',
    color: '#38BDF8',
    accentBg: 'rgba(56, 189, 248, 0.15)',
    iconName: 'Cpu',
    progress: 72,
    chaptersCount: 10,
    notesCount: 18,
    lastStudied: 'Yesterday',
    instructor: 'Dr. Elena Rostova',
    room: 'Turing Lab 3',
  },
  {
    id: 'cs-os',
    name: 'Operating Systems Architecture',
    code: 'CS 320',
    color: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.15)',
    iconName: 'Terminal',
    progress: 68,
    chaptersCount: 14,
    notesCount: 21,
    lastStudied: 'Today, 9:00 AM',
    instructor: 'Dr. Marcus Thorne',
    room: 'Lecture Hall 1',
  },
  {
    id: 'cs-db',
    name: 'Database Engine Design',
    code: 'CS 335',
    color: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.15)',
    iconName: 'Database',
    progress: 91,
    chaptersCount: 8,
    notesCount: 16,
    lastStudied: '3 days ago',
    instructor: 'Prof. Sarah Chen',
    room: 'Lab D-102',
  },
  {
    id: 'math-dm',
    name: 'Discrete Mathematics & Logic',
    code: 'MATH 220',
    color: '#EC4899',
    accentBg: 'rgba(236, 72, 153, 0.15)',
    iconName: 'Sigma',
    progress: 79,
    chaptersCount: 9,
    notesCount: 14,
    lastStudied: 'Nov 6',
    instructor: 'Dr. Raymond Holt',
    room: 'Math Wing 402',
  },
];

export const mockTimetableToday: TimetableItem[] = [
  {
    id: 'tt-1',
    title: 'Process Scheduling & Memory Virtualization',
    subjectId: 'cs-os',
    subjectName: 'Operating Systems',
    timeStart: '09:00',
    timeEnd: '10:30',
    room: 'Lecture Hall 1',
    type: 'Lecture',
    status: 'completed',
    instructor: 'Dr. Marcus Thorne',
  },
  {
    id: 'tt-2',
    title: 'Backpropagation & Loss Optimization Lab',
    subjectId: 'cs-ml',
    subjectName: 'Machine Learning',
    timeStart: '11:00',
    timeEnd: '12:45',
    room: 'Turing Lab 3',
    type: 'Lab',
    status: 'ongoing',
    instructor: 'Dr. Elena Rostova',
  },
  {
    id: 'tt-3',
    title: 'Shortest Paths & Dynamic Graph Algorithms',
    subjectId: 'cs-algo',
    subjectName: 'Algorithms & Data Structures',
    timeStart: '14:30',
    timeEnd: '16:00',
    room: 'Hall B-204',
    type: 'Lecture',
    status: 'upcoming',
    instructor: 'Prof. Julian Vance',
  },
  {
    id: 'tt-4',
    title: 'Midterm Prep Group Study & Problem Set',
    subjectId: 'cs-os',
    subjectName: 'OS Midterm Prep',
    timeStart: '17:30',
    timeEnd: '19:00',
    room: 'Library Pod C',
    type: 'Study Session',
    status: 'upcoming',
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Red-Black Tree Balance Invariants Implementation',
    subjectId: 'cs-algo',
    subjectName: 'Algorithms & Data Structures',
    dueDate: 'Tomorrow',
    dueTime: '11:59 PM',
    priority: 'high',
    completed: false,
    weight: '15% of Grade',
  },
  {
    id: 'asg-2',
    title: 'Multithreaded Producer-Consumer with Semaphores',
    subjectId: 'cs-os',
    subjectName: 'Operating Systems',
    dueDate: 'Nov 12',
    dueTime: '5:00 PM',
    priority: 'high',
    completed: false,
    weight: '20% of Grade',
  },
  {
    id: 'asg-3',
    title: 'Gradient Descent vs Adam Optimizer Comparative Notebook',
    subjectId: 'cs-ml',
    subjectName: 'Machine Learning',
    dueDate: 'Nov 15',
    dueTime: '11:59 PM',
    priority: 'medium',
    completed: false,
    weight: '10% of Grade',
  },
  {
    id: 'asg-4',
    title: 'B+ Tree Page Splitting Paper Summary',
    subjectId: 'cs-db',
    subjectName: 'Database Systems',
    dueDate: 'Nov 18',
    dueTime: '11:59 PM',
    priority: 'low',
    completed: true,
    weight: '5% of Grade',
  },
];

export const mockExamCountdowns: ExamCountdown[] = [
  {
    id: 'ex-1',
    title: 'Midterm Examination',
    subjectName: 'Operating Systems Architecture',
    examDate: 'Thursday, Nov 12',
    daysLeft: 4,
    readinessPct: 76,
    topicsTotal: 18,
    topicsMastered: 14,
    type: 'Midterm',
  },
  {
    id: 'ex-2',
    title: 'Graph Theory & Complexity Quiz',
    subjectName: 'Discrete Mathematics',
    examDate: 'Tuesday, Nov 10',
    daysLeft: 2,
    readinessPct: 88,
    topicsTotal: 12,
    topicsMastered: 11,
    type: 'Quiz',
  },
  {
    id: 'ex-3',
    title: 'Practical Project Evaluation',
    subjectName: 'Machine Learning Foundations',
    examDate: 'Thursday, Nov 19',
    daysLeft: 11,
    readinessPct: 62,
    topicsTotal: 15,
    topicsMastered: 9,
    type: 'Final',
  },
];

export const mockPlannerTasks: TaskItem[] = [
  {
    id: 'tsk-1',
    title: 'Debug Red-Black tree rotateLeft() pointer bug',
    subjectName: 'Algorithms & Data Structures',
    date: 'Today',
    priority: 'high',
    completed: false,
    category: 'assignment',
    estimatedMinutes: 45,
  },
  {
    id: 'tsk-2',
    title: 'Review Chapter 7: Virtual Memory & Page Replacement',
    subjectName: 'Operating Systems',
    date: 'Today',
    priority: 'high',
    completed: true,
    category: 'revision',
    estimatedMinutes: 60,
  },
  {
    id: 'tsk-3',
    title: 'Complete 15 practice flashcards on Neural Architectures',
    subjectName: 'Machine Learning',
    date: 'Today',
    priority: 'medium',
    completed: false,
    category: 'practice',
    estimatedMinutes: 20,
  },
  {
    id: 'tsk-4',
    title: 'Read Tanenbaum section on Deadlock Prevention Bankers Algo',
    subjectName: 'Operating Systems',
    date: 'Tomorrow',
    priority: 'medium',
    completed: false,
    category: 'reading',
    estimatedMinutes: 40,
  },
  {
    id: 'tsk-5',
    title: 'Solve 4 Graph Coloring and Eulerian Path problem sets',
    subjectName: 'Discrete Mathematics',
    date: 'Tomorrow',
    priority: 'high',
    completed: false,
    category: 'practice',
    estimatedMinutes: 50,
  },
];

export const mockTutorInitialMessages: TutorMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    timestamp: '10:42 AM',
    content: 'Can you explain the intuition behind Dijkstra vs A* search, and why A* is typically much faster for pathfinding on game grids or maps?',
    subject: 'Algorithms & Data Structures',
  },
  {
    id: 'msg-2',
    sender: 'ai',
    timestamp: '10:43 AM',
    content: 'Great question, Alex! The core distinction between Dijkstra\'s algorithm and A* is **heuristic guidance**.\n\nWhile Dijkstra explores outward uniformly in all directions (like ripples expanding in a pond), A* incorporates a compass pointing directly toward the goal.\n\n### The Mathematical Formulation\n- **Dijkstra\'s cost function:** $f(n) = g(n)$\n  where $g(n)$ is the exact cost from the start node to node $n$.\n- **A* cost function:** $f(n) = g(n) + h(n)$\n  where $h(n)$ is the heuristic estimate from node $n$ to the target.',
    codeSnippet: {
      language: 'python',
      code: '# A* evaluation priority queue node\ndef a_star_priority(current_cost_g, heuristic_h):\n    return current_cost_g + heuristic_h\n\n# Manhattan distance heuristic (admissible for 4-way grid)\ndef manhattan_distance(p1, p2):\n    return abs(p1.x - p2.x) + abs(p1.y - p2.y)',
    },
    keyTakeaways: [
      'Dijkstra guarantees the shortest path but visits circles of unnecessary nodes behind the target.',
      'A* reduces state evaluations by 60%–85% when using an admissible heuristic (never overestimating true cost).',
      'If h(n) = 0 for all nodes, A* mathematically reduces exactly to Dijkstra.',
    ],
    followUpSuggestions: [
      'What makes a heuristic "admissible" vs "consistent"?',
      'Show Dijkstra vs A* node exploration count on a 50x50 maze',
      'Quiz me on graph search algorithm complexities',
    ],
  },
];

export const mockNotes: NoteItem[] = [
  {
    id: 'note-1',
    subjectId: 'cs-algo',
    subjectName: 'Algorithms & Data Structures',
    title: 'Dijkstra & Priority Queue Optimization',
    updatedAt: 'Today, 11:20 AM',
    readTimeMinutes: 6,
    tags: ['Graphs', 'Greedy', 'Priority Queue', 'O(E log V)'],
    excerpt: 'Comprehensive analysis of single-source shortest path, Fibonacci heap comparison, and negative edge limitations.',
    content: `## 1. Single-Source Shortest Paths

Dijkstra's algorithm finds the shortest path from a starting source vertex to all other vertices in a weighted, directed or undirected graph where **all edge weights are non-negative**.

### Time Complexity Breakdown:
- **Array-based min extraction:** $O(V^2)$
- **Binary Min-Heap:** $O((V + E) \\log V)$ — Standard production choice
- **Fibonacci Heap:** $O(E + V \\log V)$ — Theoretically optimal, high constant factors

### Key Limitation:
Dijkstra fails on graphs with negative weights because once a vertex is marked visited (extracted from the priority queue), the algorithm assumes its shortest distance is finalized. For negative edge weights, utilize **Bellman-Ford** ($O(V \\cdot E)$) or **SPFA**.`,
    isBookmarked: true,
  },
  {
    id: 'note-2',
    subjectId: 'cs-os',
    subjectName: 'Operating Systems Architecture',
    title: 'Process Synchronization & Mutex vs Semaphores',
    updatedAt: 'Yesterday',
    readTimeMinutes: 8,
    tags: ['Concurrency', 'Deadlocks', 'Semaphores', 'IPC'],
    excerpt: 'Critical section problem, Peterson\'s solution, counting semaphores, and classic deadlock conditions.',
    content: `## Process Synchronization & Concurrency

When concurrent processes share memory or resources, synchronization mechanisms are critical to eliminate race conditions.

### The 3 Critical Section Requirements:
1. **Mutual Exclusion:** Only one process can execute in its critical section at any given moment.
2. **Progress:** If no process is executing and some want to enter, selection cannot be postponed indefinitely.
3. **Bounded Waiting:** A bound must exist on the number of times other processes are granted entry after a request is made.

### Mutex vs Binary Semaphore:
- **Mutex (Mutual Exclusion lock):** Has ownership semantics. Only the thread that acquired the lock can release it.
- **Semaphore:** A signaling mechanism (integer value + wait/signal). Any thread can signal a semaphore to unlock a waiting thread.`,
    isBookmarked: true,
  },
  {
    id: 'note-3',
    subjectId: 'cs-ml',
    subjectName: 'Machine Learning Foundations',
    title: 'Gradient Descent Variants: SGD, Momentum, Adam',
    updatedAt: 'Nov 5',
    readTimeMinutes: 7,
    tags: ['Deep Learning', 'Optimization', 'Loss Functions'],
    excerpt: 'Mathematical intuition behind stochastic gradient descent, exponentially weighted moving averages, and adaptive learning rates.',
    content: `## Optimization in Neural Networks

Training neural networks requires iteratively updating parameters $\\theta$ to minimize an empirical loss function $L(\\theta)$.

### Optimizer Evolution:
1. **Batch Gradient Descent:** Computes gradient over entire dataset. Exact but computationally intractable on large datasets.
2. **Stochastic Gradient Descent (SGD):** Updates parameters per mini-batch. Adds noise that helps escape saddle points.
3. **Momentum:** Adds velocity vector $v_t = \\beta v_{t-1} + (1-\\beta)\\nabla L$ to accelerate along ravines.
4. **Adam (Adaptive Moment Estimation):** Combines first moment (momentum) and second moment (uncentered variance of gradients).`,
    isBookmarked: false,
  },
  {
    id: 'note-4',
    subjectId: 'cs-db',
    subjectName: 'Database Engine Design',
    title: 'B+ Tree Page Structures & Buffer Pool Management',
    updatedAt: 'Nov 3',
    readTimeMinutes: 5,
    tags: ['Storage Engines', 'Indexing', 'Buffer Pool', 'WAL'],
    excerpt: 'Why databases prefer B+ Trees over binary search trees: high fan-out, sequential leaf scans, and disk block alignment.',
    content: `## Database Indexing & B+ Trees

Traditional binary search trees (BST, AVL, Red-Black) have a small fanout of 2, requiring many node pointers and disk seeks ($O(\\log_2 N)$).

### Advantages of B+ Trees:
- **High Fanout (100–1000):** Height of the tree is typically only 3 to 4 levels for hundreds of millions of rows.
- **Linked Leaf Pages:** All data pointers reside in leaf nodes connected by a doubly-linked list, providing lightning-fast range queries.
- **Disk Page Sizing:** Inner nodes and leaf nodes match filesystem disk block sizes (typically 4KB to 16KB).`,
    isBookmarked: false,
  },
];

export const mockFlashcardDecks: FlashcardDeck[] = [
  {
    id: 'fc-1',
    subjectName: 'Algorithms & Data Structures',
    title: 'Graph Algorithms & Complexities',
    cardsCount: 32,
    masteredCount: 28,
    lastReviewed: 'Today',
  },
  {
    id: 'fc-2',
    subjectName: 'Operating Systems',
    title: 'Virtual Memory & Page Tables',
    cardsCount: 24,
    masteredCount: 16,
    lastReviewed: 'Yesterday',
  },
  {
    id: 'fc-3',
    subjectName: 'Machine Learning',
    title: 'Neural Activation Functions & Backprop',
    cardsCount: 40,
    masteredCount: 31,
    lastReviewed: 'Nov 4',
  },
];

export const mockAchievementBadges: AchievementBadge[] = [
  {
    id: 'ach-1',
    title: '14-Day Study Streak',
    description: 'Studied consistently for 14 consecutive days without missing a session.',
    category: 'streak',
    unlocked: true,
    progress: 14,
    maxProgress: 14,
    iconName: 'Flame',
    unlockedDate: 'Achieved Today',
  },
  {
    id: 'ach-2',
    title: 'Centurion Scholar',
    description: 'Logged more than 100 verified deep-focus study hours.',
    category: 'hours',
    unlocked: true,
    progress: 148,
    maxProgress: 100,
    iconName: 'Award',
    unlockedDate: 'Unlocked last week',
  },
  {
    id: 'ach-3',
    title: 'Deep Focus Master',
    description: 'Completed 50 Pomodoro focus sessions with zero interruptions.',
    category: 'focus',
    unlocked: true,
    progress: 50,
    maxProgress: 50,
    iconName: 'Zap',
    unlockedDate: 'Unlocked Oct 28',
  },
  {
    id: 'ach-4',
    title: 'Algorithm Vanguard',
    description: 'Master 80% of all Chapters in Advanced Algorithms.',
    category: 'mastery',
    unlocked: true,
    progress: 84,
    maxProgress: 100,
    iconName: 'Shield',
    unlockedDate: 'Unlocked Nov 2',
  },
  {
    id: 'ach-5',
    title: '30-Day Legend Streak',
    description: 'Maintain an uninterrupted study streak for a full calendar month.',
    category: 'streak',
    unlocked: false,
    progress: 14,
    maxProgress: 30,
    iconName: 'Flame',
  },
  {
    id: 'ach-6',
    title: '200-Hour Club',
    description: 'Reach 200 total hours of deep academic study this semester.',
    category: 'hours',
    unlocked: false,
    progress: 148,
    maxProgress: 200,
    iconName: 'Clock',
  },
];

export const mockWeeklyStudyData: WeeklyStudyData[] = [
  { day: 'Mon', dateStr: 'Nov 2', hours: 4.8, targetHours: 5.0, deepFocusPct: 82 },
  { day: 'Tue', dateStr: 'Nov 3', hours: 5.4, targetHours: 5.0, deepFocusPct: 88 },
  { day: 'Wed', dateStr: 'Nov 4', hours: 4.2, targetHours: 5.0, deepFocusPct: 79 },
  { day: 'Thu', dateStr: 'Nov 5', hours: 6.1, targetHours: 5.0, deepFocusPct: 91 },
  { day: 'Fri', dateStr: 'Nov 6', hours: 5.0, targetHours: 5.0, deepFocusPct: 85 },
  { day: 'Sat', dateStr: 'Nov 7', hours: 5.2, targetHours: 5.0, deepFocusPct: 84 },
  { day: 'Sun', dateStr: 'Nov 8', hours: 3.8, targetHours: 5.0, deepFocusPct: 89 },
];

export const sampleSuggestedPrompts = [
  'Explain Dijkstra vs A* search algorithm',
  'Break down Peterson\'s mutual exclusion algorithm',
  'What is the difference between L1, L2 and L3 CPU cache?',
  'Generate 5 practice questions for Operating Systems midterm',
  'How does gradient descent differ with Adam optimizer?',
  'Explain B-Tree node splitting with an example',
];
