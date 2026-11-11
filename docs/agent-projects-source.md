# AI Agents Portfolio — Detailed Project Document

Prepared for: Nasir Bhutta  
Date: 11 November 2026  
Scope: Is workspace ke core AI projects, notebooks aur custom integrations.

## 1. Document ka maqsad aur project ownership

Yeh document portfolio website, GitHub case studies aur interview preparation ke liye hai. Har project ke liye bataya gaya hai ke woh kya karta hai, uska workflow kya hai, implementation kaise organize hai aur portfolio mein usko kaise explain kiya ja sakta hai.

Repository ka base Ed Donner ke **Master AI Agentic Engineering** course se hai, jaisa root `README.md` mein likha hai. Is liye course projects ko “course-based implementation” ya “adapted learning project” kehna accurate hai. Local modified files aur custom integration folders bhi maujood hain; lekin file ka modified hona akela yeh prove nahi karta ke uska poora original design aapne likha tha. Personal contribution ko apni actual implementation history ke mutabiq describe karein.

Neeche diye gaye English descriptions project-level copy hain. First-person ownership claims tab add karein jab aap apna exact contribution confirm kar saken. `community_contributions` ke doosre authors ke examples aapke personal projects mein count nahi kiye gaye.

Verification scope: Yeh document source code, configuration, notebook structure aur existing project documentation ke review par based hai. Is documentation task ke dauran agents, paid APIs, email delivery, browser actions ya trading scheduler run nahi kiye gaye. Existing tests ya previous live checks ka zikr current test result ka claim nahi hai.

## 2. Portfolio positioning

### Suggested headline

**AI Agent Engineering | Python Automation | Multi-Agent Workflows**

### English introduction

> My AI engineering portfolio explores how language models can work with tools, persistent state, external data and specialist agents. It includes course-based implementations using OpenAI Agents SDK, CrewAI, LangGraph, AutoGen and MCP, alongside custom work on model integration, crypto paper trading and portfolio monitoring.

### Roman Urdu mein explanation

Is portfolio ka focus sirf chatbot responses par nahi hai. Projects mein model ko tools dena, task ko multiple steps mein divide karna, specialist agents se kaam karwana, state maintain karna, output evaluate karna aur execution ko UI aur logs mein visible banana cover hota hai.

## 3. Project inventory

| # | Project | Main technology | Source |
|---|---|---|---|
| 1 | Professional Profile & Lead Capture Assistant | OpenAI, Gradio, PyPDF | `1_foundations/app.py` |
| 2 | Multi-Model Response Evaluation | Python, model APIs | `1_foundations/2_lab2.ipynb`, `3_lab3.ipynb` |
| 3 | Tool-Based Task Planner | Function calling, Python | `1_foundations/5_extra.ipynb` |
| 4 | Sales Email Agent Workflow | OpenAI Agents SDK, SendGrid | `2_openai/2_lab2.ipynb`, `3_lab3.ipynb` |
| 5 | Deep Research Assistant | OpenAI Agents SDK, Gradio | `2_openai/deep_research/` |
| 6 | Multi-Agent Debate | CrewAI | `3_crew/debate/` |
| 7 | Financial Research Crew | CrewAI, Serper | `3_crew/financial_researcher/` |
| 8 | Trending Company Research & Selection | CrewAI, memory, Pydantic | `3_crew/stock_picker/` |
| 9 | Python Coding Agent | CrewAI, Docker | `3_crew/coder/` |
| 10 | AI Engineering Team | CrewAI, Python, Gradio | `3_crew/engineering_team/` |
| 11 | Browser & Research Sidekick | LangGraph, Playwright | `4_langgraph/` |
| 12 | AutoGen Agent Experiments | AutoGen AgentChat/Core | `5_autogen/*lab*.ipynb` |
| 13 | Dynamic Agent Creator | AutoGen, gRPC, asyncio | `5_autogen/creator.py`, `world.py` |
| 14 | Autonomous Paper Trading Platform | MCP, SQLite, Gradio, Plotly | `6_mcp/` |
| 15 | Antigravity Model Adapter | Python, Agents SDK model interface | `antigravity_integration/model.py` |
| 16 | Crypto Quotes & Dashboard Extension | Coinbase quotes, SQLite, Plotly | `antigravity_integration/crypto.py`, `6_mcp/` |

Projects 14–16 ek hi larger system ke related parts hain. Website par inhein ek flagship case study aur do technical deep dives ki form mein show karna munasib hai.

## 4. Professional Profile & Lead Capture Assistant

### Kya project hai?

Ek conversational profile assistant jo website visitor ke career, skills aur background se related sawalon ka jawab profile documents se deta hai. Interested visitor apni email de to assistant notification tool ke through contact details forward kar sakta hai. Unknown questions bhi notification mein bheje ja sakte hain.

### Kaise implement hua?

1. `PdfReader` LinkedIn PDF ke pages se text extract karta hai.
2. `summary.txt` se additional professional context load hota hai.
3. Profile text aur behavior instructions system prompt mein combine hote hain.
4. Gradio chat message aur conversation history backend ko deta hai.
5. OpenAI response agar function call request kare to Python arguments parse karke matching tool execute karta hai.
6. Tool result conversation mein wapas add hota hai; loop final text response tak chalta hai.

**Tools:** `record_user_details`, `record_unknown_question`. Dono Pushover notification use karte hain. Current implementation mein “recording” notification bhejna hai; dedicated lead database nahi hai.

**Technical decision:** Chhote profile ke liye full context prompt mein load kiya gaya hai. Is app mein vector search ya document chunk retrieval implement nahi hai, is liye isay full RAG platform kehna accurate nahi hoga.

**Current state:** `app.py` mein profile name abhi Ed Donner hai aur `me/linkedin.pdf`, `me/summary.txt` expected hain. Apni identity aur source documents configure kiye baghair isay Nasir ka deployed assistant describe na karein.

**English portfolio copy:**

> A document-grounded professional profile assistant with a Gradio chat interface, function calling, visitor contact notifications and unanswered-question capture. The implementation demonstrates how profile context and executable tools can support conversations with prospective clients or employers.

**Source:** `1_foundations/app.py`, `1_foundations/3_lab3.ipynb`, `1_foundations/4_lab4.ipynb`.

## 5. Multi-Model Response Evaluation

**Kya hai:** Learning experiments jo different model providers ke responses aur evaluator-based revision workflows explore karte hain.

**Implementation:** `2_lab2.ipynb` model API experimentation cover karta hai. `3_lab3.ipynb` mein profile chatbot ke saath Pydantic `Evaluation` schema, `evaluate(...)` aur feedback-based `rerun(...)` functions hain. Initial answer ko evaluator check karta hai; rejection par feedback revised answer banane mein use hota hai.

**Engineering point:** Answer generation aur quality assessment separate responsibilities hain. Structured evaluation ko application control flow mein use kiya ja sakta hai. LLM evaluator ki approval factual correctness ka independent proof nahi hoti.

**Output:** Candidate responses, evaluation feedback aur revised reply. Accuracy percentage, cost reduction ya latency improvement ke measured results is review mein establish nahi hue.

**English portfolio copy:**

> A set of model comparison and response evaluation experiments exploring structured feedback and answer revision. These notebooks demonstrate how a separate evaluator can guide improvements to an initial model response.

**Source:** `1_foundations/2_lab2.ipynb`, `1_foundations/3_lab3.ipynb`.

## 6. Tool-Based Task Planner

**Kya hai:** Notebook experiment jahan assistant task list ko Python tools ke through inspect aur update kar sakta hai.

**Kaise kaam karta hai:** `create_todos(...)` task descriptions add karta hai, `get_todo_report()` current task status return karta hai aur `mark_complete(...)` completion notes ke saath task complete karta hai. Tool-call handler aur conversation loop model requests ko actual Python operations se connect karte hain.

**Skills shown:** Explicit task state, function calling, JSON arguments aur multi-step execution loops. Notebook-level task list ko production project-management product ya persistent database service claim nahi kiya gaya.

**English portfolio copy:**

> A tool-enabled planning experiment in which an assistant creates tasks, reads progress and records completion notes through Python functions. It illustrates how explicit task state can support a multi-step agent workflow.

**Source:** `1_foundations/5_extra.ipynb`.

## 7. Sales Email Agent Workflow

**Kya hai:** Sales email generation aur delivery ke agent workflows. Notebook sequence generation, concurrent execution, tools, handoffs aur input guardrail concepts explore karti hai.

**Implementation flow:** User brief agent ko diya jata hai; specialist instructions email text banwati hain; orchestration different agents ke outputs handle karti hai; HTML email tool SendGrid ko delivery request de sakta hai. `3_lab3.ipynb` mein Pydantic `NameCheckOutput` aur `guardrail_against_name(...)` input guardrail example hai.

**Technical value:** Model text ko email function se connect karna aur orchestration ko prompts se alag rakhna. Guardrail example ek specific input condition ka demonstration hai, complete content moderation ya delivery approval system nahi.

**Current state:** Yeh notebook prototypes hain. Sender verification, recipient setup aur credentials actual delivery se pehle configure karne hote hain. Is review mein koi email send nahi hui.

**English portfolio copy:**

> An agent workflow for generating sales email content and connecting it to HTML email delivery through SendGrid. The notebooks explore concurrent agents, tool delegation, handoffs and a structured input guardrail.

**Source:** `2_openai/2_lab2.ipynb`, `2_openai/3_lab3.ipynb`.

## 8. Deep Research Assistant

### Problem aur solution

Broad topic par useful report likhne ke liye query planning, multiple searches, findings synthesis aur formatting chahiye hoti hai. Yeh project in responsibilities ko specialist agents mein divide karta hai aur Gradio interface mein progress dikhata hai.

### Detailed workflow

1. User topic enter karta hai.
2. Planner `WebSearchPlan` generate karta hai, har search ke saath query aur reason hota hai. Prompt five searches request karta hai.
3. `ResearchManager` asynchronous search tasks create karta hai.
4. Search agent web search tool use karke concise summaries banata hai.
5. `asyncio.as_completed(...)` se completed results collect hote hain. Failed search `None` return kar sakti hai aur results se skip hoti hai.
6. Writer summaries ko `ReportData` mein synthesize karta hai: short summary, Markdown report aur follow-up questions.
7. Email agent report ko HTML mein convert karke SendGrid function invoke kar sakta hai.
8. UI intermediate status aur final Markdown display karti hai. Workflow tracing bhi code mein hai.

**Important distinction:** UI status updates yield karti hai; yeh report ke har token ki streaming implementation nahi hai. Writer prompt lengthy report request karta hai, lekin actual page count ya completeness guaranteed nahi.

**Challenges handled:** Search tasks ka concurrent orchestration, typed agent outputs aur UI ko progress dena. Remaining limitations mein partial search failures ki visibility aur independent source verification shamil hain.

**Current setup detail:** Email source mein course author ke example sender/recipient hain; personal use ke liye replace karne honge.

**English portfolio copy:**

> A multi-agent research application that plans searches, gathers findings concurrently, produces a structured Markdown report and connects the result to HTML email delivery. A Gradio interface exposes progress while typed outputs keep the planning and reporting stages organized.

**Source:** `2_openai/deep_research/deep_research.py`, `research_manager.py`, `planner_agent.py`, `search_agent.py`, `writer_agent.py`, `email_agent.py`.

## 9. Multi-Agent Debate

**Kya hai:** Ek motion ke favor aur opposition mein arguments generate karne aur separate judge se decision lene ka CrewAI workflow.

**Implementation:** YAML mein debater aur judge ke roles/goals defined hain. `propose`, `oppose` aur `decide` tasks respective arguments aur judgment produce karte hain. Output files `output/propose.md`, `output/oppose.md`, `output/decide.md` configure hain.

**Engineering lesson:** Ek model role dono sides represent kar sakta hai, jabke separate judging role argument comparison handle karta hai. Is structure ka use idea review aur tradeoff exploration mein ho sakta hai; judge verdict objective truth ka proof nahi hai.

**English portfolio copy:**

> A CrewAI debate workflow that generates arguments for and against a motion, then asks a separate judge agent to explain its decision. Agent roles and task outputs are configured independently in YAML.

**Source:** `3_crew/debate/src/debate/`.

## 10. Financial Research Crew

**Kya hai:** Company-focused research aur report-writing pipeline.

**Kaise implement hua:** Researcher Serper search tool use karta hai. Task company status, historical performance, challenges, opportunities aur recent news research karne ko kehti hai. Analyst ko research task ka context milta hai aur woh executive summary ke saath structured report banata hai. Crew sequential process use karti hai; final artifact `output/report.md` hai.

**Technical decision:** Research aur writing ko separate agents mein rakhne se har stage ki instructions aur responsibility clear rehti hai. Researcher ka output analyst ka input banta hai.

**Current scope:** Research prototype; company data ki independent validation, analyst-grade valuation model aur trading execution establish nahi kiye gaye.

**English portfolio copy:**

> A two-stage company research pipeline using a search-enabled researcher and a report-writing analyst. CrewAI passes findings between tasks and saves a structured Markdown report for review.

**Source:** `3_crew/financial_researcher/src/financial_researcher/crew.py`, `config/agents.yaml`, `config/tasks.yaml`.

## 11. Trending Company Research & Selection

**Kya hai:** Sector ke trending companies identify karna, un par detailed research karna aur comparative selection report produce karna.

**Detailed implementation:**

1. Trending-company finder Serper se news search karta hai.
2. `TrendingCompanyList` structured company names, tickers aur trend reasons hold karti hai.
3. Financial researcher har company ka market position, future outlook aur investment potential analyze karta hai.
4. `TrendingCompanyResearchList` findings ko typed structure mein rakhti hai.
5. Stock-picker role selection aur rejection rationale likhta hai aur notification tool use kar sakta hai.
6. Manager hierarchical process mein delegation handle karta hai.

**Memory:** SQLite-backed long-term memory aur embedding-based short-term/entity memory configuration maujood hai. Prompts repeated companies avoid karne ko kehte hain; hard duplicate-prevention guarantee verify nahi ki gayi.

**Artifacts:** `output/trending_companies.json`, `output/research_report.json`, `output/decision.md`.

**English portfolio copy:**

> A hierarchical company research workflow combining trend discovery, structured research, comparative selection and push notifications. It explores typed outputs and multiple memory mechanisms to retain context across agent tasks.

**Source:** `3_crew/stock_picker/src/stock_picker/`.

## 12. Python Coding Agent

**Kya hai:** Natural-language assignment ko Python code, execution output aur explanation mein convert karne wala CrewAI agent.

**Implementation:** `main.py` assignment input deta hai; YAML coder ko plan, code, run aur review instructions deti hai. Agent mein `allow_code_execution=True`, `code_execution_mode="safe"`, execution timeout aur retry limit configured hain. Safe execution Docker use karti hai.

**Current example:** Leibniz series ke pehle 10,000 terms sum karke four se multiply karna, yani pi ka approximation. Is example ko precision benchmark ya advanced numerical method claim nahi kiya gaya.

**Output:** `output/code_and_output.txt` mein code, output aur explanation expected hain. Local prompt changes early-stage agent reasoning aur validation ko explain karne par focus karti hain.

**English portfolio copy:**

> A Python coding agent configured to plan an assignment, generate code, execute it through Docker-backed tooling and explain the result. The current example approximates pi using the first 10,000 terms of the Leibniz series.

**Source:** `3_crew/coder/src/coder/main.py`, `crew.py`, `config/agents.yaml`, `config/tasks.yaml`.

## 13. AI Engineering Team

### Kya project hai?

Software requirements ko design, backend module, demo frontend aur unit-test source mein convert karne ki multi-agent pipeline.

### Team aur workflow

| Role | Responsibility | Output |
|---|---|---|
| Engineering lead | Classes, methods aur module design | Markdown design |
| Backend engineer | Design ki Python implementation | Python module |
| Frontend engineer | Backend ko demonstrate karna | Gradio `app.py` |
| Test engineer | Backend ke tests generate karna | Test module |

Crew sequential hai. Backend task design context use karti hai; frontend aur testing tasks backend task ka context leti hain. Backend/test agents ke liye Docker execution, time limit aur retry configuration maujood hai. Output locations task configuration se set hoti hain.

**Engineering point:** Requirements se artifacts tak traceable handoff. Agent ko code generate karne dena aur generated software ko independently validate karna separate steps hain. Example output folders repository mein hain, lekin unka hona har generated result ke passing tests ka proof nahi.

**English portfolio copy:**

> A multi-agent software prototyping pipeline with engineering lead, backend, frontend and testing roles. It translates requirements into a design, a Python implementation, a Gradio demo and unit-test source using explicit task dependencies.

**Source:** `3_crew/engineering_team/src/engineering_team/`; sample artifacts in `example_output_4o/`, `example_output_mini/`, `example_output_new/`.

## 14. Browser & Research Sidekick

### Kya hai?

Ek assistant jo user task aur success criteria leta hai, browser aur research tools use karta hai aur evaluator feedback ke mutabiq work continue kar sakta hai.

### Architecture

`User request → Worker → Tools → Worker → Evaluator → Finish / Worker retry`

State mein conversation messages, success criteria, feedback, completion decision aur user-input requirement store hoti hai. Worker tool call de to graph `ToolNode` par route hota hai. Text response de to evaluator structured `EvaluatorOutput` return karta hai. Success criteria unmet hon aur clarification required na ho to evaluator worker ko wapas bhejta hai.

### Available capabilities

- Playwright browser navigation aur page interaction.
- Serper search aur Wikipedia queries.
- Python REPL calculations aur code execution.
- `sandbox` directory mein file-management tools.
- Pushover notifications.
- Gradio UI aur per-session thread identifier.

**Memory distinction:** Final `sidekick.py` `MemorySaver` use karta hai, jo process memory mein checkpointing deta hai. Earlier `2_lab2.ipynb` SQLite checkpointing explore karta hai. Final app ko default cross-restart persistent memory claim na karein.

**Challenge:** Tool execution aur quality evaluation ko ek state graph mein coordinate karna. Evaluator feedback control flow ka hissa hai, external verification ka substitute nahi.

**English portfolio copy:**

> A LangGraph assistant that combines browser automation, search, Python execution and file tools with an evaluator feedback loop. User-defined success criteria guide whether the graph finishes, retries the task or requests clarification.

**Source:** `4_langgraph/sidekick.py`, `sidekick_tools.py`, `app.py`, `1_lab1.ipynb` through `4_lab4.ipynb`.

## 15. AutoGen Agent Experiments

**Kya hai:** AutoGen ki high-level conversations se low-level routed messaging aur distributed runtime tak learning collection.

| Notebook | Implementation focus | Demonstrated skill |
|---|---|---|
| `1_lab1_autogen_agentchat.ipynb` | Assistant agents, OpenAI/Ollama clients, SQLite city-price helpers | Tool integration and local data access |
| `2_lab2_autogen_agentchat.ipynb` | Multimodal messages, structured image descriptions, group chat, tool adapters | Multimodal and team orchestration |
| `3_lab3_autogen_core.ipynb` | Routed agents, typed messages, single-threaded runtime, game examples | Message-driven architecture |
| `4_lab4_autogen_distributed.ipynb` | gRPC host/worker runtime, player and judge agents | Distributed runtime concepts |

**Implementation point:** `RoutedAgent` aur message handlers agent behavior ko runtime delivery se separate karte hain. Group chat mein turn-taking aur termination conditions conversation lifecycle define karte hain.

**English portfolio copy:**

> An AutoGen learning collection covering tool-enabled assistants, multimodal inputs, group conversations, routed messages and gRPC runtime experiments. It demonstrates different levels of control over how agents communicate and terminate their work.

**Source:** `5_autogen/*lab*.ipynb`. Distributed APIs ka use local demo ko production distributed service nahi banata.

## 16. Dynamic Agent Creator & Idea Generation

**Kya hai:** Creator agent Python template se naye agents generate karta hai, runtime mein register karta hai aur business ideas request karta hai.

**Detailed workflow:**

1. `world.py` local gRPC host aur worker runtime start karta hai.
2. Creator runtime mein register hota hai.
3. Configuration 20 agent-creation requests schedule karti hai.
4. Creator `agent.py` template read karta hai aur unique system message ke saath Python source generate karwata hai.
5. Source `agentN.py` mein write hota hai aur dynamic import hota hai.
6. Generated class runtime mein register hoti hai aur idea request receive karti hai.
7. Agent optionally doosre agent se idea refine karwata hai.
8. Result `ideaN.md` mein save hota hai.

**Technical value:** Dynamic module loading, runtime registration aur asynchronous coordination. “Configured for 20 agents” accurate hai; successful 20-agent execution ka measured claim is review mein establish nahi hua.

**Boundary:** Generated Python import hota hai, is liye yeh trusted local experiment hai; untrusted generated code ke liye sandboxed execution architecture is flow mein establish nahi hai.

**English portfolio copy:**

> An experimental agent factory that generates Python agent implementations from a template, registers them with an AutoGen runtime and collects business ideas. The workflow combines dynamic imports, routed messaging and concurrent creation requests.

**Source:** `5_autogen/agent.py`, `creator.py`, `messages.py`, `world.py`.

## 17. Autonomous Paper Trading Platform — Flagship Case Study

### Problem

Tool-using agents ke decisions samajhne ke liye research, account state, market prices aur execution history ek jagah chahiye hoti hai. Yeh system multiple strategy-driven agents ko simulated portfolios aur visible activity logs se connect karta hai.

### System overview

`Scheduler → Trader → Researcher tool → Research/MCP services → Model decision → Account tool → SQLite → Dashboard`

Four trader identities configured hain: Warren, George, Ray aur Cathie. Har trader apna account aur strategy read karta hai. Researcher sub-agent findings provide karta hai. Account tools simulated buys/sells aur strategy changes handle karte hain. Gradio dashboard portfolio state aur execution events dikhata hai.

### Components

| Component | Responsibility |
|---|---|
| `trading_floor.py` | Scheduling, trader creation, market-hours gate, concurrent cycles |
| `traders.py` | Agent setup, model routing, researcher-as-tool, bounded agent runs |
| `templates.py` | Research/trading instructions and messages |
| `accounts.py` | Cash, holdings, transactions, orders, valuation and strategy |
| `accounts_server.py` | MCP account tools and resources |
| `market.py`, `market_server.py` | Asset prices and market access |
| `database.py` | Accounts, logs, market data and valuation snapshots |
| `tracers.py` | Execution event logging |
| `app.py` | Portfolio charts, balances, holdings, transactions and logs |

### Trading cycle kaise chalta hai?

1. Scheduler settings load karta hai; default interval 60 minutes hai.
2. Stock mode mein market open check hota hai. Crypto aur explicit demo mode stock-hours check bypass karte hain.
3. Trader aur researcher ke MCP sessions context managers se open hote hain.
4. Trader current account report aur strategy read karta hai.
5. Researcher tool market context gather karne ke liye invoke ho sakta hai.
6. Trader simulated account functions request karta hai; Python/MCP layer actual state change handle karti hai.
7. Successful cycle ke baad next cycle trading/rebalancing mode alternate karta hai.
8. Logs aur latest account state dashboard mein visible hote hain.

Researcher tool six turns tak bounded hai aur trader run ka maximum 30 turns configured hai. `asyncio.gather` trader tasks schedule karta hai, jabke Antigravity provider calls adapter mein serialize hoti hain.

### MCP implementation

Account server `get_balance`, `get_holdings`, `buy_shares`, `sell_shares`, `change_strategy` expose karta hai. Account aur strategy read karne ke liye MCP resource URIs bhi hain. Is se model ko database implementation ki bajaye typed tools aur resources ka interface milta hai.

### Model routing

Current code Antigravity default route rakhta hai. Original routing OpenAI aur compatible provider clients ke options preserve karti hai. Multiple providers ki availability credentials aur configured model IDs par depend karti hai; har route ki live compatibility is task mein test nahi ki gayi.

### Dashboard

Har trader ke liye value, profit/loss, strategy, holdings, transactions, chart aur categorized logs available hain. Account/chart refresh 10 seconds aur log refresh 0.5 seconds configured hai. External quote fetching refresh ko slow kar sakti hai; timer interval guaranteed data latency nahi hai.

### Current boundary

Orders simulated hain. Real market quotes use hone par bhi system broker ya exchange par real-money order submit nahi karta. Investment returns, profitability, production deployment aur end-to-end unattended reliability ka claim available evidence se establish nahi hota.

**English portfolio copy:**

> A multi-agent paper trading platform that connects strategy-driven traders to research, market data and simulated account operations through MCP. It combines scheduled agent runs, SQLite persistence and a Gradio dashboard with portfolio charts, transaction history and execution logs. Custom extensions add Antigravity model integration, crypto quotes and separate valuation snapshots.

**Attribution:** Course-based trading architecture with local modifications and custom integration modules. Exact personal contribution should be supported with selected diffs or commits.

## 18. Antigravity Model Adapter

### Kya problem solve karta hai?

Existing trading agents Agents SDK model interface expect karte hain, jabke supplied Antigravity provider prompt-based interaction use karta hai. Adapter dono ke request/response contracts connect karta hai.

### Implementation details

- `AntigravityModel` SDK `Model` interface implement karta hai.
- Discovery aur handshake helpers local provider session se connect karte hain.
- System instructions, conversation history aur function schemas provider request mein convert hote hain.
- Model ko explicit JSON tool-request format bataya jata hai.
- `parse_tool_calls(...)` aur provider responses se tool names/arguments extract hote hain.
- Allowed tool names aur dictionary arguments validate hote hain.
- SDK `ResponseFunctionToolCall` objects external runner ko execution request dete hain.
- Final text SDK message format mein return hota hai.
- `asyncio.to_thread` synchronous provider invocation ko async interface se connect karta hai.
- Lock requests serialize karta hai; fresh chat ko complete history di jati hai.
- Progress callbacks queue/generation/tool/completion activity ko trading logs tak pahunchate hain.

**Why these decisions matter:** Serialization shared mutable session state ke overlap ko avoid karti hai. Fresh chat plus history conversation continuity ko explicit rakhta hai. Tool output application runner execute karta hai; provider ka text apne aap execution result nahi ban jata.

**Limitations:** Streaming, structured outputs aur handoffs implemented nahi. Token usage available nahi; request counts report hote hain. Local provider availability aur login/session par dependency hai.

**Existing verification evidence:** Adapter tests aur connection-check scripts repository mein hain. Integration README previous offline tests aur live tool round-trip passing report karti hai, lekin yeh documentation task ka fresh run nahi hai. README full market/search trading flow ko unverified batati hai.

**English portfolio copy:**

> A custom model adapter connecting an Antigravity provider to the OpenAI Agents SDK model interface. It translates conversation history and tool schemas, validates model-requested tool calls, serializes provider access and reports progress to the trading system.

**Source:** `antigravity_integration/model.py`, `check.py`, `test_model.py`; supporting provider helpers in `tools/working/`.

## 19. Crypto Quotes, Account Isolation & Dashboard Extension

### Kya add hua?

Existing paper trading system mein crypto USD pairs, fractional quantities, public Coinbase last-trade quotes aur isolated crypto data storage add ki gayi hai.

### Quote pipeline

1. Symbols normalize hote hain: `BTC`, `BTC/USD`, `BTC-USD` supported normalization examples hain.
2. Validation USD-pair format enforce karti hai.
3. Coinbase Exchange public ticker endpoint price aur timestamp deta hai.
4. HTTP request timeout configured hai.
5. Nonfinite/nonpositive prices reject hoti hain.
6. Five minutes se purani aur excessively future-dated quotes reject hoti hain.
7. Ten-second cache repeated fetch requests reduce karta hai.

**Data separation:** Stock, crypto aur crypto demo account paths separate hain. Crypto accounts initial simulated $10,000 balance ke saath documented hain. Crypto quantities coin units hain, jaise `0.001 BTC`.

### Dashboard data consistency

Portfolio snapshots separate `portfolio_snapshots` table mein write hote hain. Dashboard refresh current valuation record kar sakta hai bina purana account object save karke newer holdings overwrite kiye. Snapshot insertion minimum ten-second spacing aur SQLite transaction use karti hai. Charts recent points read karte hain, timestamps sort/deduplicate karte hain aur single-point marker bhi show karte hain.

**Failure visibility:** Quote failure UI mein error dikhati hai. Cash-only accounts flat value aur “no open positions” annotation show karte hain. Log text HTML-escape hota hai.

**Existing test files:** `test_crypto.py`, `test_market.py`, `test_dashboard.py`, `test_model.py`. Files ka hona current passing status ka proof nahi hai; fresh validation alag se run karni hogi.

**English portfolio copy:**

> A crypto paper trading extension with normalized USD pairs, fractional quantities, cached Coinbase quotes and quote freshness checks. Separate crypto/demo storage and a dedicated valuation snapshot table keep dashboard updates independent of simulated account holdings.

**Source:** `antigravity_integration/crypto.py`, `6_mcp/market.py`, `accounts.py`, `accounts_server.py`, `database.py`, `app.py`.

## 20. Supporting Developer Tooling

`tools/` mein provider connection, standalone service startup, background service aur language-server verification scripts hain. Yeh Antigravity integration ki supporting infrastructure ke taur par explain kiye ja sakte hain.

Relevant files: `tools/start_background_service.py`, `tools/verify_language_server.py`, `tools/working/auto_connect.py`, `tools/working/antigravity_provider.py`, `tools/working/standalone_server.py`.

In tools ko separate polished public product kehne ke bajaye integration setup aur connectivity tooling ki category mein rakhna zyada accurate hai. Session files, credentials aur local environment details public portfolio content ka hissa nahi hain.

## 21. Technology aur Skills Mapping

| Skill | Code mein example |
|---|---|
| Python and async orchestration | Concurrent research tasks, trader scheduling, agent creation |
| Function calling | Profile notifications, task planning, adapter tool requests |
| Structured outputs | Research plans, reports, company schemas, evaluator decisions |
| Multi-agent design | Research pipeline, engineering team, debate and trading roles |
| Graph-based workflows | LangGraph worker/tool/evaluator routing |
| State and persistence | SQLite accounts/logs, checkpoints, CrewAI memory |
| Browser automation | Playwright-backed Sidekick tools |
| MCP tools and resources | Account operations, account reports and strategies |
| Provider abstraction | Antigravity adapter and original model routing |
| Data visualization | Plotly valuation charts and Gradio dashboards |
| External integrations | SendGrid, Pushover, Serper, Polygon and Coinbase |
| Execution controls | Docker configuration, turn bounds, timeouts and retries |
| Observability | Trace events, generation logs, status updates and errors |

Root dependencies include Python 3.12+, OpenAI Agents SDK, CrewAI-related projects, LangGraph, AutoGen, MCP, Gradio, Playwright, Pydantic, SQLite helpers and Plotly. Dependency presence ko har project mein active usage samajhna zaroori nahi.

## 22. Portfolio Website ke Liye Suggested Layout

### Featured case studies

1. **Autonomous Paper Trading Platform:** Architecture, MCP tools, crypto extension, provider adapter aur dashboard consistency ko ek detailed case study mein show karein.
2. **Deep Research Assistant:** Query planning, concurrent search, report synthesis aur UI progress demonstrate karein.
3. **Browser & Research Sidekick:** User task, success criteria, browser tools aur evaluator retry loop explain karein.
4. **AI Engineering Team:** Requirements se design/backend/UI/tests tak artifacts show karein.

### Additional projects

Profile assistant, stock research crew, coding agent, debate, email workflow aur AutoGen experiments ko smaller cards ya learning collection mein rakhein.

### Har case study mein kya add karna hai?

| Section | Content |
|---|---|
| Overview | Project kya karta hai aur kis user/task ke liye hai |
| Problem | Manual workflow mein kya difficulty thi |
| My contribution | Aapne personally kya change, implement ya debug kiya |
| Architecture | Main components aur request/data flow |
| Implementation | Two to four meaningful technical decisions |
| Demo | Actual screenshots, recording ya reproducible output |
| Validation | Test command/result, reviewed output, known failures |
| Limitations | Prototype boundaries aur incomplete behavior |
| Links | Public source repository and live demo, if available |

## 23. English Project Card Copy

### Autonomous Paper Trading Platform

> Multi-agent stock and crypto paper trading with MCP account tools, market data, scheduled execution and a Gradio monitoring dashboard. Includes custom work on model integration and portfolio valuation storage.

### Deep Research Assistant

> A research workflow that turns a topic into a search plan, concurrent findings and a structured report, with UI progress updates and HTML email integration.

### Browser & Research Sidekick

> A LangGraph assistant that uses browsing, search, Python and file tools, then evaluates its response against user-defined success criteria.

### AI Engineering Team

> A CrewAI prototyping workflow that separates software design, backend implementation, Gradio UI generation and unit-test creation across specialist roles.

### Professional Profile Assistant

> A profile-grounded chatbot prototype with PDF context, conversation history, contact notifications and unanswered-question capture.

### Antigravity Model Adapter

> A custom adapter that translates Agents SDK requests into provider conversations and converts validated JSON tool requests back into executable SDK responses.

## 24. Interview Mein Kaise Explain Karna Hai

**“Agent aur chatbot mein kya difference dikhaya?”**  
In projects mein model response ke ilawa Python functions, MCP services, browser tools aur persistent state se interact karta hai. Model action request karta hai aur application us action ko execute karke result next step ko deti hai.

**“Frameworks itne saare kyun use kiye?”**  
Learning collection different orchestration approaches compare karti hai: SDK-based agents, role/task crews, explicit state graphs aur routed-message runtimes. Har framework ki production superiority ka claim kiye baghair tradeoffs explain kiye ja sakte hain.

**“Sab se meaningful engineering decision?”**  
Trading dashboard mein valuation snapshots ko account state se separate rakhna concrete example hai. Display refresh ko holdings persistence se independent rakhne se stale UI objects ke account updates overwrite karne ka risk address hota hai.

**“Trading live hai?”**  
Price data real endpoint se aa sakta hai, lekin buy/sell operations local simulated accounts mein hoti hain. Yeh paper trading aur agent behavior exploration hai.

**“Kaise verify kiya?”**  
Actual run records, tests aur screenshots se jawab dein. Is document ka source review aur integration README ke historical checks alag evidence hain. Jo workflow khud run nahi kiya, usko tested claim na karein.

## 25. Final Personalization Details

Yeh document workspace ke projects cover karta hai. Aapki complete professional history, Flutter/mobile apps ya doosre repositories yahan available nahi the, is liye unki details invent nahi ki gayi.

Portfolio publish karne ke liye ab personal details mein actual role/title, exact project contribution, project dates, public repository URLs, live demo URLs aur selected screenshots add kiye ja sakte hain. Measured results sirf evidence ke saath likhein: task completion, test counts, observed execution time aur reviewed output quality. Revenue, users, accuracy ya returns ke unverified numbers add na karein.

**Attribution line for course-based projects:**

> Based on Ed Donner's AI Agentic Engineering course, with adaptations and extensions described in the project case study.

**Contribution template:**

> My contribution: [specific module/change]. I implemented [concrete behavior], chose [approach] because [reason], and validated it through [actual evidence].
