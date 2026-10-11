import type {
  CommandLanguage,
  CommandType,
  LanguageFilter,
  Platform,
  PrimaryFilter,
} from '../types/command'

export const PLATFORM_LABELS: Record<Platform, string> = {
  github: 'Git & GitHub',
  cursor: 'Cursor',
  claude: 'Claude Code',
  codex: 'Codex',
  vscode: 'VS Code / Copilot',
}

export const LANGUAGE_LABELS: Record<CommandLanguage, string> = {
  git: 'Git',
  shell: 'Shell',
  javascript: 'JavaScript',
  python: 'Python',
  docker: 'Docker',
  editor: 'Editor',
}

export const PROGRAM_FILTERS: { id: PrimaryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'github', label: 'Git & GitHub' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'claude', label: 'Claude Code' },
  { id: 'codex', label: 'Codex' },
  { id: 'vscode', label: 'VS Code / Copilot' },
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
}
