import { LanguageIcon, ProgramIcon } from './FilterIcons'
import {
  FILTER_MODE_OPTIONS,
  LANGUAGE_FILTERS,
  PROGRAM_FILTERS,
} from '../lib/platformLabels'
import type {
  FilterMode,
  LanguageFilter,
  PrimaryFilter,
  SecondaryCategory,
} from '../types/command'

type CategoryFiltersProps = {
  filterMode: FilterMode
  onFilterModeChange: (value: FilterMode) => void
  program: PrimaryFilter
  onProgramChange: (value: PrimaryFilter) => void
  language: LanguageFilter
  onLanguageChange: (value: LanguageFilter) => void
  secondary: SecondaryCategory | null
  onSecondaryChange: (value: SecondaryCategory | null) => void
  availableSecondary: SecondaryCategory[]
}

export function CategoryFilters({
  filterMode,
  onFilterModeChange,
  program,
  onProgramChange,
  language,
  onLanguageChange,
  secondary,
  onSecondaryChange,
  availableSecondary,
}: CategoryFiltersProps) {
  return (
    <div className="animate-fade-up animation-delay-2 space-y-3">
      <div
        className="inline-flex w-full max-w-full rounded-xl bg-surface-muted p-1 ring-1 ring-border sm:w-auto"
        role="group"
        aria-label="Filter by language or program"
      >
        {FILTER_MODE_OPTIONS.map((option) => {
          const selected = filterMode === option.id
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onFilterModeChange(option.id)}
              className={`min-h-10 flex-1 rounded-lg px-4 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none sm:flex-none sm:px-5 ${
                selected
                  ? 'bg-surface text-ink shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="relative">
        <div
          className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label={filterMode === 'language' ? 'Languages' : 'Programs'}
        >
          {filterMode === 'language'
            ? LANGUAGE_FILTERS.map((filter) => {
                const selected = language === filter.id
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => onLanguageChange(filter.id)}
                    className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
                      selected
                        ? 'bg-ink text-white shadow-sm'
                        : 'bg-surface text-ink-muted ring-1 ring-border hover:bg-surface-muted hover:text-ink'
                    }`}
                  >
                    <LanguageIcon language={filter.id} />
                    <span>{filter.label}</span>
                  </button>
                )
              })
            : PROGRAM_FILTERS.map((filter) => {
                const selected = program === filter.id
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => onProgramChange(filter.id)}
                    className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
                      selected
                        ? 'bg-ink text-white shadow-sm'
                        : 'bg-surface text-ink-muted ring-1 ring-border hover:bg-surface-muted hover:text-ink'
                    }`}
                  >
                    <ProgramIcon platform={filter.id} />
                    <span>{filter.label}</span>
                  </button>
                )
              })}
        </div>
      </div>

      <div
        className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Secondary categories"
      >
        <button
          type="button"
          aria-pressed={secondary === null}
          onClick={() => onSecondaryChange(null)}
          className={`min-h-9 shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
            secondary === null
              ? 'bg-accent/10 text-accent ring-1 ring-accent/25'
              : 'text-ink-muted ring-1 ring-transparent hover:bg-surface-muted hover:text-ink'
          }`}
        >
          All tags
        </button>
        {availableSecondary.map((tag) => {
          const selected = secondary === tag
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={selected}
              onClick={() => onSecondaryChange(selected ? null : tag)}
              className={`min-h-9 shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
                selected
                  ? 'bg-accent/10 text-accent ring-1 ring-accent/25'
                  : 'text-ink-muted ring-1 ring-transparent hover:bg-surface-muted hover:text-ink'
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}
