/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  NavigationTab,
  UserProfile,
  Subject,
  TimetableItem,
  Assignment,
  ExamCountdown,
  TaskItem,
  NoteItem,
  FlashcardDeck,
  AchievementBadge,
  WeeklyStudyData,
} from './types';
import {
  mockUserProfile,
  mockSubjects,
  mockTimetableToday,
  mockAssignments,
  mockExamCountdowns,
  mockPlannerTasks,
  mockTutorInitialMessages,
  mockNotes,
  mockFlashcardDecks,
  mockAchievementBadges,
  mockWeeklyStudyData,
} from './data/mockData';
import { AndroidTopBar } from './components/common/AndroidTopBar';
import { BottomNavBar } from './components/common/BottomNavBar';
import { FocusModeModal } from './components/common/FocusModeModal';
import { SettingsModal } from './components/common/SettingsModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { HomeView } from './components/home/HomeView';
import { PlannerView } from './components/planner/PlannerView';
import { TutorView } from './components/tutor/TutorView';
import { LearningView } from './components/learning/LearningView';
import { ProgressView } from './components/progress/ProgressView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [tabHistory, setTabHistory] = useState<NavigationTab[]>(['home']);
  const [user, setUser] = useState<UserProfile>(mockUserProfile);
  const [subjects] = useState<Subject[]>(mockSubjects);
  const [timetable, setTimetable] = useState<TimetableItem[]>(mockTimetableToday);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [tasks, setTasks] = useState<TaskItem[]>(mockPlannerTasks);
  const [examCountdowns] = useState<ExamCountdown[]>(mockExamCountdowns);
  const [notes] = useState<NoteItem[]>(mockNotes);
  const [flashcardDecks] = useState<FlashcardDeck[]>(mockFlashcardDecks);
  const [badges] = useState<AchievementBadge[]>(mockAchievementBadges);
  const [weeklyData] = useState<WeeklyStudyData[]>(mockWeeklyStudyData);

  // Modals & Navigation state
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [focusSubjectId, setFocusSubjectId] = useState<string | undefined>(undefined);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [tutorPrefilledPrompt, setTutorPrefilledPrompt] = useState<string | undefined>(undefined);

  // Handle Android Back Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFocusModalOpen) {
          setIsFocusModalOpen(false);
          return;
        }
        if (isSettingsOpen) {
          setIsSettingsOpen(false);
          return;
        }
        if (isNotificationsOpen) {
          setIsNotificationsOpen(false);
          return;
        }
        if (tabHistory.length > 1) {
          const newHistory = [...tabHistory];
          newHistory.pop();
          const prevTab = newHistory[newHistory.length - 1];
          setTabHistory(newHistory);
          setActiveTab(prevTab);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusModalOpen, isSettingsOpen, isNotificationsOpen, tabHistory]);

  const handleTabChange = (tab: NavigationTab) => {
    if (tab === activeTab) return;
    setTabHistory((prev) => [...prev, tab]);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartFocus = (subjectId?: string) => {
    setFocusSubjectId(subjectId);
    setIsFocusModalOpen(true);
  };

  const handleSessionComplete = (minutes: number) => {
    setUser((prev) => ({
      ...prev,
      todayStudyMinutes: prev.todayStudyMinutes + minutes,
      totalStudyHours: parseFloat((prev.totalStudyHours + minutes / 60).toFixed(1)),
    }));
  };

  const handleToggleAssignment = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const handleToggleTimetableStatus = (id: string) => {
    setTimetable((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'completed' ? 'ongoing' : 'completed';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask: Omit<TaskItem, 'id'>) => {
    const item: TaskItem = {
      ...newTask,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [item, ...prev]);
  };

  const handleNavigateWithPrompt = (tab: NavigationTab, prompt?: string) => {
    if (prompt) {
      setTutorPrefilledPrompt(prompt);
    }
    handleTabChange(tab);
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] text-slate-100 flex flex-col w-full selection:bg-violet-600/30 selection:text-violet-200">
      {/* Essential Android Header */}
      <AndroidTopBar
        activeTab={activeTab}
        user={user}
        unreadNotificationsCount={2}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfile={() => setIsSettingsOpen(true)}
      />

      {/* Main Responsive Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            timetable={timetable}
            assignments={assignments}
            onStartFocus={handleStartFocus}
            onNavigateTab={handleNavigateWithPrompt}
            onToggleAssignment={handleToggleAssignment}
          />
        )}

        {activeTab === 'planner' && (
          <PlannerView
            timetable={timetable}
            tasks={tasks}
            examCountdowns={examCountdowns}
            subjects={subjects}
            onStartFocus={handleStartFocus}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onToggleTimetableStatus={handleToggleTimetableStatus}
          />
        )}

        {activeTab === 'tutor' && (
          <TutorView
            subjects={subjects}
            initialMessages={mockTutorInitialMessages}
            prefilledPrompt={tutorPrefilledPrompt}
            onClearPrefill={() => setTutorPrefilledPrompt(undefined)}
          />
        )}

        {activeTab === 'learning' && (
          <LearningView
            subjects={subjects}
            notes={notes}
            flashcardDecks={flashcardDecks}
            onStartFocus={handleStartFocus}
            onNavigateTab={handleNavigateWithPrompt}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            user={user}
            weeklyData={weeklyData}
            subjects={subjects}
            badges={badges}
            onStartFocus={handleStartFocus}
          />
        )}
      </main>

      {/* Compact Dark Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Focus Mode Overlay Modal */}
      <FocusModeModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        subjects={subjects}
        initialSubjectId={focusSubjectId}
        onSessionComplete={handleSessionComplete}
      />

      {/* Settings & Profile Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToTab={(tab) => handleTabChange(tab)}
      />
    </div>
  );
}
