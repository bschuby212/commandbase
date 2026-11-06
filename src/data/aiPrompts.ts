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
]
