import { scriptedProvider } from "./scripted";
import { isAssistantReply, type AssistantProvider, type AssistantReply } from "./types";

export function createHttpProvider(endpoint: string, mode: AssistantReply["mode"] = "scripted"): AssistantProvider {
  return {
    mode,
    async respond(request, signal) {
      const controller = new AbortController();
      const abort = () => controller.abort();
      if (signal?.aborted) controller.abort();
      signal?.addEventListener("abort", abort, { once: true });
      const timeout = setTimeout(abort, 24000);
      try {
        const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request), signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("Assistant service unavailable");
        const result: unknown = await response.json();
        if (!isAssistantReply(result)) throw new Error("Invalid assistant response");
        return result;
      } finally {
        clearTimeout(timeout);
        signal?.removeEventListener("abort", abort);
      }
    },
  };
}

export function withScriptedFallback(primary: AssistantProvider): AssistantProvider {
  return {
    mode: primary.mode,
    async respond(request, signal) {
      try { return await primary.respond(request, signal); }
      catch (error) {
        if (signal?.aborted) throw error;
        return { ...await scriptedProvider.respond(request, signal), fallback: true };
      }
    },
  };
}

export const portfolioProvider = withScriptedFallback(createHttpProvider("/api/assistant", "llm"));
