import { PORTFOLIO_DATA } from "./portfolioData";

export type ProjectOwnership = "independent" | "team" | "company" | "open-source";
export interface ProjectStudy {
  slug: string;
  name: string;
  category: string;
  ownership: ProjectOwnership;
  attribution: string;
  role: string;
  summary: string;
  problem: string;
  contribution: string[];
  outcome: string;
  stack: string[];
  decisions: { title: string; implementation: string; consideration: string }[];
  visual: { first: string; second: string; index: string; steps: string[] };
  source: string;
  repository?: string;
  video?: { src: string; poster: string; label: string };
  screenshot?: { src: string; alt: string; width: number; height: number };
  capabilities?: { title: string; description: string }[];
  validation?: string;
}

function stack(id: string) {
  return PORTFOLIO_DATA.projects.find((project) => project.id === id)?.tech.filter((tech) => tech !== "AXAON") ?? [];
}

// Editorial adaptation of existing records. Quantified claims are intentionally omitted:
// the checkout contains no analytics exports, benchmarks, or credential evidence for them.
export const PROJECT_STUDIES: ProjectStudy[] = [
  {
    slug: "ecommerce", name: "Full Stack Flutter Ecommerce", category: "Full stack / Mobile commerce", ownership: "independent",
    attribution: "Independent full stack project", role: "Flutter app, Firebase backend & admin dashboard development",
    summary: "A complete shopping system connecting a Flutter storefront, payments, customer wallets, and store administration.",
    problem: "An ecommerce store needs connected customer and admin workflows: product discovery, checkout, order management, and payment records all need to work together.",
    contribution: ["Developed the Flutter ecommerce app with GetX state management, product browsing, wishlist, cart, customer accounts, and order screens.", "Implemented Firebase-backed services with Authentication, Cloud Firestore, Storage, and Node.js Cloud Functions, including Stripe card payments and wallet checkout.", "Built a separate Flutter admin app for products, orders, users, coupons, analytics, wallet entries, and withdrawal review."],
    outcome: "A full stack Flutter ecommerce project with customer shopping flows, Stripe and wallet payment integrations, a Firebase backend, and an admin dashboard.",
    stack: stack("ecommerce"),
    repository: "https://github.com/NasirBhotta/ecommerce_app",
    decisions: [
      { title: "Connect checkout to backend payment services.", implementation: "The GetX checkout controller calls Firebase Cloud Functions for Stripe PaymentSheet and wallet payments, then saves orders to Firestore.", consideration: "Payment and order records need consistent identifiers and recovery paths when one step succeeds and another fails." },
      { title: "Give store operations their own workspace.", implementation: "A separate Flutter admin entry point provides product, order, user, analytics, and wallet management. Backend admin functions check authentication and administrator roles.", consideration: "Admin access needs enforcement in backend operations and database rules alongside the interface." },
    ],
    visual: { first: "Shop.", second: "Run the store.", index: "CUSTOMER TO COMMERCE", steps: ["Flutter / GetX", "Firebase backend", "Payments & admin"] },
    source: "User identified NasirBhotta/ecommerce_app. Verified GitHub pubspec.yaml, customer and admin source tree, checkout controller, admin authentication controller, and functions/index.js. Describes repository implementation without claiming production deployment or payment certification.",
  },
  {
    slug: "brainbee", name: "BrainBee", category: "Applied AI / Education", ownership: "team",
    attribution: "Co-developed · COMSATS undergraduate capstone", role: "Co-developer · learning platform & AI features",
    summary: "Turning textbook knowledge into a more useful way to study.",
    problem: "Students need a way to find relevant textbook material and turn it into active study, rather than move repeatedly between search, notes, and practice.",
    contribution: ["Co-developed the educational platform as an undergraduate capstone.", "Worked on textbook semantic retrieval using embeddings and FAISS.", "Connected retrieval-assisted learning with quiz generation, flashcards, and student progress features."],
    outcome: "An educational platform bringing semantic textbook retrieval, AI-generated quizzes, flashcards, and progress tracking into one learning experience.",
    stack: stack("brainbee"),
    decisions: [
      { title: "Retrieve before generating.", implementation: "Textbook embeddings and a FAISS index support the retrieval-augmented learning workflow.", consideration: "Retrieval can connect a response to relevant source material. It does not, by itself, guarantee that a model’s answer is correct." },
      { title: "Make knowledge actionable.", implementation: "Quizzes, flashcards, and progress telemetry sit alongside the retrieval features.", consideration: "Finding a passage and practicing its ideas are different learning tasks. Keeping both in the product makes the study journey more coherent." },
    ],
    visual: { first: "A question.", second: "A way forward.", index: "KNOWLEDGE → PRACTICE", steps: ["Textbook material", "Semantic retrieval", "Study & practice"] },
    source: "BrainBee project record in the existing portfolio; team capstone attribution.",
  },
  {
    slug: "nizaam", name: "NIZAAM", category: "Independent product / Retail", ownership: "independent",
    attribution: "Independent product · MobileShop SaaS", role: "Independent product design & full stack engineering",
    summary: "The working day of a mobile shop, considered as one connected system.",
    problem: "Mobile retailers often keep separate records for stock, sales, repairs, customer credit, and supplier payments. A sale or repair must connect its stock and financial effects, while tenant, branch, and staff permissions control access and intermittent connectivity complicates synchronization.",
    contribution: ["Developed the Flutter / Supabase retail and repair application spanning POS, barcode and IMEI inventory, customers, procurement, expenses, accounts, and reports.", "Implemented Drift local persistence and queued inventory synchronization with connectivity gating, ordered uploads, retry backoff, jitter, and an in-flight guard.", "Connected sales, repair payments, returns, supplier receipts, and expenses to account ledgers through local committers and PostgreSQL business functions.", "Built tenant- and branch-aware permissions, subscription entitlements, customer activity history, receipt generation, and thermal printing workflows."],
    outcome: "A connected business-management application for mobile retailers and repair shops, combining operational workflows, account ledgers, local persistence, tenant and branch controls, and a SaaS subscription foundation.",
    stack: stack("nizaam"),
    decisions: [
      { title: "Persist eligible work before synchronizing.", implementation: "Drift / SQLite supports locally committed workflows. Inventory mutations enter a persistent, ordered upload queue with connectivity checks, retry backoff and jitter, and an in-flight synchronization guard.", consideration: "Offline behavior is workflow-specific. Retrying a mutation must preserve ordering and avoid duplicate stock or financial effects." },
      { title: "Connect operations to their ledger effects.", implementation: "Sale commits, customer settlements, supplier receipts and payments, repairs, refunds, and expenses connect to account records. Idempotent commit and reversal paths address replayed requests.", consideration: "A sale, payment, return, and cash movement are different events. Their records must remain consistent without treating all totals as interchangeable." },
      { title: "Enforce tenant and branch access in the backend.", implementation: "PostgreSQL RLS and business RPCs combine tenant checks, branch access, staff permissions, account status, and subscription entitlements. Navigation also responds to permissions.", consideration: "Screen visibility alone is insufficient. Migration files demonstrate implementation work, while production rollout needs separate verification." },
      { title: "Make customer history useful and permission-aware.", implementation: "A read-only, paginated customer activity RPC combines sale and repair history with date filters, supporting indexes, and explicit financial permission checks.", consideration: "Permission to identify a customer does not automatically grant access to financial activity across every branch." },
      { title: "Treat receipts as part of the workflow.", implementation: "Configurable receipt and sticker layouts support PDF output and ESC/POS thermal commands, with platform-specific printing integrations and layout regression tests.", consideration: "Actual printer compatibility and script rendering depend on the hardware and platform tested." },
    ],
    capabilities: [
      { title: "POS, checkout & returns", description: "Product search, held carts, customer attachment, payment account linkage, customer credit, discount approval, and returns that reconnect stock and refund effects to the original sale." },
      { title: "Barcode & IMEI inventory", description: "Quantity-based accessories and individually tracked devices, serialized units, bulk edits, pricing history, low-stock and supplier filters, local storage, and queued inventory synchronization." },
      { title: "Customers, credit & activity", description: "Customer balances, settlements, manual ledger entries, and paginated sales and repair activity with date filters and branch-aware financial access." },
      { title: "Repair workshop", description: "Intake tickets, device details and condition photos, repair status, parts, payments, delivery, cancellations, and associated refund or part-return accounting." },
      { title: "Second-hand device buy-in", description: "Purchases from customers connect acquired devices to stock and payment records, with dedicated models, business operations, and receipt handling." },
      { title: "Suppliers & procurement", description: "Purchase orders, actual goods receipts and costs, supplier payments and allocation, reversals, and supplier analytics, with retry and branch-isolation handling." },
      { title: "Accounts & expenses", description: "Payment accounts, ledger entries, transfers, reconciliation, customer and supplier payments, recurring expenses, voids, refunds, and reversals connect money movement to business events." },
      { title: "Mobile service transactions", description: "A dedicated service module includes its own commands, local store, mutation queue, provider lifecycle, settings, reports, and cash or wallet summaries." },
      { title: "Staff, tenants & branches", description: "Supabase authentication, onboarding, branch-scoped roles, staff invitations, permission overrides, cached permissions, realtime refresh, and PostgreSQL access policies." },
      { title: "Subscriptions & entitlements", description: "Package presets, tenant subscriptions, add-ons, invoices, payment-verification activation, access deadlines, lifecycle states, and cancellation at period end form the SaaS backend foundation." },
      { title: "Dashboard & reporting", description: "Operational and financial summaries distinguish sales, customer credit, cash movement, and account balances, with low-stock and supplier reporting and permission-aware access." },
      { title: "Receipts, labels & printing", description: "Configurable receipt and sticker layouts, PDF generation, sharing, ESC/POS commands, and TCP or Windows thermal printing integrations." },
    ],
    validation: "Regression test files cover inventory synchronization, POS, repair accounting, procurement, permissions, subscriptions, customer activity, and printing. Test-run results, migration rollout, and tested printer or platform details are not included in this case study.",
    visual: { first: "One shop.", second: "Every moving part.", index: "CONTINUITY BY DESIGN", steps: ["Work locally", "Queue changes", "Synchronize"] },
    source: "Nasir's supplied MobileShop SaaS detailed portfolio case study, reviewed 11 November 2026; identified by the user as the NIZAAM project. Existing independent product attribution retained. File counts are not treated as passing-test counts.",
  },
  {
    slug: "talib", name: "Talib", category: "Company contribution / Education", ownership: "company",
    attribution: "Company work · GLOWSIMS", role: "Mobile app development intern · GLOWSIMS",
    summary: "Making everyday learning workflows easier to move through.",
    problem: "An LMS needs to make enrollment, attendance, and student dashboards usable without unnecessary waiting or repeated manual processing.",
    contribution: ["Contributed to the Talib LMS during a mobile app development internship at GLOWSIMS.", "Worked on backend query optimization and database indexing.", "Improved the Flutter client with caching, lazy loading, and pagination; worked on enrollment and attendance automation."],
    outcome: "Contributed performance and workflow improvements to the Talib LMS, spanning backend queries and the Flutter dashboard experience.",
    stack: ["Flutter", "Dart", "LMS APIs", "Database indexing", "Caching", "Pagination"],
    decisions: [
      { title: "Look beyond the loading indicator.", implementation: "My work covered query optimization and database indexing alongside client-side loading improvements.", consideration: "A faster interface depends on both the data path and the amount of work the client performs. Changing only the loading treatment does not address either." },
      { title: "Load what the student needs next.", implementation: "I worked on caching, lazy loading, and pagination in the Flutter client.", consideration: "These techniques reduce repeated or upfront work, while requiring explicit decisions about cache freshness and pagination boundaries." },
    ],
    visual: { first: "Less waiting.", second: "More learning.", index: "THE EVERYDAY EXPERIENCE", steps: ["Query efficiently", "Load deliberately", "Keep learning"] },
    source: "GLOWSIMS internship entry in the existing portfolio’s experience records.",
  },
  {
    slug: "gotcakey", name: "GotCakey", category: "Company contribution / Marketplace", ownership: "company",
    attribution: "Company work · Crifly · Australian client", role: "Flutter developer · Crifly team",
    summary: "Connecting local bakers and customers, from a custom cake to the final order.",
    problem: "Custom bakery orders involve more than a standard checkout: customers and bakers need to coordinate the product, payment, messages, and delivery of an order.",
    contribution: ["Co-developed the bakery marketplace while working at Crifly.", "Worked on cross-platform Flutter application delivery and backend integrations.", "Product workflows include cake configurations, order status, messaging, payment checkout, and SOS baker matching."],
    outcome: "Contributed to the company’s commercial bakery-marketplace application for iOS and Android.",
    stack: stack("gotbakey"),
    decisions: [
      { title: "Treat an order as a workflow.", implementation: "The marketplace connects custom configurations, order status, in-app messaging, and payment checkout.", consideration: "A custom order has multiple states. Product choices, payment, and communication need to agree on where the order stands." },
      { title: "Support the urgent exception.", implementation: "SOS baker matching supports last-minute orders within the marketplace.", consideration: "Urgent matching introduces a different user need from ordinary browsing. Its availability and fulfillment rules should remain explicit rather than implied." },
    ],
    visual: { first: "Made to order.", second: "Built to connect.", index: "CUSTOM COMMERCE", steps: ["Configure", "Coordinate", "Order"] },
    source: "Crifly experience and the bakery marketplace project record. The user confirmed that GotCakey is the same app described as Got Bakey / Got Backey in the original record.",
  },
  {
    slug: "shoutsy", name: "Shoutsy", category: "Company contribution / Creator economy", ownership: "company",
    attribution: "Company work · Crifly", role: "Flutter developer · Crifly team",
    summary: "A shared space for brands, creators, and the work between them.",
    problem: "A sponsored campaign connects people, agreements, deliverables, and approvals. Those parts need to remain understandable as the work moves forward.",
    contribution: ["Co-developed the commercial creator-and-brand collaboration application at Crifly.", "Worked on Flutter state management and real-time chat.", "The product brings together agreements, campaign milestones, messaging, and asset approvals."],
    outcome: "Contributed to a commercial mobile marketplace supporting brand–creator collaboration and campaign delivery workflows.",
    stack: stack("shoutsy"),
    decisions: [
      { title: "Keep conversations attached to delivery.", implementation: "Real-time messaging sits alongside campaign milestones and approvals.", consideration: "Chat explains the work; structured milestones record its state. Each has a different responsibility in a collaboration product." },
      { title: "Separate state from presentation.", implementation: "The Flutter application uses MVVM and structured state management.", consideration: "Real-time updates make state ownership important: a new event should not leave screens showing conflicting versions of a campaign." },
    ],
    visual: { first: "Good work.", second: "Shared purpose.", index: "CREATORS ↔ BRANDS", steps: ["Agree", "Collaborate", "Deliver"] },
    source: "Shoutsy project record and Crifly experience in the existing portfolio.",
  },
  {
    slug: "24ifix", name: "24ifix", category: "Company contribution / Services", ownership: "company",
    attribution: "Company work · AXAON", role: "Full-stack Flutter engineer · AXAON",
    summary: "Bringing clarity to device repair, from booking to live status.",
    problem: "Customers need to arrange repair through pickup or a shop visit, then understand what is happening to their device.",
    contribution: ["Engineered the cross-platform Flutter mobile client as part of company work at AXAON.", "Worked on onboarding, authentication, and pickup / in-shop booking workflows.", "Integrated REST APIs and the customer dashboard’s live repair-status experience."],
    outcome: "A cross-platform mobile client bringing repair booking and status tracking together across iOS and Android.",
    stack: stack("24ifix"),
    decisions: [
      { title: "Two booking paths, one service journey.", implementation: "The booking experience supports both home pickup and in-shop appointments.", consideration: "Different entry paths should still produce a consistent, understandable repair status for the customer." },
      { title: "Show progress that corresponds to service state.", implementation: "The customer dashboard integrates REST APIs and live technician / repair status.", consideration: "Status communication should distinguish the state of the repair from the freshness of the last update." },
    ],
    visual: { first: "A repair.", second: "A clearer path.", index: "SERVICE WITH VISIBILITY", steps: ["Book", "Track", "Collect"] },
    source: "24ifix project record and AXAON experience in the existing portfolio.",
  },
  {
    slug: "ors-map", name: "Mapbox 3D Navigation", category: "Open source / 3D Navigation", ownership: "open-source",
    attribution: "Open-source engineering", role: "Dart navigation-engine development",
    summary: "Turn-by-turn navigation with a 3D vehicle, a following camera, and a Dart navigation engine.",
    problem: "A navigation client must translate noisy, discrete location updates into a useful position along a route and a coherent visual experience.",
    contribution: ["Built the Mapbox 3D navigation experience in the ors_map repository, including GLB vehicle rendering and camera tracking.", "Developed a vendor-neutral Dart navigation engine with bounded forward-window route matching and binary-search distance lookup.", "Worked on dead-reckoning pose animation and automated unit, fuzz, and stress testing."],
    outcome: "A Dart navigation-engine project with route matching, pose interpolation, and an automated testing workflow.",
    stack: stack("mapbox"), repository: "https://github.com/NasirBhotta/ors_map",
    video: { src: "/videos/mapbox-3d-navigation.mp4", poster: "/videos/mapbox-3d-navigation.jpg", label: "Mapbox 3D navigation demo showing the vehicle, route, and following camera" },
    decisions: [
      { title: "Bound the matching problem.", implementation: "The engine combines forward-window route matching with binary-search distance lookup.", consideration: "Restricting the candidate search reduces repeated work, while making recovery from an incorrect match an important design consideration." },
      { title: "Separate location fixes from rendered motion.", implementation: "Dead-reckoning pose animation bridges discrete GPS route updates in the rendered experience.", consideration: "Visual interpolation can bridge discrete fixes. It should not be confused with new measured location data." },
    ],
    visual: { first: "Position.", second: "With direction.", index: "FROM FIX TO ROUTE", steps: ["Location fix", "Route matching", "Rendered pose"] },
    source: "Local ors_map README confirms 3D GLB vehicle rendering and camera tracking; demo recording supplied by Nasir.",
  },
];

export const OWNERSHIP_LABELS: Record<ProjectOwnership, string> = {
  independent: "Independent product", team: "Team capstone", company: "Company contribution", "open-source": "Open source",
};

export function getProjectStudy(slug: string) {
  return PROJECT_STUDIES.find((project) => project.slug === slug);
}
