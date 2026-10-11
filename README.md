# Command Library

A standalone, responsive quick-reference library for developer commands covering Git/GitHub, Cursor, Claude Code, Codex, and VS Code / Copilot.

## Features

- One-click copy for terminal commands, slash commands, and keyboard shortcuts
- Real-time search across titles, descriptions, syntax, and keywords
- Tool, language, and function dropdown filters
- Fully client-side — no login or backend required
- Keyboard accessible cards with visible focus states
- Compact toolbar with search + tool/language/function dropdowns; cards scale 1→2→3→4 columns on larger screens

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Adding commands

Edit `src/data/commands.ts`. Commands follow this shape:

```ts
type Command = {
  id: string
  title: string
  description: string
  command: string
  platform: 'github' | 'cursor' | 'claude' | 'codex' | 'vscode'
  language: 'git' | 'shell' | 'javascript' | 'python' | 'docker' | 'editor'
  category: string
  type: 'terminal' | 'slash' | 'shortcut'
  keywords: string[]
  notes?: string
  shortcut?: { mac: string; windows: string }
}
```

Shortcut entries use `type: 'shortcut'` with Mac and Windows/Linux key combinations. They are never presented as terminal commands.
