import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Minimize2,
  Flame,
} from 'lucide-react';
import { Subject } from '../../types';

interface FocusModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: Subject[];
  initialSubjectId?: string;
  onSessionComplete?: (minutes: number, subjectName: string) => void;
}

const AMBIENT_TRACKS = [
  { id: 'off', name: 'Mute' },
  { id: 'rain', name: 'Rain' },
  { id: 'lofi', name: 'Lo-Fi Chill' },
  { id: 'coffee', name: 'Cafe' },
  { id: 'noise', name: 'Brown Noise' },
];

export const FocusModeModal: React.FC<FocusModeModalProps> = ({
  isOpen,
  onClose,
  subjects,
  initialSubjectId,
  onSessionComplete,
}) => {
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    initialSubjectId || subjects[0]?.id || ''
  );
  const [ambientSound, setAmbientSound] = useState('lofi');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setSecondsRemaining(sessionMinutes * 60);
    }
  }, [sessionMinutes, isActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isActive && secondsRemaining === 0) {
      setIsActive(false);
      setIsCompleted(true);
      const chosenSubject = subjects.find((s) => s.id === selectedSubjectId);
      if (onSessionComplete) {
        onSessionComplete(sessionMinutes, chosenSubject?.name || 'General Study');
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsRemaining, sessionMinutes, selectedSubjectId, subjects, onSessionComplete]);

  if (!isOpen) return null;

  const currentMinutes = Math.floor(secondsRemaining / 60);
  const currentSeconds = secondsRemaining % 60;
  const progressPct = ((sessionMinutes * 60 - secondsRemaining) / (sessionMinutes * 60)) * 100;

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsCompleted(false);
    setSecondsRemaining(sessionMinutes * 60);
  };

  const addFiveMinutes = () => {
    setSecondsRemaining((prev) => prev + 300);
  };

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-sm sm:max-w-md bg-[#131722] border border-[#232A3D] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2436]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-tight">Focus Session</h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[#181C2B] hover:bg-[#22283A] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 flex-1 overflow-y-auto flex flex-col items-center space-y-3">
          {/* Subject Selector */}
          <div className="w-full">
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs">
              {subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubjectId(s.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                    selectedSubjectId === s.id
                      ? 'bg-violet-600 text-white font-semibold'
                      : 'bg-[#181C2B] text-slate-400 hover:bg-[#20273A] border border-[#22283A]'
                  }`}
                >
                  {s.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Presets */}
          <div className="flex items-center gap-1 bg-[#181C2B] p-1 rounded-xl border border-[#22283A]">
            {[
              { min: 15, label: '15m Sprint' },
              { min: 25, label: '25m Pomodoro' },
              { min: 50, label: '50m Deep' },
            ].map((p) => (
              <button
                key={p.min}
                disabled={isActive}
                onClick={() => {
                  setSessionMinutes(p.min);
                  setSecondsRemaining(p.min * 60);
                  setIsCompleted(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  sessionMinutes === p.min
                    ? 'bg-violet-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Circular Countdown Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center my-1">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-[#1C2132]"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="88"
                cy="88"
                r={radius}
                className="stroke-violet-500 transition-all duration-300"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progressPct / 100)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {isCompleted ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-0.5" />
                  <span className="text-sm font-bold text-white">Done!</span>
                  <span className="text-[10px] text-emerald-300">+25 XP Logged</span>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-extrabold text-white tracking-tight font-mono tabular-nums">
                    {String(currentMinutes).padStart(2, '0')}:{String(currentSeconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-violet-300 font-medium mt-1 truncate max-w-[140px]">
                    {selectedSubject ? selectedSubject.name : 'Focus Session'}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {isActive ? 'Deep focus active' : 'Paused'}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={resetTimer}
              className="w-9 h-9 rounded-xl bg-[#181C2B] hover:bg-[#22283A] border border-[#22283A] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTimer}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{secondsRemaining === sessionMinutes * 60 ? 'Start Focus' : 'Resume'}</span>
                </>
              )}
            </button>

            <button
              onClick={addFiveMinutes}
              className="px-2.5 py-2 rounded-xl bg-[#181C2B] hover:bg-[#22283A] border border-[#22283A] text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Add 5 Minutes"
            >
              +5m
            </button>
          </div>

          {/* Ambient Sound Bar */}
          <div className="w-full p-2.5 rounded-xl bg-[#181C2B] border border-[#22283A]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                {ambientSound === 'off' ? (
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-violet-400" />
                )}
                <span>Ambient Audio</span>
              </div>
              <span className="text-[10px] text-slate-400">
                {ambientSound === 'off' ? 'Muted' : 'Playing'}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {AMBIENT_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setAmbientSound(track.id)}
                  className={`py-1 rounded-md text-[10px] text-center truncate transition-colors cursor-pointer ${
                    ambientSound === track.id
                      ? 'bg-violet-600 text-white font-medium'
                      : 'bg-[#131722] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {track.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#10141E] border-t border-[#1C2233] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Streak protected today</span>
          </div>
          <button
            onClick={onClose}
            className="font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
          >
            Keep in Background
          </button>
        </div>
      </div>
    </div>
  );
};
