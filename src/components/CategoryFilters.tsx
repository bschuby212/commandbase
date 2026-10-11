import { LanguageIcon } from './FilterIcons'
import { ToolDropdown } from './ToolDropdown'
import { LANGUAGE_FILTERS } from '../lib/platformLabels'
import type {
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
  availableSecondary: SecondaryCategory[]
}

const chipBase =
  'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none sm:text-sm'

export function CategoryFilters({
  language,
  onLanguageChange,
  tool,
  onToolChange,
  secondary,
  onSecondaryChange,
  availableSecondary,
}: CategoryFiltersProps) {
  return (
    <div className="animate-fade-up animation-delay-2 relative z-30 flex items-center gap-2">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto overscroll-x-contain touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          className="flex shrink-0 items-center gap-1.5"
          role="tablist"
          aria-label="Languages"
        >
          {LANGUAGE_FILTERS.map((filter) => {
            const selected = language === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onLanguageChange(filter.id)}
                className={`${chipBase} ${
                  selected
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-surface text-ink-muted ring-1 ring-border hover:bg-surface-muted hover:text-ink'
                }`}
              >
                <LanguageIcon language={filter.id} />
                <span>{filter.label}</span>
              </button>
            )
          })}
        </div>

        <span
          aria-hidden="true"
          className="mx-0.5 h-5 w-px shrink-0 bg-border"
        />

        <div
          className="flex shrink-0 items-center gap-1.5"
          role="group"
          aria-label="Category tags"
        >
          <button
            type="button"
            aria-pressed={secondary === null}
            onClick={() => onSecondaryChange(null)}
            className={`${chipBase} ${
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
                className={`${chipBase} ${
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

      <ToolDropdown value={tool} onChange={onToolChange} />
    </div>
  )
}
