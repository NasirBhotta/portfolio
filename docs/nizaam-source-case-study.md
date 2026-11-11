# MobileShop SaaS — Detailed Portfolio Case Study

Prepared for: Nasir Bhutta  
Repository review date: 11 November 2026

## 1. Project overview

MobileShop SaaS is a Flutter-based business management application for mobile phone retailers and repair shops. It brings sales, inventory, customer balances, repairs, supplier procurement, expenses, accounts, and business reports into one application. Its SaaS foundation supports separate businesses (tenants), multiple branches, staff permissions, subscription packages, and feature entitlements.

The main engineering focus is keeping operational workflows connected: a sale affects stock and payment records; a supplier receipt affects inventory and purchasing balances; a repair can consume parts, receive payments, and require a refund. These operations need consistent financial and stock records, even when requests are retried or connectivity changes.

This document describes capabilities evidenced by repository code, migrations, and test files. It does not establish that every migration is deployed or every platform and feature has been verified in production.

## 2. Portfolio introduction — ready to use

I developed MobileShop SaaS, a Flutter and Supabase business management application for mobile retail and repair operations. The project combines POS checkout, barcode and IMEI inventory, customer credit, repair management, procurement, expense tracking, and account ledgers within a tenant- and branch-aware system.

I implemented local persistence with Drift, inventory synchronization with queued mutations and retry handling, permission-aware navigation, and PostgreSQL migrations for sensitive financial and operational workflows. The application also includes receipt generation, thermal printing integrations, subscription access controls, and regression tests across business modules.

Use this first-person description only where it accurately reflects your own contribution; adjust ownership for any work completed by collaborators.

## 3. Business problem and intended users

Mobile shops often maintain separate records for phone stock, accessory sales, customer credit, supplier payments, and repair jobs. This makes it difficult to connect a physical device to its purchase cost, sale, return, and financial effect. Weak internet connections add another operational constraint.

The intended users include shop owners reviewing performance, cashiers completing sales, inventory staff managing stock, technicians managing repair tickets, and managers controlling branch access. The subscription and platform administration database foundation also supports operating the product as a service for multiple businesses.

## 4. Technology stack and purpose

| Technology | Use in this project |
| --- | --- |
| Flutter and Dart | Shared application UI and business logic |
| Riverpod | State management and dependency wiring |
| GoRouter | Routing, navigation, and access-aware entry points |
| Supabase Flutter | Authentication, backend access, and realtime integration |
| PostgreSQL | Persistent relational data, migrations, RLS policies, and RPC functions |
| Drift / SQLite | Local application storage and locally committed workflows |
| connectivity_plus | Connectivity signals for synchronization |
| Freezed / JSON annotations | Model and serialization tooling |
| mobile_scanner | Scanner integration |
| pdf and printing | Printable documents and PDF workflows |
| esc_pos_utils_plus | Thermal receipt command generation |
| SharedPreferences | Lightweight preferences and session storage integration |
| file_picker, image_picker, csv, share_plus | File, image, import/export, and sharing capabilities |

The repository contains Android, iOS, Windows, and web platform directories. Platform folders demonstrate project targets; they do not independently prove release readiness on each platform.

## 5. Application architecture

The project uses a feature-oriented structure. Business modules live in `lib/features`, while common infrastructure lives in `lib/core`. Configuration includes routing, themes, and Supabase setup. Many modules separate data, domain, and presentation responsibilities, although the exact layering varies by feature.

Typical request flow:

1. A screen collects and validates user input.
2. A Riverpod provider or controller coordinates the action.
3. A repository or local committer handles persistence and business operations.
4. Eligible workflows persist locally and queue synchronization work.
5. Remote data sources and PostgreSQL functions apply server-side operations.
6. Refresh coordination and realtime listeners update dependent application state.

`lib/main.dart` initializes Supabase and preferences, starts the application inside `ProviderScope`, and initiates local database setup. It also provides a startup error screen if initialization fails.

Core infrastructure includes authorization, entitlements, tenant access, offline storage, local persistence, accounting, printing, and platform-specific behavior.

## 6. Feature breakdown

### 6.1 Authentication and onboarding

Authentication uses Supabase with persistent session storage and token refresh configuration. Onboarding and setup flows establish the operational context required before entering the application. Repository tests cover password recovery, Windows authentication deep links, setup status behavior, and invitation flows.

Implementation concern: authentication identifies the user, while tenant access, branch selection, permissions, and subscription status determine which business actions they can perform.

### 6.2 Tenant and branch management

The backend contains tenant and branch security policies, branch access checks, branch-scoped roles, staff invitations, and permission overrides. These support separating businesses and limiting staff access within a business.

Implementation concern: filtering screens is insufficient on its own. Backend policies and functions must also validate the user's tenant, branch, account status, and relevant permission.

### 6.3 Point of sale

The POS module contains product search, cart state, held-cart behavior, customer attachment, checkout, payment account linkage, and returns. Barcode and IMEI handling support the difference between quantity-based accessories and individually tracked devices. Payment workflows include customer credit and customer settlement integration.

The migrations include idempotent sale commit, secure checkout and discount approval, return refund ledger handling, and preservation of sale-item IMEI information.

Example workflow: select a device or accessory, attach a customer when needed, collect payment, commit the sale, update inventory and account records, then generate a receipt. A return must reconnect to the original sale and handle both stock and refund effects.

### 6.4 Inventory management

Inventory includes products, barcode support, serialized units, bulk editing, pricing history, low-stock filtering, and supplier filtering. Local-first inventory tests and a dedicated synchronization engine demonstrate substantial attention to offline operation.

`inventory_sync_engine.dart` implements an ordered persistent upload worker with outbound mutations, inbound synchronization, network gating, retry backoff, jitter, and an in-flight synchronization guard. Its configured retry delay grows from a one-second base to a thirty-second maximum.

Implementation concern: inventory records and related category or supplier information must remain coherent across local changes, retries, remote refreshes, and POS search.

### 6.5 Customers, credit, and activity

Customer workflows include customer selection, credit balances, settlements, manual ledger entries, and activity history. Tests cover customer visibility across branches, settlement synchronization, and local activity storage.

The `20261028000200_customer_activity.sql` migration introduces `customer_activity_v1`, a read-only function combining sales and repair activity. It supports date filtering, pagination, activity counts, and payment-related summaries. It uses invoker security, keeps table RLS in effect, and applies explicit branch permission checks so customer access alone does not imply access to financial information.

The migration also creates indexes for customer sales, repair tickets, and repair payment activity. This connects UI history requirements with query design and access control.

### 6.6 Repair workshop management

Repair workflows include ticket creation, device and customer information, status tracking, ticket photos, inventory part search, payment collection, cancellation, delivery, and financial effects.

The backend includes repair payment ledgers, part return ledgers, effective accounting dates, a hybrid financial engine, paid cancellation, and delivery accounting. Tests cover completion replay, delivery synchronization, financial local commits, ticket photos, and payment loading behavior.

Example workflow: receive a device, record its condition, update the ticket as work progresses, associate parts and charges, collect payments, and record delivery. Cancellation or part returns need corresponding financial adjustments.

### 6.7 Customer buy-in / second-hand purchasing

A dedicated buy-in module handles purchases from customers, such as acquiring second-hand devices. Repository models, repository tests, secure RPC tests, and thermal receipt tests cover this workflow.

Its portfolio value is the connection between customer purchasing records, device acquisition, stock, and payment behavior. Avoid describing this as certified legal compliance or automated fraud prevention without separate evidence.

### 6.8 Suppliers and procurement

Supplier workflows cover supplier records, purchase orders, goods receipts, supplier payments, payment allocation, purchase reversals, and supplier analytics. Migrations and tests address actual received cost, planned product resolution, inventory updates, retry idempotency, and branch isolation.

Example workflow: create a purchase order, receive the actual stock, resolve or create product records as supported by the flow, update acquisition costs, and record supplier payments. Reversal paths need to restore the appropriate stock and financial state.

### 6.9 Accounts and financial ledgers

The accounts module connects operational activity to payment accounts and account ledger entries. Database changes cover transfers, source events, reversals, reconciliation, branch authorization, default cash accounts, and active account name uniqueness.

Sales, customer settlements, supplier payments, expenses, repair payments, and refunds have dedicated ledger-related migrations. This provides a traceable basis for account balances and cash-flow reporting.

Describe this as account-ledger integration unless a separate accounting review verifies full double-entry accounting and accounting-standard compliance.

### 6.10 Expenses

Expense management includes expense recording, category handling, recurring expense lifecycle behavior, voiding, and account-ledger integration. Tests target idempotent void operations, lifecycle transitions, entitlement checks, and ledger foreign-key ordering.

Implementation concern: canceling an expense or replaying a recurring operation must not create duplicate financial effects.

### 6.11 Mobile services

The mobile services module has its own models, commands, repository, remote source, local store, mutation queue, providers, reports, and settings. Database migrations cover service transactions, provider lifecycle, banking support, voiding, entitlements, and cash/wallet summaries.

This separates service-based transactions from physical inventory sales while integrating their balances into the broader application. Exact provider names and supported service categories should be illustrated from a verified product demo.

### 6.12 Dashboard and reports

The dashboard connects operational and financial summaries, with tests for permission gates, account lifecycle refreshes, customer credit summaries, and ledger-based cash reporting. Reporting includes low-stock inventory, supplier sales analytics, and cash-flow related database support.

Implementation concern: a dashboard should distinguish sales, customer amounts due, cash movement, and account balances rather than treating them as interchangeable values.

### 6.13 Receipts and printing

The project includes receipt layout infrastructure, sticker layouts, thermal receipt services, ESC/POS output tests, and PDF/printing dependencies. Its existing engineering notes reference TCP printing and Windows native thermal integration.

Receipt configuration migrations and settings tests support configurable output. Bundled receipt fonts include Latin and Arabic-script font assets. Actual printer compatibility and script rendering should be demonstrated on tested hardware before making universal compatibility claims.

### 6.14 Staff roles and permissions

Authorization includes a permission catalog, role creation and management, invited staff role reconciliation, branch-scoped permissions, and permission refresh behavior. Tests cover evaluators, persistent permission caches, branch overrides, and realtime changes.

This supports controlling which users can view or mutate sensitive business data, with checks at both application and backend layers.

### 6.15 SaaS packages and subscriptions

The migration history includes package presets, tenant subscriptions, add-ons, entitlements, billing invoices, payment verification activation, subscription deadlines, lifecycle states, and cancellation at period end. Realtime access updates support reacting to subscription or feature changes.

The database also contains platform administration foundations for tenants, packages, billing, analytics, settings, and audit/support. These are evidence of backend capabilities; a complete admin user experience requires separate inspection of its exported application.

## 7. Important engineering challenges and solutions

| Challenge | Implementation approach evidenced in the repository |
| --- | --- |
| Intermittent connectivity | Drift persistence, mutation queues, connectivity monitoring, retry handling |
| Duplicate requests | Idempotent sale commits, goods receipt retries, and expense void operations |
| Financial consistency | Dedicated ledger integrations, local committers, reversal logic, reconciliation |
| Tenant and branch isolation | RLS migrations, tenant checks, branch authorization, permission evaluators |
| Complex repair lifecycle | Dedicated accounting effects, cancellation/refund handling, delivery synchronization |
| Serialized phone stock | Inventory unit models, IMEI-aware cart tests, sale-item IMEI preservation |
| Subscription-dependent access | Entitlement evaluators, navigation guards, runtime access deadlines |
| Hardware output | ESC/POS receipt generation, layout regression tests, platform printing code |
| Customer history access | Read-only paginated RPC, supporting indexes, explicit financial permissions |

## 8. Security approach and honest boundaries

Security work in the repository includes revoking anonymous table CRUD access, enabling RLS for tenant and branch tables, protecting sensitive user and subscription fields, restricting inactive users, and introducing secure management and business RPCs.

The repository also contains security audits, rollout plans, compatibility documentation, and staging-only SQL drafts. A draft or migration file does not prove production rollout. Portfolio wording should say that security policies, RPC paths, and verification materials were implemented or developed where supported, rather than claiming all direct writes were eliminated everywhere.

Do not publish private credentials, customer data, internal environment details, or live security audit findings in portfolio screenshots.

## 9. Testing and validation

At the time of this review, the repository contains 268 Dart files under `lib` and 160 files matching `*test.dart` under `test`. These are file counts, not passing-test counts or coverage percentages.

The tests span authorization, subscriptions, inventory sync safety, POS behavior, local ledger commits, repair accounting, procurement, customer activity, printing layouts, routing, and UI loading behavior. SQL-oriented regression tests also target migration contracts and known ordering or idempotency issues.

No test suite was executed for this documentation-only task. Do not claim 100% coverage, zero data loss, guaranteed checkout latency, or production-scale capacity without measured evidence.

## 10. Suggested portfolio screenshots and demo sequence

1. Show onboarding and branch context to establish the business setup.
2. Open the dashboard and explain its operational and financial summaries.
3. Add or locate an inventory item using barcode or IMEI information.
4. Complete a sale, attach a customer, and show a generated receipt.
5. Show the resulting customer activity and settlement workflow.
6. Open a repair ticket, show condition photos, parts, payment, and delivery.
7. Demonstrate a supplier order, goods receipt, and payment allocation.
8. Show an account ledger and expense entry to connect operations with money movement.
9. Demonstrate role restrictions and subscription-dependent features.
10. Demonstrate a supported offline action and its later synchronization, using non-production data.

Capture only flows verified in the current build. Use sample records and identify the platform used for each demo.

## 11. Short portfolio card

**MobileShop SaaS — Mobile Retail & Repair Management**

A Flutter business management application combining POS, barcode/IMEI inventory, repair tickets, supplier procurement, customer credit, expenses, and account ledgers. Built with Riverpod, Drift, and Supabase, with local persistence, queued inventory synchronization, tenant and branch access controls, configurable receipts, and subscription entitlements.

**Stack:** Flutter, Dart, Riverpod, GoRouter, Drift/SQLite, Supabase/PostgreSQL, ESC/POS.

## 12. CV-ready bullets

- Developed a modular Flutter retail management application spanning POS, inventory, repairs, customers, procurement, expenses, accounts, and reporting.
- Implemented local inventory persistence and queued synchronization with retry backoff, connectivity handling, and regression tests.
- Integrated transactional workflows with account ledgers, payment allocation, refunds, and reversal handling.
- Built tenant- and branch-aware authorization using permission evaluators, PostgreSQL RLS policies, and secure RPC workflows.
- Added subscription entitlements, customer activity history, configurable receipts, and thermal printing workflows.

Adjust verbs to match your personal contribution. Add numerical business impact only when supported by actual usage data.

## 13. Interview explanation in Roman Urdu

“MobileShop SaaS mobile shops aur repair centers ke liye business management application hai. Is mein POS, inventory, IMEI tracking, customers ka udhar, repairs, suppliers, expenses aur accounts aik system mein connect hain. Frontend Flutter mein banaya hai, state management Riverpod se ki hai, local data Drift mein aur backend Supabase/PostgreSQL par hai.

Sab se challenging hissa sirf screens banana nahi tha; sale, stock aur payment records ko consistent rakhna tha. Internet issue aur retry ki surat mein duplicate entries se bachne ke liye mutation queues aur idempotent operations par kaam kiya. Multiple businesses aur branches ke data ke liye RLS, permissions aur server-side validation rakhi. Repairs mein parts, payments, cancellation aur delivery ke financial effects ko bhi handle kiya.”

## 14. Evidence map for technical discussion

| Area | Repository reference |
| --- | --- |
| Startup | `lib/main.dart` |
| Routing | `lib/config/router/app_router.dart` |
| Local persistence | `lib/core/local/` |
| Authorization | `lib/core/authorization/` |
| Entitlements | `lib/core/entitlements/` |
| Tenant access | `lib/core/tenant_access/` |
| Inventory synchronization | `lib/features/inventory/data/sync/inventory_sync_engine.dart` |
| Business modules | `lib/features/` |
| Receipt layouts | `lib/core/printing/` |
| Database implementation history | `supabase/migrations/` |
| Customer activity RPC | `supabase/migrations/20261028000200_customer_activity.sql` |
| Regression tests | `test/` |
| Security rollout context | `docs/production_security_plan.md`, `docs/security_direct_write_transition.md` |

## 15. Details to add before publishing

Add the public demo or repository URL, screenshots, exact personal role and team size, development period, verified target platforms, and actual deployment status. If available, add measured outcomes such as active shops, real transaction volume, tested printer models, synchronization recovery results, or measured performance. Keep these as unclaimed details until verified.
