import type {
  CommandLanguage,
  CommandType,
  LanguageFilter,
  Platform,
  PrimaryFilter,
  SecondaryCategory,
} from '../types/command'

export const PLATFORM_LABELS: Record<Platform, string> = {
  github: 'Git & GitHub',
  cursor: 'Cursor',
  claude: 'Claude Code',
  codex: 'Codex',
  vscode: 'VS Code / Copilot',
  powershell: 'PowerShell (Windows)',
  macterminal: 'Mac Terminal',
  /** Internal bucket for tool-agnostic prompts — not shown in the Tools filter. */
  aiprompt: 'Prompts',
}

export const LANGUAGE_LABELS: Record<CommandLanguage, string> = {
  git: 'Git',
  shell: 'Shell',
  javascript: 'JavaScript',
  python: 'Python',
  docker: 'Docker',
  editor: 'Editor',
  /** Plain-language instructions to paste into any AI tool — not shell/code. */
  prompt: 'Prompts',
}

export const PROGRAM_FILTERS: { id: PrimaryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'github', label: 'Git & GitHub' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'claude', label: 'Claude Code' },
  { id: 'codex', label: 'Codex' },
  { id: 'vscode', label: 'VS Code / Copilot' },
  { id: 'powershell', label: 'PowerShell (Windows)' },
  { id: 'macterminal', label: 'Mac Terminal' },
]

export const LANGUAGE_FILTERS: { id: LanguageFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'git', label: 'Git' },
  { id: 'shell', label: 'Shell' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'docker', label: 'Docker' },
  { id: 'editor', label: 'Editor' },
]

export const TYPE_LABELS: Record<CommandType, string> = {
  terminal: 'Terminal',
  slash: 'Slash command',
  shortcut: 'Shortcut',
  prompt: 'Prompts',
}

/** Short hover copy for Function filter items. */
export const FUNCTION_DESCRIPTIONS: Record<SecondaryCategory, string> = {
  Repositories: 'Clone, init, remotes, and repo setup.',
  'Commits & Changes': 'Stage, commit, diff, stash, and undo.',
  Branches: 'Create, switch, merge, and clean up branches.',
  Setup: 'Install tools, env, auth, and first-time config.',
  Navigation: 'Move around files, panels, and the editor.',
  Sessions: 'Start, resume, and manage AI or terminal sessions.',
  Utilities: 'Everyday helpers, ports, caches, and cleanup.',
  Prompts: 'Paste-ready AI asks for review, critique, polish, and handoff.',
}

export const TOOL_DESCRIPTIONS: Partial<Record<PrimaryFilter, string>> = {
  github: 'Git and GitHub workflows.',
  cursor: 'Cursor editor and agent commands.',
  claude: 'Claude Code CLI and slash commands.',
  codex: 'Codex CLI, ChatGPT-ready prompts, and session commands.',
  vscode: 'VS Code and Copilot shortcuts.',
  powershell: 'Windows PowerShell setup and fixes.',
  macterminal: 'Mac Terminal, Homebrew, and shell fixes.',
}

export const LANGUAGE_DESCRIPTIONS: Partial<Record<LanguageFilter, string>> = {
  git: 'Git command syntax.',
  shell: 'Shell and terminal commands.',
  javascript: 'Node, npm, and JavaScript tooling.',
  python: 'Python, pip, and virtualenvs.',
  docker: 'Docker and Compose commands.',
  editor: 'Editor shortcuts and slash commands.',
}
