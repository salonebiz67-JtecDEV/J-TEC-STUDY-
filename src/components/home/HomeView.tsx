import React, { useState } from 'react';
import {
  Flame,
  Clock,
  Sparkles,
  Play,
  Bell,
  BellOff,
  CheckCircle2,
  Circle,
  ChevronRight,
  Zap,
  Target,
} from 'lucide-react';
import {
  UserProfile,
  TimetableItem,
  Assignment,
  NavigationTab,
} from '../../types';

interface HomeViewProps {
  user: UserProfile;
  timetable: TimetableItem[];
  assignments: Assignment[];
  onStartFocus: (subjectId?: string) => void;
  onNavigateTab: (tab: NavigationTab, prefillPrompt?: string) => void;
  onToggleAssignment: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  timetable,
  assignments,
  onStartFocus,
  onNavigateTab,
  onToggleAssignment,
}) => {
  const [alarmActive, setAlarmActive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const progressPct = Math.min(
    Math.round((user.todayStudyMinutes / user.dailyGoalMinutes) * 100),
    100
  );
  const hours = Math.floor(user.todayStudyMinutes / 60);
  const minutes = user.todayStudyMinutes % 60;
  const goalHours = Math.floor(user.dailyGoalMinutes / 60);

  // Next upcoming study session
  const nextEvent = timetable.find((t) => t.status === 'upcoming') || timetable[0];

  // Top 3 pending assignments/tasks
  const pendingTasks = assignments.filter((a) => !a.completed).slice(0, 3);

  return (
    <div className="pb-20 max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 pt-3.5 space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-full shadow-lg shadow-violet-900/40 flex items-center gap-1.5 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Greeting & Date */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">
            Sunday, Nov 8
          </span>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Hi, {user.name.split(' ')[0]}
          </h1>
        </div>

        {/* Compact Streak Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#141724] border border-amber-500/20 text-xs font-semibold text-amber-300">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{user.currentStreak}d Streak</span>
        </div>
      </div>

      {/* 2. Today's Study Summary Card (Unified & Compact) */}
      <div className="p-4 rounded-2xl bg-[#141724] border border-[#1E2436] shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-violet-400" />
            Today's Study Summary
          </span>
          <span className="font-mono font-bold text-violet-400">{progressPct}% of goal</span>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-2xl font-extrabold text-white tracking-tight font-mono">
              {hours}h {minutes}m
              <span className="text-xs font-sans text-slate-400 font-normal ml-1.5">
                / {goalHours}h daily goal
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              {user.dailyGoalMinutes - user.todayStudyMinutes > 0
                ? `${Math.floor((user.dailyGoalMinutes - user.todayStudyMinutes) / 60)}h ${
                    (user.dailyGoalMinutes - user.todayStudyMinutes) % 60
                  }m left`
                : 'Goal reached! 🎉'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#1E2336] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Quick Summary Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1C2132] text-center">
          <div className="p-1.5 rounded-lg bg-[#181C2B]">
            <div className="text-[10px] text-slate-400">Deep Focus</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">2h 40m</div>
          </div>
          <div className="p-1.5 rounded-lg bg-[#181C2B]">
            <div className="text-[10px] text-slate-400">Focus Score</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">86%</div>
          </div>
          <div className="p-1.5 rounded-lg bg-[#181C2B]">
            <div className="text-[10px] text-slate-400">Total Hours</div>
            <div className="text-xs font-bold text-violet-300 mt-0.5">{user.totalStudyHours}h</div>
          </div>
        </div>
      </div>

      {/* 3. Focus Button (Clean, prominent, not oversized) */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#171A29] via-[#1A1D2F] to-[#171A29] border border-violet-500/25 flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-violet-400" />
            Distraction-Free Focus
          </div>
          <h2 className="text-sm font-bold text-white">Start Study Session</h2>
          <p className="text-[11px] text-slate-400">Pomodoro timer with ambient sounds</p>
        </div>

        <button
          onClick={() => onStartFocus()}
          className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-violet-600/30 transition-all cursor-pointer shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Start Focus</span>
        </button>
      </div>

      {/* 4. Next Upcoming Study Alarm */}
      {nextEvent && (
        <div className="p-3.5 rounded-2xl bg-[#141724] border border-[#1E2436] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Next Up
                </span>
                <span className="text-[11px] font-mono text-slate-400">· {nextEvent.timeStart}</span>
              </div>
              <h3 className="text-xs font-bold text-white truncate mt-0.5">
                {nextEvent.title}
              </h3>
              <p className="text-[11px] text-slate-400 truncate">
                {nextEvent.room} · {nextEvent.subjectName}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setAlarmActive(!alarmActive);
              showToast(alarmActive ? 'Alarm muted for session' : 'Session alarm active');
            }}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              alarmActive
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                : 'bg-[#181C2B] border-[#22283A] text-slate-500'
            }`}
            title={alarmActive ? 'Alarm On' : 'Alarm Off'}
            aria-label="Toggle Alarm"
          >
            {alarmActive ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* 5. Small Task Overview */}
      <div className="p-3.5 rounded-2xl bg-[#141724] border border-[#1E2436] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white">Pending Assignments</span>
          <button
            onClick={() => onNavigateTab('planner')}
            className="text-[11px] font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-0.5 cursor-pointer"
          >
            <span>All Tasks</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1.5">
          {pendingTasks.map((asg) => (
            <div
              key={asg.id}
              className="p-2.5 rounded-xl bg-[#181C2B] border border-[#202638] flex items-center justify-between gap-2.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  onClick={() => onToggleAssignment(asg.id)}
                  className="cursor-pointer text-slate-500 hover:text-white transition-colors"
                >
                  <Circle className="w-4 h-4" />
                </button>
                <div className="min-w-0">
                  <h4 className="text-xs font-medium text-white truncate">{asg.title}</h4>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {asg.subjectName} · Due {asg.dueDate}
                  </div>
                </div>
              </div>

              <span
                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                  asg.priority === 'high'
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    : 'bg-[#22283C] text-slate-300'
                }`}
              >
                {asg.priority.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Compact AI Recommendation */}
      <div className="p-3.5 rounded-2xl bg-[#141724] border border-violet-500/25 flex items-start gap-3">
        <div className="w-7 h-7 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">
              AI Study Coach Tip
            </span>
            <span className="text-[10px] text-slate-400">Spaced Repetition</span>
          </div>

          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Review <strong>Graph Shortest Paths</strong> today to prevent 35% retention drop before Tuesday's quiz.
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() =>
                onNavigateTab(
                  'tutor',
                  'Can you give me a 5-minute refresher on Dijkstra vs A* search algorithm?'
                )
              }
              className="px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Ask AI Tutor</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => onStartFocus('cs-algo')}
              className="px-2.5 py-1 rounded-lg bg-[#1E2336] text-slate-300 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
            >
              Start 15m Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
