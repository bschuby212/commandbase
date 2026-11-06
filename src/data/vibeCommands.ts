import type { Command } from '../types/command'

/**
 * Practical commands for designers, PMs, and vibe-coders:
 * local previews, shipping UI, fixing “it broke,” sharing work, and doing
 * GitHub / Cursor / Claude tasks without memorizing CLI trivia.
 */
export const vibeCommands: Command[] = [
  // --- Local preview & sharing ---
  {
    id: 'vibe-open-localhost',
    title: 'Open Local Dev Site',
    description: 'Open the usual Vite/Next local URL in your browser.',
    command: 'open http://127.0.0.1:5173',
    platform: 'macterminal',
    language: 'shell',
    category: 'Navigation',
    type: 'terminal',
    keywords: ['localhost', 'preview', 'open', 'vite', 'browser'],
    notes: 'Swap 5173 for 3000/8080 if your app uses a different port. On Linux use xdg-open.',
  },
  {
    id: 'vibe-open-localhost-3000',
    title: 'Open localhost:3000',
    description: 'Open the common Next.js / CRA local port.',
    command: 'open http://127.0.0.1:3000',
    platform: 'macterminal',
    language: 'shell',
    category: 'Navigation',
    type: 'terminal',
    keywords: ['localhost', '3000', 'next', 'preview'],
  },
  {
    id: 'vibe-qr-local',
    title: 'QR Code for Phone Testing',
    description: 'Print a QR code to your LAN URL so you can test on a real phone.',
    command:
      'IP=$(ipconfig getifaddr en0); echo "http://$IP:5173"; npx --yes qrcode-terminal "http://$IP:5173"',
    platform: 'macterminal',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['qr', 'mobile', 'phone', 'lan', 'preview', 'responsive'],
    notes: 'Phone and laptop must be on the same Wi‑Fi. Change port if needed.',
  },
  {
    id: 'vibe-share-tunnel',
    title: 'Share Local Preview (Tunnel)',
    description: 'Expose localhost so a teammate or stakeholder can click a public link.',
    command: 'npx --yes localtunnel --port 5173',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['tunnel', 'share', 'preview', 'stakeholder', 'localtunnel'],
    notes: 'Do not tunnel apps with real secrets or private customer data.',
  },
  {
    id: 'vibe-list-listening',
    title: 'List What Is Listening Locally',
    description: 'See which local ports are already taken before starting the app.',
    command: 'lsof -nP -iTCP -sTCP:LISTEN | head -40',
    platform: 'macterminal',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['port', 'listen', 'lsof', 'troubleshoot', 'busy'],
  },
  {
    id: 'vibe-kill-node',
    title: 'Kill All Node Processes',
    description: 'Nuclear option when zombie Node servers keep holding ports.',
    command: 'pkill -f node || true',
    platform: 'macterminal',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['kill', 'node', 'zombie', 'port', 'troubleshoot'],
    destructive: true,
    notes: 'Stops every Node process for your user — including other projects.',
  },

  // --- “It looks wrong” / visual QA ---
  {
    id: 'vibe-lighthouse-a11y',
    title: 'Run Lighthouse Accessibility Audit',
    description: 'Score accessibility on a running local or deployed URL.',
    command: 'npx --yes lighthouse http://127.0.0.1:5173 --only-categories=accessibility --view',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['lighthouse', 'a11y', 'accessibility', 'audit', 'qa'],
  },
  {
    id: 'vibe-lighthouse-perf',
    title: 'Run Lighthouse Performance Pass',
    description: 'Quick performance snapshot before a design review.',
    command: 'npx --yes lighthouse http://127.0.0.1:5173 --only-categories=performance --view',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['lighthouse', 'performance', 'perf', 'qa'],
  },
  {
    id: 'vibe-pa11y',
    title: 'Scan Page for A11y Issues',
    description: 'CLI accessibility scan with concrete selectors to fix.',
    command: 'npx --yes pa11y http://127.0.0.1:5173',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['pa11y', 'a11y', 'accessibility', 'scan', 'qa'],
  },
  {
    id: 'vibe-screenshot-fullpage',
    title: 'Full-Page Screenshot (Chrome)',
    description: 'Capture the whole page for before/after critique.',
    command:
      'npx --yes playwright screenshot --full-page http://127.0.0.1:5173 ./before.png',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['screenshot', 'fullpage', 'playwright', 'before', 'after', 'qa'],
  },
  {
    id: 'vibe-screenshot-mobile',
    title: 'Mobile Viewport Screenshot',
    description: 'Capture at iPhone-ish width for responsive review.',
    command:
      'npx --yes playwright screenshot --viewport-size=390,844 http://127.0.0.1:5173 ./mobile.png',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['screenshot', 'mobile', 'responsive', 'playwright', 'qa'],
  },
  {
    id: 'vibe-screenshot-breakpoints',
    title: 'Screenshot Common Breakpoints',
    description: 'Dump desktop / tablet / mobile PNGs in one pass.',
    command:
      'npx --yes playwright screenshot --viewport-size=1440,900 http://127.0.0.1:5173 ./desk.png && npx --yes playwright screenshot --viewport-size=768,1024 http://127.0.0.1:5173 ./tablet.png && npx --yes playwright screenshot --viewport-size=390,844 http://127.0.0.1:5173 ./phone.png',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['screenshot', 'breakpoints', 'responsive', 'qa', 'review'],
  },
  {
    id: 'vibe-mac-screenshot-window',
    title: 'Capture Window Screenshot (Mac)',
    description: 'Interactive window capture for sticky UI bugs.',
    command: 'screencapture -W ~/Desktop/ui-window.png',
    platform: 'macterminal',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['screenshot', 'window', 'mac', 'screencapture'],
  },
  {
    id: 'vibe-mac-screenshot-selection',
    title: 'Capture Selection Screenshot (Mac)',
    description: 'Drag a rectangle around the broken UI detail.',
    command: 'screencapture -i ~/Desktop/ui-selection.png',
    platform: 'macterminal',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['screenshot', 'selection', 'mac', 'screencapture'],
  },

  // --- Assets & design handoff helpers ---
  {
    id: 'vibe-svgo',
    title: 'Optimize an SVG',
    description: 'Strip editor junk from an exported SVG before shipping.',
    command: 'npx --yes svgo <path.svg> -o <path.svg>',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['svg', 'svgo', 'optimize', 'icon', 'figma'],
  },
  {
    id: 'vibe-imagemin',
    title: 'Compress a PNG/JPG',
    description: 'Shrink a heavy marketing image without opening Photoshop.',
    command: 'npx --yes @squoosh/cli --oxipng \'{}\' <path.png>',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['image', 'compress', 'png', 'jpg', 'perf'],
    notes: 'For many files, prefer a dedicated asset pipeline or Cloudinary/imgix.',
  },
  {
    id: 'vibe-webp',
    title: 'Convert Image to WebP',
    description: 'Make a lighter web-friendly copy of a hero image.',
    command: 'npx --yes @squoosh/cli --webp \'{}\' -d . <path.png>',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['webp', 'image', 'convert', 'perf'],
  },
  {
    id: 'vibe-copy-svg-clipboard',
    title: 'Copy File to Clipboard (Mac)',
    description: 'Put file contents on the clipboard — handy for pasting SVG into Figma/code.',
    command: 'pbcopy < <path>',
    platform: 'macterminal',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['pbcopy', 'clipboard', 'svg', 'paste'],
  },
  {
    id: 'vibe-base64-image',
    title: 'Base64-Encode a Small Asset',
    description: 'Inline a tiny icon when you need a quick one-off embed.',
    command: 'base64 -i <path> | pbcopy',
    platform: 'macterminal',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['base64', 'inline', 'icon', 'data-uri'],
    notes: 'Only for tiny assets — large base64 hurts performance.',
  },

  // --- Project hygiene when vibe-coding ---
  {
    id: 'vibe-fresh-install',
    title: 'Nuclear Reinstall Dependencies',
    description: 'Delete lock-sensitive junk and reinstall when the app randomly will not boot.',
    command: 'rm -rf node_modules dist .next .vite && npm install',
    platform: 'github',
    language: 'javascript',
    category: 'Setup',
    type: 'terminal',
    keywords: ['reinstall', 'node_modules', 'corrupt', 'troubleshoot', 'fresh'],
    destructive: true,
  },
  {
    id: 'vibe-typecheck',
    title: 'Typecheck Without Building',
    description: 'See TypeScript errors without waiting on a full production build.',
    command: 'npx tsc --noEmit',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['typescript', 'tsc', 'typecheck', 'errors'],
  },
  {
    id: 'vibe-lint-fix',
    title: 'Auto-Fix Lint Issues',
    description: 'Let the linter clean safe problems after a big AI edit.',
    command: 'npm run lint -- --fix',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['lint', 'fix', 'eslint', 'oxlint'],
    notes: 'Only works if your lint script forwards args to a fixer-capable linter.',
  },
  {
    id: 'vibe-find-todo',
    title: 'Find TODO / FIXME Comments',
    description: 'Hunt leftover stubs before you call the UI “done.”',
    command: 'rg -n "TODO|FIXME|HACK|XXX" --glob \'!node_modules\' .',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['todo', 'fixme', 'search', 'qa', 'leftover'],
  },
  {
    id: 'vibe-find-console-logs',
    title: 'Find Stray console.log Calls',
    description: 'Clean debug noise before a design review or PR.',
    command: 'rg -n "console\\.(log|debug|info)" src --glob \'!node_modules\'',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['console', 'log', 'debug', 'cleanup', 'pr'],
  },
  {
    id: 'vibe-find-hardcoded-colors',
    title: 'Find Hardcoded Hex Colors',
    description: 'Spot one-off colors that should be design tokens.',
    command: 'rg -n "#[0-9A-Fa-f]{3,8}\\b" src --glob \'*.{css,scss,tsx,jsx,vue}\'',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['color', 'hex', 'tokens', 'design system', 'audit'],
  },
  {
    id: 'vibe-find-px-font',
    title: 'Find Hardcoded px Font Sizes',
    description: 'Locate font-size: Npx that may fight the type scale.',
    command: 'rg -n "font-size:\\s*\\d+px" src --glob \'*.{css,scss}\'',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['font', 'px', 'type', 'scale', 'audit'],
  },
  {
    id: 'vibe-bundle-why',
    title: 'Inspect Why a Package Is Installed',
    description: 'Trace which dependency pulled in a surprise library.',
    command: 'npm ls <package-name>',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['npm', 'ls', 'dependency', 'why', 'troubleshoot'],
  },
  {
    id: 'vibe-outdated-ui',
    title: 'Check Outdated UI Packages',
    description: 'See which design-system / UI libs are behind.',
    command: 'npm outdated',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['outdated', 'upgrade', 'ui', 'packages'],
  },

  // --- GitHub shipping for non-git experts ---
  {
    id: 'vibe-status-pretty',
    title: 'Pretty Status Before a PR',
    description: 'Short branch + dirty-file view before you open a pull request.',
    command: 'git status -sb && git diff --stat',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['status', 'diff', 'stat', 'pr', 'review'],
  },
  {
    id: 'vibe-commit-ui',
    title: 'Commit a UI Change',
    description: 'Commit with a user-facing message reviewers actually understand.',
    command: 'git add -A && git commit -m "ui: <what the user sees now>"',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['commit', 'ui', 'message', 'design'],
  },
  {
    id: 'vibe-branch-ui',
    title: 'Start a UI Branch',
    description: 'Create a named branch for a visual experiment.',
    command: 'git switch -c ui/<short-description>',
    platform: 'github',
    language: 'git',
    category: 'Branches',
    type: 'terminal',
    keywords: ['branch', 'ui', 'feature', 'switch'],
  },
  {
    id: 'vibe-pr-draft',
    title: 'Open a Draft PR for Feedback',
    description: 'Share unfinished UI early without pretending it is ready.',
    command:
      'gh pr create --draft --title "ui: <change>" --body "## Screenshots\\n- Desktop:\\n- Mobile:\\n\\n## Still open\\n- \\n\\n## How to test\\n1. npm run dev\\n2. Visit /"',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['pr', 'draft', 'feedback', 'screenshots', 'gh'],
  },
  {
    id: 'vibe-pr-ready',
    title: 'Mark Draft PR Ready',
    description: 'Flip a draft PR to ready for review after polish.',
    command: 'gh pr ready',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['pr', 'ready', 'review', 'gh'],
  },
  {
    id: 'vibe-pr-comment-screenshots',
    title: 'Comment Before/After Screenshots',
    description: 'Drop a simple before/after table on the PR.',
    command:
      'gh pr comment --body "## Before / After\\n| Before | After |\\n| --- | --- |\\n| (paste) | (paste) |"',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['pr', 'comment', 'screenshot', 'before', 'after'],
  },
  {
    id: 'vibe-pr-checks-watch',
    title: 'Watch CI After UI Push',
    description: 'See whether lint/build failed after your visual change.',
    command: 'gh pr checks --watch',
    platform: 'github',
    language: 'git',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['ci', 'checks', 'watch', 'pr', 'failed'],
  },
  {
    id: 'vibe-issue-design-bug',
    title: 'File a Design Bug Issue',
    description: 'Create a structured visual bug ticket from the terminal.',
    command:
      'gh issue create --title "design: <bug>" --body "## What\\n\\n## Where\\n\\n## Expected\\n\\n## Screenshot\\n"',
    platform: 'github',
    language: 'git',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['issue', 'bug', 'design', 'gh'],
  },
  {
    id: 'vibe-compare-branches',
    title: 'Compare Branch to Main on GitHub',
    description: 'Open the GitHub compare view for your current branch.',
    command: 'gh browse --branch "$(git branch --show-current)"',
    platform: 'github',
    language: 'git',
    category: 'Navigation',
    type: 'terminal',
    keywords: ['compare', 'browse', 'branch', 'github'],
  },
  {
    id: 'vibe-undo-last-commit-keep',
    title: 'Undo Last Commit (Keep Files)',
    description: 'Back out of a bad commit message or premature commit without losing work.',
    command: 'git reset --soft HEAD~1',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['undo', 'reset', 'soft', 'commit', 'troubleshoot'],
  },
  {
    id: 'vibe-discard-one-file',
    title: 'Throw Away Edits to One File',
    description: 'Reset a single file when an AI edit made it worse.',
    command: 'git restore <path>',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['restore', 'discard', 'undo', 'file', 'ai'],
    destructive: true,
  },
  {
    id: 'vibe-show-file-at-main',
    title: 'Show How a File Looks on Main',
    description: 'Peek at the main-branch version without switching branches.',
    command: 'git show origin/main:<path>',
    platform: 'github',
    language: 'git',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['show', 'main', 'compare', 'file'],
  },
  {
    id: 'vibe-diff-file-vs-main',
    title: 'Diff One File Against Main',
    description: 'See exactly what changed in a screen vs production branch.',
    command: 'git diff origin/main -- <path>',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['diff', 'main', 'file', 'review'],
  },

  // --- Cursor / Claude / Codex everyday for designers ---
  {
    id: 'vibe-cursor-doctor',
    title: 'Why Is This Broken?',
    description: 'Paste-ready prompt when the UI is wrong and you need a root cause.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Something in this screen is wrong. Do not redesign it. Do not refactor unrelated code. Do not “improve” visuals while debugging.

Operate as Staff Product Design doing ruthless root-cause triage:

1. Restate what looks broken in concrete, observable terms (layout, type, color, clipping, interaction, data).
2. Reproduce with available tools; note viewport and steps.
3. Inspect the relevant components, styles, and data flowing into them.
4. Rank the most likely root causes; pick the best-supported one and explain why alternatives were rejected.
5. Apply the smallest fix that addresses that root cause.
6. Verify the original repro is gone; spot-check one nearby regression risk.
7. Tell me how to verify visually in a short checklist.

If you can’t reproduce, say what’s missing. If the cause is upstream (API, content, design inconsistency), stop at the boundary and document it instead of hiding it with a cosmetic patch.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['broken', 'bug', 'root cause', 'cursor', 'prompt'],
    tags: ['QA', 'Debug'],
  },
  {
    id: 'vibe-prompt-match-figma',
    title: 'Match This Figma Frame',
    description: 'Push the agent to treat Figma as source of truth for spacing/type/color.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Implement this to match the provided Figma frame as the visual source of truth. Prefer Figma over your taste. This is fidelity work, not a redesign and not an architecture rewrite.

Operate as Staff Product Design / design engineering:

1. Inspect the frame with available tools/MCP or exports — do not guess from memory or a fuzzy screenshot alone.
2. Match structure and Auto Layout relationships: stacks, gaps, padding, alignment, wrapping.
3. Match typography (size, weight, line-height, truncation), color (map to project tokens when equivalents exist), radii, elevation, and assets.
4. Cover component variants/states shown in the file (default, hover, selected, disabled, error, empty).
5. Reuse existing project components when they fit the Figma intent; do not invent parallel controls.
6. Call out every intentional deviation (missing asset, font/token gap, platform limit) with why — never silent drift.
7. Verify section-by-section (header, body regions, controls, footer) and summarize matched / approximate / blocked.

Focus on spacing, type scale, color tokens, and states. Do not “improve” hierarchy, brand, or IA unless I explicitly asked.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['figma', 'match', 'pixel', 'prompt', 'design'],
    tags: ['Figma', 'Design'],
  },
  {
    id: 'vibe-prompt-mobile-pass',
    title: 'Mobile-First Pass',
    description: 'Force a mobile layout pass before desktop polish.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Do a mobile-first pass for this screen at ~390px width, then spot-check ~768 if navigation/filters change pattern. Fix real mobile failures inside the existing brand — no new features, no desktop redesign, no decorative invention.

Operate as Staff Product Design with responsive craft:

* Kill horizontal overflow, clipped controls, and stuck sticky chrome that eats the viewport
* Fix stacking order so the primary job still leads on a phone
* Improve tap targets and spacing between controls to a usable thumb-friendly rhythm
* Adjust typography for readable line length/size without inventing a parallel mobile type system
* Use existing sheet/drawer/collapse patterns for nav/filters when the desktop pattern fails
* Prefer layout/CSS fixes over JS measurement hacks
* Follow Design.md responsive rules when present; if missing, say so and mirror live app patterns

Show before/after notes for the worst issues. List what you deferred as lower impact. Cap to the highest-impact mobile breaks first.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['mobile', 'responsive', 'prompt', '390'],
    tags: ['Responsive', 'Design'],
  },
  {
    id: 'vibe-prompt-empty-states',
    title: 'Empty / Loading / Error States',
    description: 'Make the agent finish the non-happy-path UI every PM forgets.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Add or improve empty, loading, and error states for this flow so non-happy paths feel intentional and finished — not abandoned.

Operate as Staff Product Design:

1. Inventory every place empty / loading / error / success can appear in the flow.
2. Match existing components, tokens, and patterns (skeletons vs spinners, inline errors vs banners).
3. Keep copy human, short, and actionable: what happened + what to do next.
4. Preserve layout stability where possible (avoid huge jumps that feel broken).
5. Prevent double-submit on loading buttons where relevant.
6. Ensure keyboard focus and accessible names still make sense.
7. Do not invent a new illustration system or empty-state marketing campaign.

List each state you touched with before→after intent. No unrelated visual redesign of the happy path.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['empty', 'loading', 'error', 'states', 'prompt'],
    tags: ['UX', 'QA'],
  },
  {
    id: 'vibe-prompt-copy-pass',
    title: 'Product Copy Pass',
    description: 'Tighten labels, CTAs, and error text without restyling.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Do a copy-only pass on this screen as Staff Product Design with UX writing craft: labels, buttons, helper text, empty states, errors, and short headings.

Rules:

* No visual redesign, spacing changes, or new components
* Prefer plain language; clarity over cleverness
* Same concept → same word across the screen/flow
* Action verbs on buttons; specific recoverable errors
* Empty states say what’s missing and the next step
* Match the product’s existing capitalization and tone
* Don’t invent feature names that conflict with current product language
* Don’t rewrite the whole product voice — only this screen’s user-facing strings

Return a short before→after list and any terms you standardized. Flag open product/legal questions instead of guessing.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['copy', 'microcopy', 'ux writing', 'prompt'],
    tags: ['Copy', 'UX'],
  },
  {
    id: 'vibe-prompt-stakeholder-summary',
    title: 'Stakeholder Summary',
    description: 'Turn a messy coding session into a PM-friendly update.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Write a stakeholder update for this change in plain language a PM or lead can paste into Slack.

Operate as Staff Product Design translating craft into outcomes — not an engineer dumping commits.

Include:

* What users will notice (outcomes, not components)
* What’s still rough / explicitly unfinished
* Risks or unknowns
* How to try it (URL/steps/viewport)
* Decisions that need input (if any)
* One-line bottom line (ship / needs review / blocked)

No implementation dump, no file lists unless a risk depends on them. Keep it scannable. If Design.md / Figma drove decisions, mention the source of truth in one line.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['stakeholder', 'pm', 'summary', 'update', 'prompt'],
    tags: ['PM', 'Handoff'],
  },
  {
    id: 'vibe-prompt-acceptance-criteria',
    title: 'Write Acceptance Criteria',
    description: 'Generate testable acceptance criteria from the current screen/ask.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

From my request and this UI, write crisp acceptance criteria an engineer and QA can test. Do not implement yet.

Operate as Staff Product Design with PM-grade prioritization:

* Cover the primary user job end-to-end in observable pass/fail terms
* Include meaningful edge cases: empty, error, long content, permission-denied if relevant
* Include responsive must-haves at key widths used by this product
* Include accessibility must-haves for critical interactions (keyboard, labels, focus visibility)
* Use Given/When/Then or a tight checklist — each item must be testable without guessing
* Separate MUST vs SHOULD
* Call out assumptions and open questions explicitly
* Avoid implementation detail (“use flexbox”) unless it is truly a product requirement

Output criteria only, ready to paste into a ticket. Be specific to this screen/flow, not generic QA boilerplate.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['acceptance', 'criteria', 'qa', 'pm', 'prompt'],
    tags: ['PM', 'QA'],
  },
  {
    id: 'vibe-prompt-scope-cut',
    title: 'Cut Scope to Ship Today',
    description: 'Get a ruthless MVP cut when the AI overbuilt the design.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Propose the smallest shippable slice of this UI for today. Be ruthless. Optimize for a reviewable demo that proves the core user job — not a half-polished everything.

Operate as Staff Product Design who has cut scope on real launches:

1. Restate the user outcome that must be true to learn something useful in a review.
2. Separate must-have vs later vs never.
3. If you already built extras, identify exactly what to revert, hide, or stub.
4. Prefer cutting secondary states/decoration/edge polish over gutting the primary path.
5. Name risks of shipping the cut slice (what can go wrong, what we will not know yet).
6. Propose a verification path for the demo (who clicks what, at which width).

Do not implement the cut unless I ask — first give the plan clearly so we can agree.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['scope', 'mvp', 'cut', 'ship', 'prompt'],
    tags: ['PM', 'Planning'],
  },
  {
    id: 'vibe-prompt-revert-ai-mess',
    title: 'Revert the Overbuild',
    description: 'When the agent “helped” too much — walk back unrelated changes.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Review the current diff against my original ask. Revert unrelated changes. Keep only what was required.

Operate as a Staff Product Designer who codes with engineer-grade diff discipline — cleaning an overbuilt agent PR:

1. Restate the original acceptance criteria
2. Classify each change: required / helpful-but-out-of-scope / accidental churn
3. Revert out-of-scope and churn (formatting-only, drive-by refactors, bonus features, parallel abstractions, taste-driven restyles)
4. Preserve required behavior/UI
5. Re-verify the ask still works
6. Summarize what you removed and why, plus what remains

Do not use this as an excuse to redesign. Diff hygiene only.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['revert', 'overbuild', 'diff', 'scope', 'prompt'],
    tags: ['QA', 'Implementation'],
  },

  // --- Netlify / deploy / env gotchas ---
  {
    id: 'vibe-netlify-dev',
    title: 'Run Netlify Dev',
    description: 'Preview with Netlify redirects/functions locally.',
    command: 'npx --yes netlify dev',
    platform: 'github',
    language: 'javascript',
    category: 'Sessions',
    type: 'terminal',
    keywords: ['netlify', 'dev', 'preview', 'functions'],
  },
  {
    id: 'vibe-netlify-open',
    title: 'Open Netlify Site Admin',
    description: 'Jump to the Netlify dashboard for this linked site.',
    command: 'npx --yes netlify open',
    platform: 'github',
    language: 'javascript',
    category: 'Navigation',
    type: 'terminal',
    keywords: ['netlify', 'open', 'dashboard'],
  },
  {
    id: 'vibe-env-example',
    title: 'Create .env from Example',
    description: 'Start local env vars from the project template.',
    command: 'cp .env.example .env',
    platform: 'github',
    language: 'shell',
    category: 'Setup',
    type: 'terminal',
    keywords: ['env', 'dotenv', 'example', 'setup'],
  },
  {
    id: 'vibe-check-env-keys',
    title: 'List .env Keys (Not Values)',
    description: 'See which env keys exist without dumping secrets into chat.',
    command: 'sed -E \'s/=.*/=…/\' .env',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['env', 'keys', 'secrets', 'safe'],
  },

  // --- Responsive / CSS debugging ---
  {
    id: 'vibe-find-overflow-x',
    title: 'Hunt Horizontal Overflow Suspects',
    description: 'Search for wide fixed widths and 100vw that often cause sideways scroll.',
    command:
      'rg -n "100vw|width:\\s*\\d{4,}px|min-width:\\s*\\d{3,}px" src --glob \'*.{css,scss,tsx,jsx}\'',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['overflow', '100vw', 'responsive', 'scroll', 'troubleshoot'],
  },
  {
    id: 'vibe-find-z-index-wars',
    title: 'List z-index Values',
    description: 'Find stacking-context chaos when a modal sits under a header.',
    command: 'rg -n "z-index:\\s*\\d+|z-\\[\\d+\\]|z-\\d+" src --glob \'*.{css,scss,tsx,jsx}\'',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['z-index', 'stacking', 'modal', 'overlay', 'troubleshoot'],
  },
  {
    id: 'vibe-find-important',
    title: 'Find !important Overrides',
    description: 'Locate CSS force-overrides that fight the design system.',
    command: 'rg -n "!important" src --glob \'*.{css,scss}\'',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['important', 'css', 'override', 'audit'],
  },
  {
    id: 'vibe-tailwind-conflict-hint',
    title: 'Resolve Conflicting Tailwind Classes',
    description: 'Prompt for cleaning contradictory utility classes on one node.',
    command:
      `You are an award-winning, AI-powered Staff Product Designer with 30 years of shipped product craft — the kind of partner teams trust for judgment, restraint, and taste under real constraints. Work with senior IC discipline: evidence over vibes, smallest correct change, plain-language rationale, no redesign theater.

Audit this component for conflicting utility classes (padding, margin, display, position, text size/color, flex/grid, gaps). Keep the intended visual. Remove dead or fighting utilities.

Operate as Staff Product Design with front-end execution standards:

* Identify competing classes that cancel or ambiguously override each other
* Preserve the rendered look users see now (unless a conflict is clearly a bug causing the wrong look)
* Remove dead utilities
* Prefer the project’s spacing/type tokens/patterns
* Explain each removal in one line
* Do not restyle or “improve” design while cleaning

If the intended visual is unclear, say so and pick the interpretation that matches surrounding design-system usage. Call out any Design.md token that should replace a raw utility.`,
    platform: 'aiprompt',
    language: 'prompt',
    category: 'Prompts',
    type: 'prompt',
    keywords: ['tailwind', 'conflict', 'utilities', 'prompt'],
    tags: ['Design', 'Implementation'],
  },

  // --- Collaboration / PM glue ---
  {
    id: 'vibe-clone-and-run',
    title: 'Clone, Install & Run',
    description: 'The “I just got the repo link” onboarding one-liner.',
    command:
      'git clone <repository-url> && cd <repo-folder> && npm install && npm run dev',
    platform: 'github',
    language: 'shell',
    category: 'Setup',
    type: 'terminal',
    keywords: ['clone', 'install', 'dev', 'onboarding', 'start'],
  },
  {
    id: 'vibe-which-node',
    title: 'Confirm Node Before Debugging',
    description: 'Check Node/npm versions when “works on my machine” appears.',
    command: 'node -v && npm -v && pwd',
    platform: 'github',
    language: 'javascript',
    category: 'Setup',
    type: 'terminal',
    keywords: ['node', 'version', 'npm', 'troubleshoot'],
  },
  {
    id: 'vibe-disk-space',
    title: 'Check Free Disk Space',
    description: 'Rule out “mystery install failures” caused by a full disk.',
    command: 'df -h .',
    platform: 'macterminal',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['disk', 'space', 'df', 'troubleshoot'],
  },
  {
    id: 'vibe-clear-derived-caches',
    title: 'Clear Common Frontend Caches',
    description: 'Delete typical build caches when HMR/build output looks haunted.',
    command: 'rm -rf node_modules/.vite node_modules/.cache .next dist coverage',
    platform: 'github',
    language: 'shell',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['cache', 'vite', 'next', 'troubleshoot'],
    destructive: true,
  },
  {
    id: 'vibe-prettier-write',
    title: 'Format the Project',
    description: 'Run Prettier across the repo after a messy AI edit.',
    command: 'npx --yes prettier --write .',
    platform: 'github',
    language: 'javascript',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['prettier', 'format', 'write'],
    notes: 'Respects .prettierignore if present.',
  },
  {
    id: 'vibe-diff-stat-main',
    title: 'How Big Is My Diff vs Main?',
    description: 'Size check before asking for review — catch accidental huge diffs.',
    command: 'git diff --stat origin/main...HEAD',
    platform: 'github',
    language: 'git',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['diff', 'stat', 'size', 'pr', 'review'],
  },
  {
    id: 'vibe-files-changed-main',
    title: 'List Files Changed vs Main',
    description: 'Quick file list for a design review agenda.',
    command: 'git diff --name-only origin/main...HEAD',
    platform: 'github',
    language: 'git',
    category: 'Utilities',
    type: 'terminal',
    keywords: ['files', 'changed', 'main', 'review'],
  },
  {
    id: 'vibe-restore-clean-tree',
    title: 'Discard All Uncommitted Work',
    description: 'Hard reset when an experiment is garbage and you want last commit back.',
    command: 'git reset --hard HEAD && git clean -fd',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['reset', 'hard', 'clean', 'discard', 'troubleshoot'],
    destructive: true,
    notes: 'Destroys uncommitted work. Double-check git status first.',
  },
  {
    id: 'vibe-stash-all',
    title: 'Stash Everything Including Untracked',
    description: 'Shelve a messy WIP (including new files) to switch tasks.',
    command: 'git stash push -u -m "wip: park UI experiment"',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['stash', 'untracked', 'wip', 'park'],
  },
  {
    id: 'vibe-pop-stash',
    title: 'Bring Stash Back',
    description: 'Restore the most recent stash when you return to the experiment.',
    command: 'git stash pop',
    platform: 'github',
    language: 'git',
    category: 'Commits & Changes',
    type: 'terminal',
    keywords: ['stash', 'pop', 'restore'],
  },
]
