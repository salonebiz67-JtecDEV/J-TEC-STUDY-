import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types';

interface AndroidTopBarProps {
  activeTab: NavigationTab;
  user: UserProfile;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
}

const tabTitles: Record<NavigationTab, string> = {
  home: 'JTEC STUDY',
  planner: 'Planner',
  tutor: 'AI Tutor',
  learning: 'Learning',
  progress: 'Progress',
};

export const AndroidTopBar: React.FC<AndroidTopBarProps> = ({
  activeTab,
  user,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0E111A]/95 backdrop-blur-md border-b border-[#1A1F2E] px-4 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-3 max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        {/* Essential Brand Zone */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-violet-900/30 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-violet-100" />
          </div>

          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-sm font-bold text-white tracking-tight truncate">
              {tabTitles[activeTab]}
            </span>
            {activeTab !== 'home' && (
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                · JTEC Study
              </span>
            )}
          </div>
        </div>

        {/* Essential Right Actions: Notifications & Profile/Settings */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            title="Notifications"
            className="relative w-8 h-8 rounded-full bg-[#151926] hover:bg-[#1E2436] border border-[#22283A] flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-violet-400 ring-2 ring-[#0E111A]" />
            )}
          </button>

          {/* User Profile / Settings Avatar */}
          <button
            onClick={onOpenProfile}
            title="Profile & Settings"
            className="w-8 h-8 rounded-full ring-1.5 ring-violet-500/30 hover:ring-violet-400 transition-all overflow-hidden cursor-pointer"
            aria-label="Profile and Settings"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
