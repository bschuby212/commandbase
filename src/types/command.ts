export type Platform =
  | 'github'
  | 'cursor'
  | 'claude'
  | 'codex'
  | 'vscode'
  | 'powershell'
  | 'macterminal'
  | 'aiprompt'

export type CommandLanguage =
  | 'git'
  | 'shell'
  | 'javascript'
  | 'python'
  | 'docker'
  | 'editor'
  | 'prompt'

export type CommandType = 'terminal' | 'slash' | 'shortcut' | 'prompt'

export type SecondaryCategory =
  | 'Repositories'
  | 'Commits & Changes'
  | 'Branches'
  | 'Setup'
  | 'Navigation'
  | 'Sessions'
  | 'Utilities'
  | 'Prompts (QA, design critique, handoff & polish)'

export type ShortcutKeys = {
  mac: string
  windows: string
}

export type Command = {
  id: string
  title: string
  description: string
  /** Terminal, slash, or full AI prompt text. Unused for pure shortcuts. */
  command: string
  platform: Platform
  language: CommandLanguage
  category: SecondaryCategory
  type: CommandType
  keywords: string[]
  notes?: string
  destructive?: boolean
  /** Platform-specific key combinations for shortcut-type commands. */
  shortcut?: ShortcutKeys
  /** Optional discovery tags for AI prompts (Figma, QA, Accessibility, etc.). */
  tags?: string[]
}

export type PrimaryFilter = 'all' | Platform
export type LanguageFilter = 'all' | CommandLanguage
export type FavoriteFilter = 'all' | 'favorites'
