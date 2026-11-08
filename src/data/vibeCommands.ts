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
    description: 'Fill in what’s broken at the top, then get a root-cause triage.',
    command:
      `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
What’s broken: 
Where (screen / component / control): 
Steps to reproduce / viewport: 
Expected: 
Actual: 

(If you only know “it looks wrong,” still name the region and what feels off — layout, type, color, clipping, interaction, or data.)
══════════════════════════════════════

Use the “What’s broken / Where / Steps / Expected / Actual” fields above as the bug report. If any field is blank, infer carefully and state assumptions — but prefer the user’s filled-in details over guesswork.

Do not redesign it. Do not refactor unrelated code. Do not “improve” visuals while debugging.

MISSION
Confirm root cause with evidence, apply the smallest fix, verify the repro is gone, and tell me how to check.

PHASE 1 — CONCRETE OBSERVATION
Restate what looks broken in observable terms (layout, type, color, clipping, interaction, data).

PHASE 2 — REPRODUCE
Reproduce with available tools; note viewport and steps. If you can’t, say what’s missing.

PHASE 3 — INSPECT & RANK CAUSES
Inspect relevant components/styles/data. Rank likely causes; pick best-supported; explain why alternatives were rejected.

PHASE 4 — FIX & VERIFY
Apply smallest root-cause fix. Verify repro gone; spot-check one nearby risk. Provide a short visual verify checklist.

HYPOTHESIS TABLE
Cause | Why plausible | Evidence to confirm | Result

UPSTREAM
If API/content/design inconsistency is the cause, stop at the boundary — don’t hide with a cosmetic patch unless I ask for a workaround.

ANTI-PATTERNS
No redesign-as-debug. No speculative triple CSS tweaks. No unrelated cleanup.

OUTPUT
Repro · table · cause · fix · verify checklist.

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

DEBUG ETHICS
No cosmetic cover-ups. No drive-by redesign. Smallest reversible fix wins.

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
    keywords: ['broken', 'bug', 'root cause', 'cursor', 'prompt'],
    tags: ['QA', 'Debug'],
  },
  {
    id: 'vibe-prompt-match-figma',
    title: 'Match This Figma Frame',
    description: 'Push the agent to treat Figma as source of truth for spacing/type/color.',
    command:
      `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Figma link / file: 
Frame / node name (or paste the frame): 
Notes / must-match details (optional): 
══════════════════════════════════════

Implement this to match the provided Figma frame as source of truth. Prefer Figma over your taste. Fidelity work — not a redesign.

MISSION
Matched spacing/type/color/states with deviations logged. Region compare required.

PHASE 1 — INSPECT FRAME
Use tools/MCP/exports — don’t guess from memory.

PHASE 2 — MATCH
Layout/Auto Layout · spacing · type scale · color (token-map when possible) · radii/elevation · assets · component states. Reuse project components when they fit.

PHASE 3 — VERIFY
Section-by-section compare. Summarize matched / approximate / blocked. If Approximate, say what would make it Matched.

STATES & ASSETS
Shown hover/selected/disabled/error are fidelity. No silent close-enough icon swaps.

ANTI-PATTERNS
No creative reinterpretation. No architecture rewrite under fidelity cover.

OUTPUT
Fidelity summary + deviations + risks.

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

FIDELITY NON-NEGOTIABLES
Spacing rhythm · type styles · color roles · shown states. Taste is irrelevant.

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
    keywords: ['figma', 'match', 'pixel', 'prompt', 'design'],
    tags: ['Figma', 'Design'],
  },
  {
    id: 'vibe-prompt-mobile-pass',
    title: 'Mobile-First Pass',
    description: 'Force a mobile layout pass before desktop polish.',
    command:
      `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Screen / route: 
What’s broken on mobile (overflow, stacking, taps, type, etc.): 
Viewport(s) to prioritize (default ~390): 
══════════════════════════════════════

Do a mobile-first pass for this screen at ~390px (spot-check ~768 if nav/filters change). Fix real mobile failures inside the existing brand — no new features, no desktop redesign, no decorative invention.

MISSION
Primary job works on a phone without overflow or unreachable actions.

PHASE 1 — AUDIT 390 (AND 768 IF NEEDED)
Overflow/clipping · stacking order · tap targets/spacing · type readability · sticky chrome · filters/nav via existing sheets/drawers.

PHASE 2 — FIX WORST FIRST
Overflow and unreachable primary actions before type nitpicks. Prefer layout/CSS over JS hacks. Follow Design.md responsive rules when present; else mirror live patterns and say so.

MATRIX
Check project breakpoints if documented; otherwise use ~390, ~768, ~1024, ~1280.
At each width record: horizontal overflow? primary CTA reachable? type readable? sticky chrome eating viewport? filters/nav usable via existing collapse patterns?
Mobile failure taxonomy: 100vw / fixed min-widths / unshrinkable flex children · stacked stickies · tap targets under ~44px or cramped gaps · hover-only affordances · type that jumps from quiet to shouty.
Tablet often breaks side-by-side first — don’t skip it.
Prefer existing sheets/drawers/stacks over inventing a new mobile IA.

ANTI-PATTERNS
Don’t invent a parallel mobile type system. Don’t hide critical actions behind unlabeled icons without a product decision.

OUTPUT
Before/after on worst issues · deferred list · widths verified.

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

PHONE JOB ONE
If the primary action isn’t obvious/reachable at 390, that’s the top bug.

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
    keywords: ['mobile', 'responsive', 'prompt', '390'],
    tags: ['Responsive', 'Design'],
  },
  {
    id: 'vibe-prompt-empty-states',
    title: 'Empty / Loading / Error States',
    description: 'Make the agent finish the non-happy-path UI every PM forgets.',
    command:
      `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Flow / screen: 
Which states need work (empty / loading / error / all): 
Notes: 
══════════════════════════════════════

Add or improve empty, loading, and error states for this flow so non-happy paths feel intentional and finished.

MISSION
Complete the state set with existing patterns and short actionable copy.

PHASE 1 — INVENTORY
Where empty/loading/error/success can appear.

PHASE 2 — IMPLEMENT WITH PATTERNS
Match components/tokens (skeletons vs spinners, inline errors vs banners). Preserve layout stability. Prevent double-submit on loading. Keep a11y names/focus sane.

COPY PATTERN
Title (what’s missing) → one line reason/next step → optional single action. Avoid blamey/jokey empties unless product voice already does that.

STATE LENS
Where relevant, account for: default · hover · focus-visible · active/pressed · selected/toggled · disabled/read-only · loading/submitting · empty · error/invalid · success · permission-denied · overflow/truncation.
Use existing variants/tokens. Don’t invent a parallel state language.
Loading should prevent double-submit where relevant.
Empty/error copy: what happened + what to do next — short and human.

ANTI-PATTERNS
No new illustration system. No happy-path redesign while adding empties.

OUTPUT
States touched with before→after intent.

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

NON-HAPPY PATH FINISH LINE
Empty/loading/error should feel designed, not forgotten.

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
    keywords: ['empty', 'loading', 'error', 'states', 'prompt'],
    tags: ['UX', 'QA'],
  },
  {
    id: 'vibe-prompt-copy-pass',
    title: 'Product Copy Pass',
    description: 'Tighten labels, CTAs, and error text without restyling.',
    command:
      `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Screen / flow: 
Copy problems to prioritize (optional): 
Terms that must stay consistent (optional): 
══════════════════════════════════════

Do a copy-only pass on this screen: labels, buttons, helper text, empty states, errors, short headings.

MISSION
Clarity and consistency only — no visual redesign.

PHASE 1 — INVENTORY & STANDARDIZE
Collect strings. Fix vague/inconsistent/scary/bloated copy. Kill synonym drift to the product’s chosen terms.

PHASE 2 — APPLY
Plain language · verbs on actions · recoverable errors · empties with next step · match capitalization/tone · no conflicting invented feature names.

DELIVERABLE
Before→after list · glossary · open product/legal questions (don’t guess).

ANTI-PATTERNS
No spacing/component changes unless a label truly breaks the layout. No product-wide voice rewrite.

OUTPUT
Before→after + glossary + questions.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

WORDS ONLY
If you changed CSS, you went out of scope.

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
    keywords: ['copy', 'microcopy', 'ux writing', 'prompt'],
    tags: ['Copy', 'UX'],
  },
  {
    id: 'vibe-prompt-stakeholder-summary',
    title: 'Stakeholder Summary',
    description: 'Turn a messy coding session into a PM-friendly update.',
    command:
      `Write a stakeholder update for this change in plain language a PM or lead can paste into Slack. Readable in 30–45 seconds.

MISSION
Translate craft into outcomes — not commits.

PHASE 1 — DRAFT
What users will notice · what’s still rough · risks/unknowns · how to try (URL/steps/viewport) · decisions needed · one-line bottom line (ship / needs review / blocked).

SOURCE OF TRUTH
If Design.md/Figma drove decisions, mention in one line.

ANTI-PATTERNS
No implementation dump. No file lists unless a risk depends on them.

OUTPUT
Paste-ready Slack update.

KEEP ARTIFACTS SCANNABLE
Prefer tables/checklists over essays.
Every finding should include: location, severity (Blocker/Major/Minor when reviewing), why it matters, smallest fix, and whether you applied it.
End with risks and how I can verify quickly.

SLACK-READY
No jargon dump. Outcomes first. Bottom line last.

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
    keywords: ['stakeholder', 'pm', 'summary', 'update', 'prompt'],
    tags: ['PM', 'Handoff'],
  },
  {
    id: 'vibe-prompt-acceptance-criteria',
    title: 'Write Acceptance Criteria',
    description: 'Generate testable acceptance criteria from the current screen/ask.',
    command:
      `From my request and this UI, write crisp acceptance criteria an engineer and QA can test. Do not implement yet.

MISSION
Observable MUST/SHOULD criteria specific to this screen/flow — not generic QA boilerplate.

PHASE 1 — DERIVE
Primary job end-to-end · edges (empty/error/long content/permissions) · responsive must-haves · a11y must-haves for critical interactions (keyboard/labels/focus).

PHASE 2 — WRITE TESTABLE ITEMS
Given/When/Then or tight checklist. Separate MUST vs SHOULD. Call out assumptions/open questions. Avoid implementation detail unless truly required.

TESTABILITY TEST
If two engineers could disagree whether it passed, rewrite until they wouldn’t.

ANTI-PATTERNS
No implementing. No vague criteria. No generic boilerplate.

OUTPUT
Paste-ready ticket criteria only.

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

TESTABLE OR REWRITE
Ambiguous criteria are defects in the criteria.

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
    keywords: ['acceptance', 'criteria', 'qa', 'pm', 'prompt'],
    tags: ['PM', 'QA'],
  },
  {
    id: 'vibe-prompt-scope-cut',
    title: 'Cut Scope to Ship Today',
    description: 'Get a ruthless MVP cut when the AI overbuilt the design.',
    command:
      `Propose the smallest shippable slice of this UI for today. Be ruthless. Optimize for a reviewable demo that proves the core user job — not a half-polished everything.

MISSION
A vertical slice plan stakeholders can agree on before more building.

PHASE 1 — DEFINE THE LEARNING
Restate the user outcome that must be true to learn something useful in review.

PHASE 2 — CUT
Must-have vs later vs never. If already overbuilt, identify exact reverts/hides/stubs. Prefer cutting secondary states/decoration over gutting the primary path.

PHASE 3 — DEMO PLAN
Risks of the cut · verification path (who clicks what, which width) · what the audience should judge.

SHAPE
Prefer vertical slice of the real job over horizontal stubs of everything.

ANTI-PATTERNS
Don’t implement the cut unless I ask — plan first. Don’t “cut” by deleting the primary path.

OUTPUT
Must/later/never · reverts · risks · demo verification.

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

DEMO WORTHINESS
If the slice doesn’t prove the job, cut differently.

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
    keywords: ['scope', 'mvp', 'cut', 'ship', 'prompt'],
    tags: ['PM', 'Planning'],
  },
  {
    id: 'vibe-prompt-revert-ai-mess',
    title: 'Revert the Overbuild',
    description: 'When the agent “helped” too much — walk back unrelated changes.',
    command:
      `Review the current diff against my original ask. Revert unrelated changes. Keep only what was required.

MISSION
Diff hygiene after an overbuild. Preserve required behavior/UI; remove churn.

PHASE 1 — RESTATE ACCEPTANCE
Original must-haves and must-nots.

PHASE 2 — CLASSIFY EVERY CHANGE
Required / helpful-but-out-of-scope / accidental churn.

PHASE 3 — REVERT & RE-VERIFY
Revert out-of-scope and churn. Preserve required behavior/UI. Re-verify the ask still works. Summarize removals + remains.

CHURN EXAMPLES
Unrelated renames · format-only hunks · bonus features · taste-driven restyles not in the ask · new abstractions used once.

ANTI-PATTERNS
Don’t redesign while reverting. Diff hygiene only.

OUTPUT
Removed list + why · remaining required changes · verify notes.

DIFF HYGIENE DEFAULTS
Touch the fewest files that can satisfy the ask.
No drive-by renames, import resorts, or format-only hunks outside edited lines.
No new abstractions unless duplication already blocks a correct fix.
No dependency bumps, token migrations, or “while I was here” refactors.
If you find a nearby bug that doesn’t block verification, mention it — don’t bundle it.
If the diff grows, explain what forced it and whether it can be split for review.

KEEP REQUIRED ONLY
Helpful extras are still extras — revert them.

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
      `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
Component / file path: 
What looks wrong (or “classes fighting — clean without restyle”): 
══════════════════════════════════════

Audit this component for conflicting utility classes (padding, margin, display, position, text size/color, flex/grid, gaps). Keep the intended visual. Remove dead or fighting utilities.

MISSION
Clean class conflicts without restyling. Preserve intended look unless the conflict IS the bug.

PHASE 1 — FIND FIGHTS
Competing classes that cancel or ambiguously override. Dead utilities.

PHASE 2 — REMOVE WITH REASONS
Remove conflicts/dead classes. Prefer project spacing/type tokens/patterns. Explain each removal in one line.

CLASS FIGHT EXAMPLES
p-2 + p-4 · flex + hidden without breakpoint intent · text-sm + text-base · absolute + conflicting insets.

ANTI-PATTERNS
Don’t restyle or “improve” design while cleaning. If intent unclear, pick the interpretation matching surrounding system usage and say so.

OUTPUT
Removals with one-line reasons · any token replacements · residual ambiguity.

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

PRESERVE LOOK
Cleaning classes is not a redesign opportunity.

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
