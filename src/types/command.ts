export type Platform = 'github' | 'cursor' | 'claude' | 'codex' | 'vscode'

export type CommandLanguage =
  | 'git'
  | 'shell'
  | 'javascript'
  | 'python'
  | 'docker'
  | 'editor'

export type CommandType = 'terminal' | 'slash' | 'shortcut'

export type SecondaryCategory =
  | 'Repositories'
  | 'Commits & Changes'
  | 'Branches'
  | 'Setup'
  | 'Navigation'
  | 'Sessions'
  | 'Utilities'

export type ShortcutKeys = {
  mac: string
  windows: string
}

export type Command = {
  id: string
  title: string
  description: string
  /** Terminal or slash command text. Unused for pure shortcuts. */
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
}

export type PrimaryFilter = 'all' | Platform
export type LanguageFilter = 'all' | CommandLanguage
export type FavoriteFilter = 'all' | 'favorites'
