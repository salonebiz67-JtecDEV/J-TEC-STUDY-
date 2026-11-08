import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  Play,
  Bell,
  BellOff,
  Sparkles,
  ChevronRight,
  X,
  Target,
} from 'lucide-react';
import { TimetableItem, TaskItem, ExamCountdown, Subject } from '../../types';

interface PlannerViewProps {
  timetable: TimetableItem[];
  tasks: TaskItem[];
  examCountdowns: ExamCountdown[];
  subjects: Subject[];
  onStartFocus: (subjectId?: string) => void;
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
  onToggleTimetableStatus: (id: string) => void;
}

const DAYS_LIST = [
  { dayName: 'Sun', dateNum: 8, isToday: true },
  { dayName: 'Mon', dateNum: 9, isToday: false },
  { dayName: 'Tue', dateNum: 10, isToday: false },
  { dayName: 'Wed', dateNum: 11, isToday: false },
  { dayName: 'Thu', dateNum: 12, isToday: false },
  { dayName: 'Fri', dateNum: 13, isToday: false },
  { dayName: 'Sat', dateNum: 14, isToday: false },
];

export const PlannerView: React.FC<PlannerViewProps> = ({
  timetable,
  tasks,
  examCountdowns,
  subjects,
  onStartFocus,
  onToggleTask,
  onAddTask,
  onToggleTimetableStatus,
}) => {
  const [selectedDay, setSelectedDay] = useState(8);
  const [activeSegment, setActiveSegment] = useState<'schedule' | 'tasks' | 'exams'>('schedule');
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'high' | 'completed'>('all');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [alarmStates, setAlarmStates] = useState<Record<string, boolean>>({
    'tt-2': true,
    'tt-3': true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState(subjects[0]?.name || 'Algorithms');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const toggleAlarm = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlarmStates((prev) => {
      const next = !prev[id];
      showToast(next ? 'Study reminder alarm set' : 'Alarm disabled');
      return { ...prev, [id]: next };
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      title: newTaskTitle.trim(),
      subjectName: newTaskSubject,
      date: 'Today',
      priority: newTaskPriority,
      completed: false,
      category: 'assignment',
      estimatedMinutes: newTaskMinutes,
    });

    setNewTaskTitle('');
    setShowAddTaskModal(false);
    showToast('Task added to planner');
  };

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'pending') return !t.completed;
    if (taskFilter === 'completed') return t.completed;
    if (taskFilter === 'high') return t.priority === 'high';
    return true;
  });

  return (
    <div className="pb-20 max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 pt-3.5 space-y-4">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-full shadow-lg shadow-violet-900/40 flex items-center gap-1.5 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header & Quick Add */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">
            Academic Planner
          </span>
          <h1 className="text-xl font-bold text-white tracking-tight">November 2026</h1>
        </div>

        <button
          onClick={() => setShowAddTaskModal(true)}
          className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>
      </div>

      {/* 2. Compact Horizontal Date Strip */}
      <div className="bg-[#141724] p-2 rounded-2xl border border-[#1E2436]">
        <div className="grid grid-cols-7 gap-1">
          {DAYS_LIST.map((item) => {
            const isSelected = selectedDay === item.dateNum;
            return (
              <button
                key={item.dateNum}
                onClick={() => setSelectedDay(item.dateNum)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#1A1F30]'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider opacity-80">
                  {item.dayName}
                </span>
                <span className="text-xs font-bold mt-0.5">{item.dateNum}</span>
                {item.isToday && (
                  <span
                    className={`w-1 h-1 rounded-full mt-1 ${
                      isSelected ? 'bg-white' : 'bg-violet-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Segmented Navigation Tabs */}
      <div className="grid grid-cols-3 p-1 bg-[#141724] rounded-xl border border-[#1E2436] text-xs font-medium">
        <button
          onClick={() => setActiveSegment('schedule')}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeSegment === 'schedule'
              ? 'bg-[#1F2538] text-white font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Timetable ({timetable.length})
        </button>

        <button
          onClick={() => setActiveSegment('tasks')}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeSegment === 'tasks'
              ? 'bg-[#1F2538] text-white font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tasks ({tasks.filter((t) => !t.completed).length})
        </button>

        <button
          onClick={() => setActiveSegment('exams')}
          className={`py-1.5 rounded-lg transition-all cursor-pointer ${
            activeSegment === 'exams'
              ? 'bg-[#1F2538] text-white font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Exams ({examCountdowns.length})
        </button>
      </div>

      {/* 4. Segment Contents */}

      {/* A. TIMETABLE SCHEDULE & STUDY ALARMS */}
      {activeSegment === 'schedule' && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Daily Schedule · Day {selectedDay}</span>
            <span className="font-mono text-violet-300">4 Sessions Planned</span>
          </div>

          <div className="space-y-2">
            {timetable.map((session) => {
              const isCompleted = session.status === 'completed';
              const isOngoing = session.status === 'ongoing';
              const isAlarmOn = alarmStates[session.id] ?? false;

              return (
                <div
                  key={session.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    isOngoing
                      ? 'bg-[#171B2B] border-violet-500/40 shadow-sm'
                      : isCompleted
                      ? 'bg-[#12141F]/70 border-[#1B2030] opacity-60'
                      : 'bg-[#141724] border-[#1E2436]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <button
                        onClick={() => onToggleTimetableStatus(session.id)}
                        className="text-slate-500 hover:text-white transition-colors cursor-pointer mt-0.5"
                        title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-violet-300">
                            {session.timeStart} - {session.timeEnd}
                          </span>
                          {isOngoing && (
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                              Now
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">{session.type}</span>
                        </div>

                        <h3
                          className={`text-xs font-bold mt-0.5 truncate ${
                            isCompleted ? 'line-through text-slate-500' : 'text-white'
                          }`}
                        >
                          {session.title}
                        </h3>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{session.subjectName}</span>
                          <span>·</span>
                          <span>{session.room}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Alarm Reminder Toggle */}
                      <button
                        onClick={(e) => toggleAlarm(session.id, e)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                          isAlarmOn
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                            : 'bg-[#1A1F30] border-[#22283A] text-slate-500'
                        }`}
                        title={isAlarmOn ? 'Alarm active' : 'Alarm off'}
                      >
                        {isAlarmOn ? (
                          <Bell className="w-3.5 h-3.5" />
                        ) : (
                          <BellOff className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Focus button */}
                      <button
                        onClick={() => onStartFocus(session.subjectId)}
                        className="w-7 h-7 rounded-lg bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        title="Focus on this session"
                      >
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* B. TASKS & DEADLINES CHECKLIST */}
      {activeSegment === 'tasks' && (
        <div className="space-y-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'pending', label: 'Pending' },
              { id: 'high', label: 'High Priority' },
              { id: 'completed', label: 'Completed' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTaskFilter(f.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  taskFilter === f.id
                    ? 'bg-violet-600 text-white font-semibold'
                    : 'bg-[#141724] text-slate-400 hover:text-white border border-[#1E2436]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 bg-[#141724] rounded-2xl border border-[#1E2436]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-1.5" />
                <h3 className="text-xs font-bold text-white">No tasks found</h3>
                <p className="text-[11px] text-slate-400">All tasks in this filter are cleared.</p>
              </div>
            ) : (
              filteredTasks.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    t.completed
                      ? 'bg-[#12141F]/70 border-[#1B2030] opacity-60'
                      : 'bg-[#141724] border-[#1E2436]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button
                        onClick={() => onToggleTask(t.id)}
                        className="text-slate-500 hover:text-white transition-colors cursor-pointer shrink-0"
                      >
                        {t.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <h3
                          className={`text-xs font-medium truncate ${
                            t.completed ? 'line-through text-slate-500' : 'text-white'
                          }`}
                        >
                          {t.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span className="truncate">{t.subjectName}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {t.estimatedMinutes}m est.
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                        t.priority === 'high'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : t.priority === 'medium'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-[#1E2436] text-slate-300'
                      }`}
                    >
                      {t.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* C. EXAM COUNTDOWNS & DEADLINES */}
      {activeSegment === 'exams' && (
        <div className="space-y-2.5">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Semester Exams &amp; Evaluations</span>
            <span>Target: 80%+ Readiness</span>
          </div>

          <div className="space-y-2.5">
            {examCountdowns.map((exam) => (
              <div
                key={exam.id}
                className="p-3.5 rounded-2xl bg-[#141724] border border-[#1E2436] space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-violet-400 uppercase tracking-wider px-1.5 py-0.2 rounded bg-violet-600/15 border border-violet-500/30">
                        {exam.type}
                      </span>
                      <span className="text-[11px] text-slate-400">{exam.examDate}</span>
                    </div>

                    <h3 className="text-xs font-bold text-white mt-1 truncate">{exam.title}</h3>
                    <p className="text-[11px] text-slate-400 truncate">{exam.subjectName}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-white font-mono leading-none">
                      {exam.daysLeft}
                    </div>
                    <div className="text-[9px] text-amber-400 font-bold uppercase tracking-wider mt-0.5">
                      Days Left
                    </div>
                  </div>
                </div>

                {/* Readiness Meter */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Syllabus Readiness</span>
                    <span className="text-violet-300 font-bold font-mono">
                      {exam.readinessPct}% ({exam.topicsMastered}/{exam.topicsTotal} topics)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1E2436] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                      style={{ width: `${exam.readinessPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1C2132] text-[11px]">
                  <span className="text-slate-400">Recommended: 45m review</span>
                  <button
                    onClick={() => onStartFocus()}
                    className="font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Start Revision</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-[#131722] border border-[#232A3D] rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white">Add Study Task</h2>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Debug binary search tree"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#181C2B] border border-[#22283A] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={newTaskSubject}
                  onChange={(e) => setNewTaskSubject(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-[#181C2B] border border-[#22283A] text-white text-xs focus:outline-none focus:border-violet-500"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#181C2B] border border-[#22283A] text-white text-xs focus:outline-none focus:border-violet-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    step="5"
                    value={newTaskMinutes}
                    onChange={(e) => setNewTaskMinutes(parseInt(e.target.value) || 30)}
                    className="w-full px-3 py-2 rounded-xl bg-[#181C2B] border border-[#22283A] text-white text-xs focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-xs shadow-sm"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
