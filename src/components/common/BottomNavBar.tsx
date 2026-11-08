import React from 'react';
import { Home, Calendar, Sparkles, BookOpen, TrendingUp } from 'lucide-react';
import { NavigationTab } from '../../types';

interface BottomNavBarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'planner', label: 'Planner', icon: Calendar, badge: '2' },
  { id: 'tutor', label: 'AI Tutor', icon: Sparkles },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F121C]/95 backdrop-blur-md border-t border-[#1A1F2E] shadow-[0_-4px_20px_rgba(0,0,0,0.5)] transition-all"
      aria-label="Bottom navigation"
    >
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-3 pt-1 pb-[max(env(safe-area-inset-bottom),0.35rem)]">
        <ul className="grid grid-cols-5 items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id} className="flex justify-center">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`flex flex-col items-center justify-center w-full py-1 px-1 rounded-xl transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-violet-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 font-medium'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div className="relative">
                    <div
                      className={`w-8 h-6 flex items-center justify-center rounded-lg transition-all duration-150 ${
                        isActive
                          ? 'bg-violet-500/15 text-violet-400'
                          : 'text-slate-400'
                      }`}
                    >
                      <Icon
                        className={`w-[18px] h-[18px] transition-transform duration-150 ${
                          isActive ? 'scale-105 text-violet-400 stroke-[2.2]' : 'stroke-[1.8]'
                        }`}
                      />
                    </div>
                    {item.badge && !isActive && (
                      <span className="absolute -top-0.5 -right-1 w-3.5 h-3.5 rounded-full bg-violet-600 text-[8px] font-bold text-white flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-[10px] leading-tight mt-0.5 tracking-tight transition-colors ${
                      isActive ? 'text-violet-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
