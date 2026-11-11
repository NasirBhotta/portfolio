# Phase 4 — Professional Identity, Experience & Contact

Preview: **http://localhost:3000/prototype#about**

Contact preview: **http://localhost:3000/prototype#contact**

## Completed

- Editorial About section positioning Nasir as an AI-Native Software Engineer, with a problem-to-product approach.
- Readable experience timeline based on the three existing role records, preserving exact titles and periods.
- Separate NIZAAM independent-product entry outside the employment timeline.
- Four expertise groups: mobile, backend/systems, AI, and infrastructure/delivery. No progress bars or logo wall.
- COMSATS BS Computer Science, with listed courses and credentials secondary to the engineering work.
- Résumé availability state, résumé-request email action, and existing GitHub, LinkedIn, and Instagram profiles.
- Contact choices for a freelance project, an engineering role, or the existing AI representative.
- Direct email, phone, profile links, and clipboard feedback that reports success only after the clipboard operation resolves.
- Native section navigation, responsive layouts, visible keyboard focus, and reduced-motion support.

The approved Phase 1–3 layouts, motion, navigation, assistant implementation, project records, and original homepage are preserved. The new section is appended through another server-rendered slot in the existing prototype shell. Only the shared assistant and clipboard controls need client interactivity; no new animation system, dependency, form backend, or API key was introduced.

## Source and attribution

`src/data/professionalIdentity.ts` adapts `PORTFOLIO_DATA` without changing the original data.

- AXAON: `Full-Stack Flutter Engineer (Remote)`, `2026 - Present (Current)`.
- GLOWSIMS: `Mobile App Development Intern`, `22 Feb 2026 - 22 May 2026 (3 months)`.
- Crifly: `Full-Stack Flutter Developer (Part-time)`, `Jan 2025 - Feb 2026`.

The ongoing marker derives from the supplied period, not from an invented employment update. Company projects remain credited to AXAON, GLOWSIMS, or Crifly. GotCakey uses the user-confirmed name for the bakery app previously called Got Bakey / Got Backey. NIZAAM is presented separately as an independent product; no development dates were invented.

Unsupported performance, download, deployment-count, and code-reuse metrics were not carried into the new timeline. Infrastructure descriptions refer to tests, GitHub Actions, deployment/release integration, and observability principles; they do not invent a production monitoring platform or operational ownership.

The academic entry uses the existing COMSATS degree, institution, and period. Grade, GPA, and language-score claims were not needed for this presentation and are omitted. The original certificate records contain “Verified” status values, but no supporting credential links or files are supplied. The new view therefore uses neutral course/assessment labels and explicit missing-link text, without verified badges.

## Résumé asset and remaining content

No résumé PDF is currently supplied. The legacy `resumeUrl` is a contact anchor and is deliberately not used as a download link.

The server-only asset resolver checks the explicitly named local path:

```text
public/resume/nasir-bhutta-resume.pdf
```

Until a real file is supplied, the interface shows a disabled “PDF not supplied” control and a working “Request my résumé” email action. It does not offer a broken download.

To enable the download, place the actual authorized résumé at that path and rebuild/restart the app. The resolver checks that the file exists, is a regular nonempty file, and begins with a PDF header; this is an availability check, not full PDF validation. A supplied asset renders as a same-origin link with the `download` attribute. Availability is cached with Next.js `use cache` so the page can remain prerendered. The actual download branch cannot be validated against a real résumé until that asset is provided.

Credential URLs can be added to the original certificate records when available. HTTPS URLs render as credential links; the UI still does not infer independent verification merely from a link.

Social links are copied from the existing profile. Instagram is `@vibecode_unpacked`, described as software engineering, AI, and development content without invented post or engagement statistics.

## Contact delivery audit

The legacy `CinematicJourneyShowcase` form sets local state and opens a `mailto:` URL; it has no confirmed delivery mechanism. It was inspected but not changed as part of this appended phase.

The new contact section intentionally uses direct `mailto:` links with distinct subjects for freelance and role inquiries. It clearly states that an email application opens and the website does not send a message. There is no form submission or “sent” confirmation. A sending service is an optional future integration, not something currently connected.

The assistant action reuses Phase 3’s scripted provider architecture and same-tab history. No live LLM was connected in this phase.

## Local testing

```powershell
Set-Location D:\portfolio
npm.cmd run dev -- --port 3000
```

Open `/prototype#about` or `/prototype#contact`.

```powershell
npx.cmd tsc --noEmit
npx.cmd eslint src/components/identity src/data/professionalIdentity.ts src/lib/profile src/components/prototype/InfrastructurePrototype.tsx src/app/prototype scripts/identity-browser-check.mjs
npm.cmd run lint
npm.cmd run build
```

Browser checks use an installed Chrome instance with a local debugging port. The Phase 4 suite defaults to port 9334:

```powershell
node scripts/identity-browser-check.mjs
```

It verifies exact experience periods, company attribution, absent unsupported metrics, missing résumé/credential states, native section navigation, social URLs, contact subjects, phone links, clipboard failure and success feedback, shared assistant access, Escape/focus restoration, reduced motion, no-JavaScript email access, duplicate IDs, and runtime exceptions. Screenshots are saved in the system temporary directory. `CHROME_DEBUG_URL` can select another local debugging port.

Viewports: 1440×1000, 1280×720, 1024×768, 768×1024, 390×844, 320×740, and 640×450. These are Windows Chrome checks, not a claim of physical-device or cross-browser certification.

The initial build exposed an uncached filesystem-read prerendering error in the résumé resolver. It was fixed with the installed Next.js version’s cache directive. The final production build, TypeScript, and focused lint pass. Full-repository lint retains the pre-existing **3 errors and 35 warnings** in legacy code: assistant purity reports (`Date.now`, `Math.random`) and a ThemeContext state update inside an effect. No new lint issues remain.

The Phase 4 browser suite passed at all seven sizes. Phase 1, Phase 2, and Phase 3 browser regression suites also passed, along with all three timeline tests. No new runtime exceptions were observed.

## Files created

- `src/data/professionalIdentity.ts`
- `src/lib/profile/resume.ts`
- `src/components/identity/ProfessionalIdentity.tsx`
- `src/components/identity/ContactActions.tsx`
- `src/components/identity/identity.module.css`
- `scripts/identity-browser-check.mjs`
- `docs/professional-identity.md`

## Files modified

- `src/app/prototype/page.tsx`: compose the professional identity section.
- `src/components/prototype/InfrastructurePrototype.tsx`: append the professional section slot before the existing footer.

No dependencies, commits, pushes, or deployments. Existing unrelated changes are preserved. Stop after Phase 4 for visual approval.
