import test from "node:test";
import assert from "node:assert/strict";
import { createResilientProvider } from "../src/lib/assistant/resilient-provider.ts";

const request = { question: "Tell me about Flutter", history: [] };
const localReply = { text: "Documented portfolio answer", mode: "scripted", sources: [] };
const fallback = { mode: "scripted", respond: async () => localReply };

test("an upstream failure returns a labelled answer and suppresses repeated attempts", async () => {
  let calls = 0;
  const provider = createResilientProvider({ mode: "llm", respond: async () => { calls++; throw new Error("Unavailable"); } }, fallback);
  assert.deepEqual(await provider.respond(request), { ...localReply, fallback: true });
  assert.deepEqual(await provider.respond(request), { ...localReply, fallback: true });
  assert.equal(calls, 1);
});

test("successful hosted responses retain live mode", async () => {
  const live = { ...localReply, text: "Hosted reply", mode: "llm" };
  const provider = createResilientProvider({ mode: "llm", respond: async () => live }, fallback);
  assert.deepEqual(await provider.respond(request), live);
});

test("cancelled requests do not produce fallback messages", async () => {
  const controller = new AbortController();
  controller.abort();
  const provider = createResilientProvider({ mode: "llm", respond: async () => localReply }, fallback);
  await assert.rejects(provider.respond(request, controller.signal));
});
