# Nasir Shahzad (Bhutta) — Portfolio Content Master

Reusable English content for another portfolio template. Based on the existing repository records; external URLs have not been live-verified.

## Profile and contact

- Name: Nasir Shahzad (Bhutta)
- Existing headline: Applied AI Engineer & Software Systems Architect
- Alternative headline: Flutter & Full-Stack Engineer | Applied AI
- Location: Mandi Bahauddin / Islamabad, Pakistan
- Open to relocation to France
- Email: dev.nasirbhutta@gmail.com
- Phone: +92 313 7576531
- WhatsApp: https://wa.me/923137576531
- GitHub: https://github.com/nasirbhotta
- LinkedIn: https://linkedin.com/in/me-bhotta
- Instagram: https://www.instagram.com/vibecode_unpacked/
- Public portfolio domain: Not supplied
- Downloadable resume: No PDF asset supplied

## Hero

### Building mobile products, connected systems, and practical AI experiences.

I'm Nasir Shahzad, a Flutter and full-stack engineer with experience in retail software, educational platforms, device-repair services, and commercial marketplaces. My work spans offline-first architecture, backend integration, real-time workflows, and retrieval-assisted learning.

Primary actions: View Projects, Contact Me, GitHub, LinkedIn. Add Download CV only after supplying a real file.

## About

I'm a computer science graduate from COMSATS University Islamabad. I build Flutter applications and work across the APIs, databases, and synchronization workflows behind them.

My work includes NIZAAM, an independently developed retail-management product; BrainBee, a team capstone combining textbook retrieval with AI-assisted study; and ors_map, an open-source Dart navigation engine. At AXAON, Crifly, and GLOWSIMS, I have contributed to commercial mobile products and learning-management workflows.

I am interested in applications that remain useful when connectivity is unreliable, interfaces that communicate system state clearly, and AI features grounded in relevant source material. My academic interests include accessible and affordable AI-assisted learning in resource-constrained environments.

## Skills

- Mobile: Flutter, Dart, Android, iOS, Riverpod, BLoC, MVVM, state management, caching, pagination, offline persistence.
- Backend: Node.js, Express.js, MongoDB, Firebase, REST APIs, WebSockets.
- Data: Supabase, PostgreSQL, row-level security, Drift, SQLite, database indexing, query optimization.
- Applied AI: Embeddings, FAISS, semantic retrieval, RAG, AI-assisted quizzes and flashcards through BrainBee.
- Areas of practice/coursework: Agents, MCP, LangGraph, CrewAI, LLM integration, automation. Specific production implementations are not established for all these topics.
- Engineering: Git, GitHub Actions, unit testing, fuzz testing, stress testing, release workflows, navigation algorithms.

## Experience

### AXAON — Full-Stack Flutter Engineer

2026–Present, as recorded | Remote / Islamabad | Project: 24ifix

Engineering the cross-platform Flutter client for an on-demand device-repair service. Contributions cover onboarding, authentication, home-pickup and in-shop booking, REST API integration, and the customer repair-status dashboard.

Technologies: Flutter, Dart, REST APIs, state management, Git.

### GLOWSIMS — Mobile App Development Intern

22 February–22 May 2026 | Three months | Project: Talib LMS

Contributed to LMS performance and workflow improvements. Worked on database indexing, query optimization, enrollment and attendance automation, and Flutter dashboard loading through caching, lazy loading, and pagination.

Technologies: Flutter, Dart, LMS APIs, database indexing, query optimization.

### Crifly — Full-Stack Flutter Developer

January 2025–February 2026 | Part-time | Islamabad, Pakistan

Co-developed commercial Flutter applications including GotCakey and Shoutsy. Integrated REST APIs, Firebase authentication, real-time synchronization, and Node.js / Express.js / MongoDB services. Used MVVM and BLoC; contributed to defect resolution, testing, and releases.

## Project 1 — NIZAAM

Category: Retail management / SaaS
Ownership: Independent commercial product
Role: Independent product design and engineering

### Card copy

An offline-first retail-management product connecting device inventory, repairs, sales, and credit accounts.

### Overview

NIZAAM brings the daily operations of a mobile shop into one workspace. It tracks individual devices through IMEI identifiers and connects inventory with repair records and customer credit ledgers. Local persistence supports work without reliable connectivity, while a multi-tenant backend separates shop data.

### Features and contributions

- Independently designed and developed the product.
- POS and inventory workflows.
- IMEI / serial tracking.
- Repair management and credit ledgers.
- Flutter client with Riverpod state management.
- Drift / SQLite local database and offline queues.
- Supabase / PostgreSQL backend with row-level security.
- Idempotency queues in the synchronization stack.

### Architecture

The client keeps a local working copy and queues changes for synchronization. PostgreSQL RLS provides a database-level tenant boundary. Detailed retry and conflict-resolution algorithms are not supplied in the records.

Outcome: A commercial retail product combining inventory, repairs, and credit workflows with local persistence and a multi-tenant backend.

Stack: Flutter, Dart, Riverpod, Supabase, PostgreSQL RLS, Drift / SQLite.
Internal page: /prototype/work/nizaam
Live URL: Not supplied
Specific repository: Not supplied

## Project 2 — BrainBee

Category: Applied AI / Education
Ownership: Team undergraduate capstone, COMSATS
Role: Co-developer, learning platform and AI features

### Card copy

An AI-assisted study platform combining semantic textbook retrieval, quizzes, flashcards, and student progress tracking.

### Overview

BrainBee connects relevant textbook material with active study. It uses embeddings and FAISS to retrieve related passages and brings quiz generation, flashcards, and progress features into the learning experience.

### Features and contributions

- Co-developed the educational platform as a team capstone.
- Worked on semantic textbook retrieval using embeddings and FAISS.
- Connected retrieval-assisted learning with quiz generation.
- Included flashcards and student progress features.

### Architecture

Textbook embeddings and a FAISS index support a retrieval-augmented learning workflow. The portfolio does not specify the LLM provider, embedding model, hosting details, or evaluation results.

Outcome: A team-built platform bringing textbook discovery and study practice together.

Stack: Python, Flutter, FAISS, Embeddings, RAG, Node.js.
Internal page: /prototype/work/brainbee
Live URL: Not supplied
Specific repository: Not supplied

## Project 3 — 24ifix

Category: Device-repair services / Mobile
Ownership: Company contribution, AXAON
Role: Full-Stack Flutter Engineer

### Card copy

A cross-platform repair-service client connecting home pickup, shop appointments, and repair-status tracking.

### Overview

24ifix supports repair booking for iPhones, MacBooks, and electronics. Customers can arrange home pickup or an in-shop appointment and follow service progress through a customer dashboard.

### Features and contributions

- Engineered the Flutter mobile client as part of AXAON company work.
- Onboarding and authentication.
- Home-pickup and in-shop booking journeys.
- REST API integration.
- Customer dashboard and live repair / technician status.
- Android and iOS mobile experience.

### Architecture

The Flutter client connects booking and status workflows to backend services through REST APIs. The documented contribution centers on the mobile client; ownership of the entire backend is not established.

Outcome: A mobile client bringing repair booking and service visibility into one experience.

Stack: Flutter, Dart, REST APIs, state management, Android, iOS.
Internal page: /prototype/work/24ifix
Store / live URL: Not supplied
Specific repository: Not supplied

## Project 4 — Talib LMS

Category: Learning-management system
Ownership: Company contribution, GLOWSIMS
Role: Mobile App Development Intern

### Card copy

Backend and Flutter dashboard improvements for enrollment, attendance, and everyday learning workflows.

### Overview

Talib is an existing LMS. The internship contribution covered query performance, student workflow automation, and client loading behavior rather than sole ownership of the platform.

### Features and contributions

- Query optimization and database indexing.
- Enrollment and attendance automation.
- Dashboard caching.
- Lazy loading and pagination.

### Architecture

The work addressed both backend data access and client loading. Database improvements complemented caching and progressive loading in Flutter.

Outcome: Contributed performance and workflow improvements across the LMS backend and mobile dashboard.

Stack: Flutter, Dart, LMS APIs, database indexing, caching, pagination.
Internal page: /prototype/work/talib
Store links: Android and iOS availability mentioned; exact URLs not supplied
Specific repository: Not supplied

## Project 5 — GotCakey

Category: Bakery marketplace / E-commerce
Ownership: Company contribution, Crifly, Australian client
Role: Flutter Developer, Crifly team
Naming: Older records use Got Bakey / Got Backey; the detailed showcase identifies the same app as GotCakey.

### Card copy

A custom bakery marketplace connecting customers and local bakers through ordering, messaging, payments, and urgent matching.

### Overview

GotCakey supports custom bakery orders that require coordination beyond a standard checkout. Its workflows connect cake configuration, messages, order status, payment, and SOS baker matching for last-minute orders.

### Features and contributions

- Co-developed the commercial application within the Crifly team.
- Contributed to Flutter delivery and backend integrations.
- Product includes custom cake configurations and order tracking.
- In-app messaging and payment checkout.
- SOS matching for urgent orders.

### Architecture

The recorded stack combines Flutter / BLoC with REST APIs, Node.js, Firebase, and Stripe. Product features should retain team attribution; the records do not assign every component solely to Nasir.

Outcome: Contribution to a commercial bakery marketplace for Android and iOS.

Stack: Flutter, Dart, BLoC, REST APIs, Node.js, Firebase, Stripe.
Internal page: /prototype/work/gotcakey
Store / live URL: Not supplied
Specific repository: Not supplied

## Project 6 — Shoutsy

Category: Creator economy / Brand collaboration
Ownership: Company contribution, Crifly
Role: Flutter Developer, Crifly team

### Card copy

A mobile platform connecting brands and creators through campaign agreements, milestones, chat, and approvals.

### Overview

Shoutsy brings sponsored-campaign coordination into one application. Brands and creators can manage agreements, track deliverables, exchange messages, and review campaign assets.

### Features and contributions

- Co-developed the commercial application at Crifly.
- Worked on Flutter state management and real-time chat.
- Product includes agreements, campaign milestones, messaging, and asset approvals.
- Used MVVM and structured state ownership.

### Architecture

The recorded stack includes Flutter, MVVM, WebSockets, MongoDB, and Express.js. Messaging complements structured campaign state and delivery workflows.

Outcome: Contribution to a commercial mobile marketplace for brand-creator collaboration.

Stack: Flutter, Dart, MVVM, WebSockets, MongoDB, Express.js.
Internal page: /prototype/work/shoutsy
Store / live URL: Not supplied
Specific repository: Not supplied

## Project 7 — ors_map

Category: Open-source navigation / Algorithms
Ownership: Open-source engineering
Role: Dart navigation-engine development

### Card copy

A Dart navigation engine with bounded route matching, distance lookup, pose animation, and automated testing.

### Overview

ors_map addresses the engineering between GPS updates and a useful turn-by-turn navigation experience. It translates location fixes into route position and smooth rendered movement. The engine is described as vendor-neutral; Mapbox Maps SDK v11 is included in the application stack.

### Features and contributions

- Developed navigation logic in Dart.
- Bounded forward-window route matching.
- Binary-search distance lookup.
- Dead-reckoning pose animation.
- Unit, fuzz, and stress testing.
- GitHub Actions CI.

### Architecture

A bounded matching window limits repeated route-search work. Binary-search lookup supports distance queries. Pose animation bridges discrete GPS updates visually; interpolated movement is separate from measured location data.

Outcome: An open-source engine combining route matching, pose interpolation, and automated testing.

Stack: Dart, Flutter, Mapbox Maps SDK v11, GitHub Actions, dead reckoning.
Repository: https://github.com/NasirBhotta/ors_map
Internal page: /prototype/work/ors-map
Hosted demo: Not supplied

## Additional AI outlines

### CVFlow

AI-enabled CV processing and automation. Display as an outlined project with a technical case study pending. Implementation, model provider, deployment, outcomes, and repository are not documented.

### University Research Agent

Research and recommendation automation, including France university research. Display as an outline. Tool integrations, orchestration, model provider, deployment, outcomes, and repository are not documented.

## Current portfolio application

Suggested title: Personal Engineering Portfolio & Project Guide

A Next.js portfolio presenting professional experience, seven case studies, education, and a project-aware guide. The repository contains a main experience, a redesigned /prototype route, individual case-study pages, an illustrative RAG walkthrough, and an assistant with suggested questions, source links, bounded session history, optional browser speech, and a local API route.

The assistant currently uses curated scripted answers. No live LLM, embedding service, vector database, MCP server, or autonomous agent is connected. The RAG walkthrough is illustrative.

Technologies: Next.js, React, TypeScript, CSS, local API route, sessionStorage, browser speech synthesis.
Public deployment / repository URL: Not supplied.

## Education

BS Computer Science — COMSATS University Islamabad, Islamabad Campus, Pakistan.
February 2022–January 2026, graduated.
CGPA: 3.23 / 4.00. Four-year degree, 133 credit hours, English-medium instruction.

Selected results:

- Statistics and Probability Theory: A
- Advanced Web Technologies: A
- Information Security: A
- Parallel and Distributed Computing: A-
- French Language Coursework: A

Academic direction: Interested in master's study in AI and computer science in France. Saved records describe application intentions, not confirmed admission or enrollment.

Research interest: Investigating usability, access barriers, and affordability of constrained on-device AI-assisted learning systems compared with non-AI navigation in resource-constrained environments.

Academic references, listed as recommendation letters available on request:

- Tanveer Ahmed, Assistant Professor, Department of Computer Science, COMSATS University Islamabad.
- Saadia Maqbool, Lecturer, Department of Computer Science, COMSATS University Islamabad.

## Courses and languages

- Hugging Face Agents Course, Hugging Face, 2025: Autonomous agents, tool calling, open-source LLMs, multi-agent workflows.
- AI Agentic Track: Agents & MCP, Udemy, 2025: MCP, LangGraph, CrewAI, agent architecture.
- French Language Coursework, COMSATS, 2024: Grade A.
- IELTS Academic, 2024: Overall 6.5; Listening 7.5; Writing 6.5; Reading 6.0. Speaking score not supplied. Exact issuer should be confirmed; source says British Council / IDP.
- Urdu: Native.
- English: IELTS overall 6.5 and English-medium undergraduate education.
- French: University coursework, Grade A. No CEFR level supplied.

Credential URLs, IDs, and certificate files are not supplied. Avoid verification badges until evidence is added.

## Contact copy

### Let's discuss your next product.

For Flutter development, full-stack product work, or a conversation about AI-assisted applications, contact me by email or LinkedIn. I am based in Pakistan and open to relocation to France.

Email: mailto:dev.nasirbhutta@gmail.com
WhatsApp: https://wa.me/923137576531
LinkedIn: https://linkedin.com/in/me-bhotta
GitHub: https://github.com/nasirbhotta
Instagram: https://www.instagram.com/vibecode_unpacked/

## Assets and links to complete

Public background assets: public/backgrounds/bg-hero.jpg, bg-nizaam.jpg, bg-brainbee.jpg, bg-24ifix.jpg, bg-crifly.jpg, bg-dispatch.jpg, bg-france.jpg, bg-certs.jpg.

These are background assets; filenames do not establish that they are actual app screenshots. Real project screenshots, a portrait, app logos, certificate scans, and a resume PDF were not found in the inspected public inventory.

All /prototype/work/... paths belong to the current application. Map them to the new template's routes. Only ors_map has a recorded project-specific repository. Hide missing demo, store, source, certificate, and resume buttons. The existing scholar field points to ors_map, not Google Scholar.

## Legacy numerical claims — review before publishing

The original data includes these numbers, but the detailed showcase omits them because supporting analytics or benchmark evidence is absent from this checkout:

- NIZAAM: 100+ stores; sub-100ms checkout.
- BrainBee: 3,000+ users; 40% higher daily active engagement.
- Talib: 10K+ downloads.
- GLOWSIMS: 62% lower p95 latency, 1,100ms to 420ms; 67% fewer manual steps; 69% lower attendance-processing time.
- Dashboard: 56% lower load time, 3.2s to 1.4s.
- Crifly: Six production apps; 95%+ shared code; 20+ endpoints; about 30% lower code complexity.
- Shoutsy: 60fps / zero frame-drop UI.
- ors_map: 40–70 microseconds per fix; 10,000-point routes; 60fps animation; 118+ tests.

## Instructions for another template builder

Use this document as the content source. Create hero, about, expertise, projects, experience, education, courses, and contact sections. Add detailed pages for the seven documented projects if supported. Preserve independent, team, and company attribution. Use the supplied contact links and ors_map repository. Omit missing URLs and map internal routes to the new template. Label AI outlines clearly. Exclude unverified numerical claims until evidence is supplied. Describe the current assistant as scripted.

## Sources

src/data/portfolioData.ts
src/data/projectShowcase.ts
src/data/professionalIdentity.ts
src/lib/assistant/knowledge.ts
src/lib/profile/resume.ts
docs/ai-engineering.md
