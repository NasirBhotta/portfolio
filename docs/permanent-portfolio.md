# Permanent portfolio

The approved interface-to-infrastructure design is now served at `/`. Case studies live at `/work/[slug]`.
Old `/prototype` and `/prototype/work/[slug]` bookmarks use permanent redirects to the corresponding main routes.
The original cinematic homepage is backed up in the promotion workspace rather than destroyed.

## Contact backend

The approved design currently uses email links and a copy-email action; it has no contact-submission form.
Firebase is not required for that flow. If a submission form is added, use a server-side validated endpoint
with explicit consent and abuse controls before storing inquiries in Firestore. Do not put service-account
credentials in browser code. No Firebase project, collection or credentials are configured by this promotion.

## Hugging Face assistant

The existing /api/assistant route validates requests and calls the server-only provider in
src/lib/assistant/server-provider.ts. It now uses @gradio/client to connect to
https://bhotta-career-conversation.hf.space and submit /chat with { message }.

The previous custom REST adapter submitted to /gradio_api/call/v2/chat and read its event stream.
That path returned an opaque generation error even though the official Gradio clients successfully
produced replies. Both the official Python client and JavaScript client returned live replies during
this update. The exact website transport also returned mode=llm in about 7 seconds.

The Space's public main.py uses OpenAI gpt-4.1-mini. Hugging Face hosts the Gradio application;
OpenAI and Pushover credentials stay in Space secrets. Existing tools can forward supplied contact
details and unanswered questions to Nasir. No hosted source, secrets, or model configuration changed.

A new Gradio client/session is created for each request and closed after completion. The single-message
API receives bounded recent history and current portfolio facts explicitly, avoiding cross-visitor history.
The backend has a 20-second total budget; the browser allows 24 seconds and the route budget is 30 seconds.
Failure returns a labelled local-guide response with HTTP 200 and a 60-second upstream cooldown per
server instance. Logs now include the error reason rather than only its class.

Optional server-only environment settings:
- HF_SPACE_URL: override the default Space host.
- HF_TOKEN: access token if the Space is private.
- ASSISTANT_PROVIDER=scripted: disable remote generation.

Tests: node --experimental-strip-types --test scripts/gradio-provider.test.mjs scripts/resilient-provider.test.mjs

## Early AI agent projects

The supplied detailed project document is the source for src/data/agentProjects.ts. Selected local files
in D:/Projects/agents were checked, including the research manager, LangGraph Sidekick, engineering crew,
and model adapter. The upstream remote belongs to ed-donner/agents, so it is not presented as Nasir's
own repository. Course implementations retain attribution; custom integration modules are labelled.

The homepage features four workflows and an expandable collection of twelve more studies. All have
/agents/[slug] pages, source references, implementation details, and limitations. Paper trading,
the model adapter, and the crypto dashboard are identified as parts of the same larger system.
No email, trading scheduler, or browser agent was executed while adding the documentation.

## End-to-end verification

The production `/api/assistant` returned HTTP 200, `mode: llm`, no fallback flag, and the correct
Flutter/GetX/Firebase ecommerce stack in about 8 seconds. A browser-driven chat through the actual
dialog then returned a live Deep Research Assistant answer. Desktop (1440px) and mobile (390px)
checks passed for the 4 featured projects, 12 additional studies, and horizontal overflow. A mobile
model-adapter case study was also checked. The production build generated all 16 agent pages;
8 transport/resilience tests passed.
