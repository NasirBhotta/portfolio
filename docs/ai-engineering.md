# AI engineering and portfolio assistant

The permanent portfolio is served at `/`; agent studies are at `/agents/[slug]`.

## Agent collection

`src/data/agentProjects.ts` describes 16 projects from the supplied detailed project document.
Four are featured on the homepage: paper trading, deep research, the browser/research Sidekick,
and the AI engineering team. Twelve further projects are available in an expandable collection.
Each has a case-study page covering workflow, engineering decisions, scope, and source references.

Course implementations are attributed to Ed Donner's AI Agentic Engineering course. The Antigravity
model adapter and crypto dashboard are labelled custom integrations that extend the trading system.
Selected local source was reviewed; no trading, emails, or browser-agent tasks were executed.

CVFlow and the University Research Agent remain separate outline-level entries. The new source
document does not establish implementation details for those two projects.

## Assistant integration

`AssistantDialog` calls `/api/assistant`. The server-only provider uses `@gradio/client`, connects
to Nasir's Hugging Face Space, and submits `/chat`. This runs the existing GPT-4.1-mini-backed
assistant without exposing Space secrets in the browser. A fresh session is created and closed
for each request. Bounded conversation history and current portfolio facts are passed explicitly.

The previous manual Gradio REST transport failed with opaque error events. The official Python
and JavaScript clients returned real replies, and the exact new website adapter returned a live
response in approximately 7 seconds. The broken REST adapter has been replaced.

The backend allows 20 seconds for connection and generation. The browser timeout is 24 seconds;
the route execution budget is 30 seconds. On upstream failure, a labelled local answer is returned
with HTTP 200, and a 60-second cooldown avoids repeated slow requests on that server instance.

The local guide includes documented mobile projects, internships, certificates, Instagram channel,
and agent project facts. A local fallback is explicitly labelled; it is not presented as live AI.

The Space can forward supplied contact information and unanswered questions via Pushover. The chat
privacy notice explains that behavior. Website chat history stays in the current tab's session.

Optional server settings: `HF_SPACE_URL`, `HF_TOKEN`, `ASSISTANT_PROVIDER=scripted`.

## Other AI features

BrainBee retains its documented embedding/FAISS case study. The interactive retrieval walkthrough
uses prepared local passages and examples. It does not call a live vector database or embedding service.

## Validation

```text
node --experimental-strip-types --test scripts/gradio-provider.test.mjs scripts/resilient-provider.test.mjs
node node_modules/typescript/bin/tsc --noEmit
npm.cmd run build
```

Transport tests cover reply extraction, per-request sessions, generation failures, malformed replies,
cancellation, connection timeout, and late connection cleanup. Provider tests cover fallback labels,
cooldown behavior, successful live responses, and cancelled requests.

Older browser scripts encode the original scripted-only baseline. Use `ASSISTANT_PROVIDER=scripted`
when intentionally testing those historical expectations; live integration should assert `mode=llm`.
