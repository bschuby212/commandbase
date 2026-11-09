import type { Command } from '../types/command'

/**
 * Paste-ready “skills” and filled product prompts.
 * Fill-in headers use the same pattern as vibe prompts so card previews
 * skip the blank fields and show the real instruction text.
 */
export const skillPrompts: Command[] = [
  {
    id: 'skill-competitive-analysis',
    title: 'Competitive Analysis (Fill Product)',
    description:
      'Fill the product/category, then paste into Codex, ChatGPT, Cursor, or Claude.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Your product / category: 
(e.g. SaaS banking app, B2B analytics dashboard, consumer fitness tracker)
Competitors to include (or write “pick 3–5 strong ones”): 
What to compare (check any): IA · onboarding · pricing UX · visual system · empty states · mobile · a11y · trust/compliance cues
Our differentiator hypothesis: 
Must not invent fake quotes or unverifiable metrics: 
══════════════════════════════════════

Run a competitive analysis for the product/category filled in above.

MISSION
Produce a designer/PM-useful teardown that informs our roadmap — not a generic SWOT essay.

PHASE 1 — FRAME
Restate the category and who the primary user is. List competitors you will use (named). If the fill-in said “pick 3–5,” choose real peers and say why.

PHASE 2 — COMPARE
For each competitor, note: primary job · IA/nav patterns · onboarding first-run · key screens · visual system cues (type, density, color roles) · empty/error/trust patterns · notable strengths/weaknesses for OUR goals.

PHASE 3 — SYNTHESIZE
Patterns worth stealing · anti-patterns to avoid · white-space opportunities · implications for our next 2–3 design bets. Separate Observed (from public product/marketing) vs Inferred.

ANTI-PATTERNS
No fake user quotes. No made-up conversion rates. No redesign of our product unless asked — recommendations only.

OUTPUT
Competitor table · pattern synthesis · opportunity list · suggested next research/design steps.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'competitive analysis',
      'competitors',
      'benchmark',
      'teardown',
      'saas',
      'banking',
      'skill',
      'pm',
      'ux',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'PM', 'Research'],
  },
  {
    id: 'skill-better-visual-design',
    title: 'Skill: Better Visual Design',
    description:
      'Fill the screen/context, then get a visual-design improvement pass with system fidelity.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Product / screen: 
Audience: 
Design system / tokens to respect (or “use existing live patterns”): 
What feels weak today (hierarchy, spacing, type, color, density, chrome): 
Must not change: 
Done when: 
══════════════════════════════════════

Act as a senior product designer improving visual design for the filled-in screen — without inventing a new brand.

MISSION
Raise clarity, hierarchy, and craft while staying inside the design system.

RULES
• Prefer existing tokens/components over one-offs
• One composition per section; avoid card spam and decorative chrome
• Fix hierarchy before decoration
• Check ~390 / ~768 / ~1280 if layout is in scope
• Empty/loading/error copy stays human and short
• Call out AI-slop risks (purple glow, random gradients, emoji ornament, mismatched radii)

OUTPUT
Priority fixes (Blocker/Major/Minor) · what to change · what to leave · verification checklist.
If implementing is allowed by the user, apply the smallest visual fixes first; otherwise recommendations only.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'visual design',
      'polish',
      'hierarchy',
      'design system',
      'craft',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'Design'],
  },
  {
    id: 'skill-design-system-builder',
    title: 'Skill: Design System Alignment',
    description:
      'Fill product context, then align UI to tokens/components instead of one-offs.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Product: 
Library / system to use (shadcn · MUI · Angular Material · internal @scope/ui · Design.md): 
Screens / components in scope: 
Known one-offs to eliminate (optional): 
Must not change (brand meaning / IA / APIs): 
══════════════════════════════════════

Act as a design-systems designer. Align the filled-in UI to the named system.

MISSION
Replace one-offs with system variants; document true gaps instead of inventing a parallel UI kit.

PHASE 1 — INVENTORY
Find tokens, primitives, and existing variants already in the repo/system.

PHASE 2 — MAP
Map each in-scope element → exact variant / existing component+props / compose / true gap.

PHASE 3 — FIX OR RECOMMEND
Prefer reuse. If a gap is real, name it and propose the smallest system-friendly API — do not freestyle a new button language.

OUTPUT
Mapping table · one-offs removed · residual gaps · verification steps.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'design system',
      'tokens',
      'shadcn',
      'mui',
      'angular material',
      'alignment',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'Design'],
  },
  {
    id: 'skill-icon-system',
    title: 'Skill: Icon System Pass',
    description:
      'Fill the product/icon library, then standardize icons for size, stroke, and a11y.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Product / screens: 
Icon library in use (lucide · heroicons · MUI icons · Phosphor · Tabler · mixed/unknown): 
Preferred size / stroke rules (or “match existing”): 
Problems seen (mixed sets, wrong optical size, missing labels): 
Must not change: 
══════════════════════════════════════

Standardize icons for the filled-in product.

MISSION
One coherent icon language: library, optical size, stroke, alignment, and accessible naming.

CHECK
• Prefer the project’s existing icon library — don’t introduce a second set
• Icon-only controls need accessible names
• Decorative icons are aria-hidden
• Align to text caps height; keep touch targets usable
• Replace inconsistent one-off SVGs when a library equivalent exists

OUTPUT
Issues found · recommended rules · concrete swap list · residual gaps.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'icons',
      'lucide',
      'heroicons',
      'icon system',
      'a11y',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'Design'],
  },
  {
    id: 'skill-motion-system',
    title: 'Skill: Motion System (Not Noise)',
    description:
      'Fill product constraints, then define purposeful motion with reduced-motion respect.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Product / screens: 
Motion library available (Motion/Framer · GSAP · Angular animations · CSS only · unknown): 
Brand feel (calm / snappy / playful) — or “match existing”: 
Problems today (jank, decorative noise, missing feedback): 
Must not change: 
══════════════════════════════════════

Design a purposeful motion system for the filled-in product.

MISSION
Motion that clarifies hierarchy and feedback — not ornament.

RULES
• Prefer existing library already in the repo
• Durations short for UI chrome; reserve longer motion for storytelling heroes only if brand asks
• Respect prefers-reduced-motion
• Don’t animate layout thrash or large box-shadows for cheap depth
• Pair motion with real state changes (open/close, success, navigation)

OUTPUT
Principles · when to animate / when not · token-like duration/easing suggestions · top fixes for current screens.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'motion',
      'animation',
      'framer',
      'gsap',
      'reduced motion',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'Design'],
  },
  {
    id: 'skill-design-tokens',
    title: 'Skill: Design Tokens Audit',
    description:
      'Fill the stack, then audit hard-coded values vs tokens.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Product / repo area: 
Token source (CSS variables · Tailwind theme · MUI theme · Design.md · unknown): 
Screens / files in scope: 
Must not do a full redesign: 
══════════════════════════════════════

Audit design tokens vs hard-coded values in the filled-in scope.

MISSION
Find hard-coded colors, spacing, radii, and type that should map to tokens — without restyling the product.

OUTPUT
Table of offenders (file · value · suggested token) · true gaps where no token exists · safest cleanup order.
Do not invent a new palette unless asked.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'tokens',
      'design tokens',
      'hardcoded',
      'theme',
      'audit',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'Design'],
  },
  {
    id: 'skill-component-api',
    title: 'Skill: Component API Design',
    description:
      'Fill the component need, then design props/variants before coding.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Component need: 
(e.g. filter dropdown, empty state, settings row, data table toolbar)
Product / design system: 
Existing close matches in the repo (or “search first”): 
Platform (React · Angular · unknown): 
Must support states: 
══════════════════════════════════════

Design the component API before implementation.

MISSION
A small, reusable API that fits the existing design system — not a one-off.

COVER
Name · responsibility · props/inputs · variants · slots/content projection · states · a11y notes · do/don’t examples · whether to extend an existing component instead.

Do not implement code until the user asks.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'component api',
      'props',
      'variants',
      'design system',
      'react',
      'angular',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'Design', 'Planning'],
  },
  {
    id: 'skill-onboarding-critique',
    title: 'Skill: Onboarding / First-Run Critique',
    description:
      'Fill the product, then critique first-run UX vs competitors’ patterns.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Product: 
First-run path to review (signup → aha): 
Primary user job to value: 
Competitors to glance at (optional): 
Constraints (compliance, sales-led, invite-only, etc.): 
══════════════════════════════════════

Critique the first-run / onboarding experience for the filled-in product.

MISSION
Find where new users stall, what to teach vs defer, and the smallest path to value.

OUTPUT
Step-by-step critique · drop/merge/keep recommendations · empty/error moments · a11y risks · suggested experiment list.
No full visual redesign unless asked.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'onboarding',
      'first run',
      'activation',
      'critique',
      'pm',
      'ux',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'UX', 'PM'],
  },
  {
    id: 'skill-saas-density',
    title: 'Skill: Enterprise / SaaS Density Pass',
    description:
      'Fill the product type, then tune information density without clutter.',
    command: `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Product type: 
(e.g. SaaS banking ops console, B2B analytics, admin settings)
Screen(s): 
Problem (too sparse · too cramped · inconsistent density): 
Users (power users · occasional · mixed): 
Must not change: 
══════════════════════════════════════

Tune visual density for the filled-in SaaS/enterprise screen.

MISSION
Scannable density for the named users — not a consumer marketing layout, not a spreadsheet wall.

CHECK
Hierarchy · alignment · table/list rhythm · toolbar chrome · filter placement · whitespace that earns its keep · mobile/tablet collapse using existing patterns.

OUTPUT
Findings by severity · concrete spacing/type/layout adjustments · what not to densify.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: [
      'skill',
      'density',
      'saas',
      'enterprise',
      'banking',
      'dashboard',
      'chatgpt',
      'codex',
    ],
    tags: ['Skill', 'Design', 'UX'],
  },
  {
    id: 'skill-prompt-library-scaffold',
    title: 'Scaffold a Cursor Skill File',
    description:
      'Create a starter skill markdown you can refine when you drop in real skill links later.',
    command:
      'mkdir -p .cursor/skills/visual-design && printf "%s\\n" "---" "name: visual-design" "description: Improve UI craft while respecting the design system." "---" "" "# Visual design skill" "" "## When to use" "- Hierarchy, spacing, type, or polish looks off" "- Need system-faithful visual improvements" "" "## Instructions" "- Fill product/screen context before acting" "- Prefer existing tokens/components" "- Smallest diff; no brand freelancing" "- Check key breakpoints before claiming done" "" "## Fill-ins to request from the user" "- Product / screen" "- Design system to respect" "- Must not change" "- Done when" "" > .cursor/skills/visual-design/SKILL.md && ls -la .cursor/skills/visual-design/',
    platform: 'github',
    language: 'shell',
    category: 'Setup',
    type: 'terminal',
    keywords: [
      'skill',
      'cursor',
      'scaffold',
      'visual design',
      'setup',
      'agents',
    ],
    notes:
      'Starter only — replace with your real skill docs/links when you have them.',
  },
]
