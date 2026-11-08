import React from 'react';
import { X, Bell, Clock, Calendar, Flame, Sparkles } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: 'home' | 'planner' | 'tutor' | 'learning' | 'progress') => void;
}

interface Notice {
  id: string;
  type: 'alarm' | 'assignment' | 'streak' | 'coach';
  title: string;
  timeAgo: string;
  description: string;
  read: boolean;
  targetTab?: 'home' | 'planner' | 'tutor' | 'learning' | 'progress';
}

const initialNotices: Notice[] = [
  {
    id: 'n-1',
    type: 'alarm',
    title: 'Upcoming: Algorithms Seminar',
    timeAgo: 'In 42 mins',
    description: 'Hall B-204 with Prof. Vance. Dynamic Graph Shortest Paths.',
    read: false,
    targetTab: 'planner',
  },
  {
    id: 'n-2',
    type: 'assignment',
    title: 'Assignment Due Tomorrow',
    timeAgo: '2h ago',
    description: 'Red-Black Tree balance implementation is due tomorrow at 11:59 PM.',
    read: false,
    targetTab: 'planner',
  },
  {
    id: 'n-3',
    type: 'streak',
    title: '14-Day Streak Maintained',
    timeAgo: 'Yesterday',
    description: 'You logged 3h 48m of focused study. Keep the momentum going!',
    read: true,
    targetTab: 'progress',
  },
  {
    id: 'n-4',
    type: 'coach',
    title: 'AI Coach Study Tip',
    timeAgo: 'Yesterday',
    description: 'Review Dijkstra complexity before tomorrow\'s quiz to maximize retention.',
    read: true,
    targetTab: 'tutor',
  },
];

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const [notices, setNotices] = React.useState<Notice[]>(initialNotices);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotices((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: Notice['type']) => {
    switch (type) {
      case 'alarm':
        return <Clock className="w-3.5 h-3.5 text-amber-400" />;
      case 'assignment':
        return <Calendar className="w-3.5 h-3.5 text-violet-400" />;
      case 'streak':
        return <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />;
      case 'coach':
        return <Sparkles className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-sm sm:max-w-md bg-[#131722] border border-[#232A3D] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2436]">
          <div className="flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-violet-400" />
            <h2 className="text-xs font-bold text-white tracking-tight">Study Alerts</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-[10px] font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[#181C2B] hover:bg-[#22283A] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notice List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {notices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => {
                if (notice.targetTab && onNavigateToTab) {
                  onNavigateToTab(notice.targetTab);
                  onClose();
                }
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                notice.read
                  ? 'bg-[#181D2B]/60 border-[#22283A] text-slate-300 hover:bg-[#1D2233]'
                  : 'bg-[#1C2132] border-violet-500/30 text-white hover:border-violet-500/50 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#22283C] border border-[#2B334B] flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notice.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <h3 className="text-xs font-bold truncate text-white">{notice.title}</h3>
                    <span className="text-[9px] text-slate-400 whitespace-nowrap">
                      {notice.timeAgo}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-[#10141E] border-t border-[#1C2233] text-center">
          <p className="text-[10px] text-slate-500">
            JTEC Study timetable synchronization
          </p>
        </div>
      </div>
    </div>
  );
};
