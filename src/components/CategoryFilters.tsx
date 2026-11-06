import { useMemo, useState } from 'react'
import {
  FunctionFieldIcon,
  LanguageFieldIcon,
  LanguageIcon,
  ProgramIcon,
  ToolFieldIcon,
} from './FilterIcons'
import { FilterBottomSheet } from './FilterBottomSheet'
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
  const [sheetOpen, setSheetOpen] = useState(false)
  const functionValue: FunctionFilter = secondary ?? 'all'
  const favoritesOn = favoriteFilter === 'favorites'

  const toolOptions = useMemo(
    () =>
      PROGRAM_FILTERS.map((filter) => ({
        id: filter.id,
        label: filter.id === 'all' ? 'All tools' : filter.label,
        icon: <ProgramIcon platform={filter.id} />,
      })),
    [],
  )

  const languageOptions = useMemo(
    () =>
      LANGUAGE_FILTERS.map((filter) => ({
        id: filter.id,
        label: filter.id === 'all' ? 'All languages' : filter.label,
        icon: <LanguageIcon language={filter.id} />,
      })),
    [],
  )

  const functionOptions: { id: FunctionFilter; label: string }[] = [
    { id: 'all', label: 'All functions' },
    ...availableSecondary.map((item) => ({ id: item, label: item })),
  ]

  const activeCount = [
    tool !== 'all',
    language !== 'all',
    secondary !== null,
    favoritesOn,
  ].filter(Boolean).length

  const clearFilters = () => {
    onToolChange('all')
    onLanguageChange('all')
    onSecondaryChange(null)
    onFavoriteFilterChange('all')
  }

  return (
    <>
      {/* Mobile: one Filters control that opens a bottom sheet */}
      <div className={`relative z-30 min-[1040px]:hidden ${className}`}>
        <div className="toolbar-shell">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen(true)}
            className="toolbar-shell-button justify-between gap-2 px-3 text-sm font-medium text-ink focus-visible:outline-none"
          >
            <span className="inline-flex min-w-0 items-center gap-2">
              <FilterGlyph />
              <span>Filters</span>
              {activeCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-[11px] font-semibold text-page tabular-nums">
                  {activeCount}
                </span>
              ) : null}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="shrink-0 text-ink-subtle"
            >
              <path
                d="M3 4.5 6 7.5 9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: inline filter dropdowns */}
      <div
        className={`relative z-30 hidden items-center gap-2 min-[1040px]:flex ${className}`}
      >
        <FilterDropdown
          label="Tool"
          value={tool}
          options={toolOptions}
          onChange={onToolChange}
          leadingIcon={<ToolFieldIcon />}
          className="w-[9.5rem] shrink-0"
        />
        <FilterDropdown
          label="Language"
          value={language}
          options={languageOptions}
          onChange={onLanguageChange}
          leadingIcon={<LanguageFieldIcon />}
          className="w-[11.75rem] shrink-0"
        />
        <FilterDropdown
          label="Function"
          value={functionValue}
          options={functionOptions}
          onChange={(next) => onSecondaryChange(next === 'all' ? null : next)}
          leadingIcon={<FunctionFieldIcon />}
          className="w-[15.5rem] shrink-0"
        />
        <div
          className="toolbar-shell shrink-0"
          data-tone={favoritesOn ? 'favorite' : undefined}
        >
          <button
            type="button"
            aria-pressed={favoritesOn}
            aria-label={favoritesOn ? 'Show all commands' : 'Show favorites only'}
            onClick={() =>
              onFavoriteFilterChange(favoritesOn ? 'all' : 'favorites')
            }
            className={`toolbar-shell-button gap-2 px-2.5 text-sm font-medium focus-visible:outline-none ${
              favoritesOn ? 'text-white' : 'text-ink'
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
      </div>

      <FilterBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        toolOptions={toolOptions}
        tool={tool}
        onToolChange={(value) => onToolChange(value as PrimaryFilter)}
        languageOptions={languageOptions}
        language={language}
        onLanguageChange={(value) => onLanguageChange(value as LanguageFilter)}
        functionOptions={functionOptions}
        functionValue={functionValue}
        onFunctionChange={(value) =>
          onSecondaryChange(value === 'all' ? null : (value as SecondaryCategory))
        }
        favoritesOn={favoritesOn}
        onFavoritesToggle={() =>
          onFavoriteFilterChange(favoritesOn ? 'all' : 'favorites')
        }
        onClear={clearFilters}
        activeCount={activeCount}
      />
    </>
  )
}

function FilterGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-ink-muted"
    >
      <path
        d="M2.25 3.25h10.5M4 7.5h7M6 11.75h3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  )
}
