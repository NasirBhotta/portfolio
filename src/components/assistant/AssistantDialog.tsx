"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Send, Volume2, VolumeX, X } from "lucide-react";
import { portfolioProvider } from "@/lib/assistant/client-provider";
import { ASSISTANT_CONTEXTS } from "@/lib/assistant/knowledge";
import { appendMessage, clearConversation, useConversation } from "@/lib/assistant/session";
import type { AssistantProvider, AssistantRequest } from "@/lib/assistant/types";
import styles from "./assistant.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectSlug?: string;
  initialQuestion?: string;
  provider?: AssistantProvider;
}
const subscribeToClient = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function AssistantDialog({ isOpen, onClose, projectSlug, initialQuestion = "", provider = portfolioProvider }: Props) {
  const messages = useConversation();
  const id = useId();
  const mounted = useSyncExternalStore(subscribeToClient, clientSnapshot, serverSnapshot);
  const [input, setInput] = useState(initialQuestion);
  const [contextOverride, setContextOverride] = useState<string>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [voice, setVoice] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const context = contextOverride ?? projectSlug ?? "";
  const contextName = ASSISTANT_CONTEXTS.find((item) => item.slug === context)?.name;

  useEffect(() => {
    const node = dialog.current;
    if (!node || !isOpen) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    field.current?.focus({ preventScroll: true });
    return () => {
      node.close();
      document.body.style.overflow = oldOverflow;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [isOpen, mounted]);

  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, pending]);
  useEffect(() => () => request.current?.abort(), []);

  function dismiss() { setContextOverride(undefined); onClose(); }

  async function send(question = input) {
    const text = question.trim();
    if (!text || pending || request.current || text.length > 1000) return;
    const controller = new AbortController();
    request.current = controller;
    const payload: AssistantRequest = {
      question: text, projectSlug: context || undefined,
      history: messages.slice(-20).map(({ role, text: content }) => ({ role, text: content.slice(0, 2500) })),
    };
    appendMessage({ id: crypto.randomUUID(), role: "user", text });
    setInput(""); setError(""); setPending(true);
    try {
      const reply = await provider.respond(payload, controller.signal);
      if (controller.signal.aborted) return;
      appendMessage({ id: crypto.randomUUID(), role: "assistant", ...reply });
      if (voice && "speechSynthesis" in window && dialog.current?.open) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(reply.text));
      }
    } catch {
      if (!controller.signal.aborted) setError("I couldn’t complete that request. Your question is saved; please try again or contact Nasir directly.");
    } finally {
      if (!controller.signal.aborted) setPending(false);
      request.current = null;
    }
  }

  function submit(event: FormEvent) { event.preventDefault(); void send(); }
  function keepFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") { event.preventDefault(); dismiss(); return; }
    if (event.key !== "Tab") return;
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], textarea, select:not(:disabled), [tabindex="0"]')].filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  const suggestions = contextName ? [`What was Nasir’s contribution to ${contextName}?`, `Explain ${contextName}’s architecture`] : ["What did Nasir contribute to BrainBee?", "Explain NIZAAM’s offline architecture", "How can I contact Nasir?"];

  return mounted ? createPortal(
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onKeyDown={keepFocus} onCancel={(event) => { event.preventDefault(); dismiss(); }} onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
      <div className={styles.panel}>
        <header className={styles.header}><div><span className={styles.eyebrow}>PORTFOLIO REPRESENTATIVE</span><h2 id={`${id}-title`}>Nasir&apos;s AI Twin</h2></div><button className={styles.iconButton} onClick={dismiss} aria-label="Close conversation"><X size={20} /></button></header>
        <div className={styles.disclosure}><span className={styles.statusDot} />{provider.mode === "scripted" ? "Scripted replies · No live LLM connected" : "Hugging Face assistant · Local guide available if offline"}</div>
        <p id={`${id}-description`} className={styles.intro}>Ask about the work, the engineering, or Nasir’s role. Answers draw on the documented portfolio.</p>
        <div className={styles.contextRow}><label htmlFor={`${id}-context`}>Discussing</label><select id={`${id}-context`} value={context} onChange={(event) => setContextOverride(event.target.value)} disabled={pending}><option value="">The whole portfolio</option>{ASSISTANT_CONTEXTS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><button onClick={() => { clearConversation(); setError(""); }} disabled={pending || messages.length === 0}>Clear chat</button></div>
        <div ref={log} className={styles.log} role="log" aria-label="Conversation history" aria-live="polite" aria-relevant="additions" aria-busy={pending}>
          {messages.length === 0 && <div className={styles.welcome}><span>HELLO, I’M NASIR’S PORTFOLIO GUIDE.</span><p>A useful place to start:<br /><em>what would you like to know?</em></p><small>I’ll say when a detail isn’t documented.</small></div>}
          {messages.map((message) => <article key={message.id} className={styles.message} data-role={message.role} aria-label={message.role === "user" ? "You" : "Portfolio guide"}><span className={styles.messageAuthor}>{message.role === "user" ? "YOU" : message.fallback ? "LOCAL PORTFOLIO GUIDE" : "PORTFOLIO GUIDE"}</span><p>{message.text}</p>{message.fallback && <small className={styles.fallbackNote}>The service was unavailable. This reply uses the local scripted guide.</small>}{!!message.sources?.length && <nav className={styles.sources} aria-label="Answer sources">{message.sources.map((source) => <a href={source.href} key={source.href} onClick={dismiss}>{source.label}<ArrowUpRight size={12} /></a>)}</nav>}</article>)}
          {pending && <p className={styles.loading} role="status">Looking up portfolio facts…</p>}
          {error && <p className={styles.error} role="alert">{error}<a href="mailto:dev.nasirbhutta@gmail.com">Email Nasir ↗</a></p>}
        </div>
        <div className={styles.suggestions} aria-label="Suggested questions">{suggestions.map((question) => <button key={question} disabled={pending} onClick={() => void send(question)}>{question}<ArrowUpRight size={13} /></button>)}</div>
        <form onSubmit={submit} className={styles.composer}>
          <label htmlFor={`${id}-question`} className={styles.inputLabel}>Your question</label>
          <div className={styles.inputRow}><textarea ref={field} id={`${id}-question`} value={input} onChange={(event) => setInput(event.target.value)} maxLength={1000} rows={2} placeholder="Ask about a project or engineering decision…" aria-describedby={`${id}-input-help`} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} /><button className={styles.sendButton} type="submit" aria-label="Send question" disabled={pending || !input.trim()}><Send size={18} /></button></div>
          <div className={styles.composerFooter}><small id={`${id}-input-help`}>Enter to send · Shift + Enter for a new line</small><button type="button" aria-pressed={voice} className={styles.voiceButton} onClick={() => { setVoice(!voice); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }}>{voice ? <Volume2 size={15} /> : <VolumeX size={15} />}<span>Read replies</span></button></div>
          <p className={styles.privacy}>History stays in this tab’s session. {provider.mode === "scripted" ? "No external AI service receives your messages." : "Messages go to Nasir’s hosted AI assistant. Contact details you share may be forwarded to Nasir."}</p>
        </form>
      </div>
    </dialog>, document.body
  ) : null;
}
