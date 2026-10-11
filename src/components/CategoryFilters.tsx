import type { ReactNode } from 'react'
import {
  FavoriteFieldIcon,
  FunctionFieldIcon,
  LanguageFieldIcon,
  LanguageIcon,
  ProgramIcon,
  ToolFieldIcon,
} from './FilterIcons'
import { FilterDropdown } from './FilterDropdown'
import { LANGUAGE_FILTERS, PROGRAM_FILTERS } from '../lib/platformLabels'
import type {
  FavoriteFilter,
  LanguageFilter,
  PrimaryFilter,
  SecondaryCategory,
} from '../types/command'

type CategoryFiltersProps = {
  language: LanguageFilter
  onLanguageChange: (value: LanguageFilter) => void
  tool: PrimaryFilter
  onToolChange: (value: PrimaryFilter) => void
  secondary: SecondaryCategory | null
  onSecondaryChange: (value: SecondaryCategory | null) => void
  favoriteFilter: FavoriteFilter
  onFavoriteFilterChange: (value: FavoriteFilter) => void
  availableSecondary: SecondaryCategory[]
  className?: string
}

type FunctionFilter = 'all' | SecondaryCategory

export function CategoryFilters({
  language,
  onLanguageChange,
  tool,
  onToolChange,
  secondary,
  onSecondaryChange,
  favoriteFilter,
  onFavoriteFilterChange,
  availableSecondary,
  className = '',
}: CategoryFiltersProps) {
  const functionValue: FunctionFilter = secondary ?? 'all'

  const toolOptions = PROGRAM_FILTERS.map((filter) => ({
    id: filter.id,
    label: filter.id === 'all' ? 'All tools' : filter.label,
    icon: <ProgramIcon platform={filter.id} />,
  }))

  const languageOptions = LANGUAGE_FILTERS.map((filter) => ({
    id: filter.id,
    label: filter.id === 'all' ? 'All languages' : filter.label,
    icon: <LanguageIcon language={filter.id} />,
  }))

  const functionOptions: { id: FunctionFilter; label: string }[] = [
    { id: 'all', label: 'All functions' },
    ...availableSecondary.map((item) => ({ id: item, label: item })),
  ]

  const favoriteOptions: { id: FavoriteFilter; label: string; icon: ReactNode }[] = [
    { id: 'all', label: 'All commands', icon: <FavoriteFieldIcon /> },
    { id: 'favorites', label: 'Favorites', icon: <FavoriteFieldIcon /> },
  ]

  return (
    <div
      className={`relative z-30 flex min-w-0 items-center gap-2 ${className}`}
    >
      <FilterDropdown
        label="Tool"
        value={tool}
        options={toolOptions}
        onChange={onToolChange}
        leadingIcon={<ToolFieldIcon />}
        className="min-w-0 flex-1 basis-0 min-[1100px]:w-[9.25rem] min-[1100px]:flex-none"
      />
      <FilterDropdown
        label="Language"
        value={language}
        options={languageOptions}
        onChange={onLanguageChange}
        leadingIcon={<LanguageFieldIcon />}
        className="min-w-0 flex-1 basis-0 min-[1100px]:w-[9.25rem] min-[1100px]:flex-none"
      />
      <FilterDropdown
        label="Function"
        value={functionValue}
        options={functionOptions}
        onChange={(next) => onSecondaryChange(next === 'all' ? null : next)}
        leadingIcon={<FunctionFieldIcon />}
        className="min-w-0 flex-1 basis-0 min-[1100px]:w-[9.75rem] min-[1100px]:flex-none"
      />
      <FilterDropdown
        label="Favorite"
        value={favoriteFilter}
        options={favoriteOptions}
        onChange={onFavoriteFilterChange}
        leadingIcon={<FavoriteFieldIcon />}
        align="right"
        className="min-w-0 flex-1 basis-0 min-[1100px]:w-[9.25rem] min-[1100px]:flex-none"
      />
    </div>
  )
}
