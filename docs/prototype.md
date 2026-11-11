# Quietly Cinematic — first vertical slice

Phase 1 is implemented on the isolated `/prototype` route. Final polish includes restrained hover/focus feedback, a more compact hero on laptop-height displays, and a static cross-section on viewports at or below 650 CSS pixels high. The scroll renderer avoids repeating identical style writes after the reveal has reached an endpoint.

Preview: **http://localhost:3000/prototype**

Run `npm.cmd run dev` from `D:\portfolio`, then open the preview route. For a production preview, run `npm.cmd run build` followed by `npm.cmd start`.

## Creative refinement

The design keeps “From Interface to Infrastructure” and places composition before choreography.

The hero is a normal editorial layout. Its schematic interface opens once into Flutter interaction, local persistence, and tenant-isolated cloud data. On desktop only the illustration briefly stays alongside the explanation. On mobile the illustration scrolls naturally with the document. NIZAAM follows as a static editorial project introduction.

Removed from the earlier slice: the orbital decoration, chapter tracker, progress bar, rotating frame, text crossfades, full-screen scene switching, oversized scroll runway, reassembly sequence, and custom anchor interception.

There is no time-driven decorative animation. Links use restrained color feedback. Backgrounds remain static. Text is never hidden pending animation.

## Effect audit

- Layer separation stays because it explains the relationship between interaction, offline continuity, and the database boundary.
- Perspective is limited to a shallow cross-section; there is no spinning or camera sweep.
- The brief desktop illustration sticky position keeps the explanation and its subject together. No page or content section is pinned.
- Mobile uses ordinary document flow, without a sticky illustration.
- Reduced motion removes perspective and scroll transforms. The schematic is already open, so the same engineering explanation remains visible.
- Without JavaScript the page uses the same open schematic and normal content flow.

## Content and preservation

The illustration is explicitly labelled as a schematic, not a product screenshot. No authentic NIZAAM screenshots were found in the available assets. The project scope and engineering stack come from the existing portfolio records; no new metrics or deployment claims were added.

The homepage, project data, and original assistant component are unchanged by this refinement. The same assistant is imported with its existing replies and voice behavior. No dependencies were added, and no commit or push was made.

The prior CSS Module configuration fix and Lenis cleanup remain in place. This route does not mount Lenis or the original station navigation.

## Architecture

- `timeline.ts`: one bounded, monotonic, reversible reveal.
- `useNativeTimeline.ts`: one passive scroll listener; animation-frame work only when scrolling; cached geometry refreshed on resize, font readiness, and page restoration. Reduced motion prevents scroll paints.
- `prototype.module.css`: normal flow, responsive composition, and shallow layer transforms. No artificial section height, opacity choreography, or perpetual animation.
- Native section anchors work for keyboard navigation, direct URLs, and reduced motion without application-level interception.
- `InfrastructurePrototype.tsx`: hero, architecture explanation, NIZAAM introduction, and engineering notes.
- `ProductInstrument.tsx`: clearly labelled product schematic.

## Validation

Commands:

```powershell
npx.cmd eslint src/app/prototype src/components/prototype scripts/prototype-timeline.test.mjs scripts/prototype-browser-check.mjs
npx.cmd tsc --noEmit
node --experimental-strip-types --test scripts/prototype-timeline.test.mjs
npm.cmd run lint
npm.cmd run build
```

The timeline tests cover a single monotonic reveal, reversibility, fast jumps, out-of-range offsets, bounded values, and continuity.

The browser check requires installed Chrome running with a local debugging port of 9333 and the preview server running. Execute `node scripts/prototype-browser-check.mjs`. Screenshots go to the system temporary directory, outside the build output. Override `PROTOTYPE_URL` or `CHROME_DEBUG_URL` to use other local ports.

Windows Chrome checks passed at 320×740, 390×844, 640×450, 768×1024, 1024×768, 1280×720, and 1440×1000: native anchors, no horizontal overflow, and matching progress when returning to the same scroll offset. Also checked reduced motion, direct incoming project links, assistant opening, no-JavaScript content, and runtime exceptions. This does not constitute physical-device or cross-browser certification.

Pre-existing repository-wide lint baseline: **3 errors and 35 warnings**. Errors are the assistant’s purity reports for `Date.now` and `Math.random`, and the theme context’s state update in an effect. Those components remain unchanged.

## Files changed in this refinement

- `src/components/prototype/InfrastructurePrototype.tsx`
- `src/components/prototype/ProductInstrument.tsx`
- `src/components/prototype/useNativeTimeline.ts`
- `src/components/prototype/timeline.ts`
- `src/components/prototype/prototype.module.css`
- `scripts/prototype-timeline.test.mjs`
- `scripts/prototype-browser-check.mjs` (added)
- `docs/prototype.md`

The remaining portfolio sections are outside this prototype. Stop for visual review.
