"use client";

import { useSyncExternalStore } from "react";
import { isAssistantReply, type ChatMessage } from "./types";

const KEY = "nasir-portfolio-conversation-v1";
const EMPTY: ChatMessage[] = [];
let messages: ChatMessage[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw || raw.length > 150000) return;
    const saved: unknown = JSON.parse(raw);
    if (Array.isArray(saved) && saved.length <= 40 && saved.every((message) => message && typeof message.id === "string" && typeof message.text === "string" && message.text.length <= 5000 && (message.role === "user" || (message.role === "assistant" && isAssistantReply(message))))) messages = saved;
  } catch { /* Storage is optional; an in-memory session remains available. */ }
}
function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
function publish(next: ChatMessage[]) {
  messages = next.slice(-40);
  try { sessionStorage.setItem(KEY, JSON.stringify(messages)); } catch { /* Private-mode storage may be unavailable. */ }
  listeners.forEach((listener) => listener());
}
export function appendMessage(message: ChatMessage) { publish([...messages, message]); }
export function clearConversation() { publish([]); }
export function useConversation() { return useSyncExternalStore(subscribe, () => messages, () => EMPTY); }
