import { PRIMARY_FILTERS } from '../lib/platformLabels'
import type { PrimaryFilter, SecondaryCategory } from '../types/command'

type CategoryFiltersProps = {
  primary: PrimaryFilter
  onPrimaryChange: (value: PrimaryFilter) => void
  secondary: SecondaryCategory | null
  onSecondaryChange: (value: SecondaryCategory | null) => void
  availableSecondary: SecondaryCategory[]
}

export function CategoryFilters({
  primary,
  onPrimaryChange,
  secondary,
  onSecondaryChange,
  availableSecondary,
}: CategoryFiltersProps) {
  return (
    <div className="animate-fade-up animation-delay-2 space-y-3">
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Primary categories"
      >
        {PRIMARY_FILTERS.map((filter) => {
          const selected = primary === filter.id
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onPrimaryChange(filter.id)}
              className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
                selected
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-surface text-ink-muted ring-1 ring-border hover:bg-surface-muted hover:text-ink'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Secondary categories"
      >
        <button
          type="button"
          aria-pressed={secondary === null}
          onClick={() => onSecondaryChange(null)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
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
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
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
