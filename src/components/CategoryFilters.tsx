import { useMemo, useState } from 'react'
import {
  FunctionFieldIcon,
  LanguageFieldIcon,
  LanguageIcon,
  ProgramIcon,
  ToolFieldIcon,
} from './FilterIcons'
import { FavoritesSyncButton } from './FavoritesSyncButton'
import { FilterBottomSheet } from './FilterBottomSheet'
import { FilterDropdown } from './FilterDropdown'
import {
  FUNCTION_DESCRIPTIONS,
  LANGUAGE_DESCRIPTIONS,
  LANGUAGE_FILTERS,
  PROGRAM_FILTERS,
  TOOL_DESCRIPTIONS,
} from '../lib/platformLabels'
import type {
  CommandLanguage,
  FavoriteFilter,
  LanguageFilter,
  Platform,
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
  favoriteIds: Set<string>
  favoriteCount: number
  availableSecondary: SecondaryCategory[]
  tools: Platform[]
  languages: CommandLanguage[]
  functions: SecondaryCategory[]
  onToggleTool: (value: Platform) => void
  onToggleLanguage: (value: CommandLanguage) => void
  onToggleFunction: (value: SecondaryCategory) => void
  onClearSheetFilters: () => void
  className?: string
  mobileOnly?: boolean
  desktopOnly?: boolean
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
  favoriteIds,
  favoriteCount,
  availableSecondary,
  tools,
  languages,
  functions,
  onToggleTool,
  onToggleLanguage,
  onToggleFunction,
  onClearSheetFilters,
  className = '',
  mobileOnly = false,
  desktopOnly = false,
}: CategoryFiltersProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const functionValue: FunctionFilter = secondary ?? 'all'
  const favoritesOn = favoriteFilter === 'favorites'
  const favoritesLabel =
    favoriteCount > 0 ? `Favorites (${favoriteCount})` : 'Favorites'

  const toolOptions = useMemo(
    () =>
      PROGRAM_FILTERS.map((filter) => ({
        id: filter.id,
        label: filter.id === 'all' ? 'All tools' : filter.label,
        description:
          filter.id === 'all' ? undefined : TOOL_DESCRIPTIONS[filter.id],
        icon: <ProgramIcon platform={filter.id} />,
      })),
    [],
  )

  const languageOptions = useMemo(
    () =>
      LANGUAGE_FILTERS.map((filter) => ({
        id: filter.id,
        label: filter.id === 'all' ? 'All languages' : filter.label,
        description:
          filter.id === 'all' ? undefined : LANGUAGE_DESCRIPTIONS[filter.id],
        icon: <LanguageIcon language={filter.id} />,
      })),
    [],
  )

  const functionOptions: {
    id: FunctionFilter
    label: string
    description?: string
  }[] = [
    { id: 'all', label: 'All functions' },
    ...availableSecondary.map((item) => ({
      id: item,
      label: item,
      description: FUNCTION_DESCRIPTIONS[item],
    })),
  ]

  const activeCount =
    tools.length +
    languages.length +
    functions.length +
    (favoritesOn ? 1 : 0)

  const showMobile = !desktopOnly
  const showDesktop = !mobileOnly
  const showSheet = showMobile

  return (
    <>
      {showMobile ? (
        <div className={`relative z-30 flex w-full items-center gap-2 ${className}`}>
          <div className="toolbar-shell min-w-0 flex-1">
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
          <FavoritesSyncButton favoriteIds={favoriteIds} />
        </div>
      ) : null}

      {showDesktop ? (
        <div className={`relative z-30 items-center gap-2 ${className}`}>
          <FilterDropdown
            label="Tool"
            value={tool}
            options={toolOptions}
            onChange={onToolChange}
            leadingIcon={<ToolFieldIcon />}
            className="min-w-0 flex-1 basis-0"
          />
          <FilterDropdown
            label="Language"
            value={language}
            options={languageOptions}
            onChange={onLanguageChange}
            leadingIcon={<LanguageFieldIcon />}
            className="min-w-0 flex-1 basis-0"
          />
          <FilterDropdown
            label="Function"
            value={functionValue}
            options={functionOptions}
            onChange={(next) => onSecondaryChange(next === 'all' ? null : next)}
            leadingIcon={<FunctionFieldIcon />}
            className="min-w-0 flex-1 basis-0"
          />
          <div
            className="toolbar-shell shrink-0"
            data-tone={favoritesOn ? 'favorite' : undefined}
          >
            <button
              type="button"
              aria-pressed={favoritesOn}
              aria-label={
                favoritesOn
                  ? 'Show all commands'
                  : `Show favorites only${favoriteCount > 0 ? `, ${favoriteCount} saved` : ''}`
              }
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
              <span>{favoritesLabel}</span>
            </button>
          </div>
          <FavoritesSyncButton favoriteIds={favoriteIds} />
        </div>
      ) : null}

      {showSheet ? (
        <FilterBottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          toolOptions={toolOptions}
          selectedTools={tools}
          onToggleTool={onToggleTool}
          languageOptions={languageOptions}
          selectedLanguages={languages}
          onToggleLanguage={onToggleLanguage}
          functionOptions={functionOptions}
          selectedFunctions={functions}
          onToggleFunction={onToggleFunction}
          favoritesOn={favoritesOn}
          favoriteCount={favoriteCount}
          favoriteIds={favoriteIds}
          onFavoritesToggle={() =>
            onFavoriteFilterChange(favoritesOn ? 'all' : 'favorites')
          }
          hasActiveFilters={activeCount > 0}
          onClear={onClearSheetFilters}
        />
      ) : null}
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
