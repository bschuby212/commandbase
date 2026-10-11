import {
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
  const favoritesOn = favoriteFilter === 'favorites'

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
      <button
        type="button"
        aria-pressed={favoritesOn}
        aria-label={favoritesOn ? 'Show all commands' : 'Show favorites only'}
        onClick={() =>
          onFavoriteFilterChange(favoritesOn ? 'all' : 'favorites')
        }
        className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-2.5 text-sm font-medium shadow-sm ring-1 transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
          favoritesOn
            ? 'bg-favorite/10 text-favorite ring-favorite/30'
            : 'bg-surface text-ink ring-border hover:bg-surface-muted'
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M7.5 12.6S2.4 9.4 2.4 5.9A2.85 2.85 0 0 1 7.5 4.3 2.85 2.85 0 0 1 12.6 5.9c0 3.5-5.1 6.7-5.1 6.7Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
            fill={favoritesOn ? 'currentColor' : 'none'}
          />
        </svg>
        <span>Favorites</span>
      </button>
    </div>
  )
}
