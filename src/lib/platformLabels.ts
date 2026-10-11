import type { CommandType, Platform, PrimaryFilter } from '../types/command'

export const PLATFORM_LABELS: Record<Platform, string> = {
  github: 'Git & GitHub',
  cursor: 'Cursor',
  claude: 'Claude Code',
}

export const PRIMARY_FILTERS: { id: PrimaryFilter; label: string }[] = [
  { id: 'all', label: 'All Commands' },
  { id: 'github', label: 'Git & GitHub' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'claude', label: 'Claude Code' },
]

export const TYPE_LABELS: Record<CommandType, string> = {
  terminal: 'Terminal',
  slash: 'Slash command',
  shortcut: 'Shortcut',
}
