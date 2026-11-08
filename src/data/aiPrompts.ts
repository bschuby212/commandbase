import type { Command } from '../types/command'

/**
 * Tool-agnostic plain-language prompts (not shell/code commands).
 * Discover via Function → Prompts.
 * Copied in full; cards only show a short preview ending in ….
 */
export const aiPrompts: Command[] = [
  {
    id: 'ai-prompt-exhaustive-qa',
    title: 'Exhaustive Request-by-Request QA',
    description:
      'Verify every user requirement individually and correct anything incomplete.',
    command: `Run a requirement-by-requirement QA pass on everything still applicable in this project.

Mode: verify → fix proven gaps → re-verify. Do not only write a report. Do not invent requirements I never asked for. Do not mark Complete unless you inspected real behavior or UI with available tools. Newer explicit instructions win over older ones.

MISSION
Prove every still-active ask is Complete, Partial (with a named gap), Missing, Superseded, or honestly Not Tested.
Prefer fixing clear misses over writing long analysis.
Protect negative space: things I said not to change (brand, IA, unrelated flows, APIs).

PHASE 1 — EVIDENCE INTAKE
1. Read the full conversation for asks, amendments, reversals, don’t-dos, and priority calls.
2. Read linked tickets/docs/PR descriptions if present.
3. Read Design.md / tokens / Figma / screenshots if they were part of the contract.
4. Inspect the current implementation and running UI with available tools.
5. Prefer primary sources over summaries. When sources disagree, record the conflict and apply the newer explicit instruction unless I said otherwise.
6. Maintain a superseded/cancelled parking lot so old asks cannot pollute the active checklist.
7. Declare environment limits up front (no browser, no auth, missing Design.md). Those become Not Tested reasons — not a license to guess.

PHASE 2 — CHECKLIST CONSTRUCTION
Build a numbered checklist of distinct still-active requirements.
Slicing rules:
• One row = one observable outcome (not “make it nicer”).
• Merge only when two asks share the exact same pass/fail outcome.
• Split compound asks when halves can diverge (e.g. responsive + a11y + copy).
• Do not silently promote “seemed implied” into required — mark as Question if unsure.
• Include negative requirements (must-not-change).
Per row capture: ID · source · one-sentence intent · observation method · dependencies · provisional severity (Blocker/Important/Polish).

PHASE 3 — RANKING
1. Blockers that break the primary job or trust
2. Important gaps on common paths
3. Polish / copy / visual consistency
Execute in that order even if polish is faster. If two blockers compete, pick the one that unblocks more downstream verification.

PHASE 4 — PER-ITEM LOOP
For each requirement (blockers first):
1. Restate as strict pass/fail criteria.
2. Inspect real behavior/UI — browser, screenshots, logs, tests, relevant UX code paths. “File exists” is not evidence.
3. Assign status using the definitions below.
4. If Partial/Missing and the fix is in scope, apply the smallest correct fix.
5. If the “fix” would rewrite IA/brand/architecture, stop and recommend — do not freelance product changes under QA cover.
6. Retest the same acceptance criteria.
7. Record evidence checked + retest result.
8. After shared-state fixes, re-hit one adjacent flow for regression.

EVIDENCE STANDARDS
Complete requires observation of real behavior or UI at the relevant width/state — not file presence, not “should work,” not “looks wired up.”
Partial requires naming the exact missing slice so a stranger could finish it.
Missing means you searched and found no credible path.
Superseded needs a citation to the newer instruction.
Not Tested needs a concrete blocker (env, auth, missing asset, unreachable preview).

When status is contested, split claims into Observed / Inferred / Assumed.
Prefer a narrow fix you can retest over a broad rewrite you cannot.
After fixing shared state (filters, theme, routing, auth, global CSS), re-check one adjacent path for regressions.

WORKED EXAMPLE ROW
Requirement: Filters sheet opens at 75dvh on phones; multi-select works; no selected-chip row
Status: Partial
Evidence: At 390px height is correct; multi-select works; selected-chip row still present
Fix applied: Removed selected-chip row + related styles
Retest: Pass at 390 and 768

ANTI-PATTERNS
Don’t treat “code merged” as “requirement met.”
Don’t collapse five asks into one vague Complete.
Don’t hide Not Tested inside “looks good.”
Don’t invent QA for features nobody requested.
Don’t spend a novel on polish rows while blockers remain.

OUTPUT
Numbered report columns: Requirement · Status · Evidence checked · Fix applied (or none) · Retest result
Closing block: remaining risks · untested areas with blockers · single highest-priority next action · Ship gate READY / NOT READY + one reason

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

EXTENDED CHECKLIST QUALITY BAR
A good checklist row can be failed independently. A bad checklist row bundles unrelated outcomes.
Include instrumentation of negative space: “Did not change X” as rows when I forbade X.
When fixing, keep a running log of files touched mapped to requirement IDs so scope stays accountable.

RETEST POLICY
• Same acceptance criteria after every fix
• Plus one adjacent regression check when shared state changes
• If retest fails, do not mark Complete with a hopeful note — keep Partial/Missing

SHIP GATE RUBRIC
READY only if no Blocker/Important rows remain open (unless explicitly waived with impact).
NOT READY if any primary-path requirement is Partial/Missing/Not Tested without waiver.


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'qa',
      'requirements',
      'checklist',
      'verification',
      'ai prompt',
      'review',
    ],
    tags: ['QA', 'Review'],
  },
  {
    id: 'ai-prompt-strict-following',
    title: 'Strict Instruction Following',
    description:
      'Prevent unnecessary changes and missed requirements.',
    command: `Follow my instructions exactly. Optimize for fidelity to the ask — not preferred architecture, design taste, or “helpful” extras.

MISSION
Deliver exactly what was asked, with proof against a checklist. Refuse scope creep. Surface conflicts instead of silently choosing the path that expands work.

PRE-FLIGHT (WRITE BEFORE EDITS)
1. Must-haves (explicit)
2. Must-not-changes (explicit + still-in-force Design.md / pattern constraints)
3. Ambiguities + the single assumption you will use if proceeding
4. Out-of-scope temptations you will refuse
5. Success definition in pass/fail terms

HARD RULES
• Implement every explicit requirement.
• Do not add extras “while you’re here.”
• Do not redesign visuals, IA, navigation, or copy unless asked.
• Do not remove behavior to make the task easier.
• Do not ship placeholders / TODOs-in-UI / stubs where working behavior was requested.
• Do not refactor unrelated code, rename widely for style, or clean adjacent files.
• Do not change public APIs, routes, or data contracts unless required by the ask.
• Prefer existing components, tokens, and conventions over inventing parallels.

REFUSE UNLESS ASKED (CATALOG)
Taste renames · CSS architecture rewrites · unsolicited animation · product-wide copy voice changes · dependency upgrades · replacing a working component with a “cleaner” abstraction · drive-by responsive redesign · inventing tokens · expanding into a full a11y audit when not requested · unrelated test rewrites · speculative performance work · bonus empty states when not asked · new abstractions used once.

CONFLICT HANDLING
Two instructions conflict → newer wins; call out in one line.
My latest message vs Design.md → my message wins unless I made Design.md absolute.
Screenshot/Figma vs taste → source of truth wins.
If a conflict is expensive and I haven’t chosen, present options with a recommendation before a large implementation.

AMBIGUITY PROTOCOL
1. If a wrong guess is expensive → ask or state one assumption prominently.
2. If cheap → match existing patterns and note it.
3. Never resolve ambiguity by expanding scope.

FIDELITY TESTS WHILE WORKING
Would a picky PM say this matches the brief word-for-word?
Is every touched file required for a must-have?
Did copy, IA, visual language, or API shape move without being asked?
When helpfulness urges strike, park the idea under “Not done (on purpose).”
Allowed exception: tiny blockers that prevent verifying the ask (e.g. broken import you touched) — fix and note.

CLOSE-OUT RITUAL
Diff vs checklist line by line → paste must-haves with Done/Miss → list assumptions → list refused extras → only then claim done.
Related prompts: No Unnecessary Changes (diff size); Follow Design.md Exactly (system rules).

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

FIDELITY SCORECARD (USE AT CLOSE)
Must-haves Done/Miss count · Must-not-changes intact Y/N · Unasked changes count (should be 0) · Assumptions listed Y/N · Refused extras listed Y/N

EXAMPLES OF SILENT DRIFT TO CATCH
• Changing spacing “to match my eye” when ask was behavioral
• Renaming props “for clarity” across call sites
• Adding hover animations not requested
• Broadening copy edits beyond the touched strings
• Quietly altering route shapes


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'strict',
      'instructions',
      'scope',
      'implementation',
      'ai prompt',
    ],
    tags: ['Implementation'],
  },
  {
    id: 'ai-prompt-follow-design-md',
    title: 'Follow Design.md Exactly',
    description: 'Enforce project-specific design rules from Design.md.',
    command: `Before any UI changes, find and read Design.md (or equivalent design-system / tokens docs). It is the source of truth for visual and interaction conventions unless my newer instructions explicitly override it.

MISSION
Touched UI must belong to the system — not a one-off island. Reuse beats reinvention. Declare fallbacks when docs are missing; never silently invent a parallel design system.

PHASE 1 — LOCATE SOURCE OF TRUTH
Find Design.md and token sources. If missing/inaccessible, say so immediately and fall back to the strongest live patterns — labeled as fallback. Do not invent a new palette, type ramp, or component family.

PHASE 2 — MAP THE ASK TO THE SYSTEM
Before coding, map needs onto existing components/variants/tokens. For non-obvious mappings, write the mapping down. Prefer composition of primitives over new custom controls.

PHASE 3 — IMPLEMENT INSIDE CONVENTIONS
Enforce documented color roles, type styles, spacing scale/grid, radius/elevation/borders, iconography rules, responsive behaviors, interaction states, and motion if specified.

PHASE 4 — AUDIT TOUCHED SURFACES
After changes, audit every touched surface against Design.md for drift in spacing, type, color role, radius, states, and icons. Fix drift before claiming done.

TOKEN MAPPING DISCIPLINE
Text → primary/secondary/muted (not random grays)
Surfaces → page/surface/muted/raised as documented
Borders → border vs border-strong
Accent → true accent moments only
Danger/success → meaning-aligned only
Raw values only when tokens don’t exist — then flag a token gap.

COMPONENT REUSE ORDER
1) Exact existing variant 2) Existing component + documented props 3) Composition of primitives 4) New primitive only with a named Design.md gap — call the gap out.

CONFLICT WITH LIVE SCREENS
Prefer Design.md for new work unless I said the live screen is source of truth. List conflicts; do not average into a third style.

RED FLAGS
Hardcoded hex beside tokens · one-off radii/shadows · custom focus rings · ad-hoc icon sizes · magic spacing outside scale · parallel button/input styles · inconsistent hover/focus/disabled.

ANTI-PATTERNS
Don’t create a second gray palette. Don’t special-case one screen into a new brand. Don’t claim fidelity without reading Design.md (or declaring fallback). Don’t “improve” the system while implementing an unrelated ask.

OUTPUT
Sections followed · gaps that forced judgment · intentional deviations I ordered · new primitives + why reuse failed · leftover system debt on this screen.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

DOCUMENTATION GAP PROTOCOL
If Design.md lacks a rule you need:
1. Search live product patterns for the strongest precedent
2. Prefer the precedent over invention
3. Label the decision as fallback
4. Optionally note a suggested Design.md addition — do not silently create a new system

VARIANT SELECTION GUIDE
Pick the lightest variant that matches intent. Don’t upgrade every button to primary. Don’t invent a tertiary style if secondary exists.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'design.md',
      'design system',
      'tokens',
      'ui',
      'ai prompt',
    ],
    tags: ['Design System', 'Design'],
  },
  {
    id: 'ai-prompt-pixel-figma',
    title: 'Pixel-Accurate Figma Implementation',
    description:
      'Translate an existing Figma design into a faithful implementation.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Figma link / file: 
Frame / node name (or paste the frame): 
Notes / must-match details (optional): 
══════════════════════════════════════

Implement the provided Figma as faithfully as possible. Figma is the visual source of truth — inspect it with available tools/MCP or exports; do not guess from memory. Measurement beats taste.

MISSION
Ship a faithful implementation, not an interpretation. Match structure, rhythm, type, color, and states. Call out every intentional deviation with why.

PHASE 1 — INSPECT IN ORDER (DO NOT SKIP)
1. Frame structure / Auto Layout
2. Spacing & padding rhythm
3. Type styles
4. Color fills/strokes → tokens
5. Radii, borders, elevation
6. Assets & iconography
7. Variants & states
8. Responsive notes / additional frames

PHASE 2 — TRANSLATE WITH INTENT
Match layout relationships (stack/gap/padding/alignment/wrapping).
Match typography (family/size/weight/line-height/tracking/truncation).
Map color to project tokens when equivalents exist.
Preserve spacing rhythm — not “kinda similar.”
Match radii/borders/elevation, assets/crop/object-fit, and all shown states.
Implement annotated breakpoints only; don’t invent extras unless asked.

PHASE 3 — REUSE PROJECT BUILDING BLOCKS
Reuse existing components when they match Figma intent. Do not redesign, restyle brand, or “improve” hierarchy unless asked. Prefer tokens over raw hex when the system encodes Figma values.

PHASE 4 — VERIFY REGION-BY-REGION
Compare header / body / controls / footer / overlays. Fix largest deltas first. Complete the fidelity table before claiming done.

STATE COVERAGE
If Figma shows hover/selected/disabled/error/empty, that is fidelity — not optional polish.
If the product requires a state Figma omits, implement via Design.md patterns and mark beyond-frame-but-required.

ASSETS
No silent “close enough” icon swaps. Preserve aspect and crop intent. Missing export → block that item; do not invent a new illustration language.

DEVIATIONS LOG
Every intentional deviation needs a why (missing asset, font gap, token gap, platform limit). No silent drift.

ANTI-PATTERNS
Don’t improve Figma. Don’t invent breakpoints. Don’t average Figma with personal taste. Don’t mark Matched without a section compare. Don’t rewrite architecture under a fidelity banner.

OUTPUT
Fidelity table: Region | Matched / Approximate / Blocked | Evidence | What would make Approximate → Matched
Plus deviations list and leftover risks.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

TOLERANCE GUIDANCE
Exact match for spacing rhythm, type styles, and color roles.
Optical match for anti-aliased edges and icon stroke rendering differences across platforms.
Never use platform variance as an excuse for wrong structure, wrong type size, or wrong spacing scale step.

HAND-OFF FRICTION TO PRE-EMPT
Missing fonts · missing exports · ambiguous overlapping frames · component instances detached in Figma · undocumented responsive behavior — log these early as Blocked items.


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'figma',
      'pixel',
      'accurate',
      'implementation',
      'ai prompt',
    ],
    tags: ['Figma', 'Design System', 'Screenshot'],
  },
  {
    id: 'ai-prompt-screenshot-fidelity',
    title: 'Screenshot-to-UI Fidelity',
    description:
      'Recreate an interface from a screenshot without improvisation.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Screenshot(s) attached: yes/no
Which screen / state this is: 
Must-match notes (optional): 
Known differences to ignore (optional): 
══════════════════════════════════════

Recreate or correct the UI to match the provided screenshot(s) with high fidelity. The screenshot is the visual target for layout, hierarchy, spacing, type, and color — not a vague mood board.

Do not redesign. Do not modernize. Do not reinterpret brand.

MISSION
Make the implementation match the screenshot’s structure and visual relationships within project components/tokens. Fidelity is not inspiration.

PHASE 1 — OBSERVE
List major regions (nav/hero/content/sidebar/footer/overlays). Note what reads first/second/third. Inventory surface language (flat vs carded), type steps, and icon weight.

PHASE 2 — MEASURE
Relative sizes, alignment axes, spacing rhythm, contrast roles, wrapping/truncation, icon optical size vs text.

PHASE 3 — MAP & IMPLEMENT
Map to project components/tokens; introduce new primitives only when nothing fits. Fix deltas from largest visual error to smallest.

PHASE 4 — RECOMPARE
After changes, compare again. Call out remaining unblockable gaps (missing assets, unknown fonts, truncated content in the shot, responsive uncertainty).

READING-ORDER EXERCISE
1. Squint/blur: where are the dark masses / focal points?
2. Type path: title → supporting → meta without confusion?
3. CTA: is the primary action obvious without hunting?
4. Noise: which borders/cards/shadows can vanish without hurting understanding? If the screenshot has none, add none.

MULTI-SHOT & DESIGN.MD CONFLICTS
Prefer the newest screenshot or the one I marked as source of truth; document conflicts before blending.
If Design.md conflicts with the screenshot, ask or follow my explicit priority; otherwise prefer the screenshot for this task and list Design.md tensions.

FOCUS AREAS
Hierarchy/composition · spacing + shared axes · type scale/wrapping · surface noise · color roles as used in the shot · icon alignment/weight.

ANTI-PATTERNS
Not “inspired by.” Not “modernized.” Not unsolicited hierarchy improvements. Don’t add cards/borders/shadows/gradients the screenshot lacks.

OUTPUT
Closed deltas · remaining deltas · blockers · re-check plan (widths/states).

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

SCREENSHOT LIMITATIONS (CALL OUT, DON’T GUESS)
Cropped edges · unknown hover states · unknown responsive behavior · compressed artifacts mistaken for borders · light/dark ambiguity · placeholder content in the shot.
When unknown, implement the conservative reading and list questions.


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'screenshot',
      'fidelity',
      'ui',
      'visual',
      'ai prompt',
    ],
    tags: ['Screenshot', 'Design'],
  },
  {
    id: 'ai-prompt-senior-design-review',
    title: 'Senior Product Designer Review',
    description: 'Provide thoughtful, specific design criticism.',
    command: `Review this work as you would before a hard stakeholder critique. Default mode: prioritized, actionable findings. Implement only if I ask, or if a fix is trivially local and clearly intended.

MISSION
Raise the outcome quality of the next iteration. Separate concept problems from execution problems. Protect what’s working so we don’t thrash good decisions.

PHASE 1 — ORIENT
Restate the user/job this UI claims to serve. Note constraints (brand, system, timeline) and what “success” would mean for a first-time user in under five seconds.

PHASE 2 — CRITIQUE ACROSS LENSES
Walk: problem fit · hierarchy/composition · flow/decisions · visual system consistency · states/edges · responsive · a11y at design level · scope smell (decoration, competing CTAs, noisy chrome). Skip empty lenses.

PHASE 3 — PRIORITIZE & RECOMMEND
Assign Blocker / Major / Minor. Recommend the smallest intervention that raises outcome quality. Prefer removal/simplification over adding UI. If implementing wasn’t requested, don’t sneak a rewrite.

SEVERITY GUIDE
Blocker — fails the job, trust, access, or primary comprehension
Major — serious friction/inconsistency users will feel
Minor — polish that can wait

COMMENT QUALITY
Bad: “Consider improving the spacing.”
Good: name the region, the mismatch vs nearby rhythm, the user effect, and the smallest fix.

WHEN THE CONCEPT IS THE PROBLEM
Say so early. Don’t rearrange deck chairs. Offer the smallest conceptual alternative in words.

PROTECT LIST
Always name 1–3 things working so the next pass doesn’t destroy them.

ANTI-PATTERNS
No generic praise. No redesign essays when hierarchy/spacing/copy would fix it. No severity inflation. No hidden implementation unless asked.

OUTPUT
Top ≤7 issues (severity · observation · why · fix) · What’s working · Questions/assumptions · “If we only fix three…” ordered list.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

REVIEW DEPTH TARGETS
At least one finding about hierarchy/first-read if the UI has denser chrome than content.
At least one finding about flow/decision clarity if there are multiple CTAs.
At least one system consistency check if Design.md/tokens exist.
If you find nothing, say what you checked and why it’s solid — don’t invent fake issues.

FOLLOW-UP ORDERING HEURISTIC
Fix what changes comprehension first, then task success, then polish. Never lead with decoration.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'design review',
      'critique',
      'usability',
      'senior',
      'ai prompt',
    ],
    tags: ['Design', 'Review', 'Accessibility'],
  },
  {
    id: 'ai-prompt-visual-polish',
    title: 'Full Visual Polish Pass',
    description: 'Improve the final 10% of UI quality.',
    command: `Run a full visual polish pass inside the existing brand. This is refinement — not a redesign, feature build, or architecture project. Cap to ~5–8 highest-impact fixes. Prefer removal and alignment over decoration.

MISSION
Improve first-read clarity and calm. The screen should feel quieter and more intentional — not louder or more decorated.

PHASE 1 — WALK & RANK
Walk the screen as a user. List visual frictions that hurt hierarchy or calm. Rank by impact on first-read comprehension of the primary job/CTA.

PHASE 2 — FIX THE TOP SET ONLY
Apply restrained fixes to the top issues. Leave lower-impact nits listed but untouched unless trivial. Re-check at a narrow and desktop width if responsive.

PHASE 3 — EXPLAIN & STOP
For each meaningful change: what changed and why it improves clarity. Stop when the top set is done — don’t keep decorating.

POLISH CHECKLIST (FIX ONLY WEAK SPOTS)
Hierarchy · spacing rhythm (project scale) · alignment axes · type scale collisions · color role misuse · surface noise (useless cards/borders/shadows/dividers) · density · icon size/stroke/optical alignment · cheap hover/focus/disabled polish · responsive leftovers

DIAGNOSTICS
Hierarchy: if color/icons were removed, would type size/weight/spacing alone express priority?
Noise: for each border/card/shadow/divider — if removed, does understanding/interaction suffer? If no → remove.
Color: each accent should mean action/link/state — decorative accent is debt.

BEFORE→AFTER NOTE FORMAT
• Hierarchy: …
• Spacing: …
• Noise: …

STOPPING RULES
About to add gradient/glow/sticker/new card → stop.
Needs IA change → park it (not polish).
Hit ~5–8 solid fixes → backlog the rest.

ANTI-PATTERNS
No redesign theater. No brand invention. No copy/IA changes beyond what’s needed for hierarchy. No glow/gradient decoration.

OUTPUT
Applied before→after notes · skipped backlog · widths checked · residual risks.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

POLISH BUDGET
Default max ~5–8 meaningful changes unless trivially tiny.
Each change must improve first-read clarity or calm — not novelty.
If two fixes fight (e.g., more separation vs tighter grouping), pick the one that clarifies the primary job and note the tradeoff.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'polish',
      'spacing',
      'typography',
      'visual',
      'ai prompt',
    ],
    tags: ['Design', 'Review'],
  },
  {
    id: 'ai-prompt-e2e-qa',
    title: 'End-to-End Functional QA',
    description: 'Test the product like a real user.',
    command: `Run an end-to-end functional QA pass on the relevant flow(s) as a careful human would — not a skim of happy-path code. Find broken behavior, incomplete states, and integration gaps; fix clear bugs when you can prove them; document what you could not verify.

MISSION
Produce evidence-backed pass/fail results for the real user journey, plus fixes for proven in-scope failures.

PHASE 1 — WRITE A CHARTER
Before testing: flows under test · risks/likely break points · tools/env available · explicit out of scope.

PHASE 2 — EXECUTE COVERAGE
Adapt; skip what doesn’t apply:
Entry (deep link/empty/returning) · happy path with realistic data · validation/recovery · persistence (refresh/back/revisit) · permissions/roles · async (loading/retry/timeout/partial failure/double-submit) · edge data (long/empty/zero/large/special chars) · navigation cancel/back/dismiss · narrow viewport critical actions · shared-state regressions.

PHASE 3 — TRIAGE & FIX
For each failure: repro steps · expected · actual · severity · fix if in scope · retest.
Severity: Blocker (can’t complete primary job / data loss / trust break) · Major (painful workaround) · Minor (polish/rare).
“Code exists” ≠ “flow works.”

REGRESSION MINDSET
When fixing shared state (filters, theme, routing), re-hit one adjacent flow.

BLOCKED TESTS
If you can’t run a case, mark blocked with the exact dependency — don’t invent a pass.

ANTI-PATTERNS
Don’t equate unit confidence with journey confidence. Don’t bury failures in prose. Don’t expand into a feature rewrite mid-QA.

OUTPUT
Charter · results table (case → pass/fail/blocked → notes) · fixes applied · residual risk/not tested · next QA focus. Make it re-runnable by a human.

EVIDENCE STANDARDS
Complete requires observation of real behavior or UI at the relevant width/state — not file presence, not “should work,” not “looks wired up.”
Partial requires naming the exact missing slice so a stranger could finish it.
Missing means you searched and found no credible path.
Superseded needs a citation to the newer instruction.
Not Tested needs a concrete blocker (env, auth, missing asset, unreachable preview).

When status is contested, split claims into Observed / Inferred / Assumed.
Prefer a narrow fix you can retest over a broad rewrite you cannot.
After fixing shared state (filters, theme, routing, auth, global CSS), re-check one adjacent path for regressions.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

DATA REALISM
Use realistic strings/lengths. Include an ugly long string case. Include empty. Include a permission-denied path if roles exist.
If fixtures are unavailable, say what’s blocked rather than faking a pass.


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'e2e',
      'functional',
      'qa',
      'user journey',
      'ai prompt',
    ],
    tags: ['QA'],
  },
  {
    id: 'ai-prompt-responsive-audit',
    title: 'Responsive Design Audit',
    description: 'Ensure layouts work across devices.',
    command: `Perform a responsive design audit of this UI and fix high-impact breakpoint issues inside the existing design system. Goal: intentional at mobile, tablet, and desktop — not a shrunk desktop or stretched mobile.

MISSION
Eliminate real responsive failures users hit, using existing patterns. Don’t invent a parallel mobile brand.

PHASE 1 — CHOOSE WIDTHS
Use project breakpoints if documented; else ~390, ~768, ~1024, ~1280. Note which are in-product vs assumed.

PHASE 2 — AUDIT EACH WIDTH
Overflow/clipping · stacking vs hierarchy · type line-length/jumps · touch targets/spacing · nav/filter collapse via existing patterns · grid orphans/empty bands · media scaling · forms · modal/sheet fit & scroll containment · density leaks.

PHASE 3 — FIX WORST FIRST
Prioritize blockers (unreachable primary actions, horizontal scroll, clipped controls) before type nitpicks. Prefer CSS/layout fixes over JS measurement hacks.

MOBILE FAILURE TAXONOMY
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

IA RULE
Do not invent a new mobile information architecture unless the current structure truly fails — then say so and propose the smallest pattern-aligned fix.

ANTI-PATTERNS
Don’t skip tablet. Don’t “mobile redesign” the product unasked. Don’t leave overflow as a known issue without saying so.

OUTPUT
Per-breakpoint findings (severity+fix) · changes applied · verify matrix: width | overflow | CTA reachable | type OK | notes.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

FIX ORDERING
1. Horizontal overflow / clipped primary controls
2. Unreachable primary CTA
3. Broken nav/filter access patterns
4. Type readability
5. Density/spacing polish
Document deferred items explicitly so they don’t vanish.


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'responsive',
      'mobile',
      'viewport',
      'audit',
      'ai prompt',
    ],
    tags: ['QA', 'Design'],
  },
  {
    id: 'ai-prompt-a11y-audit',
    title: 'Accessibility and Interaction Audit',
    description: 'Review accessibility beyond basic contrast.',
    command: `Run an accessibility and interaction audit on the current UI, then fix the highest-severity issues that are clearly in scope. Practical audit — not a legal opinion, not full WCAG certification.

MISSION
Improve real operability on critical paths. Prefer semantic fixes. Document deferred minors.

PHASE 1 — SCOPE CRITICAL PATHS
Prioritize auth/create/submit/navigate/pay (adapt to product). Charter what is in/out of this pass.

PHASE 2 — AUDIT
Semantics · name/role/value · focus · keyboard · targets · contrast · motion · forms · live updates · overlays/focus restore. Gather evidence with available tools.

PHASE 3 — FIX BLOCKERS/MAJORS
Prefer correct elements/labels over ARIA wallpaper. Don’t rewrite visuals unless contrast/layout blocks access. Use existing focus patterns.

BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

KEYBOARD SMOKE SCRIPT
1. Tab from top through primary controls
2. Open key dialog/sheet; focus moves in; Esc/dismiss restores
3. Operate primary CTA/critical form without pointer
4. Confirm focus visible at every stop

LABEL SMELLS
Icon-only without names · placeholder-only labels · errors not tied to fields · custom controls missing role/state

ANTI-PATTERNS
Don’t chase a score with cosmetic changes. Don’t bolt ARIA onto broken structure. Don’t expand into a visual redesign.

OUTPUT
Findings by severity with location+fix · changes applied · deferred with why · verification steps.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

SEVERITY EXAMPLES
Blocker: cannot operate primary task by keyboard; unlabeled critical control; focus trap in dialog
Major: poor contrast on primary text; missing error association; inconsistent focus visibility
Minor: heading level skips with no UX impact; decorative SVG quirks


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'accessibility',
      'a11y',
      'wcag',
      'keyboard',
      'ai prompt',
    ],
    tags: ['QA', 'Accessibility'],
  },
  {
    id: 'ai-prompt-no-unnecessary-changes',
    title: 'No Unnecessary Changes',
    description:
      'Protect working functionality and existing design decisions.',
    command: `Keep the diff as small as possible. Optimize for a reviewable, low-risk change set that solves only the ask.

MISSION
Ship the minimum correct change. Mentions > drive-by fixes. Reviewability beats cleverness.

PHASE 1 — BUDGET THE CHANGE SET
Restate minimal acceptance criteria. Identify fewest files/components that must change. Explicitly list temptations to leave out (renames, reformatting, nearby bugs, dependency upgrades).

PHASE 2 — IMPLEMENT WITH RESTRAINT
Extend existing helpers over parallel utilities. Match local style. Comments only where intent is non-obvious. No new abstractions unless duplication blocks a correct fix.

PHASE 3 — CLOSE WITH A DIFF NARRATIVE
Summarize files touched + why necessary + deliberately not changed. If the diff grew, explain what forced it and whether it can be split.

HARD RULES
No unrelated refactors/moves/renames. No wholesale formatting/import resorting outside touched lines. No design-system rewrites/token migrations/dependency bumps for cleanliness. No copy rewrites beyond the task. No speculative perf. Nearby bugs: mention, don’t fix unless they block verification or I said to.

DIFF SMELL DETECTOR
Files not on the acceptance path · prettier-only hunks · renames forcing wide churn · new utils used once · cleanup comments unrelated to the ask.

ANTI-PATTERNS
Don’t bundle discoveries that need their own review story. Don’t confuse hygiene with redesign.

OUTPUT
Acceptance restatement · files touched + why · deliberately not changed · residual risks.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

DIFF BUDGET MINDSET
If a change isn’t required to prove acceptance, it doesn’t ship in this diff.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'minimal',
      'scope',
      'diff',
      'implementation',
      'ai prompt',
    ],
    tags: ['Implementation'],
  },
  {
    id: 'ai-prompt-production-readiness',
    title: 'Production Readiness Review',
    description: 'Evaluate whether a feature is genuinely ready to ship.',
    command: `Review this work for production readiness. Be skeptical. Shipping bar: safe, coherent, operable, and reversible enough for a real release.

MISSION
Give a Go/No-Go with spine. Separate blockers from follow-ups. Provide a short release test plan.

PHASE 1 — INSPECT AGAINST SHIP DIMENSIONS
Correctness of primary flow · edge cases/permissions · UX coherence on critical path · system fidelity · a11y baseline on critical interactions · key viewports · perf smells on main path · security/privacy basics (flag only) · observability (empty vs error) · rollout/rollback/flags/migrations.

PHASE 2 — CLASSIFY & ACT
Blockers vs nice-to-have. Fix clear in-scope blockers; otherwise recommend. Do not soften NOT READY.

SHIP STATEMENTS
READY — primary job verified; no blockers; follow-ups non-blocking
READY WITH WAIVERS — blocker-class risks explicitly accepted; list them
NOT READY — name blockers; don’t soften

RELEASE TEST PLAN
3–7 human steps including one narrow viewport and one error/empty path if relevant.

ANTI-PATTERNS
Don’t rubber-stamp. Don’t hide waivers. Don’t turn this into an unbounded rewrite.

OUTPUT
Go/No-Go rationale · blockers · follow-ups · test plan · rollback notes if relevant.

EVIDENCE STANDARDS
Complete requires observation of real behavior or UI at the relevant width/state — not file presence, not “should work,” not “looks wired up.”
Partial requires naming the exact missing slice so a stranger could finish it.
Missing means you searched and found no credible path.
Superseded needs a citation to the newer instruction.
Not Tested needs a concrete blocker (env, auth, missing asset, unreachable preview).

When status is contested, split claims into Observed / Inferred / Assumed.
Prefer a narrow fix you can retest over a broad rewrite you cannot.
After fixing shared state (filters, theme, routing, auth, global CSS), re-check one adjacent path for regressions.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

RELEASE REALISM
Assume a skeptical reviewer will try the unhappy path. Waivers must be explicit.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'production',
      'readiness',
      'ship',
      'qa',
      'ai prompt',
    ],
    tags: ['QA', 'Review'],
  },
  {
    id: 'ai-prompt-conflict-priority',
    title: 'Requirement Conflict and Priority Review',
    description:
      'Prevent older requests from overriding newer decisions.',
    command: `Review requirements, conversation, and implementation for conflicts and priority mistakes. Surface contradictions before more work piles on the wrong foundation.

MISSION
Make conflicts and priority inversions explicit, recommend winners, and propose the smallest alignment changes.

PHASE 1 — GATHER & COMPARE
Inventory instructions by source/time. Compare against what the UI/code currently does. Note Design.md/Figma constraints still in force.

PHASE 2 — CLASSIFY CONFLICTS
Direct conflicts (cannot both be true) · soft tensions (speed vs thoroughness, density vs clarity) · priority inversions (polish before primary path) · stale requirements still in UI · hidden scope.

PHASE 3 — RECOMMEND ALIGNMENT
For each: both sides + sources · impact if ignored · recommended winner/compromise · smallest UI/code/docs change. Newer explicit instruction wins by default — say so.

DECISION LOG TEMPLATE
1 Conflict A vs B
2 Sources
3 Winner + rule
4 UI/code change required
5 What we will not do

ANTI-PATTERNS
Don’t silently redesign to “solve” a conflict. Don’t implement a large alignment change without a clear winner when guessing is expensive.

OUTPUT
Prioritized conflict list · source-of-truth order · paste-ready decision log · open human decisions.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

PRIORITY INVERSION EXAMPLES
Polish before primary path · old ticket resurrecting superseded UX · Design.md vs newer product call · screenshot vs token system — log and resolve.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'conflict',
      'priority',
      'requirements',
      'planning',
      'ai prompt',
    ],
    tags: ['Planning'],
  },
  {
    id: 'ai-prompt-final-verification',
    title: 'Final Implementation Verification',
    description: 'Prevent premature completion claims.',
    command: `Do a final implementation verification before we call this done. Last gate — skeptical, evidence-based, checklist-driven. Assume something was missed.

MISSION
Either prove acceptance with evidence or explicitly waive with impact. No silent Partials.

PHASE 1 — REBUILD ACCEPTANCE
Re-read original ask + amendments. Build final acceptance checklist. Include negative space/must-not-changes.

PHASE 2 — DIFF CHECKLIST VS SHIPPED
Compare against UI + behavior, not just files changed. Exercise primary path end-to-end. Spot-check empty/loading/error/success, one long-content case, one narrow viewport.

PHASE 3 — CONTRACT & CLEANLINESS
Confirm Design.md/Figma/screenshot constraints honored or deviations listed. Confirm no unrelated diff (or justify). Hunt placeholders (TODO/lorem/click me/temp copy/debug borders). Confirm destructive actions follow product confirmation patterns.

WAIVER DISCIPLINE
A waiver needs: what’s incomplete · user impact · why ship anyway · follow-up owner/next step. No silent waivers.

ANTI-PATTERNS
Don’t claim Ready without evidence. Don’t hide Partials. Don’t start new features during verification.

OUTPUT
Acceptance checklist with status+evidence · fixes during verification · limitations/follow-ups · ship statement Ready / Ready with waivers / Not ready.

EVIDENCE STANDARDS
Complete requires observation of real behavior or UI at the relevant width/state — not file presence, not “should work,” not “looks wired up.”
Partial requires naming the exact missing slice so a stranger could finish it.
Missing means you searched and found no credible path.
Superseded needs a citation to the newer instruction.
Not Tested needs a concrete blocker (env, auth, missing asset, unreachable preview).

When status is contested, split claims into Observed / Inferred / Assumed.
Prefer a narrow fix you can retest over a broad rewrite you cannot.
After fixing shared state (filters, theme, routing, auth, global CSS), re-check one adjacent path for regressions.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

PLACEHOLDER HUNT LIST
TODO · lorem · click me · temp · debug outlines · fake avatars · ‘test’ copy · disabled buttons that should work · dead links.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'verification',
      'completion',
      'qa',
      'final',
      'ai prompt',
    ],
    tags: ['QA', 'Review'],
  },

  {
    id: 'ai-prompt-ui-design-principles',
    title: 'UI Design Principles Pass',
    description:
      'Strengthen visual hierarchy, composition, and surface treatment without a redesign.',
    command: `Improve visual quality inside the existing brand — no redesign, no engineering rabbit holes, no new decorative system.

Default mode: apply restrained visual fixes; explain why in plain language. Prefer removal and alignment over decoration. Cap work to the highest-impact visual issues (roughly top 5). If Design.md / tokens exist, follow them. If a reference file is missing, say so and use the live UI + project conventions.

MISSION
Make hierarchy obvious, rhythm consistent, and surfaces quiet so content and actions lead. Every change should earn its place in a diff review.

PHASE 1 — WALK & RANK
Walk once as a user. Note top visual frictions. Rank by impact on first-read clarity of primary job/CTA.

PHASE 2 — APPLY TOP FIXES ONLY
Fix the top ~5. Leave lower-impact nits listed. Re-check ~390 and desktop if responsive.

PHASE 3 — EXPLAIN
For each change: what / why clearer / what you left alone.

FOCUS LEVERS
1 Hierarchy (first/second/third; demote chrome; kill competing focals)
2 Spacing rhythm (project scale; kill magic numbers; section separation without heavy rules)
3 Alignment (shared edges, insets, icon/text optics, column axes)
4 Type scale clarity (distinct steps; fix collisions; truncation/wrapping; don’t invent a new ramp)
5 Surface noise (drop useless cards/borders/shadows/dividers/nested panels)
6 Color roles (semantic tokens with intent; reduce random accents; no new palette)
7 Icon alignment/weight (consistent box/stroke/padding; optical align to text)

DIAGNOSTICS
Hierarchy: without color/icons, do type/spacing express priority?
Noise: if a border/card/shadow/divider vanished, would understanding/interaction suffer? If no → remove.
Color: accent must mean something (action/link/state).

ANTI-PATTERNS
No purple glow, gratuitous gradients, hero badges/chips clutter, cardifying everything, drive-by IA changes, copy rewrites beyond hierarchy needs.

OUTPUT
Per-change what/why/left-alone · skipped nits · widths checked.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

COMPOSITION BUDGET
First viewport should usually read as one composition: brand/job hierarchy, primary action, supporting line — not a dashboard of competing modules (unless it is a dashboard).

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'ui',
      'visual hierarchy',
      'composition',
      'design principles',
      'ai prompt',
    ],
    tags: ['Design', 'UI'],
  },
  {
    id: 'ai-prompt-ux-best-practices',
    title: 'UX Best Practices Pass',
    description:
      'Improve flows, clarity, and decision-making from the user’s point of view.',
    command: `Improve flows and decisions from the user’s point of view — not pixel polish (use UI Design Principles / Visual Polish for that). Default: recommend smallest UX changes; implement when obvious, local, and low-risk. Don’t expand into a product rethink unless the flow fundamentally fails.

MISSION
Reduce hesitation and drop-off on the path to the user’s job. Clarity and momentum over novelty.

PHASE 1 — MAP THE FLOW
Entry → completion/abandonment. Note persona assumptions. Use real UI tools when possible.

PHASE 2 — FIND FRICTION
For each step ask: goal clarity · next action obvious? · cognitive load · feedback after actions · error recovery · unnecessary steps/dead ends · trust/side effects · plain language/targets/keyboard order.

PHASE 3 — SMALLEST FIXES
Propose smallest fix per issue (copy, order, default, progressive disclosure, pattern reuse). Implement only clear scoped fixes unless recommendations-only. Re-walk after changes.

FRICTION LOG FORMAT
Step · User intent · Friction · Severity · Smallest fix · Applied?

DEFAULTS & DISCLOSURE
Safe defaults · hide advanced until needed · don’t ask for inferable data · one primary action per decision moment when possible.

ANTI-PATTERNS
Don’t pixel-polish under a UX banner. Don’t invent IA. Don’t ignore existing nav/system patterns unless the pattern itself is the problem — then say so.

OUTPUT
Flow summary (3–5 steps) · prioritized issues with recommended/applied fixes · open product questions · what you didn’t change + why.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

HESITATION SIGNALS
Multiple equal CTAs · unclear selected state · missing feedback after click · asking for info early · jargon labels · dead ends without escape.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'ux',
      'best practices',
      'flows',
      'usability',
      'ai prompt',
    ],
    tags: ['UX', 'Review'],
  },
  {
    id: 'ai-prompt-a11y-best-practices',
    title: 'Accessibility Best Practices Pass',
    description:
      'Apply practical accessibility principles as design decisions, not only checklist items.',
    command: `Apply practical accessibility best practices to this UI. Improve real access and operability — not stickers, not speculative score-chasing, not a purely visual restyle.

MISSION
Fix high-impact access issues in place using existing components/patterns. Prefer correct semantics over ARIA patches.

PHASE 1 — CRITICAL PATHS FIRST
Auth/create/pay/submit/navigate (adapt). Charter in/out of scope.

PHASE 2 — APPLY PRACTICE CHECKLIST
Structure/headings/landmarks · labels · keyboard · focus · contrast via tokens · targets · states exposed · motion/reduced-motion · alternatives for informative images · associated errors.

PHASE 3 — FIX & VERIFY
Blockers/majors first. Document minors. Keyboard verification script for main path. Keep visuals intentional — use project focus patterns.

BASELINE DETAIL
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

STATES
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

ANTI-PATTERNS
Don’t redesign for an “a11y look.” Don’t ARIA-wallpaper broken structure. Don’t expand into unrelated polish.

OUTPUT
Findings with severity · fixes · deferred · keyboard verification script.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

PRACTICAL WIN LIST
Named icon buttons · visible focus · associated errors · keyboard dialogs · contrast via tokens · adequate targets.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'accessibility',
      'a11y',
      'best practices',
      'inclusive',
      'ai prompt',
    ],
    tags: ['Accessibility', 'Design', 'QA'],
  },
  {
    id: 'ai-prompt-make-responsive',
    title: 'Make This Layout Responsive',
    description:
      'Adapt the layout for mobile, tablet, and desktop — implement, don’t only audit.',
    command: `Make this layout responsive in a deliberate, product-quality way — not a last-minute squeeze. Stay inside the existing brand and component system. Do not invent a new visual language for small screens.

MISSION
Primary tasks work at phone/tablet/desktop with intentional stacking and no horizontal overflow, using existing collapse patterns.

PHASE 1 — UNDERSTAND STRUCTURE
Identify columns, fixed widths, sticky regions, overflow containers, and current breakpoint behavior.

PHASE 2 — DEFINE BEHAVIOR
Choose breakpoint behavior from Design.md/existing patterns. Define mobile stacking that preserves hierarchy (what appears first).

PHASE 3 — IMPLEMENT & VERIFY
Replace brittle fixed widths with flexible constraints; keep max-widths for readability. Adjust type/spacing only as needed — no parallel mobile brand. Verify ~390/~768/~1280 (or project breakpoints). Worst failures first.

STACKING PRINCIPLES
Primary job first on small screens. Secondary chrome can collapse into existing sheet/drawer patterns. Don’t hide critical actions behind unlabeled icons without a product decision.

MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

ANTI-PATTERNS
No feature invention. No desktop-only IA unless a mobile pattern already exists. Prefer CSS/layout over JS measurement hacks.

OUTPUT
Changes per breakpoint · remaining risks/product decisions · verify matrix.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

IMPLEMENTATION PREFERENCES
Flex/grid with minmax · avoid 100vw · existing sheet/drawer patterns · preserve max-width for reading · don’t duplicate desktop and mobile markup unless product already does.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'responsive',
      'mobile',
      'layout',
      'breakpoints',
      'implement',
      'ai prompt',
    ],
    tags: ['Design', 'Responsive'],
  },
  {
    id: 'ai-prompt-design-md-legacy',
    title: 'Apply Design.md to a Legacy Screen',
    description:
      'Bring an older screen in line with current Design.md without a full rewrite.',
    command: `Apply Design.md (or the project design system) to this legacy screen without a product redesign. Goal: token and component alignment — not a new concept.

MISSION
Make the outlier belong with the rest of the app while preserving IA, copy intent, and behavior.

PHASE 1 — READ THE SYSTEM
Design.md / tokens / core components. If missing, say so and align to strongest live patterns.

PHASE 2 — INVENTORY ONE-OFFS
Custom colors, type sizes, radii, shadows, buttons, inputs, spacing, ad-hoc states.

PHASE 3 — MAP & REPLACE SYSTEMATICALLY
Map each one-off to closest system equivalent. Replace: surfaces → type → controls → spacing → states. Remove dead custom CSS that only propped up the old look.

MAPPING TABLE
Legacy one-off | System equivalent | Notes | Done?

PRESERVE
Preserve IA/copy intent/behavior unless system component a11y requires a small structural fix. Don’t expand to neighboring legacy pages unless shared components force it.

ANTI-PATTERNS
Don’t boil the ocean. Don’t redesign the product concept. Don’t restyle natives to “sort of look like” the system when a real component exists.

OUTPUT
Mapping table · changes applied · leftover debt · product decisions needed.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

MIGRATION ORDER RATIONALE
Surfaces first (sets context) → type (hierarchy) → controls (interaction) → spacing (rhythm) → states (finish).

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'design.md',
      'legacy',
      'migration',
      'design system',
      'ai prompt',
    ],
    tags: ['Design System', 'Design'],
  },
  {
    id: 'ai-prompt-copy-naming',
    title: 'Copy and Naming Pass',
    description:
      'Tighten UI copy and make labels, names, and messages consistent.',
    command: `Do a copy and naming pass. Improve clarity and consistency without restyling the UI. Scope: labels, buttons, headings, helper text, empty states, errors, nav items, short in-product names — not marketing rewrite.

MISSION
Same concept → same word. Clarity over cleverness. Actionable errors and empties.

PHASE 1 — INVENTORY
Collect user-facing strings on the target screen/flow. Note capitalization patterns already in the product.

PHASE 2 — FLAG & REPLACE
Flag vague, inconsistent, scary, or bloated copy. Propose replacements; implement when straightforward. Standardize synonym drift (e.g., Prompt vs Ask vs Command) to the product’s chosen term.

PHASE 3 — DELIVER ARTIFACTS
Before→after table · glossary of standardized terms · open product/legal questions (don’t guess).

PRINCIPLES
Clarity over cleverness · verbs on actions · nouns on objects · errors say what happened + how to fix · empties say what’s missing + next step · truncation-safe (meaning early) · match product capitalization · don’t invent conflicting feature names.

STYLE EXAMPLES
“Submit” → “Save changes” when saving is the job
“Error” → “Couldn’t save — check your connection and try again”
Empty “N/A” → “No commands yet. Adjust filters or clear search.”

ANTI-PATTERNS
No visual redesign/spacing changes to fit copy unless a label truly breaks the component. No product-wide voice rewrite. No unverified legal claims.

OUTPUT
Before→after · glossary · open questions · residual risks.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

CONSISTENCY SWEEP
Same action word everywhere · same object noun · same empty-state pattern · same error tone.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'copy',
      'microcopy',
      'naming',
      'labels',
      'content design',
      'ai prompt',
    ],
    tags: ['Copy', 'UX', 'Review'],
  },
  {
    id: 'ai-prompt-perf-smoke',
    title: 'Performance Smoke Pass',
    description:
      'Hunt obvious jank: heavy media, layout shift, and first-paint drag.',
    command: `Run a performance smoke pass focused on user-perceived speed for this screen/flow. Triage — not a deep profiling project.

MISSION
Find high-impact, low-cost speed issues with evidence. Apply only small safe fixes. Don’t speculate.

PHASE 1 — DEFINE CRITICAL MOMENT
First paint of primary content and/or time to interactive primary action.

PHASE 2 — HUNT WITH TOOLS
Large/unoptimized images · unnecessary re-renders/refetch · CLS from late media/missing sizes · main-thread heavy work on first interaction · blocking third parties (flag) · expensive scroll/hover thrash if obvious · request waterfalls.

PHASE 3 — FIX SMALL & SAFE
Image dimensions · lazy below-fold · drop duplicate fetch · avoid accidental giant lists · memo only if project already patterns that way. No new state libraries or speculative rewrites.

EVIDENCE RULE
If you can’t point to a signal, don’t “optimize.” Rank by user impact vs fix cost.

ANTI-PATTERNS
No micro-optimizations without evidence. No architecture rewrites under a smoke banner.

OUTPUT
Findings (impact/effort) · fixes + evidence · follow-ups needing a real perf project.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

SAFE FIX LIST
Width/height on images · lazy below-fold · remove duplicate fetch · don’t load hidden tab data eagerly if easy · avoid rendering huge lists without existing virtualization patterns.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'performance',
      'smoke',
      'cls',
      'images',
      'jank',
      'ai prompt',
    ],
    tags: ['QA', 'Performance'],
  },
  {
    id: 'ai-prompt-handoff-notes',
    title: 'Handoff Notes',
    description:
      'Write a crisp ship note: what changed, how to verify, risks, and gaps.',
    command: `Write handoff notes for the next designer or engineer who won’t be in the room. Competent peer, low context, limited time. No implementation dump. No chat diary.

MISSION
Transfer judgment, landmines, and verification — not a commit log.

PHASE 1 — CAPTURE THE STORY
Goal/user problem · in/out of scope · source of truth pointers (Figma/Design.md/screenshots/decisions) · key UX decisions + rejected alternatives that matter.

PHASE 2 — CAPTURE OPERABILITY
States handled · responsive behavior · a11y notes non-obvious · known debt with severity · verify checklist · open questions.

PHASE 3 — CAPTURE LANDMINES
Fragile areas, temporary hacks, “do not ‘improve’ X.” Explicit about intentional incompleteness.

LANDMINE EXAMPLES (ADAPT)
Sheet must portal to body if a parent clips overflow · don’t reintroduce a removed chip row · tooltips may need portaling to avoid clipping.

ANTI-PATTERNS
Don’t write a novel. Don’t hide open questions inside requirements. Don’t omit intentional ugliness.

OUTPUT
Scannable markdown with the sections above, bullet-first.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

READER TEST
Could a new engineer verify and avoid landmines without asking you? If not, add the missing pointer.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'handoff',
      'ship notes',
      'verification',
      'documentation',
      'ai prompt',
    ],
    tags: ['Planning', 'Review'],
  },
  {
    id: 'ai-prompt-diff-only-review',
    title: 'Diff-Only Review',
    description:
      'Review only the current change set for risk, regressions, and gaps.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
PR / branch / diff scope (optional): 
What you want reviewed hardest: 
Known risk areas (optional): 
══════════════════════════════════════

Review only the current diff (or specified PR/patch). Do not wander into unrelated code unless the diff clearly breaks it. Catch correctness, UX regressions, and scope creep in what changed.

MISSION
Actionable review comments with severity. Verdict with spine.

PHASE 1 — READ THE DIFF FIRST
Understand the stated ask. Skim for churn vs substance. Identify risky areas (shared components, auth, data writes).

PHASE 2 — VALIDATE WHAT MATTERS
Ask fulfilled? Adjacent UI/behavior regressions? Missing states? Token/system violations? A11y regressions (focus/labels/contrast)? Unnecessary churn? Racey/bad defaults/insecure patterns on touched paths?

PHASE 3 — COMMENT & VERDICT
Inline comments: problem → why → suggested fix. Blocker vs Nit. Run only what’s needed to validate.

COMMENT QUALITY
Bad: “Hmm not sure.”
Good: “Renames shared prop but updates one call site — breaks X. Update all call sites or keep old name.”

ANTI-PATTERNS
Don’t review the whole codebase. Don’t nitpick style unrelated to risk if local style is consistent. Don’t demand redesigns outside the diff’s ask.

OUTPUT
Verdict Approve / Request changes / Needs product input · Blockers · Nits · Scope creep · Test gaps.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

RISK HOTSPOTS
Shared components · auth/session · data writes · global CSS · routing · feature flags.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'diff',
      'review',
      'regression',
      'pr',
      'ai prompt',
    ],
    tags: ['Review', 'QA'],
  },
  {
    id: 'ai-prompt-root-cause-debug',
    title: 'Root-Cause Debug',
    description:
      'Fill in what’s broken first, then reproduce, find the real cause, fix, and retest.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
What’s broken: 
Where (screen / component / control): 
Steps to reproduce / viewport: 
Expected: 
Actual: 

(If you only know “it looks wrong,” still name the region and what feels off — layout, type, color, clipping, interaction, or data.)
══════════════════════════════════════

Use the “What’s broken / Where / Steps / Expected / Actual” fields above as the starting bug report. Treat blank fields as unknown — ask or state assumptions rather than inventing symptoms.

Find the root cause before changing lots of code. Do not redesign. Do not spray speculative fixes. Do not “clean up” while investigating.

MISSION
Confirm cause with evidence, apply the smallest fix, verify the repro is gone.

PHASE 1 — OBSERVE & REPRODUCE
Restate problem in concrete terms (what/where/when). Reproduce with tools; note steps, viewport, environment. If unclear, ask or state an assumption.

PHASE 2 — HYPOTHESIZE
Form 2–3 likely causes ranked by probability. Say what evidence would confirm each. Inspect components/styles/data flow; narrow the set.

PHASE 3 — FIX & VERIFY
Name most likely root cause and why alternatives were rejected. Apply smallest fix. Verify original repro gone; spot-check one nearby regression risk. Give me a short verify checklist.

HYPOTHESIS TABLE
Cause | Why plausible | Evidence to confirm | Result

UPSTREAM BOUNDARY
If unreproducible, say what’s missing. If cause is API/content/design inconsistency, stop at the true boundary — don’t hide with a cosmetic patch unless I ask for a workaround.

ANTI-PATTERNS
No redesign-as-debug. No three speculative CSS tweaks without confirmation. No unrelated cleanup.

OUTPUT
Repro · hypothesis table · root cause · fix · verify checklist · residual risk.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

EVIDENCE STANDARDS
Complete requires observation of real behavior or UI at the relevant width/state — not file presence, not “should work,” not “looks wired up.”
Partial requires naming the exact missing slice so a stranger could finish it.
Missing means you searched and found no credible path.
Superseded needs a citation to the newer instruction.
Not Tested needs a concrete blocker (env, auth, missing asset, unreachable preview).

When status is contested, split claims into Observed / Inferred / Assumed.
Prefer a narrow fix you can retest over a broad rewrite you cannot.
After fixing shared state (filters, theme, routing, auth, global CSS), re-check one adjacent path for regressions.

CONFIRMATION BAR
Don’t fix until evidence supports one leading cause, or you document why you’re taking a reversible smallest probe.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'debug',
      'root cause',
      'reproduce',
      'fix',
      'ai prompt',
    ],
    tags: ['QA'],
  },
  {
    id: 'ai-prompt-interaction-states',
    title: 'Interaction States Completeness',
    description:
      'Design default, hover, focus, active, disabled, loading, and error as one system.',
    command: `Complete interaction states for the relevant components/flows so the UI feels finished under real use — not just the default happy snapshot. Match existing design-system patterns/tokens. Don’t invent a new state language.

MISSION
Fill missing/inconsistent states with system variants. Keep defaults intact while adding hover/focus/etc.

PHASE 1 — INVENTORY
List interactive elements on the screen. Note missing/inconsistent states vs system patterns.

PHASE 2 — IMPLEMENT GAPS
Use existing components/variants first. Ensure keyboard focus and accessible names still make sense. Keep motion subtle/consistent.

PHASE 3 — VERIFY MATRIX
Spot-check each added state visually and via keyboard where relevant.

COVER WHERE APPLICABLE
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

STATE MATRIX TEMPLATE
Control | Default | Hover | Focus | Disabled | Loading | Error | Empty | Notes

ANTI-PATTERNS
Don’t restyle defaults “while adding hover.” No extra decoration. No parallel state system.

OUTPUT
Components/states added or fixed · needs design input · optional matrix for key controls.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

CONSISTENCY BAR
Similar controls should share state language. Don’t invent a one-off hover for a single button if the system already has one.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'states',
      'hover',
      'focus',
      'disabled',
      'interaction',
      'ai prompt',
    ],
    tags: ['Design', 'UX', 'Accessibility'],
  },
  {
    id: 'ai-prompt-concept-critique',
    title: 'Concept Critique: Good Idea or Bad Idea?',
    description:
      'Honest product judgment on the concept: keep, change, or kill — with reasons.',
    command: `Critique this concept: good idea, bad idea, or good idea with a dangerous shape? Do not implement. Do not polish pixels. Judge product thinking.

MISSION
Direct verdict with reasons, failure mode, simpler alternative, and smallest learning experiment.

PHASE 1 — FRAME THE BET
Whose problem, how often, how acute? What constraints/timing matter?

PHASE 2 — EVALUATE
User value · job fit vs deeper IA/flow workaround · complexity cost (cognition/edges/maintenance) · differentiation vs noise · risks (misuse/trust/a11y/perf/support/ethics high-level) · simpler 80% alternative · timing (now vs premature).

PHASE 3 — VERDICT
Strong yes / Weak yes / Not yet / No — crisp rationale. What must be true · biggest failure mode · simplest alternative · smallest experiment if pursuing.

VERDICT DISCIPLINE
Strong yes: clear value + manageable complexity + fits product
Weak yes: value exists but shape is risky — name the reshape
Not yet: missing evidence/constraints
No: wrong problem or harmful shape — name the better problem worth solving

ANTI-PATTERNS
No soft padding. No implementation. No pixel critique disguised as concept critique.

OUTPUT
Verdict block + must-be-true + failure mode + alternative + experiment.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

KILL CRITERIA
If complexity cost dwarfs value, or it papers over a deeper IA problem, say No/Not yet clearly.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'concept',
      'critique',
      'good idea',
      'bad idea',
      'product',
      'judgment',
      'ai prompt',
    ],
    tags: ['Review', 'Planning', 'Product'],
  },
  {
    id: 'ai-prompt-product-designer-opinion',
    title: 'Product Designer Second Opinion',
    description:
      'What a senior product designer would push back on, rethink, or protect.',
    command: `Give a second opinion as a product designer who was not in the original meetings. Judgment, not implementation. Candid, specific, practical.

MISSION
Help decide what to protect, cut, and do next — with a stakeholder-ready bottom line.

PHASE 1 — FIRST READ
What is this trying to be? Does it succeed in five seconds? State assumptions if audience/metrics missing.

PHASE 2 — OPINION PASS
Strengths to keep · critical weaknesses prioritized (UX/hierarchy/flow/trust/complexity) · strategic fit · pattern context (known pattern well/poorly/unnecessary invention) · what you’d cut · what you’d double down on · next three smallest valuable moves.

BOTTOM LINE EXAMPLES
“Ship the core grid; cut the promo chrome — it’s competing with the job.”
“Don’t build this as a new surface; extend the existing filter pattern.”

ANTI-PATTERNS
Don’t rewrite the brand. Don’t dump a full redesign unless the concept is the issue — then sketch direction in words, not a new component system.

OUTPUT
Structured opinion + one-line stakeholder bottom line.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

STAKEHOLDER USE
End with a decision-ready bottom line. Avoid hedged mush.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'product designer',
      'second opinion',
      'critique',
      'ux',
      'design review',
      'ai prompt',
    ],
    tags: ['Review', 'Design', 'Product'],
  },
  {
    id: 'ai-prompt-user-flow-walkthrough',
    title: 'First-Time User Flow Walkthrough',
    description:
      'Walk the flow as a new user and flag hesitation, confusion, and drop-off.',
    command: `Walk through this experience as a first-time user. Narrate what you notice, try, hesitate on, and whether you succeed — then convert into actionable UX notes.

MISSION
Expert walkthrough (not a full study) that surfaces drop-offs and smallest fixes.

PHASE 1 — SETUP
Cold, mildly motivated, skimming. State persona assumptions. Use actual UI tools when possible.

PHASE 2 — WALK
Entry (what is this / click first?) · progress (confusion/dead ends/feedback) · errors/empties helpful? · completion clarity · abandon points for a busy person.

PHASE 3 — CONVERT TO ACTION
Friction log with severity · smallest fixes first · product questions · implement obvious in-scope copy/flow fixes only if clearly appropriate; else recommendations only.

NARRATIVE STYLE
Short beats: “I land → I think this is X → I try Y → I’m unsure because Z → I succeed/fail.”

FRICTION LOG
Step · Intent · Friction · Severity · Fix · Applied?

ANTI-PATTERNS
Don’t turn this into pixel polish. Don’t invent persona drama. Don’t expand scope into a redesign unless the flow fundamentally fails — then say so.

OUTPUT
Narrative · friction log · fixes · questions.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

DROP-OFF FOCUS
Prioritize frictions that cause abandon before aesthetic nits.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'user flow',
      'walkthrough',
      'first time',
      'friction',
      'ux',
      'ai prompt',
    ],
    tags: ['Review', 'UX'],
  },
  {
    id: 'ai-prompt-design-alternatives',
    title: 'Explore Design Alternatives',
    description:
      'Propose 2–3 distinct directions before committing to one solution.',
    command: `Explore design alternatives for the current problem without implementing a full redesign in code unless I ask. Better decisions — not more production pixels yet.

MISSION
Offer 3 distinct directions a PM/engineer can argue with in ten minutes, plus a recommendation.

PHASE 1 — RESTATE PROBLEM & CONSTRAINTS
Brand, components, tech, time, success metric. What’s fixed vs negotiable.

PHASE 2 — GENERATE DISTINCT OPTIONS
3 directions that vary structure/hierarchy/interaction model — not three paints of one layout. Distinctness test: if they only differ by color/spacing, they’re polish variants.

PHASE 3 — COMPARE & RECOMMEND
For each: concept in words · pros · cons · risks · effort S/M/L · user-goal fit. Recommend one default + what evidence would change your mind.

STAY PLAUSIBLE
Inside existing design system. No new brand. No option spam. If only one option is sane, say so and explain what unlocks real alternatives.

ANTI-PATTERNS
Don’t implement all three. Don’t propose fantasy systems the codebase can’t support this week.

OUTPUT
Options memo with recommendation and decision triggers.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

OPTION SPREAD
Vary interaction model or IA — not only visual skin. Include effort and risk.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'alternatives',
      'explore',
      'directions',
      'options',
      'ux',
      'ai prompt',
    ],
    tags: ['Planning', 'Design', 'UX'],
  },
  {
    id: 'ai-prompt-cleanup-not-spaghetti',
    title: 'Clean Up Code Without Changing UX',
    description:
      'Untangle spaghetti, remove redundancy, keep behavior and UI identical.',
    command: `Clean up the code for the relevant UI without changing UX, visuals, or behavior. If cleanup would change UX, stop and ask or skip it.

MISSION
Reduce mess while keeping pixel and interaction parity.

PHASE 1 — CAPTURE PARITY CHECKPOINTS
Note look/behavior that must remain identical (spacings, primary interactions, copy, hierarchy, states).

PHASE 2 — CLEAN IN SMALL STEPS
Remove dead code/unused imports/unreachable branches tied to this UI. Resolve conflicting/duplicate styles while preserving intended look. Local extract only when it clarifies same UI. Local rename only when low risk. Align to existing patterns without new libraries.

PHASE 3 — VERIFY PARITY AS YOU GO
If parity breaks, revert that hunk. Prefer smallest cleanup that removes real confusion.

DISALLOWED
Visual redesigns/spacing “improvements”/copy changes · behavior/API/data-shape changes · drive-by unrelated refactors · grand architecture migrations.

ANTI-PATTERNS
Don’t “improve” visuals while cleaning. Don’t expand into a rewrite.

OUTPUT
What cleaned · how parity verified · leftover smells intentionally deferred.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

PARITY OR REVERT
Any cleanup hunk that changes pixels/behavior gets reverted.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'cleanup',
      'refactor',
      'spaghetti',
      'redundant',
      'handoff',
      'codex',
      'ai prompt',
    ],
    tags: ['Implementation', 'Handoff'],
  },
  {
    id: 'ai-prompt-ux-interaction-notes',
    title: 'Add UX/UI Interaction Notes for Devs',
    description:
      'Document confusing interactions, expected behavior, and edge cases for handoff.',
    command: `Add concise UX/UI interaction notes that help engineers implement intended behavior without guessing. Specific, testable, tied to real components/states — not fluffy design essays. Do not implement code unless I ask.

MISSION
Engineers should be able to build/test without pinging you for every hover/edge case.

PHASE 1 — INSPECT IF NEEDED
If you must inspect the UI to write accurate notes, do that first.

PHASE 2 — DOCUMENT
Purpose/primary job · layout/responsive (what stacks/stays/breakpoints) · component inventory+variants · interactions (click/tap/keyboard/hover/focus/drag/gestures) · motion (when/feel/reduced-motion if specified) · states · validation/messaging · navigation entry/exit/dismiss/deep links/return · analytics only if already conventional · edge cases/non-goals · acceptance checks.

PHASE 3 — SEPARATE UNCERTAINTY
Open questions in their own section — never hidden inside requirements. Use MUST / SHOULD / MAY.

QUALITY BAR
Each requirement testable without pinging you. Replace “feel snappy” with system motion tokens if they exist; else “use existing motion / no new motion.” Reference Design.md/Figma/tokens when they govern a decision.

ANTI-PATTERNS
Don’t write marketing copy. Don’t invent a tracking plan. Don’t implement unless asked.

OUTPUT
Scannable markdown with MUST/SHOULD/MAY, acceptance checks, and open questions.

STATE COMPLETENESS LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

RESPONSIVE VERIFICATION MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

ACCESS & INTERACTION BASELINE
Critical paths first (enter, create, submit, navigate, pay).
Prefer correct elements and visible labels over ARIA patches.
Keyboard: operable without pointer; visible focus; no traps; dialogs move/restore focus; Esc/dismiss consistent with product patterns.
Name/role/value: icon-only controls named; expandables expose state; errors associated to fields.
Targets and contrast: practical hit areas; text/essential icons meet a usable contrast bar; fix via tokens when possible.
Don’t restyle the product under an “a11y look” cover unless contrast/layout truly blocks access.

SYSTEM FIDELITY CHECKS
If Design.md / tokens exist, treat them as binding for color roles, type ramp, spacing scale, radius/elevation, component variants, icon rules, responsive behavior, and states — unless I explicitly override.
Reuse order: exact variant → existing component + props → compose primitives → new primitive only with a named system gap (call the gap out).
Red flags on touched UI: hardcoded hex beside tokens, one-off radii/shadows, custom focus rings, ad-hoc icon sizes, magic spacing, parallel button/input styles.
If Design.md is missing, say so and fall back to the strongest live patterns — labeled as fallback, not as a new system.

ENGINEER TEST
If an engineer still needs to ping you for hover/edge behavior, the notes aren’t done.

DETAILED EXECUTION EXPECTATIONS
• Be specific to the current screen/flow — no generic filler
• Use available tools to inspect UI/code before concluding
• Prefer smallest correct change
• Map every edit back to the ask
• List what you refused to do


EDGE CASES TO EXPLICITLY CONSIDER
• Long content / truncation / wrapping at narrow widths
• Empty vs error vs loading confusion
• Permission-denied or logged-out entry
• Double-submit / rapid repeat clicks
• Browser back/forward mid-flow
• Dark mode token mistakes if the product supports themes
• First visit vs returning visit
• Missing assets / failed image loads
If a case is out of scope for THIS ask, say so — don’t silently ignore it as if it passed.


COMMUNICATION STANDARD
• Plain language, scannable bullets/tables
• Severity labels when reviewing (Blocker / Major / Minor)
• For each meaningful change: what changed · why it improves the outcome · how to verify
• Separate Observed / Inferred / Assumed when status is contested
• Never claim Complete without evidence


STOP CONDITIONS
• Stop when the ask’s acceptance criteria are met with evidence
• Stop instead of inventing adjacent work
• Stop and ask (or state one assumption) when a wrong guess is expensive
• Stop at system boundaries (Design.md / Figma / screenshot) rather than “improving” them unasked

══════════════════════════════════════
FINAL GATE
══════════════════════════════════════
1. Restate done-criteria for THIS ask as 3–8 pass/fail bullets.
2. Show evidence: what you inspected (UI paths, widths, states, files, tools).
3. List residual risks and the non-goals / must-not-changes you respected.
4. Give me the shortest path to re-verify your work myself.
5. If anything remains open, name the single next best move (and whether it blocks ship).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'interaction notes',
      'handoff',
      'ux notes',
      'edge cases',
      'developer',
      'ai prompt',
    ],
    tags: ['Planning', 'Handoff', 'UX'],
  },
]
