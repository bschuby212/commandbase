import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FavoritesSyncButton } from './FavoritesSyncButton'
import type { FilterOption } from './FilterDropdown'
import type {
  CommandLanguage,
  Platform,
  SecondaryCategory,
} from '../types/command'

type FilterBottomSheetProps = {
  open: boolean
  onClose: () => void
  toolOptions: FilterOption<string>[]
  selectedTools: Platform[]
  onToggleTool: (value: Platform) => void
  languageOptions: FilterOption<string>[]
  selectedLanguages: CommandLanguage[]
  onToggleLanguage: (value: CommandLanguage) => void
  functionOptions: FilterOption<string>[]
  selectedFunctions: SecondaryCategory[]
  onToggleFunction: (value: SecondaryCategory) => void
  favoritesOn: boolean
  favoriteCount: number
  favoriteIds: Set<string>
  onFavoritesToggle: () => void
  hasActiveFilters: boolean
  onClear: () => void
}

export function FilterBottomSheet({
  open,
  onClose,
  toolOptions,
  selectedTools,
  onToggleTool,
  languageOptions,
  selectedLanguages,
  onToggleLanguage,
  functionOptions,
  selectedFunctions,
  onToggleFunction,
  favoritesOn,
  favoriteCount,
  favoriteIds,
  onFavoritesToggle,
  hasActiveFilters,
  onClear,
}: FilterBottomSheetProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200]"
      role="presentation"
      onPointerDown={(event) => {
        if (
          panelRef.current &&
          !panelRef.current.contains(event.target as Node)
        ) {
          onClose()
        }
      }}
    >
      <div
        className="fixed inset-0 bg-ink/45 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet-up fixed inset-x-0 bottom-0 z-[201] flex h-[75dvh] w-full flex-col rounded-t-2xl border border-border bg-surface shadow-[0_-16px_48px_rgba(15,23,42,0.22)] min-[640px]:h-[50dvh]"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col items-center pt-2.5 pb-1">
          <div
            className="h-1 w-10 rounded-full bg-border-strong"
            aria-hidden="true"
          />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
          <h2
            id={titleId}
            className="text-lg font-semibold tracking-tight text-ink"
          >
            Filters
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={onClear}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none"
              >
                Clear
              </button>
            ) : null}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-page transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none"
            >
              Done
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <SheetSection label="Tool">
            <OptionList
              options={toolOptions.filter((option) => option.id !== 'all')}
              selectedIds={selectedTools}
              onToggle={(id) => onToggleTool(id as Platform)}
            />
          </SheetSection>

          <SheetSection label="Language">
            <OptionList
              options={languageOptions.filter((option) => option.id !== 'all')}
              selectedIds={selectedLanguages}
              onToggle={(id) => onToggleLanguage(id as CommandLanguage)}
            />
          </SheetSection>

          <SheetSection label="Function">
            <OptionList
              options={functionOptions.filter((option) => option.id !== 'all')}
              selectedIds={selectedFunctions}
              onToggle={(id) => onToggleFunction(id as SecondaryCategory)}
            />
          </SheetSection>

          <SheetSection label="Favorites">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={favoritesOn}
                  title="Only show commands you have favorited."
                  onClick={onFavoritesToggle}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[15px] font-medium transition focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none ${
                    favoritesOn
                      ? 'border-ink bg-ink text-page'
                      : 'border-border bg-surface text-ink hover:bg-surface-muted'
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
                  {favoriteCount > 0
                    ? `Favorites (${favoriteCount})`
                    : 'Favorites'}
                </button>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">
                Favorites sync in the page link. Copy it, then open that link on
                your work or personal computer.
              </p>
              <FavoritesSyncButton favoriteIds={favoriteIds} />
            </div>
          </SheetSection>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function SheetSection({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <section className="mb-5 last:mb-0">
      <h3 className="mb-2.5 text-sm font-semibold tracking-wide text-ink-muted">
        {label}
      </h3>
      {children}
    </section>
  )
}

function OptionList({
  options,
  selectedIds,
  onToggle,
}: {
  options: FilterOption<string>[]
  selectedIds: string[]
  onToggle: (id: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selectedIds.includes(option.id)
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            aria-description={option.description}
            title={option.description}
            onClick={() => onToggle(option.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[15px] font-medium transition focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none ${
              active
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-surface text-ink hover:bg-surface-muted'
            }`}
          >
            {option.icon ? (
              <span className="shrink-0 text-current opacity-80">
                {option.icon}
              </span>
            ) : null}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
