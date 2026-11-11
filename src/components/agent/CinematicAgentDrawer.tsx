"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Volume2, VolumeX, Sparkles, RefreshCw, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
}

interface CinematicAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CinematicAgentDrawer({ isOpen, onClose }: CinematicAgentDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "agent",
      text: PORTFOLIO_DATA.agentData.welcomeMessage,
      timestamp: "00:00",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsThinking(true);

    setTimeout(() => {
      let reply = "";
      const lower = query.toLowerCase();

      const matchedSample = PORTFOLIO_DATA.agentData.sampleQuestions.find(
        (s) => lower.includes(s.prompt.toLowerCase().slice(0, 15)) || query === s.prompt
      );

      if (matchedSample) {
        reply = matchedSample.answer;
      } else if (lower.includes("instagram") || lower.includes("vibe") || lower.includes("content") || lower.includes("channel") || lower.includes("unpacked")) {
        reply = `Nasir runs @vibecode_unpacked on Instagram (https://www.instagram.com/vibecode_unpacked/), where he creates developer tutorials unpacking vibe coding, AI autonomous agents (LangGraph, CrewAI, MCP), Flutter cross-platform architecture, and practical engineering workflows.`;
      } else if (lower.includes("france") || lower.includes("master") || lower.includes("scholarship") || lower.includes("campus france") || lower.includes("academic") || lower.includes("gpa")) {
        reply = `Nasir is an applicant for French M.Sc. programs (Campus France EEF). He completed his B.S. in Computer Science at COMSATS Islamabad (CGPA 3.23 / 4.00, 133 credit hours, English medium) with Grade A in French university coursework and IELTS Academic 6.5. He also engineered the 'France University Research Agent'.`;
      } else if (lower.includes("nizaam") || lower.includes("saas") || lower.includes("shop") || lower.includes("store") || lower.includes("client")) {
        reply = `Nasir independently built and commercialized NIZAAM SaaS, a multi-tenant retail management platform serving 100+ shops in Pakistan with Flutter, Riverpod, Supabase/PostgreSQL (RLS), and offline sync queues with idempotency safeguards.`;
      } else if (lower.includes("glowsims") || lower.includes("talib") || lower.includes("latency") || lower.includes("crifly") || lower.includes("bakey") || lower.includes("backey") || lower.includes("shoutsy")) {
        reply = `At Crifly, Nasir engineered and shipped flagship commercial Flutter apps including Got Bakey (an Australian artisanal bakery marketplace with SOS on-demand ordering) and Shoutsy (an influencer and brand marketing collaboration network), maintaining 95%+ cross-platform code reuse. At GLOWSIMS, he reduced backend p95 response latency by 62% on the Talib app (10k+ downloads).`;
      } else if (lower.includes("hire") || lower.includes("contact") || lower.includes("email") || lower.includes("available")) {
        reply = `Nasir is actively evaluating French graduate research admissions, European software engineering roles, and SaaS commissions. Direct dispatch: ${PORTFOLIO_DATA.profile.email} or WhatsApp at ${PORTFOLIO_DATA.profile.phone}.`;
      } else {
        reply = `Nasir Shahzad is an Applied AI & Software Engineer (COMSATS CS Graduate, CGPA 3.23). He built NIZAAM SaaS (100+ stores), BrainBee AI platform (3,000+ users), runs @vibecode_unpacked, and is targeting French M.Sc. admissions. Feel free to ask specifically about his projects, technical stack, or research!`;
      }

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsThinking(false);
      speakText(reply);
    }, 600);
  };

  const handleResetChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setMessages([
      {
        id: "init",
        sender: "agent",
        text: PORTFOLIO_DATA.agentData.welcomeMessage,
        timestamp: "00:00",
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end sm:p-6 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="w-full sm:max-w-lg h-full sm:h-[700px] bg-[#09090c] sm:rounded-3xl border border-[#d4af37]/30 shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/[0.08] bg-[#0e0e12] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#141418] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4af37]"></span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                    <span>{PORTFOLIO_DATA.agentData.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[#d4af37]/15 text-[#f3c86b] font-mono-custom border border-[#d4af37]/30">
                      HUD V2.4
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono-custom tracking-wider">
                    {isSpeaking ? "SYNTHESIZING AUDIO..." : isThinking ? "QUERYING KNOWLEDGE GRAPH..." : "AWAITING TRANSMISSION"}
                  </p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    const next = !voiceEnabled;
                    setVoiceEnabled(next);
                    if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  title={voiceEnabled ? "Mute Speech Synthesis" : "Enable Speech Synthesis"}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    voiceEnabled
                      ? "bg-[#d4af37]/20 text-[#f3c86b] border-[#d4af37]/40"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-white/[0.06]"
                  }`}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleResetChat}
                  title="Purge Context"
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Speaking Frequency Ripple Bar */}
            {isSpeaking && (
              <div className="h-2.5 bg-[#0e0e12] flex items-center justify-center gap-1 px-4 overflow-hidden border-b border-[#d4af37]/20">
                {[...Array(32)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#d4af37] rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 10 + 2}px`,
                      animationDuration: `${0.25 + (i % 6) * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs font-mono-custom">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "agent" && (
                    <div className="w-7 h-7 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 text-[#d4af37]">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#d4af37] to-[#f3c86b] text-black font-sans font-medium rounded-tr-none shadow-lg"
                        : "bg-[#141418] text-slate-200 border border-white/[0.08] rounded-tl-none font-sans"
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div
                      className={`text-[9px] mt-1.5 font-mono-custom text-right ${
                        msg.sender === "user" ? "text-black/60" : "text-slate-500"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" />
                  <span>Cross-referencing technical index...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Query Pills */}
            <div className="px-5 py-2.5 border-t border-white/[0.06] bg-[#0c0c0f] overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {PORTFOLIO_DATA.agentData.sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.prompt)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#d4af37]/15 hover:border-[#d4af37]/40 border border-white/[0.06] text-[10px] text-slate-300 hover:text-[#f3c86b] transition-colors cursor-pointer"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-[#0e0e12] border-t border-white/[0.08] flex items-center gap-2">
              <input
                type="text"
                placeholder="Query Nasir's engineering or academic background..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 bg-[#141418] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4af37]/60 transition-colors font-mono-custom"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="p-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f3c86b] text-black disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all cursor-pointer shrink-0 font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

