import { useMemo, useState } from 'react'
import { commands } from '../data/commands'
import type {
  Command,
  FavoriteFilter,
  LanguageFilter,
  PrimaryFilter,
  SecondaryCategory,
} from '../types/command'
import { getDisplayCommand } from '../lib/getCopyText'

const ALL_SECONDARY: SecondaryCategory[] = [
  'Repositories',
  'Commits & Changes',
  'Branches',
  'Setup',
  'Navigation',
  'Sessions',
  'Utilities',
]

function matchesSearch(command: Command, query: string): boolean {
  if (!query) return true

  const haystack = [
    command.title,
    command.description,
    command.command,
    command.category,
    command.platform,
    command.language,
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

export function useCommandFilter(favoriteIds: Set<string>) {
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState<LanguageFilter>('all')
  const [tool, setTool] = useState<PrimaryFilter>('all')
  const [secondary, setSecondary] = useState<SecondaryCategory | null>(null)
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>('all')

  const handleLanguageChange = (next: LanguageFilter) => {
    setLanguage(next)
    setSecondary(null)
  }

  const handleToolChange = (next: PrimaryFilter) => {
    setTool(next)
    setSecondary(null)
  }

  const handleSecondaryChange = (next: SecondaryCategory | null) => {
    setSecondary(next)
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return commands.filter((command) => {
      if (language !== 'all' && command.language !== language) return false
      if (tool !== 'all' && command.platform !== tool) return false
      if (secondary && command.category !== secondary) return false
      if (favoriteFilter === 'favorites' && !favoriteIds.has(command.id)) {
        return false
      }
      return matchesSearch(command, query)
    })
  }, [language, tool, secondary, favoriteFilter, favoriteIds, search])

  const availableSecondary = useMemo(() => {
    const pool = commands.filter((command) => {
      if (language !== 'all' && command.language !== language) return false
      if (tool !== 'all' && command.platform !== tool) return false
      if (favoriteFilter === 'favorites' && !favoriteIds.has(command.id)) {
        return false
      }
      return true
    })

    const present = new Set(pool.map((command) => command.category))
    return ALL_SECONDARY.filter((category) => present.has(category))
  }, [language, tool, favoriteFilter, favoriteIds])

  const resetFilters = () => {
    setSearch('')
    setLanguage('all')
    setTool('all')
    setSecondary(null)
    setFavoriteFilter('all')
  }

  return {
    search,
    setSearch,
    language,
    setLanguage: handleLanguageChange,
    tool,
    setTool: handleToolChange,
    secondary,
    setSecondary: handleSecondaryChange,
    favoriteFilter,
    setFavoriteFilter,
    availableSecondary,
    filtered,
    totalCount: commands.length,
    resetFilters,
    getDisplayCommand,
  }
}
