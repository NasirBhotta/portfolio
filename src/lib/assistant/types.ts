export interface AssistantSource { label: string; href: string }
export interface ConversationTurn { role: "user" | "assistant"; text: string }
export interface AssistantRequest {
  question: string;
  projectSlug?: string;
  history: ConversationTurn[];
}
export interface AssistantReply {
  text: string;
  sources: AssistantSource[];
  mode: "scripted" | "llm";
  fallback?: boolean;
}
export interface AssistantProvider {
  mode: AssistantReply["mode"];
  respond(request: AssistantRequest, signal?: AbortSignal): Promise<AssistantReply>;
}
export interface ChatMessage extends ConversationTurn {
  id: string;
  sources?: AssistantSource[];
  mode?: AssistantReply["mode"];
  fallback?: boolean;
}

export function isAssistantRequest(value: unknown): value is AssistantRequest {
  if (!value || typeof value !== "object") return false;
  const input = value as Partial<AssistantRequest>;
  return typeof input.question === "string" && input.question.trim().length > 0 && input.question.length <= 1000
    && (input.projectSlug === undefined || (typeof input.projectSlug === "string" && input.projectSlug.length <= 80))
    && Array.isArray(input.history) && input.history.length <= 20
    && input.history.every((turn) => turn && (turn.role === "user" || turn.role === "assistant") && typeof turn.text === "string" && turn.text.length <= 2500);
}

export function isAssistantReply(value: unknown): value is AssistantReply {
  if (!value || typeof value !== "object") return false;
  const reply = value as Partial<AssistantReply>;
  return typeof reply.text === "string" && reply.text.length > 0 && reply.text.length <= 5000
    && (reply.fallback === undefined || typeof reply.fallback === "boolean")
    && (reply.mode === "scripted" || reply.mode === "llm") && Array.isArray(reply.sources) && reply.sources.length <= 8
    && reply.sources.every((source) => source && typeof source.label === "string" && source.label.length <= 120 && typeof source.href === "string" && (source.href.startsWith("/#") || /^\/(work|agents)\/[a-z0-9-]+$/.test(source.href)) && !source.href.includes("\\"));
}
