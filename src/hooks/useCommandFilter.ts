import { useMemo, useState } from 'react'
import { commands } from '../data/commands'
import type {
  Command,
  FilterMode,
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

export function useCommandFilter() {
  const [search, setSearch] = useState('')
  const [filterMode, setFilterMode] = useState<FilterMode>('language')
  const [program, setProgram] = useState<PrimaryFilter>('all')
  const [language, setLanguage] = useState<LanguageFilter>('all')
  const [secondary, setSecondary] = useState<SecondaryCategory | null>(null)

  const handleFilterModeChange = (next: FilterMode) => {
    setFilterMode(next)
    setProgram('all')
    setLanguage('all')
    setSecondary(null)
  }

  const handleProgramChange = (next: PrimaryFilter) => {
    setProgram(next)
    setSecondary(null)
  }

  const handleLanguageChange = (next: LanguageFilter) => {
    setLanguage(next)
    setSecondary(null)
  }

  const handleSecondaryChange = (next: SecondaryCategory | null) => {
    setSecondary(next)
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return commands.filter((command) => {
      if (filterMode === 'program' && program !== 'all' && command.platform !== program) {
        return false
      }
      if (filterMode === 'language' && language !== 'all' && command.language !== language) {
        return false
      }
      if (secondary && command.category !== secondary) return false
      return matchesSearch(command, query)
    })
  }, [filterMode, program, language, secondary, search])

  const availableSecondary = useMemo(() => {
    const pool = commands.filter((command) => {
      if (filterMode === 'program' && program !== 'all' && command.platform !== program) {
        return false
      }
      if (filterMode === 'language' && language !== 'all' && command.language !== language) {
        return false
      }
      return true
    })

    const present = new Set(pool.map((command) => command.category))
    return ALL_SECONDARY.filter((category) => present.has(category))
  }, [filterMode, program, language])

  const resetFilters = () => {
    setSearch('')
    setFilterMode('language')
    setProgram('all')
    setLanguage('all')
    setSecondary(null)
  }

  return {
    search,
    setSearch,
    filterMode,
    setFilterMode: handleFilterModeChange,
    program,
    setProgram: handleProgramChange,
    language,
    setLanguage: handleLanguageChange,
    secondary,
    setSecondary: handleSecondaryChange,
    availableSecondary,
    filtered,
    totalCount: commands.length,
    resetFilters,
    getDisplayCommand,
  }
}
