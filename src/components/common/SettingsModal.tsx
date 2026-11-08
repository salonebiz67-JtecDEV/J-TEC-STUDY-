import React, { useState } from 'react';
import {
  X,
  Clock,
  Shield,
  Smartphone,
  GraduationCap,
  Sparkles,
  Check,
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [dailyGoalHours, setDailyGoalHours] = useState(5);
  const [alarmSoundEnabled, setAlarmSoundEnabled] = useState(true);
  const [streakProtection, setStreakProtection] = useState(true);
  const [tutorContextEnabled, setTutorContextEnabled] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-sm sm:max-w-md bg-[#131722] border border-[#232A3D] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2436]">
          <h2 className="text-sm font-bold text-white tracking-tight">Profile &amp; Settings</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#181C2B] hover:bg-[#22283A] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* User Profile Card */}
          <div className="p-3 rounded-2xl bg-[#181D2B] border border-[#242B3F] flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/30"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-violet-600 text-white flex items-center justify-center text-[9px]">
                <GraduationCap className="w-2.5 h-2.5" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm truncate">{user.name}</h3>
                <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-violet-500/20 text-violet-300">
                  {user.ranking}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate">{user.title}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.university}</p>
            </div>
          </div>

          {/* Section: Study Preferences */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Study Targets
            </h4>
            <div className="space-y-2.5 bg-[#181D2B] p-3 rounded-2xl border border-[#242B3F]">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-200 text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-violet-400" />
                    Daily Target
                  </span>
                  <span className="text-violet-300 font-bold text-xs">{dailyGoalHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={dailyGoalHours}
                  onChange={(e) => setDailyGoalHours(parseFloat(e.target.value))}
                  className="w-full accent-violet-500 h-1 bg-[#252C40] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                  <span>2h</span>
                  <span>5h (Standard)</span>
                  <span>10h</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#23293D] flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">Study Alarms &amp; Chimes</div>
                  <div className="text-[10px] text-slate-400">Play chime when session starts</div>
                </div>
                <button
                  onClick={() => setAlarmSoundEnabled(!alarmSoundEnabled)}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                    alarmSoundEnabled ? 'bg-violet-600' : 'bg-[#293147]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      alarmSoundEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="pt-2 border-t border-[#23293D] flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">Streak Freeze Protection</div>
                  <div className="text-[10px] text-slate-400">Auto-protect streak on busy days</div>
                </div>
                <button
                  onClick={() => setStreakProtection(!streakProtection)}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                    streakProtection ? 'bg-violet-600' : 'bg-[#293147]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      streakProtection ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Section: AI Tutor Grounding */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              AI Tutor Intelligence
            </h4>
            <div className="bg-[#181D2B] p-3 rounded-2xl border border-[#242B3F] flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5" />
                <div>
                  <div className="text-xs font-medium text-white">Syllabus Grounding</div>
                  <div className="text-[10px] text-slate-400">Adapt explanations to course outlines</div>
                </div>
              </div>
              <button
                onClick={() => setTutorContextEnabled(!tutorContextEnabled)}
                className={`w-9 h-5 rounded-full transition-colors p-0.5 cursor-pointer ${
                  tutorContextEnabled ? 'bg-violet-600' : 'bg-[#293147]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    tutorContextEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Section: App Info */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              App Architecture
            </h4>
            <div className="bg-[#181D2B] p-3 rounded-2xl border border-[#242B3F] space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-400">
                  <Smartphone className="w-3 h-3" />
                  Target
                </span>
                <span className="font-mono text-slate-200">Capacitor Android + React 19</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-slate-400">
                  <Shield className="w-3 h-3" />
                  Build
                </span>
                <span className="text-emerald-400 font-semibold">Phase 1 UI Clean</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#10141E] border-t border-[#1C2233] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
          >
            {savedToast ? (
              <>
                <Check className="w-3 h-3" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
