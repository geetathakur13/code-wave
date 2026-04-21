'use client';
import { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '@/lib/gemini';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const SUGGESTIONS = [
  'Explain Binary Search',
  'What is Deadlock?',
  'Difference between TCP and UDP',
  'What is normalization in DBMS?',
  'Explain gradient descent',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hi! I'm StudyBot 🎓 Ask me anything about your CSE subjects — DSA, OS, DBMS, ML, and more!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.filter(m => m.role !== 'model' || messages.indexOf(m) > 0).map(m => ({ role: m.role, text: m.text }));
      const reply = await chatWithGemini(text.trim(), history);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I couldn't process that. Try again!" }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${open ? 'bg-gray-700 rotate-90 scale-90' : 'bg-primary-600 hover:bg-primary-700 hover:scale-105'}`}>
        {open ? <FiX size={22} className="text-white" /> : <FiMessageCircle size={22} className="text-white" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden" style={{ height: '480px' }}>
          {/* Header */}
          <div className="px-4 py-3 bg-primary-600 text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
            <div>
              <p className="font-semibold text-sm">StudyBot</p>
              <p className="text-xs text-primary-100">AI Study Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-md'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-md'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => send(s)}
                  className="px-3 py-1.5 text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-slate-800 rounded-xl text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400" />
              <button onClick={() => send(input)} disabled={!input.trim() || loading}
                className="p-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
