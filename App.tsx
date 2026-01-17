
import React, { useState, useRef, useEffect } from 'react';
import { Sender, Message } from './types';
import { sendMessageToAI } from './services/geminiService';
import { MessageBubble } from './components/MessageBubble';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: Sender.AI,
      text: "ยินดีต้อนรับสู่ **ScriptMaster AI Lab v3.0**\n\nระบบวิเคราะห์สถาปัตยกรรมซอฟต์แวร์และวิจัยความปลอดภัยทางไซเบอร์พร้อมทำงานแล้ว\n\nคุณสามารถถามเกี่ยวกับ:\n- **Game Architecture:** การทำงานของเอนจิ้นเกม\n- **Computer Vision:** การวิเคราะห์ภาพและ Object Tracking\n- **Memory Management:** การทำงานของ RAM และ Register\n- **Cyber Defense:** กลไกการตรวจจับของ Anti-Cheat รุ่นใหม่\n\n*ป้อนคำสั่งหรือคำถามทางเทคนิคของคุณด้านล่าง*",
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: Sender.USER,
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await sendMessageToAI(messages, input);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: Sender.AI,
      text: aiResponseText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200">
      {/* Top Nav */}
      <nav className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between shadow-2xl z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-cyan-600 flex items-center justify-center shadow-[0_0_15px_rgba(8,145,178,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tighter uppercase italic">
              ScriptMaster <span className="text-cyan-400">Research_Lab</span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500/80">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
              CORE_ENGINE_ACTIVE [GEMINI_3_PRO]
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-[10px] font-mono text-slate-500">
          <div className="flex flex-col items-end">
            <span className="text-slate-400">LATENCY</span>
            <span className="text-green-500">24ms</span>
          </div>
          <div className="flex flex-col items-end border-l border-slate-800 pl-6">
            <span className="text-slate-400">ENCRYPTION</span>
            <span className="text-cyan-500">AES-256</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Info - Desktop Only */}
        <aside className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 flex-col p-4 font-mono text-[10px] gap-6">
          <section>
            <h3 className="text-slate-500 mb-2 uppercase border-b border-slate-800 pb-1">System Diagnostics</h3>
            <div className="space-y-1">
              <div className="flex justify-between"><span>CPU_LOAD:</span><span className="text-cyan-400">12.4%</span></div>
              <div className="flex justify-between"><span>RAM_USAGE:</span><span className="text-cyan-400">4.2GB</span></div>
              <div className="flex justify-between"><span>UPLINK:</span><span className="text-green-500">STABLE</span></div>
            </div>
          </section>
          
          <section>
            <h3 className="text-slate-500 mb-2 uppercase border-b border-slate-800 pb-1">Security Modules</h3>
            <div className="space-y-2">
              <div className="p-2 bg-slate-800/50 rounded border border-slate-700">
                <p className="text-white">Anti-Cheat Analysis</p>
                <p className="text-[9px] opacity-60">Deep packet inspection enabled</p>
              </div>
              <div className="p-2 bg-slate-800/50 rounded border border-slate-700">
                <p className="text-white">CV Tracking</p>
                <p className="text-[9px] opacity-60">Real-time object detection</p>
              </div>
            </div>
          </section>

          <div className="mt-auto opacity-30 italic">
            "Knowledge is the ultimate bypass."
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Ethics Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-red-900/10 border-b border-red-900/20 px-4 py-1 flex justify-center items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest">Research Mode Active: All generated scripts are for educational analysis only</span>
          </div>

          <main 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 pt-10"
          >
            <div className="max-w-4xl mx-auto">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-6">
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-duration:0.6s]"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></div>
                      <span className="ml-2 text-[10px] font-mono text-cyan-400 animate-pulse uppercase">Compiling Logic...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Input Footer */}
          <footer className="p-4 bg-slate-900 border-t border-slate-800 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-900 to-blue-900 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
              <div className="relative flex items-end gap-2 bg-slate-950 rounded-xl border border-slate-700 p-2 focus-within:border-cyan-600 transition-colors">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="ป้อนคำถามเกี่ยวกับตรรกะ, วิศวกรรมย้อนกลับ, หรือสถาปัตยกรรมระบบ..."
                  className="flex-1 bg-transparent text-slate-100 py-2 px-3 focus:outline-none resize-none min-h-[44px] max-h-[200px] text-sm md:text-base scroll-m-1"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${
                    isLoading || !input.trim() 
                    ? 'text-slate-700' 
                    : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center max-w-4xl mx-auto mt-2 px-2">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest italic">Terminal Access Restricted to Level 4 Personnel</span>
              <span className="text-[9px] font-mono text-slate-600 uppercase">Powered by ScriptMaster.Engine</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
