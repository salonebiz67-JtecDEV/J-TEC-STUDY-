import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Paperclip,
  Mic,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Bot,
  User,
} from 'lucide-react';
import { TutorMessage, Subject } from '../../types';
import { sampleSuggestedPrompts } from '../../data/mockData';

interface TutorViewProps {
  subjects: Subject[];
  initialMessages: TutorMessage[];
  prefilledPrompt?: string;
  onClearPrefill?: () => void;
}

const KNOWLEDGE_RESPONSES: Record<string, Partial<TutorMessage>> = {
  dijkstra: {
    content:
      'Here is the core difference between **Dijkstra** and **A*** search:\n\n1. **Uniform vs Directed Exploration:** Dijkstra expands outward evenly in all directions without any concept of where the target is. A* uses a heuristic $h(n)$ to bias node expansion directly toward the goal.\n2. **Complexity:** Both use a priority queue $O((V+E) \\log V)$, but A* evaluates far fewer total states on real-world graphs.\n3. **Optimality Guarantee:** As long as $h(n)$ is **admissible** (never overestimates the true distance) and **consistent**, A* is guaranteed to return the minimal cost path.',
    codeSnippet: {
      language: 'python',
      code: '# A* evaluation cost\nf_cost = g_cost + heuristic(current_node, target_node)\n\n# Priority queue pop gives lowest f_cost',
    },
    keyTakeaways: [
      'Admissible heuristic ensures optimal pathfinding.',
      'Dijkstra is equivalent to A* where h(n) = 0 for all nodes.',
    ],
    followUpSuggestions: [
      'What happens if a heuristic is inadmissible?',
      'How does Manhattan vs Euclidean distance affect A*?',
    ],
  },
  scheduling: {
    content:
      'In modern operating systems, CPU scheduling governs process execution:\n\n- **Round Robin (RR):** Preemptive, time-sliced allocation. Prevents CPU starvation.\n- **Shortest Job First (SJF):** Mathematically optimal average wait time, but impossible to know exact future burst duration.\n- **Multi-Level Feedback Queue (MLFQ):** Modern hybrid approach used by Linux and macOS. Processes that exhaust their time slice are demoted to lower-priority queues.',
    codeSnippet: {
      language: 'c',
      code: '// CFS (Completely Fair Scheduler) virtual runtime tracking\nstruct sched_entity {\n    u64 vruntime;\n    /* lowest vruntime picked next via red-black tree */\n};',
    },
    keyTakeaways: [
      'MLFQ prevents starvation with periodic priority boosting.',
      'Linux uses CFS (Completely Fair Scheduler) powered by a Red-Black Tree.',
    ],
    followUpSuggestions: [
      'Explain CFS virtual runtime calculation',
      'What is priority inversion and how does priority inheritance fix it?',
    ],
  },
  default: {
    content:
      'Here is a structured explanation based on your active university syllabus:\n\n1. **Fundamental Definition:** Understand the base invariants first.\n2. **Mechanisms & Edge Cases:** Watch out for boundary conditions, memory boundaries, and state transitions.\n3. **Application:** Apply standard test cases and verify algorithmic runtime bounds.',
    keyTakeaways: [
      'Formulate edge cases first before writing the complete proof.',
      'Verify time and space complexities against syllabus constraints.',
    ],
    followUpSuggestions: [
      'Generate 3 practice quiz questions on this',
      'Explain this using an intuitive real-world analogy',
    ],
  },
};

export const TutorView: React.FC<TutorViewProps> = ({
  subjects,
  initialMessages,
  prefilledPrompt,
  onClearPrefill,
}) => {
  const [messages, setMessages] = useState<TutorMessage[]>(initialMessages);
  const [inputText, setInputText] = useState(prefilledPrompt || '');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefilledPrompt) {
      setInputText(prefilledPrompt);
      if (onClearPrefill) onClearPrefill();
    }
  }, [prefilledPrompt, onClearPrefill]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMsg: TutorMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: query.trim(),
      subject: selectedSubject !== 'All' ? selectedSubject : undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let match = KNOWLEDGE_RESPONSES.default;
      if (lower.includes('dijkstra') || lower.includes('a*') || lower.includes('graph')) {
        match = KNOWLEDGE_RESPONSES.dijkstra;
      } else if (lower.includes('schedul') || lower.includes('os') || lower.includes('cpu')) {
        match = KNOWLEDGE_RESPONSES.scheduling;
      }

      const aiMsg: TutorMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: match.content || '',
        codeSnippet: match.codeSnippet,
        keyTakeaways: match.keyTakeaways,
        followUpSuggestions: match.followUpSuggestions,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 1800);
  };

  const handleClearHistory = () => {
    setMessages(initialMessages.slice(0, 2));
    showToast('Conversation reset');
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-6.5rem)] max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-3 py-1 bg-violet-600 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Subject Selector Bar */}
      <div className="px-4 py-2 bg-[#0E111A] border-b border-[#1A1F2E] shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-white">Subject Context</span>
            <span className="text-[10px] text-slate-400">· JTEC Core</span>
          </div>

          <button
            onClick={handleClearHistory}
            className="text-[10px] font-medium text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            title="Reset Chat"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Subject Chips */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          {['All', ...subjects.map((s) => s.name.split(' ')[0])].map((name) => (
            <button
              key={name}
              onClick={() => setSelectedSubject(name)}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === name
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'bg-[#141724] text-slate-400 hover:text-white border border-[#1E2436]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#181D2E] text-violet-300 border border-violet-500/25'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-violet-600 text-white rounded-tr-xs'
                    : 'bg-[#141724] text-slate-200 border border-[#1E2436] rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.content}</div>

                {msg.codeSnippet && (
                  <div className="rounded-xl bg-[#0B0D14] border border-[#1C2130] overflow-hidden text-left font-mono">
                    <div className="flex items-center justify-between px-2.5 py-1 bg-[#101420] border-b border-[#1C2130] text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-semibold text-slate-300">
                        <Code2 className="w-3 h-3 text-violet-400" />
                        {msg.codeSnippet.language}
                      </span>
                      <button
                        onClick={() => handleCopyCode(msg.id, msg.codeSnippet!.code)}
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedCodeId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-2.5 text-[11px] text-violet-200 overflow-x-auto leading-relaxed">
                      <code>{msg.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {msg.keyTakeaways && msg.keyTakeaways.length > 0 && (
                  <div className="p-2 rounded-xl bg-[#181C2B] border border-[#22283A] space-y-1">
                    <div className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">
                      Key Takeaways
                    </div>
                    <ul className="space-y-0.5">
                      {msg.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-1 text-[11px] text-slate-300">
                          <span className="text-violet-400 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                  <div className="space-y-1 pt-0.5">
                    <div className="text-[10px] font-medium text-slate-400">Follow-up:</div>
                    <div className="flex flex-wrap gap-1">
                      {msg.followUpSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-2 py-0.5 rounded-lg bg-[#181D2E] hover:bg-[#20273D] border border-[#222A40] text-[10px] text-violet-300 hover:text-white transition-colors cursor-pointer text-left"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-[9px] opacity-60 text-right font-mono">{msg.timestamp}</div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-2 animate-in fade-in">
            <div className="w-5 h-5 rounded-lg bg-[#181D2E] border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Sparkles className="w-3 h-3 animate-spin" />
            </div>
            <span className="text-[11px] text-slate-400">Formulating explanation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Strip */}
      <div className="px-4 py-1 bg-[#0E111A] border-t border-[#1A1F2E] shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          <span className="text-[10px] font-semibold text-slate-400 shrink-0">Prompts:</span>
          {sampleSuggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2 py-0.5 rounded-lg bg-[#141724] hover:bg-[#1E2336] border border-[#1E2436] text-[10px] text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Compact Bottom Input Composer */}
      <div className="p-2.5 bg-[#0E111A] border-t border-[#1A1F2E] shrink-0 mb-12 sm:mb-14">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => showToast('Attach lecture PDF')}
            className="w-8 h-8 rounded-xl bg-[#141724] hover:bg-[#1C2132] border border-[#1E2436] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Attach file"
          >
            <Paperclip className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRecording(!isRecording);
              showToast(isRecording ? 'Voice memo stopped' : 'Listening...');
            }}
            className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isRecording
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-[#141724] hover:bg-[#1C2132] border-[#1E2436] text-slate-400 hover:text-white'
            }`}
            title="Voice query"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask JTEC Tutor about any concept or problem..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-[#141724] border border-[#1E2436] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white flex items-center justify-center shadow-sm transition-all cursor-pointer shrink-0"
            aria-label="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
