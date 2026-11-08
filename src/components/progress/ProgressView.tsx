import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Flame,
  Award,
  Download,
  Info,
  Sparkles,
} from 'lucide-react';
import { WeeklyStudyData, Subject, AchievementBadge, UserProfile } from '../../types';

interface ProgressViewProps {
  user: UserProfile;
  weeklyData: WeeklyStudyData[];
  subjects: Subject[];
  badges: AchievementBadge[];
  onStartFocus: (subjectId?: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  weeklyData,
  subjects,
  badges,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(6); // Default Sunday
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalWeeklyHours = weeklyData.reduce((acc, curr) => acc + curr.hours, 0);
  const averageDailyHours = (totalWeeklyHours / weeklyData.length).toFixed(1);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const selectedData = selectedDayIndex !== null ? weeklyData[selectedDayIndex] : weeklyData[6];
  const maxHours = 7.0;

  return (
    <div className="pb-20 max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 pt-3.5 space-y-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header & Demonstration Notice */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">
              Performance Analytics
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">Study Insights</h1>
          </div>

          <button
            onClick={() => showToast('Study report PDF exported')}
            className="px-2.5 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1C2132] border border-[#1E2436] text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* Clear Demonstration Data Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-950/30 border border-violet-500/20 text-[11px] text-violet-300">
          <Info className="w-3.5 h-3.5 text-violet-400 shrink-0" />
          <span>Demonstration Data · Sample Semester Analytics for Alex Morgan</span>
        </div>
      </div>

      {/* 2. Time Range Switcher */}
      <div className="grid grid-cols-3 p-1 bg-[#141724] rounded-xl border border-[#1E2436] text-xs font-medium">
        {(['week', 'month', 'semester'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
              timeRange === range
                ? 'bg-violet-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {range === 'week' ? 'This Week' : range === 'month' ? 'Last 30 Days' : 'Full Semester'}
          </button>
        ))}
      </div>

      {/* 3. Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-3 rounded-2xl bg-[#141724] border border-[#1E2436]">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Study Time
          </div>
          <div className="text-lg font-bold text-white font-mono mt-0.5">
            {totalWeeklyHours.toFixed(1)}h
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">+14% vs last week</div>
        </div>

        <div className="p-3 rounded-2xl bg-[#141724] border border-[#1E2436]">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Daily Average
          </div>
          <div className="text-lg font-bold text-white font-mono mt-0.5">
            {averageDailyHours}h
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Goal: 5.0h/day</div>
        </div>

        <div className="p-3 rounded-2xl bg-[#141724] border border-[#1E2436]">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Deep Focus
          </div>
          <div className="text-lg font-bold text-white font-mono mt-0.5">86.4%</div>
          <div className="text-[10px] text-violet-400 mt-0.5">High efficiency</div>
        </div>

        <div className="p-3 rounded-2xl bg-[#141724] border border-[#1E2436]">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Streak Status
          </div>
          <div className="text-lg font-bold text-amber-300 font-mono mt-0.5 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {user.currentStreak}d
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Best: {user.bestStreak}d</div>
        </div>
      </div>

      {/* 4. Weekly Study Hours Interactive Chart */}
      <div className="p-3.5 rounded-2xl bg-[#141724] border border-[#1E2436] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Study Hours vs Target
            </h2>
          </div>
          <div className="flex items-center gap-2.5 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded bg-violet-600 inline-block" /> Hours
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-amber-400 inline-block" /> 5h Target
            </span>
          </div>
        </div>

        {/* SVG Chart Container */}
        <div>
          <div className="relative w-full h-36 flex items-end justify-between px-1 pb-5 border-b border-[#1E2436]">
            {/* Target line indicator at 5.0h */}
            <div
              className="absolute left-0 right-0 border-b border-dashed border-amber-400/40 pointer-events-none z-10"
              style={{ bottom: `${(5.0 / maxHours) * 100}%` }}
            >
              <span className="absolute -top-3 right-1 text-[8px] font-mono text-amber-400/80">
                Target 5h
              </span>
            </div>

            {/* Bars */}
            {weeklyData.map((item, index) => {
              const heightPct = (item.hours / maxHours) * 100;
              const isSelected = selectedDayIndex === index;
              const hitsTarget = item.hours >= item.targetHours;

              return (
                <div
                  key={item.day}
                  onClick={() => setSelectedDayIndex(index)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer px-0.5 relative"
                >
                  {/* Tooltip on active */}
                  {isSelected && (
                    <div className="absolute -top-5 px-1 py-0.2 rounded bg-violet-600 text-white font-mono text-[9px] font-bold z-20 whitespace-nowrap">
                      {item.hours}h
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className={`w-full max-w-[26px] rounded-t-lg transition-all duration-200 ${
                      isSelected
                        ? 'bg-violet-500 shadow-sm shadow-violet-500/30'
                        : hitsTarget
                        ? 'bg-violet-600/80 hover:bg-violet-500/90'
                        : 'bg-[#1E2436] hover:bg-[#283048]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />

                  {/* Day label */}
                  <span
                    className={`absolute -bottom-4 text-[10px] font-medium ${
                      isSelected ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Inspected Day Details */}
          {selectedData && (
            <div className="mt-3 p-2.5 rounded-xl bg-[#181C2B] border border-[#202638] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">
                  {selectedData.day} ({selectedData.dateStr})
                </span>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Deep Focus: {selectedData.deepFocusPct}%
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold font-mono text-violet-300">
                  {selectedData.hours} Hours Logged
                </span>
                <div className="text-[10px] text-emerald-400 font-medium">
                  {selectedData.hours >= selectedData.targetHours
                    ? 'Target Reached'
                    : `${(selectedData.targetHours - selectedData.hours).toFixed(1)}h under goal`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Subject Performance Breakdown */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">
          Subject Performance
        </h2>

        <div className="space-y-2">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              className="p-3 rounded-2xl bg-[#141724] border border-[#1E2436] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{subj.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">({subj.code})</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {subj.chaptersCount} chapters · Last studied {subj.lastStudied}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-violet-300">
                    {subj.progress}%
                  </span>
                  <div className="text-[10px] font-semibold text-emerald-400">Grade: A</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#1E2336] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                  style={{ width: `${subj.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Milestone Goals & Achievements */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Achievements &amp; Badges
          </h2>
          <span className="text-[11px] text-slate-400">
            {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border transition-all ${
                badge.unlocked
                  ? 'bg-[#141724] border-violet-500/25'
                  : 'bg-[#12141F]/60 border-[#1B2030] opacity-60'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    badge.unlocked
                      ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                      : 'bg-[#181C2B] text-slate-500'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-white truncate">{badge.title}</h3>
                    {badge.unlocked && (
                      <span className="text-[9px] font-semibold text-emerald-400">Unlocked</span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                    {badge.description}
                  </p>

                  {!badge.unlocked && (
                    <div className="mt-1.5">
                      <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
                        <span>Progress</span>
                        <span>
                          {badge.progress} / {badge.maxProgress}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-[#1E2336] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-600 rounded-full"
                          style={{
                            width: `${(badge.progress / badge.maxProgress) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
