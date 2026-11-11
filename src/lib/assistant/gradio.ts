import { Client } from "@gradio/client";

/** Use the official queue/session protocol, not Gradio's failing REST wrapper. */
export async function callGradioChat(message: string, options: {
  baseUrl: string;
  signal?: AbortSignal;
  token?: string;
  connect?: typeof Client.connect;
  timeoutMs?: number;
}): Promise<string> {
  if (options.token && !options.token.startsWith("hf_")) throw new Error("Invalid HF_TOKEN configuration");
  const signal = options.signal
    ? AbortSignal.any([options.signal, AbortSignal.timeout(options.timeoutMs ?? 20000)])
    : AbortSignal.timeout(options.timeoutMs ?? 20000);
  signal.throwIfAborted();
  let client: Client | undefined;
  let submission: ReturnType<Client["submit"]> | undefined;
  const close = () => {
    if (!client) return;
    // Detach this session's error handler only during intentional teardown.
    if (client.stream_instance) client.stream_instance.onerror = null;
    client.close();
  };
  let onAbort: () => void = () => {};
  const cancelled = new Promise<never>((_, reject) => {
    onAbort = () => reject(signal.reason ?? new Error("Assistant request cancelled"));
    signal.addEventListener("abort", onAbort, { once: true });
  });
  try {
    const operation = (async () => {
      // A new client owns a new session; no visitor shares another visitor's history.
      const connect = options.connect ?? Client.connect.bind(Client);
      client = await connect(options.baseUrl, {
        token: options.token as `hf_${string}` | undefined,
        events: ["data", "status"],
      });
      if (signal.aborted) { close(); signal.throwIfAborted(); }
      submission = client.submit("/chat", { message });
      let answer: unknown;
      for await (const event of submission) {
        signal.throwIfAborted();
        if (event.type === "status" && event.stage === "error") throw new Error("Gradio queue reported a generation error");
        if (event.type === "data") answer = Array.isArray(event.data) ? event.data[0] : undefined;
      }
      if (typeof answer !== "string" || !answer.trim()) throw new Error("Gradio returned no text response");
      return answer.trim().slice(0, 5000);
    })();
    return await Promise.race([operation, cancelled]);
  } finally {
    signal.removeEventListener("abort", onAbort);
    if (signal.aborted && submission) void submission.cancel().catch(() => {});
    close();
  }
}
