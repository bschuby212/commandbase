import { useMemo, useState } from 'react'
import { commands } from '../data/commands'
import type { Command, PrimaryFilter, SecondaryCategory } from '../types/command'
import { getDisplayCommand } from '../lib/getCopyText'

const SECONDARY_BY_PRIMARY: Record<PrimaryFilter, SecondaryCategory[]> = {
  all: [
    'Repositories',
    'Commits & Changes',
    'Branches',
    'Setup',
    'Navigation',
    'Sessions',
    'Utilities',
  ],
  github: ['Repositories', 'Commits & Changes', 'Branches'],
  cursor: ['Navigation', 'Utilities', 'Setup'],
  claude: ['Sessions', 'Setup', 'Utilities'],
}

function matchesSearch(command: Command, query: string): boolean {
  if (!query) return true

  const haystack = [
    command.title,
    command.description,
    command.command,
    command.category,
    command.platform,
    command.type,
    command.notes ?? '',
    command.shortcut?.mac ?? '',
    command.shortcut?.windows ?? '',
    ...command.keywords,
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

export function useCommandFilter() {
  const [search, setSearch] = useState('')
  const [primary, setPrimary] = useState<PrimaryFilter>('all')
  const [secondary, setSecondary] = useState<SecondaryCategory | null>(null)

  const availableSecondary = SECONDARY_BY_PRIMARY[primary]

  const handlePrimaryChange = (next: PrimaryFilter) => {
    setPrimary(next)
    setSecondary(null)
  }

  const handleSecondaryChange = (next: SecondaryCategory | null) => {
    setSecondary(next)
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return commands.filter((command) => {
      if (primary !== 'all' && command.platform !== primary) return false
      if (secondary && command.category !== secondary) return false
      return matchesSearch(command, query)
    })
  }, [primary, secondary, search])

  return {
    search,
    setSearch,
    primary,
    setPrimary: handlePrimaryChange,
    secondary,
    setSecondary: handleSecondaryChange,
    availableSecondary,
    filtered,
    totalCount: commands.length,
    getDisplayCommand,
  }
}
