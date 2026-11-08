import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  FileText,
  Bookmark,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
  X,
  Copy,
  Check,
  Play,
  HelpCircle,
} from 'lucide-react';
import { Subject, NoteItem, FlashcardDeck, NavigationTab } from '../../types';

interface LearningViewProps {
  subjects: Subject[];
  notes: NoteItem[];
  flashcardDecks: FlashcardDeck[];
  onStartFocus: (subjectId?: string) => void;
  onNavigateTab: (tab: NavigationTab, prefillPrompt?: string) => void;
}

export const LearningView: React.FC<LearningViewProps> = ({
  subjects,
  notes,
  flashcardDecks,
  onStartFocus,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'subjects' | 'notes' | 'flashcards'>(
    'all'
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [activeNoteForReading, setActiveNoteForReading] = useState<NoteItem | null>(null);
  const [bookmarkedNotes, setBookmarkedNotes] = useState<Record<string, boolean>>({
    'note-1': true,
    'note-2': true,
  });
  const [copiedNote, setCopiedNote] = useState(false);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyNote = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 1800);
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDecks = flashcardDecks.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="pb-20 max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 pt-3.5 space-y-4">
      {/* 1. Header & Compact Search Bar */}
      <div className="space-y-2.5">
        <div>
          <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">
            Academic Knowledge Base
          </span>
          <h1 className="text-xl font-bold text-white tracking-tight">Learning Hub</h1>
        </div>

        {/* Compact Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subjects, notes, algorithms, operating systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#141724] border border-[#1E2436] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'subjects', label: `Subjects (${subjects.length})` },
            { id: 'notes', label: `Notes (${notes.length})` },
            { id: 'flashcards', label: `Flashcards (${flashcardDecks.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'bg-[#141724] text-slate-400 hover:text-white border border-[#1E2436]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SUBJECTS GRID */}
      {(activeCategory === 'all' || activeCategory === 'subjects') && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Enrolled Subjects</span>
            <span>{filteredSubjects.length} courses</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredSubjects.map((subj) => (
              <div
                key={subj.id}
                onClick={() => setSelectedSubjectId(subj.id)}
                className="p-3.5 rounded-2xl bg-[#141724] border border-[#1E2436] hover:border-violet-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-violet-400 uppercase tracking-wider px-1.5 py-0.2 rounded bg-violet-600/15 border border-violet-500/20">
                      {subj.code}
                    </span>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {subj.progress}%
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">
                    {subj.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{subj.instructor}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#1C2132]">
                  <div className="w-full h-1.5 bg-[#1E2336] rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${subj.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{subj.chaptersCount} chapters · {subj.notesCount} notes</span>
                    <span className="font-medium text-violet-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Open Topics <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. STUDY NOTES & SUMMARIES */}
      {(activeCategory === 'all' || activeCategory === 'notes') && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Study Notes &amp; Summaries</span>
            <span>{filteredNotes.length} notes</span>
          </div>

          <div className="space-y-2">
            {filteredNotes.map((note) => {
              const isBookmarked = bookmarkedNotes[note.id];

              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteForReading(note)}
                  className="p-3.5 rounded-2xl bg-[#141724] border border-[#1E2436] hover:border-violet-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="font-semibold text-violet-400">{note.subjectName}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {note.readTimeMinutes}m read
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors">
                        {note.title}
                      </h3>

                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {note.excerpt}
                      </p>

                      <div className="flex items-center gap-1 pt-1 flex-wrap">
                        {note.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] text-slate-400 px-1.5 py-0.2 rounded bg-[#181C2B] border border-[#22283A]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(note.id, e)}
                      className="p-1 rounded-lg bg-[#181C2B] hover:bg-[#20273D] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Note'}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isBookmarked ? 'text-amber-400 fill-amber-400' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. FLASHCARD DECKS */}
      {(activeCategory === 'all' || activeCategory === 'flashcards') && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Flashcard Decks &amp; Practice</span>
            <span>Spaced Repetition Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {filteredDecks.map((deck) => {
              const mastery = Math.round((deck.masteredCount / deck.cardsCount) * 100);

              return (
                <div
                  key={deck.id}
                  className="p-3.5 rounded-2xl bg-[#141724] border border-[#1E2436] flex flex-col justify-between space-y-2.5"
                >
                  <div>
                    <div className="w-7 h-7 rounded-lg bg-violet-600/15 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-1.5">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-semibold text-violet-400">
                      {deck.subjectName}
                    </span>
                    <h3 className="text-xs font-bold text-white mt-0.5">{deck.title}</h3>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#1C2132]">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{deck.cardsCount} cards</span>
                      <span className="text-emerald-400 font-semibold">{mastery}% Mastered</span>
                    </div>

                    <button
                      onClick={() =>
                        onNavigateTab(
                          'tutor',
                          `Quiz me on the "${deck.title}" flashcard deck with 5 multiple-choice questions.`
                        )
                      }
                      className="w-full py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Review Deck</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Note Reader Modal */}
      {activeNoteForReading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-[#131722] border border-[#232A3D] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E2436]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-semibold text-slate-400 truncate max-w-[200px]">
                  {activeNoteForReading.subjectName}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopyNote(activeNoteForReading.content)}
                  className="px-2 py-1 rounded-lg bg-[#181C2B] text-slate-300 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedNote ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveNoteForReading(null)}
                  className="w-7 h-7 rounded-full bg-[#181C2B] hover:bg-[#22283A] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  {activeNoteForReading.title}
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span>Updated {activeNoteForReading.updatedAt}</span>
                  <span>·</span>
                  <span>{activeNoteForReading.readTimeMinutes} min read</span>
                </div>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-mono bg-[#0D1017] p-3.5 rounded-2xl border border-[#1E2436]">
                {activeNoteForReading.content}
              </div>
            </div>

            <div className="p-3.5 bg-[#10141E] border-t border-[#1C2233] flex items-center justify-between">
              <button
                onClick={() => {
                  const note = activeNoteForReading;
                  setActiveNoteForReading(null);
                  onNavigateTab(
                    'tutor',
                    `Can you explain the key concepts and test my understanding of "${note.title}"?`
                  );
                }}
                className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Ask AI Tutor</span>
              </button>
              <button
                onClick={() => onStartFocus()}
                className="px-3 py-1.5 rounded-xl bg-[#181C2B] text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
              >
                Start Study Focus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subject Topic List Detail Drawer */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#131722] border border-[#232A3D] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1E2436]">
              <div>
                <span className="text-[9px] font-mono text-violet-400 uppercase font-bold">
                  {selectedSubject.code}
                </span>
                <h2 className="text-sm font-bold text-white tracking-tight">
                  {selectedSubject.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedSubjectId(null)}
                className="w-7 h-7 rounded-full bg-[#181C2B] hover:bg-[#22283A] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              <div className="p-3 rounded-xl bg-[#181C2B] border border-[#22283A] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Syllabus Mastery</div>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {selectedSubject.progress}%
                  </div>
                </div>
                <button
                  onClick={() => {
                    const sId = selectedSubject.id;
                    setSelectedSubjectId(null);
                    onStartFocus(sId);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start Focus</span>
                </button>
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Topic Outlines &amp; Chapters
                </h3>
                <div className="space-y-1.5">
                  {[
                    { title: 'Foundations & Invariants', status: 'Mastered', pct: 100 },
                    { title: 'Core Algorithms & Proofs', status: 'In Progress', pct: 85 },
                    { title: 'Advanced Dynamic Programming', status: 'Reviewing', pct: 60 },
                    { title: 'Midterm Problem Set & Quiz', status: 'Pending', pct: 20 },
                  ].map((topic, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-[#181C2B] border border-[#22283A] flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{topic.title}</div>
                        <div className="text-[10px] text-slate-400">{topic.status}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-violet-300">
                        {topic.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#10141E] border-t border-[#1C2233] flex justify-end">
              <button
                onClick={() => setSelectedSubjectId(null)}
                className="px-3 py-1.5 rounded-xl bg-[#181C2B] text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
