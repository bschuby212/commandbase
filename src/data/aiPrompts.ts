import type { Command } from '../types/command'

/**
 * Tool-agnostic plain-language prompts (not shell/code commands).
 * Discover via Function → Prompts (QA, design critique, handoff & polish).
 * Copied in full; cards only show a short preview ending in ….
 */
export const aiPrompts: Command[] = [
  {
    id: 'ai-prompt-exhaustive-qa',
    title: 'Exhaustive Request-by-Request QA',
    description:
      'Verify every user requirement individually and correct anything incomplete.',
    command: `Run a requirement-by-requirement QA pass on everything still applicable in this project.

Mode: verify, then fix gaps you can prove, then re-verify. Do not only write a report.

Process:

1. Scan conversation history, docs, and the current implementation. Newer explicit instructions win over older ones.
2. Build a checklist of distinct still-active requirements. Merge tiny duplicates; do not invent requirements I never asked for.
3. Rank the checklist: blockers first, then important gaps, then polish.
4. For each item (blockers first): restate the ask → inspect real behavior/UI (not just code existence) → mark Complete / Partial / Missing / Superseded → fix when possible → recheck.
5. Stop claiming “done” on anything you did not actually inspect with available tools.

Output a compact numbered report (keep it scannable):

* Requirement
* Status
* Evidence checked
* Fix applied (or none)
* Retest result

Do not hide untested items inside “looks good.” List Not Tested separately.
Prefer fixing clear misses over writing long analysis.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Follow my instructions exactly. Optimize for fidelity to the ask, not for your preferred architecture or design taste.

Before editing:

1. Restate the request as a short checklist of must-haves and must-not-changes.
2. If anything is ambiguous or conflicting, ask — or state one explicit assumption and proceed only if blocked waiting would be worse.

Hard rules:

* Implement every explicit requirement.
* Do not add extras “while you’re here.”
* Do not redesign visuals, IA, or copy unless I asked.
* Do not remove behavior to make the task easier.
* Do not ship placeholders where working behavior was requested.
* Do not refactor unrelated code.

If two instructions conflict, newer wins; call out the conflict in one line.
When finished, diff your work against the checklist and fix misses before you say you’re done.

This prompt is about instruction fidelity. For “keep the diff tiny,” use No Unnecessary Changes.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Before any UI changes, find and read Design.md (or equivalent). It is the source of truth unless my newer instructions override it.

Follow documented tokens, type, space/grid, components/variants, elevation/radius, iconography, responsive rules, interaction states, and motion.
Reuse existing components/tokens. Do not invent parallel conventions.

Implement the ask, then audit the touched UI against Design.md and fix drift.
If Design.md is missing/inaccessible, stop inventing and tell me what’s blocking.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Implement the provided Figma as faithfully as possible. Figma is the visual source of truth — inspect it with available tools/MCP; do not guess from memory.

Match: layout/Auto Layout · type · color · spacing · radii/shadows · assets · variants/states.
Reuse existing project components when they match. Do not redesign.

Loop: implement → compare at matching viewport → fix deltas → compare again.
Never claim pixel accuracy without an actual visual comparison.
List unresolved gaps explicitly (missing assets, ambiguous variants, etc.).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Recreate the UI from the provided screenshot. The screenshot wins over your taste.

Match composition, spacing, type, color, proportions, and hierarchy. No generic restyle.
Where the screenshot is ambiguous, follow the project’s existing design system — do not invent a new look.
Reuse project assets/components when they fit.

Implement → compare at the closest viewport → fix noticeable deltas.
End with: matched well · imperfect guesses · could not verify.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Critique this interface as a senior product designer. Be specific and useful — no generic praise.

Default mode: review first. Apply fixes only for clear, high-impact issues you can do safely without a redesign; otherwise recommend.

Limit yourself to the top 5 issues, ranked by user impact. Skip nitpicks until those are handled.

For each issue cover:

* What feels wrong (point to the UI)
* Why it hurts users or clarity
* The smallest improvement
* Whether you fixed it or left it as a recommendation

Look across hierarchy, clarity, type/spacing, interaction, consistency, a11y basics, and cognitive load — but only report what matters.

Protect the product’s intent and visual direction. Do not propose a rebrand or full redesign.
If context is missing (goal, audience, constraints), state assumptions in one line and continue.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Do a visual polish pass. Structure and features are assumed done — chase the last inconsistencies that make it feel unfinished.

Fix only: spacing/alignment · type inconsistencies · wrapping · radius/shadow/border noise · icon alignment · button proportions · weak hover/active · density problems.

Rules: subtle > dramatic; remove noise before adding decoration; preserve design language and behavior.
Apply the refinements, then list what you changed in a short bullet list.
Skip redesign ideas — park those as separate notes if needed.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Run end-to-end functional QA like a real user. Builds passing is not enough.

Order of attack:

1. Map the primary happy path(s) for this feature.
2. Execute them with real interactions when tools allow.
3. Then hit high-risk edges: validation, empty/error/loading, modals/menus, persistence, keyboard, and obvious responsive breaks.
4. Reproduce each failure, fix when in scope, retest.

Do not spray effort across every possible control before the happy path works.

Report in four buckets only: Passed · Fixed & retested · Failed · Not tested.
Never mark something Passed without evidence from this session.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Audit responsive behavior across mobile, tablet, and desktop. Find breaks, then fix the real ones.

This is an audit-and-fix pass. If you need a from-scratch responsive rebuild, say so and switch mindset — otherwise prefer targeted fixes.

Check at representative widths when tools allow (e.g. ~375, ~768, ~1024, ~1440):

* Overflow / horizontal scroll
* Nav and primary actions reachability
* Grids/cards reflow
* Type wrapping and clipped content
* Touch target size
* Modals/sticky/fixed elements
* Images/media scaling

Preserve hierarchy; do not invent a separate mobile product.
After fixes, re-check the other breakpoints for regressions.
Summarize: broken → fixed → still risky / untested.

For intentionally rebuilding layout across breakpoints, use Make This Layout Responsive.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Run an accessibility audit against WCAG 2.2 AA intent, then fix what you can without wrecking the design.

Priority order (stop checkbox-theater):

1. Blockers: keyboard traps, missing names/labels, focus not visible, broken modal focus, contrast failures on primary UI
2. High: form errors, target size, heading/semantics that break navigation
3. Medium: reduced-motion, live regions, hover-only info

Use automated checks as signals only; confirm with manual reasoning and real keyboard paths when tools allow.

For each finding: severity · user impact · fix applied or not · how verified.
Do not gut visual design to “pass.” Keep brand direction while removing exclusionary barriers.
List what still needs a human + assistive-tech check.

For design-led inclusive principles (less checklist, more craft), use Accessibility Best Practices Pass.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Minimize the diff. Change only what this request requires.

Before editing, name the affected surfaces (files/components/behaviors). Everything else is out of bounds.

Do not:

* Drive-by refactors, renames, or “cleanup” outside the ask
* Dependency bumps, format-only churn, or architectural rewrites
* Delete code/features because they look unused
* Expand into bugs you noticed unless they block this request — report those separately in one short list

Afterward, read your own diff. Delete any change you cannot justify in one sentence tied to the request.

This prompt is about scope control. For “do exactly what I said,” use Strict Instruction Following.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Judge whether this is actually ready to ship to real users. A green build is not readiness.

Work in severity order only:

* Blockers — users cannot finish the core job, data loss, major a11y/security breaks
* Major — frequent friction, broken edges on primary flows, serious responsive/a11y gaps
* Minor — polish; do not let these dominate the report

Probe: core journeys, error/empty/loading, reliability, obvious performance pain, a11y basics, responsive primary layouts, and trust/safety issues in scope.

Fix blockers/majors when authorized; verify after.
End with an explicit verdict: Ship / Ship with conditions / Do not ship — plus evidence, remaining risks, and untested areas.
Keep the write-up short. Depth on blockers beats a tour of every category.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Resolve requirement conflicts before implementing.

Newer explicit instructions win when they replace older ones. Do not implement both sides of a contradiction. Do not revive rejected work.

For each conflict: old ask · newer ask · what changed · what applies now · leftover ambiguity.
Preserve older requirements that were never superseded.
If you still can’t tell, ask — don’t guess.
End with a concise active-requirements list, then implement only from that list (if implementation was requested).`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Final gate before you claim “done.” Re-verify against my original request — do not trust your earlier summary.

1. Restate the ask as a short checklist.
2. Inspect the final UI/behavior (and diff) for each item.
3. Run available build/lint/test/browser checks that matter for this change.
4. Fix misses, then retest those items only.
5. Spot-check for nearby regressions.

Output a numbered completion report: item · verified how · pass/fail/not tested · fix if any.
You may say the task is complete only if every applicable checklist item is Pass or explicitly waived by me.
If something is Not tested, say so and do not bury it.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Act as a senior UI designer. Improve visual quality inside the existing brand — no redesign, no engineering rabbit holes.

Default mode: apply restrained visual fixes; explain why in plain language.

Focus only where it pays off:

* Hierarchy (what reads first/second/third)
* Spacing rhythm and alignment
* Type scale clarity
* Surface noise (drop useless cards/borders/shadows)
* Color roles used with intent
* Icon alignment/weight

Cap work to the highest-impact visual issues (roughly top 5). Prefer removal and alignment over decoration.
If Design.md / tokens exist, follow them.
If a reference file is missing, say so and use the live UI + project conventions.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Act as a senior UX designer. Improve flows and decisions — not pixel polish (use UI Design Principles / Visual Polish for that).

Default: recommend the smallest UX changes; implement when the fix is obvious and low-risk.

For each issue (max ~5, ranked):

1. User goal
2. Friction or confusion
3. Smallest fix

Scan: primary action clarity, cognitive load, competing CTAs, error prevention, empty/loading/error/success as a journey, progressive disclosure, and trust on irreversible actions.

Stay inside current product intent. No feature invention.
If you cannot interact with the UI, reason from structure and mark what is unvalidated.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Improve accessibility as a design craft problem — not a late engineering patch or audit dump.

Speak in product language. Ground choices in WCAG 2.2 AA intent without turning this into a full compliance report (use Accessibility and Interaction Audit for that).

Make design decisions that help:

* Contrast and readable type hierarchy
* Obvious focus and keyboard paths
* Labels, errors, and predictable behavior
* Inclusive motion (no essential info hover-only; respect reduced motion)
* Forms and overlays that people can complete and dismiss

Default: apply the smallest inclusive fixes that keep the brand intact.
Explain each change by user impact in one line.
Skip theoretical issues that do not affect this UI.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Implement a genuinely responsive layout. This is not an audit — change the layout behavior.

Goals at every major width:

* Hierarchy still reads correctly
* Clean reflow/stacking; no horizontal overflow or clipped text
* Primary actions reachable
* Comfortable touch targets on small screens
* Nav, grids, cards, and media adapt on purpose
* Spacing stays rhythmic (don’t crush everything equally)

Do not invent a separate mobile product that abandons desktop intent.
Prefer the project’s existing breakpoints/tokens over one-off magic numbers.

Verify when tools allow (~375, ~768, ~1024, ~1440), then fix regressions you cause.
Summarize by breakpoint: what changed · what still needs a human look.

For finding breaks without a rebuild, use Responsive Design Audit.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Align this legacy screen to current Design.md without a full rewrite.

Read Design.md first (source of truth unless I override it). Diff the screen against it, then migrate incrementally: tokens · system components · spacing rhythm · states · remove obsolete one-offs.

No greenfield rebuild if alignment works. No inventing rules Design.md already covers.
If Design.md is missing, stop and say what’s needed.

Deliver: out of date · aligned · still different/blocked.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Do a copy/naming pass. Language only — not a visual restyle.

Tighten: CTA labels · task-matching headings · empty/loading/success/error · useful helper text · one term per concept · calm specific tone (no filler/emoji clutter).

Rules: short verbs · errors say what happened + next step · keep existing brand voice · consistent product terms.
Default: apply the copy changes; touch layout only if line length forces it.
End with a before → after list of meaningful edits only.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Run a felt-performance smoke pass — not a deep profiling project.

Hunt user-visible pain: oversized media · layout shift · costly blur/shadow decoration · heavy first paint · overworked lists/grids · sluggish interactions from avoidable UI work.

For each issue: symptom · likely cause · smallest fix (apply if in scope) · what you couldn’t measure.
Skip micro-optimizations that users won’t feel.
No performance bragging without a clear before/after rationale.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Write concise handoff notes for someone who wasn’t in the session.

Include only:

* What changed (user-facing first)
* Where to look (screens/flows/key files)
* How to verify (numbered; include states/responsive when relevant)
* Risks / edge cases
* Intentionally not changed
* Not tested / needs human check

Scannable. No process theater. Never mark untested as verified.
If a screenshot/recording would help, note what to capture.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Review only the current diff. Do not re-audit the whole product.

Hunt for: broken/missing states · nearby visual/interaction regressions · copy drift · empty/error/loading gaps · a11y regressions on touched controls · scope creep.

For each finding (severity first): point to the change · risk in plain language · smallest fix (apply if safe/clear).
Ignore style nits unrelated to the ask.
If the diff is unavailable, say so and stop — do not invent a review.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
      'Reproduce the issue, find the real cause, fix it, and retest.',
    command: `Debug with root-cause discipline. One hypothesis at a time — no shotgun edits.

1. Restate observed vs expected
2. Reproduce with smallest steps
3. Isolate cause (not just symptom)
4. Smallest fix for that cause
5. Retest the failure path + nearby regressions
6. Report: confirmed · fixed · still uncertain

No fix claims without retest. If you can’t reproduce, say what blocked you and stop guessing.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Complete interaction states as one system for the important controls in scope (buttons, inputs, selects, tabs, icon buttons, cards-as-controls).

Required states when relevant: default · hover · focus-visible · active/pressed · disabled · loading · error/invalid · selected/current.

Rules that matter:

* Focus obvious for keyboard
* Disabled not color-only when avoidable
* Loading preserves layout
* Errors specific and adjacent
* States feel like one component family

Default mode: implement missing states using existing design language/tokens; don’t invent decorative flourishes.
Skip controls that already have a coherent full set.
Call out anything you could not verify.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Critique the concept (described or embodied by this screen/flow). Judgment over cheerleading.

Answer directly:

1. Good / mixed / bad — for the stated user and context
2. What problem it really solves, and whether that problem is worth solving now
3. Strongest version of the idea
4. Weakest / most dangerous assumption
5. What you’d change vs cut/postpone/refuse
6. Simpler 80/20 alternative

Rules: separate taste from usability/business/risk; smallest meaningful changes only; if audience/success metric/constraints are missing, list gaps and proceed with explicit assumptions.
End with verdict: Ship as-is / Ship with changes / Rethink / Kill — plus top 3 reasons.
No fluff. This is concept-level — not a UI polish pass.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Give a senior product-designer second opinion I can use in critique. Stay conceptual unless I ask you to implement.

Answer in this exact shape (keep it tight):

1. First impression (one sentence): job-to-be-done clarity
2. Protect: what is working
3. Push back: what feels off (hierarchy, flow, density, affordances, copy, trust)
4. Risk: where users hesitate, mis-click, or abandon
5. Priority check: is the primary action actually primary?
6. Complete these lines:
   * If this were my product, I would change …
   * If this were my product, I would not change …
   * The one decision I most disagree with is …
7. At most 2 alternative directions (structural, not color tweaks), ranked
8. One short “do this today” recommendation

Principle over taste. If the brief itself is wrong, say that first.
This is opinion/critique — not Senior Product Designer Review’s UI issue list, and not Concept Critique’s ship/kill verdict.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Walk this flow as a first-time user with zero product knowledge. Stay conceptual unless I ask you to implement.

Per step: goal · notice first · next action · hesitation/mis-click risk · success/fail feedback · abandon trigger.
Then: happy path in plain language · top frictions by severity · missing wayfinding/reassurance · smallest UX fixes.
Don’t invent features unless a missing step truly blocks completion.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Before building one solution, explore 2–3 meaningfully different directions.

Per direction (short): name · interaction model · best for whom · tradeoffs · when you’d pick it.
Directions must differ in structure/interaction — not just color/spacing.
Then pick one primary recommendation + assumptions.
Do not implement unless I explicitly ask.
If the brief is thin, state assumptions first.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Clean this up for designer → developer handoff: readable, less spaghetti, same UX.

Do:

* Untangle deep nesting / mixed concerns
* Remove dead or duplicated UI logic
* Rename so intent is obvious
* Extract only when it reduces confusion

Do not:

* Redesign or “improve” UX (note bugs; don’t silently change them)
* Change behavior, routes, or contracts
* Rewrite from scratch when surgery works
* Touch unrelated files

Process: say what’s messy → smallest cleanup → how you verified UX unchanged → what a dev should know next.
Prefer clarity over cleverness.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
    command: `Write UX/UI interaction notes so a developer (Codex / Cursor / etc.) can implement without guessing.

Only document non-obvious behavior. Skip standard defaults everyone already knows.

Priority topics when relevant: hover/focus/pressed/disabled/loading · click vs keyboard vs touch · validation timing & error placement · empty/error/permission states · overlays/dismiss/focus return · responsive interaction changes · undo/optimistic UI.

Use this micro-format per item:

* Element:
* Expected:
* People get wrong:
* Edge cases:
* Do not:

Plain language. Put notes next to the relevant UI/code or in the existing handoff — don’t invent a new docs system.
If implementation conflicts with good UX defaults, flag it and ask before changing behavior.
If I paste a screen/flow, derive notes from that — no generic textbook advice.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts (QA, design critique, handoff & polish)',
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
