# Phase 2 — Premium Projects Showcase

Preview: **http://localhost:3000/prototype#selected-work**

Start locally from `D:\portfolio`:

```powershell
npm.cmd run dev -- --port 3000
```

## What changed

The approved Phase 1 hero, cross-section, NIZAAM introduction, and engineering notes retain their layout and motion. The navigation and hero work link now lead to the appended showcase. The legacy `/` homepage is untouched.

The new collection features BrainBee and NIZAAM at larger scale, followed by Talib, GotCakey, Shoutsy, 24ifix, and ors_map. Editorial layouts alternate visual and text proportions; supporting projects use staggered compositions on desktop and a single readable column on mobile.

Every project includes a problem statement, contribution, qualitative outcome, attribution, stack, and a directly addressable case study at `/prototype/work/<slug>`. Case studies provide a table of contents, implementation details, clearly labelled engineering considerations, an outcome, contact, next-project navigation, and a return to the index.

The existing AI representative is imported unchanged on the case-study pages. No new assistant transport, model, prompt, or knowledge-base behavior was introduced.

## Content and imagery

Project content is adapted from `src/data/portfolioData.ts`, with provenance recorded in `src/data/projectShowcase.ts`. Existing usage, engagement, latency, test-count, and code-reuse numbers are omitted because supporting evidence is absent from this checkout.

Ownership is explicit: NIZAAM is an independent product; BrainBee is a co-developed COMSATS capstone; Talib is a GLOWSIMS contribution; the bakery marketplace and Shoutsy are company work at Crifly; 24ifix is AXAON work; ors_map is open-source engineering.

The user confirmed that GotCakey is the same Crifly bakery app described as Got Bakey / Got Backey in the original record. The showcase and case study use GotCakey consistently. The original data is preserved; provenance for the confirmed naming is stored in the new showcase record.

The asset audit found contextual photos, not authentic product screenshots. No fictional product UI was created. Current visuals are explicitly labelled editorial illustrations. Do not relabel these as screenshots.

To add an authentic screenshot, place the authorized file under `public/projects/<slug>/` and add `screenshot: { src, alt, width, height }` to the corresponding showcase record. `ProjectVisual` switches to Next.js Image with responsive sizing, native lazy loading, and a reserved aspect ratio. Include a descriptive alt that identifies the actual screen. Keep the source and authorization for supplied product captures in project documentation.

Only ors_map has a project-specific repository link in the supplied data. Profile-level GitHub URLs are not presented as project source links. No store listings or live-product URLs were invented.

## Architecture and motion

The collection and case studies render on the server. They are composed into the existing client shell through a React children slot, avoiding a second animation controller or client-side project store.

Case routes use `generateStaticParams` and Promise-based route params, following the installed Next.js 16 documentation. Unknown projects use a local not-found experience. The original root layout and original portfolio data remain unchanged.

No scroll-triggered animations, parallax, pinned project scenes, or decorative loops are added. Desktop hover shifts editorial type by four pixels; supplied screenshots receive a small hover enlargement. Reduced motion disables these effects. Text and illustrations remain visible without JavaScript.

## Validation

```powershell
npx.cmd tsc --noEmit
npx.cmd eslint src/components/projects src/data/projectShowcase.ts src/app/prototype src/components/prototype/InfrastructurePrototype.tsx scripts/projects-browser-check.mjs
node --experimental-strip-types --test scripts/prototype-timeline.test.mjs
npm.cmd run lint
npm.cmd run build
```

Production build, TypeScript, focused lint, and the three existing timeline tests pass. Full-repository lint retains its pre-existing **3 errors and 35 warnings**. The errors are in `CinematicAgentDrawer.tsx` (purity reports for `Date.now` and `Math.random`) and `ThemeContext.tsx` (state update in an effect). No new lint issues were introduced.

With Chrome running on local debugging port 9333 and the preview server running:

```powershell
node scripts/projects-browser-check.mjs
node scripts/prototype-browser-check.mjs
```

Browser checks cover the gallery order, section links, direct case URLs, all case sections, ownership labels, absence of unsupported numeric claims, mobile overflow, navigation to details, missing-project handling, assistant opening, reduced motion, no-JavaScript detail content, and runtime exceptions. Viewports: 320×740, 390×844, 768×1024, 1024×768, and 1440×1000. Existing Phase 1 checks also pass. These are Windows Chrome checks, not physical-device or cross-browser certification.

## Files

Added:

- `src/data/projectShowcase.ts`
- `src/components/projects/ProjectShowcase.tsx`
- `src/components/projects/ProjectVisual.tsx`
- `src/components/projects/ProjectAssistant.tsx`
- `src/components/projects/projects.module.css`
- `src/app/prototype/work/[slug]/page.tsx`
- `src/app/prototype/work/[slug]/not-found.tsx`
- `scripts/projects-browser-check.mjs`
- `docs/projects-showcase.md`

Adjusted:

- `src/app/prototype/page.tsx`: server-rendered showcase composition and route description.
- `src/components/prototype/InfrastructurePrototype.tsx`: appended showcase slot and work-navigation targets.

No dependencies, commits, pushes, or deployments were added. Existing unrelated changes are preserved.
