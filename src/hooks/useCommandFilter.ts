import { useMemo, useState } from 'react'
import { commands } from '../data/commands'
import type {
  Command,
  CommandLanguage,
  FavoriteFilter,
  LanguageFilter,
  Platform,
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
  'Prompts (automated QA, design critique, Figma fidelity, handoff & polish)',
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
    ...(command.tags ?? []),
    ...command.keywords,
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value]
}

export function useCommandFilter(favoriteIds: Set<string>) {
  const [search, setSearch] = useState('')
  /** Empty = all tools */
  const [tools, setTools] = useState<Platform[]>([])
  /** Empty = all languages */
  const [languages, setLanguages] = useState<CommandLanguage[]>([])
  /** Empty = all functions */
  const [functions, setFunctions] = useState<SecondaryCategory[]>([])
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>('all')

  // Desktop dropdowns stay single-select: map to/from the multi arrays.
  const tool: PrimaryFilter = tools.length === 1 ? tools[0] : 'all'
  const language: LanguageFilter =
    languages.length === 1 ? languages[0] : 'all'
  const secondary: SecondaryCategory | null =
    functions.length === 1 ? functions[0] : null

  const setTool = (next: PrimaryFilter) => {
    setTools(next === 'all' ? [] : [next])
    setFunctions([])
  }

  const setLanguage = (next: LanguageFilter) => {
    setLanguages(next === 'all' ? [] : [next])
    setFunctions([])
  }

  const setSecondary = (next: SecondaryCategory | null) => {
    setFunctions(next ? [next] : [])
  }

  const toggleTool = (value: Platform) => {
    setTools((current) => toggleInList(current, value))
  }

  const toggleLanguage = (value: CommandLanguage) => {
    setLanguages((current) => toggleInList(current, value))
  }

  const toggleFunction = (value: SecondaryCategory) => {
    setFunctions((current) => toggleInList(current, value))
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return commands.filter((command) => {
      if (tools.length > 0 && !tools.includes(command.platform)) return false
      if (languages.length > 0 && !languages.includes(command.language)) {
        return false
      }
      if (functions.length > 0 && !functions.includes(command.category)) {
        return false
      }
      if (favoriteFilter === 'favorites' && !favoriteIds.has(command.id)) {
        return false
      }
      return matchesSearch(command, query)
    })
  }, [tools, languages, functions, favoriteFilter, favoriteIds, search])

  const availableSecondary = useMemo(() => {
    const pool = commands.filter((command) => {
      if (tools.length > 0 && !tools.includes(command.platform)) return false
      if (languages.length > 0 && !languages.includes(command.language)) {
        return false
      }
      if (favoriteFilter === 'favorites' && !favoriteIds.has(command.id)) {
        return false
      }
      return true
    })

    const present = new Set(pool.map((command) => command.category))
    return ALL_SECONDARY.filter((category) => present.has(category))
  }, [tools, languages, favoriteFilter, favoriteIds])

  const resetFilters = () => {
    setSearch('')
    setTools([])
    setLanguages([])
    setFunctions([])
    setFavoriteFilter('all')
  }

  const clearSheetFilters = () => {
    setTools([])
    setLanguages([])
    setFunctions([])
    setFavoriteFilter('all')
  }

  return {
    search,
    setSearch,
    tools,
    languages,
    functions,
    toggleTool,
    toggleLanguage,
    toggleFunction,
    language,
    setLanguage,
    tool,
    setTool,
    secondary,
    setSecondary,
    favoriteFilter,
    setFavoriteFilter,
    availableSecondary,
    filtered,
    totalCount: commands.length,
    resetFilters,
    clearSheetFilters,
    getDisplayCommand,
  }
}
