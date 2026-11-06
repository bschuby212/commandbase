import type { Command } from '../types/command'

/**
 * Universal natural-language AI prompts.
 * Copied in full; cards only show a short preview ending in ….
 */
export const aiPrompts: Command[] = [
  {
    id: 'ai-prompt-exhaustive-qa',
    title: 'Exhaustive Request-by-Request QA',
    description:
      'Verify every user requirement individually and correct anything incomplete.',
    command: `Perform a comprehensive, requirement-by-requirement QA review of everything I have requested throughout this project.

First, review the available conversation history, requirements, documentation, and implementation. Process requests from newest to oldest when determining which instructions take precedence, since newer instructions may modify, replace, or cancel earlier ones.

Build a complete checklist of every distinct requirement that is still applicable.

For each requirement:

1. State exactly what I originally requested.
2. Identify what has actually been implemented.
3. Inspect the relevant code, interface, interaction, or output.
4. Determine whether the requirement is Complete, Partially Complete, Not Complete, or Superseded.
5. Explain any discrepancy between the request and the implementation.
6. Fix incomplete or incorrect work when possible.
7. Recheck the result after making corrections.
8. Report the final verified status.

Do not group unrelated requirements into broad statements such as “UI improvements complete.” Check each specific detail independently.

Do not assume something works simply because code exists. Test the actual behavior wherever tools permit.

After completing the review, provide a numbered report showing:

* Original request
* Initial status
* What you inspected
* What you fixed
* Final verification result

Distinguish between verified functionality and anything you could not test. Do not claim completion without evidence.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Follow my instructions precisely and implement only what I have requested.

Treat every explicit requirement, constraint, and exception as intentional. Do not simplify, reinterpret, or replace my instructions with your preferred approach.

Before making changes, identify the exact scope of the request and the areas that must remain unchanged.

Do not:

* Add unrequested features or functionality.
* Redesign existing components without permission.
* Change established colors, typography, spacing, or layouts unnecessarily.
* Remove functionality to simplify implementation.
* Introduce placeholder behavior where working functionality is expected.
* Refactor unrelated areas simply because you see an opportunity.

If a requirement is technically impossible or conflicts with another requirement, explain the conflict and propose the smallest practical alternative.

After implementation, compare the result against my original request point by point. Correct discrepancies before declaring the task complete.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Implementation',
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
    command: `Before making any design or UI changes, locate and read the project’s Design.md file or equivalent design documentation.

Treat this documentation as the authoritative source for the project’s visual language, component patterns, interaction principles, and styling decisions unless my newer explicit instructions override it.

Follow the documented:

* Color palette and semantic tokens
* Typography and type hierarchy
* Spacing, layout, and grid rules
* Component styles and variants
* Border radius, shadows, and elevation
* Iconography
* Responsive behavior
* Hover, focus, active, disabled, and error states
* Animation and interaction guidelines

Reuse existing components and design tokens wherever possible.

Do not introduce new design conventions when established ones already cover the requirement.

After implementing the requested changes, audit the affected interface against Design.md. Identify and correct any visual or behavioral inconsistencies.

If Design.md is missing or inaccessible, tell me rather than inventing its contents.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Design',
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
    command: `Implement the provided Figma design as accurately as possible.

Use the Figma file as the visual source of truth. If Figma tools, MCP connections, or design inspection capabilities are available, use them to inspect the actual design rather than relying on assumptions.

Pay close attention to:

* Frame dimensions and layout structure
* Auto Layout, constraints, and responsive rules
* Exact typography and font weights
* Colors, opacity, and gradients
* Spacing, padding, and alignment
* Component dimensions and proportions
* Borders, shadows, and corner radii
* Icons, images, and visual assets
* Component variants and interactive states

Do not creatively reinterpret or redesign the provided interface.

Reuse the project’s existing components where they match the design.

After implementation, compare the rendered result with the Figma reference at matching viewport dimensions.

Identify discrepancies, fix them, and repeat the comparison until the implementation is as close as practical.

Do not claim pixel accuracy unless you have actually compared the rendered output with the reference.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Design',
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
    command: `Use the provided screenshot as the primary visual reference for the requested implementation.

Reproduce the layout, spacing, typography, colors, proportions, and visual hierarchy as faithfully as possible.

Do not replace the design with a generic interpretation or your own preferred styling.

Analyze the screenshot carefully before implementation, including:

* Overall composition
* Element positioning and alignment
* Relative sizing and spacing
* Text hierarchy and line wrapping
* Background treatments
* Borders, shadows, and radius
* Icons and imagery
* Visible component states

Use existing project assets and design system components when appropriate.

For details that cannot be determined from the screenshot, follow the project’s existing design conventions rather than inventing an unrelated style.

After implementation, render the interface at the closest matching viewport size and visually compare it with the reference.

Correct any noticeable differences before finishing.

Explicitly identify anything that could not be reproduced or verified.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Design',
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
    command: `Review this interface as an experienced senior product designer conducting a detailed design critique.

Evaluate the experience from both a visual design and usability perspective.

Focus on:

* Visual hierarchy and composition
* Clarity and discoverability
* Typography and readability
* Spacing and alignment
* Interaction patterns
* Information architecture
* Accessibility
* Consistency with existing components
* Responsive behavior
* Cognitive load and unnecessary complexity

Be critical and specific. Do not provide generic praise or vague feedback.

For every issue, explain what is wrong, why it matters, and exactly how you would improve it.

Prioritize recommendations by impact.

Preserve the original product intent and visual direction. Do not recommend a complete redesign when smaller improvements would solve the problem.

If implementation is in scope, make the improvements and then review the result again.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Review',
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
    command: `Perform a meticulous visual polish pass across the requested interface.

Assume the primary structure and functionality are already established. Your job is to identify and correct the small inconsistencies that prevent the interface from feeling finished.

Inspect:

* Inconsistent spacing and alignment
* Uneven padding and margins
* Typography inconsistencies
* Awkward line wrapping
* Unbalanced visual weight
* Inconsistent border radius
* Unnecessary shadows or borders
* Misaligned icons
* Poor button proportions
* Weak hover and active states
* Overcrowded or empty sections
* Responsive layout imperfections

Favor subtle, intentional refinements over dramatic changes.

Do not add decorative elements simply to make the interface look more impressive.

Preserve the established design language and existing functionality.

Provide a concise summary of the specific refinements made.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Review',
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
    command: `Conduct a thorough end-to-end functional QA review of the application or feature.

Do not limit testing to whether the code compiles or the page renders.

Identify the primary user journeys and test them from beginning to end.

Inspect:

* Navigation and routing
* Buttons and clickable elements
* Forms and validation
* Search, filtering, and sorting
* Loading and empty states
* Error handling and recovery
* Data persistence
* Interactive components
* Modal and dropdown behavior
* Keyboard interactions
* Responsive behavior
* Unexpected inputs and edge cases

Where browser or testing tools are available, execute real interactions.

Identify broken behavior, reproduce it, fix it when possible, and retest.

Do not describe untested functionality as working.

Provide a final report separating Passed, Fixed and Retested, Failed, and Not Tested.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Review the interface across mobile, tablet, and desktop viewport sizes.

Do not assume a desktop layout will work correctly on smaller screens.

Inspect responsive behavior for:

* Navigation
* Grid and column layouts
* Text wrapping and overflow
* Images and media
* Buttons and touch targets
* Forms and input controls
* Cards and content containers
* Modals and overlays
* Fixed and sticky elements
* Horizontal scrolling
* Spacing and typography

Test representative viewport widths and intermediate sizes where tools permit.

Preserve the intended design hierarchy while adapting the layout to available space.

Avoid unnecessary mobile-specific redesigns.

Fix issues and verify that the changes do not introduce regressions at other viewport sizes.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Perform a detailed accessibility review of the interface against applicable WCAG 2.2 AA requirements.

Evaluate:

* Text and non-text contrast
* Semantic structure
* Heading hierarchy
* Keyboard navigation
* Visible focus indicators
* Screen-reader labels
* Form labels and errors
* Interactive target sizes
* Accessible names and roles
* Reduced-motion preferences
* Dynamic content announcements
* Modal focus management
* Hover and touch alternatives

Use automated accessibility checks where available, but do not treat automated results as a complete audit.

Manually inspect interaction patterns where possible.

Correct accessibility issues without unnecessarily compromising the intended visual design.

Report the issues found, changes made, and anything that still requires manual verification.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Make the smallest set of changes necessary to fulfill my current request.

Before editing, identify which files, components, and behaviors are directly affected.

Preserve everything outside that scope unless a change is essential to complete the requested work.

Do not perform unrelated refactoring, dependency upgrades, component redesigns, or architectural changes.

Do not remove existing functionality simply because it appears unused or complicated.

If you discover unrelated problems, report them separately rather than silently expanding the scope.

After making changes, inspect the diff and confirm that every modification has a clear connection to the original request.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Implementation',
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
    command: `Review the requested feature or application as though it is about to be released to real users.

Evaluate production readiness across:

* Core functionality
* Reliability and error handling
* Performance
* Accessibility
* Responsive design
* Security considerations
* Data integrity
* Loading behavior
* Empty and error states
* Code maintainability
* Browser compatibility
* User experience consistency

Identify critical blockers, major issues, and minor improvements.

Prioritize problems that could prevent users from completing important tasks.

Fix issues within the authorized scope and verify corrections.

Provide a final readiness assessment with clear evidence, remaining risks, and any unresolved blockers.

Do not declare the application production-ready based solely on a successful build.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Review the available project requirements and conversation history to identify overlapping, contradictory, or outdated instructions.

Treat newer explicit instructions as authoritative when they clearly modify or replace older requirements.

For each conflict:

1. Identify the original requirement.
2. Identify the newer instruction.
3. Explain what changed.
4. Determine which requirement is currently applicable.
5. Identify any remaining ambiguity.

Do not implement both sides of a contradiction.

Do not revive previously rejected features, styles, or behaviors.

Preserve older requirements that have not been superseded.

If the correct interpretation cannot be determined from the available context, ask for clarification rather than guessing.

Provide a concise list of the final active requirements before implementation.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Planning',
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
    command: `Before telling me that the task is complete, independently verify the work against my actual request.

Do not rely on your earlier implementation summary or assume your changes succeeded.

Revisit the original instructions and inspect the final output.

For every applicable requirement:

* Confirm that it was implemented.
* Verify the actual behavior or appearance.
* Check for regressions.
* Identify incomplete details.
* Correct issues where possible.
* Retest after corrections.

Use available build, lint, test, browser, and visual inspection tools when relevant.

Distinguish between checks that passed, checks that failed, and checks you could not perform.

End with a clear numbered completion report.

Do not say “everything is complete” unless every applicable requirement has actually been verified.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Act as a senior UI designer reviewing and refining this interface.

Focus on visual design quality, not engineering architecture.

Evaluate and improve:

* Visual hierarchy: what the eye should notice first, second, and third
* Composition and balance across the viewport
* Surface treatment: backgrounds, cards, dividers, and when flat space is better than containers
* Type scale clarity and contrast between headings, body, and meta text
* Spacing rhythm and alignment to a consistent grid
* Color roles: primary, secondary, muted, danger, success — used with intent
* Icon weight, size, and alignment with adjacent text
* Density: remove visual noise without removing meaning

Do not invent a new brand language. Work inside the existing visual direction.

Prefer restraint. If removing a border, shadow, or card wrapper improves clarity, remove it.

When you recommend or apply changes, explain the design reason in plain language, not implementation jargon.

If a referenced design file or screenshot is unavailable, say so and proceed using the live interface and any project design documentation.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Design',
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
    command: `Act as a senior UX designer. Improve this experience using established UX best practices.

Think in flows and decisions, not pixels alone.

Review:

* User goals for this screen or flow
* Entry points and next actions
* Clarity of labels, instructions, and feedback
* Cognitive load: too many choices, unclear priority, or competing CTAs
* Error prevention before error recovery
* Empty, loading, success, and failure states as part of the journey
* Progressive disclosure: what should be immediate vs secondary
* Consistency of patterns across similar tasks
* Trust: confirmations, undo, and irreversible actions

For each issue, explain:
1. What the user is trying to do
2. Where the experience creates friction or confusion
3. The smallest UX change that would help

Do not propose a full product rethink. Stay within the current product intent.

If you cannot observe real interaction behavior with available tools, reason from the interface structure and call out what remains unvalidated.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Review',
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
    command: `Apply accessibility best practices to this interface as a design responsibility, not a late engineering patch.

Ground recommendations in WCAG 2.2 AA intent, but speak in product and design terms.

Prioritize:

* Perceivable hierarchy: text contrast, non-text contrast, and readable type
* Operable interaction: keyboard paths, visible focus, adequate target size
* Understandable content: clear labels, errors tied to fields, predictable behavior
* Robust structure: headings, names, roles, and states that assistive tech can interpret
* Inclusive motion: respect reduced-motion preferences; avoid essential info only in hover
* Forms: required indicators, helpful errors, and recoverable mistakes
* Modals/drawers: focus entry, escape, and return

For each change, explain the user impact in plain language.

Do not “fix” accessibility by gutting the visual design. Keep the brand direction while removing exclusionary barriers.

If automated checks are available, use them as signals only. Confirm important issues with manual reasoning about interaction.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Make this layout genuinely responsive across mobile, tablet, and desktop.

This is an implementation task, not a checklist audit. Adapt the interface so it works well at each major breakpoint.

Goals:

* Preserve the intended visual hierarchy at every width
* Stack or reflow sections cleanly on small screens
* Keep primary actions reachable without awkward scrolling games
* Prevent horizontal overflow and clipped text
* Size tap targets comfortably on touch viewports
* Adapt navigation, grids, cards, and media thoughtfully
* Maintain spacing rhythm instead of crushing everything equally

Do not create an unrelated “mobile redesign” that abandons the desktop intent.
Do not claim responsiveness without adjusting layout behavior.

Work from largest meaningful content constraints first, then refine smaller widths.

When tools allow, verify at representative widths (for example ~375, ~768, ~1024, ~1440) and fix regressions you introduce.

Summarize what changed at each breakpoint and what could not be verified.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Implementation',
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
    command: `Bring this older screen into alignment with the project’s current Design.md (or equivalent design documentation).

Read Design.md first. Treat it as the source of truth for tokens, type, spacing, components, states, and interaction patterns unless my newer instructions override it.

Then compare the legacy screen against that documentation.

Migrate the screen toward the current system by:

* Replacing one-off colors, type sizes, and radii with documented tokens/patterns
* Swapping custom controls for existing system components where they fit
* Aligning spacing and layout to the documented rhythm
* Updating hover, focus, active, disabled, and error states to match
* Removing obsolete visual conventions that fight the current language

Do not rebuild the screen from scratch if incremental alignment is enough.
Do not invent new design rules when Design.md already covers the case.

If Design.md is missing or inaccessible, stop inventing and tell me what you need.

Deliver:
1. What was out of date
2. What you aligned
3. What remains intentionally different or blocked`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Design',
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
    command: `Perform a copy and naming pass across the requested interface or flow.

Focus on language clarity and consistency, not visual restyling.

Improve:

* Button and link labels that describe the outcome
* Headings that match the user’s task language
* Empty, loading, success, and error messages
* Helper text that reduces confusion instead of adding noise
* Inconsistent terms for the same concept
* Component, section, and field naming that should match user-facing language
* Tone: calm, specific, and human — no filler, no emoji decoration

Rules:

* Prefer short verbs and concrete nouns
* Say what happened and what to do next in errors
* Keep product terms consistent once chosen
* Do not rewrite brand voice into a generic SaaS tone if a voice already exists

Provide a before/after list of the meaningful copy changes.
If implementation is in scope, apply the copy updates and leave layout alone unless a line length issue forces a tiny adjustment.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Review',
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
    command: `Run a practical performance smoke pass focused on what users feel.

This is not a deep profiling engagement. Find obvious issues that hurt first impression and interaction smoothness.

Look for:

* Oversized images or uncropped media
* Layout shift from images, fonts, or late-loading content
* Unnecessary large shadows, blur, or decorative effects that cost more than they give
* Blocking work or heavy rendering on first paint where evident
* Lists/grids that do too much work for what’s on screen
* Interaction delays from avoidable re-rendering or expensive UI patterns

For each issue:
1. Describe the user-visible symptom
2. Explain the likely cause in plain language
3. Apply the smallest sensible fix when in scope
4. Note what you could not measure

Do not chase micro-optimizations that don’t change the experience.
Do not claim performance wins without a clear before/after rationale.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Write clear handoff notes for the work just completed.

Assume the reader is a teammate or stakeholder who was not in the session.

Include:

* What changed, in user-facing language first
* Where to look (screens, flows, or key files) without dumping noise
* How to verify: numbered steps, including responsive or state checks when relevant
* Known risks or edge cases
* What was intentionally not changed
* What could not be tested and still needs human verification

Keep it concise and scannable.
Do not pad with process theater.
Do not claim untested items as verified.

If screenshots or recordings would help and tools allow, note what should be captured.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Planning',
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
    command: `Review only the current diff / change set.

Do not re-audit the entire product. Stay inside what changed.

Inspect the diff for:

* Broken or incomplete UI states introduced by the change
* Visual or interaction regressions adjacent to touched areas
* Copy inconsistencies introduced by the edit
* Missing empty/error/loading handling related to the change
* Accessibility regressions tied to the touched controls
* Scope creep: changes that do not serve the request

For each finding:
1. Point to the specific change
2. Explain the risk in plain language
3. Recommend or apply the smallest fix

Do not rewrite unrelated code for style preference.
If the diff is unavailable, say so and stop rather than inventing a review.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Review',
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
    command: `Debug this issue with root-cause discipline.

Process:

1. Restate the observed problem and the expected behavior.
2. Reproduce it with the smallest clear steps available.
3. Isolate likely causes without shotgun changes.
4. Identify the underlying cause, not only a surface symptom.
5. Apply the smallest fix that addresses the cause.
6. Retest the original failing path and nearby regressions.
7. Report what was confirmed, fixed, and still uncertain.

Do not claim a fix without retesting.
Do not spray speculative changes across unrelated areas.
If you cannot reproduce the issue with available tools, say exactly what blocked reproduction.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'QA',
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
    command: `Complete the interaction states for the requested UI as a coherent system.

For each important interactive element (buttons, inputs, selects, tabs, cards-as-controls, icon buttons):

Define and align:

* Default
* Hover
* Focus-visible
* Active / pressed
* Disabled
* Loading (if applicable)
* Error / invalid (if applicable)
* Selected / current (if applicable)

Design principles:

* Focus must be obvious for keyboard users
* Disabled must look unavailable without relying on color alone when possible
* Loading should preserve layout where practical
* Error messages should be specific and adjacent to the problem
* States should feel related, not like five different components

Do not invent decorative state flourishes that fight the existing design language.
Call out any state that cannot be verified with available tools.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Design',
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
]
