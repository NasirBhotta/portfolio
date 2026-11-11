export interface AgentProject {
  slug: string;
  name: string;
  summary: string;
  stack: string[];
  workflow: string[];
  engineering: string;
  limitation: string;
  source: string;
  kind: "Course implementation" | "Custom integration" | "Course project with extensions";
  featured?: boolean;
}

/** User-supplied project document, with selected local source checks. No execution claims. */
export const AGENT_PROJECTS: AgentProject[] = [
  {
    slug: "paper-trading", name: "Multi-Agent Paper Trading", featured: true, kind: "Course project with extensions",
    summary: "Strategy-driven agents, MCP account tools, and a dashboard for simulated stock and crypto portfolios.",
    stack: ["Python", "Agents SDK", "MCP", "SQLite", "Gradio", "Plotly"],
    workflow: ["A scheduler starts strategy-driven traders and opens their MCP sessions.", "A researcher tool gathers market context; account tools handle simulated buys, sells, and strategy changes.", "SQLite stores account state and logs; a Gradio dashboard shows holdings, transactions, valuations, and execution activity."],
    engineering: "Custom work adds Antigravity model integration, crypto quotes, and valuation snapshots separate from account holdings. Dashboard refreshes can record valuations without overwriting newer account state.",
    limitation: "Paper trading only: real market quotes do not make these real-money orders. Profitability and unattended reliability have not been established.",
    source: "6_mcp/; antigravity_integration/",
  },
  {
    slug: "deep-research", name: "Deep Research Assistant", featured: true, kind: "Course implementation",
    summary: "A research workflow that turns a topic into a search plan, concurrent findings, and a structured report.",
    stack: ["Python", "OpenAI Agents SDK", "Pydantic", "Gradio", "SendGrid"],
    workflow: ["A planner produces typed search queries with reasons.", "Search tasks run concurrently and collect available findings.", "A writer produces a Markdown report and follow-up questions; an email agent can format and deliver the report."],
    engineering: "Typed planning and report outputs separate responsibilities. The interface yields stage updates while asynchronous search tasks complete.",
    limitation: "Stage updates are not token streaming. Search failures can be skipped; independent source verification and delivery configuration remain necessary.",
    source: "2_openai/deep_research/",
  },
  {
    slug: "research-sidekick", name: "Browser & Research Sidekick", featured: true, kind: "Course implementation",
    summary: "A LangGraph assistant that uses browser and Python tools, then evaluates results against user-defined success criteria.",
    stack: ["LangGraph", "Playwright", "Python", "Pydantic", "MemorySaver"],
    workflow: ["The user supplies a task and success criteria.", "A worker selects browser, search, Python, or file tools inside a state graph.", "An evaluator checks the result and routes the workflow to finish, retry, or ask for clarification."],
    engineering: "Explicit graph state carries messages, success criteria, and evaluator feedback. Tool execution and evaluation are separate stages.",
    limitation: "The final app uses in-process MemorySaver checkpoints, not default persistence across restarts. Evaluator approval is not independent factual verification.",
    source: "4_langgraph/sidekick.py; sidekick_tools.py; app.py",
  },
  {
    slug: "engineering-team", name: "AI Engineering Team", featured: true, kind: "Course implementation",
    summary: "Specialist agents turn requirements into a design, Python backend, Gradio interface, and unit-test source.",
    stack: ["CrewAI", "Python", "Gradio", "Docker", "YAML"],
    workflow: ["An engineering lead proposes classes, methods, and module structure.", "A backend engineer implements the design; a frontend engineer creates a Gradio demonstration.", "A test engineer generates unit tests using the backend as context."],
    engineering: "Sequential task handoffs preserve design context. Backend and test agents are configured for Docker-backed execution, time limits, and retries.",
    limitation: "Generated files and test source do not demonstrate that the resulting application or tests passed. Outputs still need independent review and execution.",
    source: "3_crew/engineering_team/",
  },
  {
    slug: "profile-assistant", name: "Professional Profile Assistant", kind: "Course implementation",
    summary: "A document-grounded chatbot with profile context, function calling, contact notifications, and unanswered-question capture.",
    stack: ["OpenAI", "Gradio", "PyPDF", "Pushover"],
    workflow: ["Extract profile text from a PDF and load a summary into the system prompt.", "Process chat history and execute requested Python notification tools.", "Return tool results to the model until a final reply is produced."],
    engineering: "The profile is small enough to supply as context. This demonstrates function calling without a vector retrieval layer.",
    limitation: "The course source and Nasir's separately configured hosted assistant are distinct deployments. Contact capture forwards notifications; it is not a dedicated lead database.",
    source: "1_foundations/app.py; career_conversation Space",
  },
  {
    slug: "response-evaluation", name: "Multi-Model Response Evaluation", kind: "Course implementation",
    summary: "Model comparison experiments using structured evaluator feedback to guide answer revision.",
    stack: ["Python", "Model APIs", "Pydantic"],
    workflow: ["Generate a candidate response.", "Evaluate it against a typed feedback schema.", "Use rejection feedback to revise the answer."],
    engineering: "Generation and evaluation have separate responsibilities; structured feedback controls the revision loop.",
    limitation: "Notebook experiments, with no measured accuracy, latency, or cost improvement established. Evaluator approval does not prove correctness.",
    source: "1_foundations/2_lab2.ipynb; 3_lab3.ipynb",
  },
  {
    slug: "task-planner", name: "Tool-Based Task Planner", kind: "Course implementation",
    summary: "A planning experiment that creates tasks, reads progress, and records completion through Python functions.",
    stack: ["Python", "Function calling", "JSON"],
    workflow: ["Create a task list through create_todos.", "Read task state with get_todo_report.", "Mark tasks complete with notes through mark_complete."],
    engineering: "An explicit task list gives the model state it can inspect and update through defined tools.",
    limitation: "Notebook-level state, not a production task-management service or persistent database.",
    source: "1_foundations/5_extra.ipynb",
  },
  {
    slug: "sales-email", name: "Sales Email Agent Workflow", kind: "Course implementation",
    summary: "Sales email generation with specialist agents, handoffs, input checks, and an HTML delivery tool.",
    stack: ["OpenAI Agents SDK", "Python", "SendGrid", "Pydantic"],
    workflow: ["Receive a brief and generate content with specialist instructions.", "Coordinate outputs through concurrent agents, tools, or handoffs.", "An HTML email tool can request delivery through SendGrid."],
    engineering: "The workflow separates orchestration from writing prompts and demonstrates a structured input guardrail.",
    limitation: "Notebook prototypes. Delivery requires configured credentials, verified senders, and recipients; no emails were sent during this portfolio review.",
    source: "2_openai/2_lab2.ipynb; 3_lab3.ipynb",
  },
  {
    slug: "agent-debate", name: "Multi-Agent Debate", kind: "Course implementation",
    summary: "Arguments for and against a motion, followed by a separate judge's explained decision.",
    stack: ["CrewAI", "Python", "YAML"],
    workflow: ["Generate a proposal for the motion.", "Generate the opposing argument.", "A judge compares the arguments and writes a decision."],
    engineering: "Agent roles and task outputs are configured independently in YAML, with saved argument and decision artifacts.",
    limitation: "A model-generated judgment is a comparison tool, not proof of objective truth.",
    source: "3_crew/debate/",
  },
  {
    slug: "financial-research", name: "Financial Research Crew", kind: "Course implementation",
    summary: "A search-enabled researcher passes company findings to an analyst for a structured report.",
    stack: ["CrewAI", "Serper", "Python"],
    workflow: ["Research a company's situation, performance, challenges, and recent news.", "Pass the findings to a report-writing analyst.", "Save a Markdown report with an executive summary."],
    engineering: "Sequential tasks make the researcher's output explicit context for the analyst.",
    limitation: "A research prototype, without independent financial validation, an established valuation model, or trading execution.",
    source: "3_crew/financial_researcher/",
  },
  {
    slug: "company-selection", name: "Trending Company Research", kind: "Course implementation",
    summary: "Trend discovery, typed company research, comparative selection, memory, and push notifications.",
    stack: ["CrewAI", "Serper", "Pydantic", "SQLite"],
    workflow: ["Find trending companies and record tickers and reasons in a typed schema.", "Research candidates and produce structured findings.", "A manager coordinates selection and rejection rationale, with optional notification."],
    engineering: "Hierarchical orchestration combines typed artifacts with long-term and embedding-based memory configurations.",
    limitation: "Prompts request avoiding repeated companies, but hard duplicate prevention and investment performance are not established.",
    source: "3_crew/stock_picker/",
  },
  {
    slug: "python-coder", name: "Python Coding Agent", kind: "Course implementation",
    summary: "A coding agent configured to plan, generate, execute, and explain a Python assignment.",
    stack: ["CrewAI", "Python", "Docker"],
    workflow: ["Receive an assignment and plan the solution.", "Generate and execute Python through Docker-backed tooling.", "Save code, output, and explanation."],
    engineering: "Execution timeouts and retry limits bound the configured coding workflow.",
    limitation: "The current example approximates pi with the Leibniz series; it is not a precision or coding-performance benchmark.",
    source: "3_crew/coder/",
  },
  {
    slug: "autogen-experiments", name: "AutoGen Agent Experiments", kind: "Course implementation",
    summary: "Tool-enabled assistants, multimodal inputs, group conversations, routed messages, and distributed runtime experiments.",
    stack: ["AutoGen AgentChat", "AutoGen Core", "Python", "gRPC", "SQLite"],
    workflow: ["Explore assistants with tools and structured or multimodal inputs.", "Coordinate group conversations with termination conditions.", "Experiment with typed routed messages and local host/worker runtimes."],
    engineering: "Agent behavior is separated from runtime message delivery, with explicit conversation lifecycles.",
    limitation: "A notebook learning collection; distributed API use alone does not establish production readiness.",
    source: "5_autogen/*lab*.ipynb",
  },
  {
    slug: "dynamic-agent-creator", name: "Dynamic Agent Creator", kind: "Course implementation",
    summary: "An experimental agent factory that generates Python agents, registers them in a runtime, and collects ideas.",
    stack: ["AutoGen", "Python", "gRPC", "asyncio"],
    workflow: ["Start a local host and worker runtime.", "Generate Python agents from a template, dynamically import them, and register their classes.", "Request business ideas and optionally refine them through another agent."],
    engineering: "Dynamic loading and asynchronous registration connect generated source to routed-message execution.",
    limitation: "A trusted local experiment. Generated code imports are not sandboxed, and configured agent counts are not verified execution results.",
    source: "5_autogen/creator.py; world.py; agent.py",
  },
  {
    slug: "model-adapter", name: "Antigravity Model Adapter", kind: "Custom integration",
    summary: "A model-interface adapter translating conversation history and tool schemas into provider requests and validated SDK tool calls.",
    stack: ["Python", "OpenAI Agents SDK", "JSON", "asyncio"],
    workflow: ["Connect to the local provider and translate instructions, history, and function schemas.", "Parse responses and validate tool names and argument dictionaries.", "Return SDK tool-call or text objects while reporting progress."],
    engineering: "A lock serializes provider access; fresh conversations receive explicit history. The application runner executes tool requests rather than treating provider text as execution.",
    limitation: "Depends on a local provider session. Streaming, structured outputs, and handoffs are not implemented; fresh live compatibility was not tested here.",
    source: "antigravity_integration/model.py; tools/working/",
  },
  {
    slug: "crypto-dashboard", name: "Crypto Quotes & Dashboard Extension", kind: "Custom integration",
    summary: "Validated crypto quotes, fractional simulated holdings, separate account storage, and independent valuation snapshots.",
    stack: ["Python", "Coinbase quotes", "SQLite", "Plotly", "Gradio"],
    workflow: ["Normalize USD pairs and fetch last-trade quotes with a timeout and short cache.", "Reject invalid or stale prices and use isolated stock, crypto, and demo account paths.", "Record valuation snapshots separately and render sorted, deduplicated chart points."],
    engineering: "Dashboard valuation writes are separated from account saves so a stale UI object cannot overwrite newer holdings.",
    limitation: "An extension of the paper-trading system, not a separate exchange or real-money trading product. Quote availability depends on the external service.",
    source: "antigravity_integration/crypto.py; 6_mcp/market.py; database.py; app.py",
  },
];

export const AGENT_ATTRIBUTION = "Course projects are based on Ed Donner's AI Agentic Engineering course. Custom integrations and extensions are identified separately.";
