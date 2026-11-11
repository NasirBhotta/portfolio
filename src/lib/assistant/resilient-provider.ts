import type { AssistantProvider } from "./types";

/** Avoid repeated slow upstream attempts while the hosted assistant is unavailable. */
export function createResilientProvider(primary: AssistantProvider, fallback: AssistantProvider, cooldownMs = 60000): AssistantProvider {
  let retryAfter = 0;
  return {
    mode: primary.mode,
    async respond(request, signal) {
      if (signal?.aborted) throw signal.reason ?? new Error("Request cancelled");
      if (Date.now() >= retryAfter) {
        try { return await primary.respond(request, signal); }
        catch (error) {
          if (signal?.aborted) throw error;
          retryAfter = Date.now() + cooldownMs;
          const reason = error instanceof Error ? `${error.name}: ${error.message}` : "Unknown upstream failure";
          console.warn("[assistant] Hosted service unavailable; using local guide temporarily.", reason);
        }
      }
      return { ...await fallback.respond(request, signal), fallback: true };
    },
  };
}
