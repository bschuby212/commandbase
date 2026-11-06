import { useEffect, useId, useRef, type ReactNode } from 'react'
import type { FilterOption } from './FilterDropdown'

type FilterBottomSheetProps = {
  open: boolean
  onClose: () => void
  toolOptions: FilterOption<string>[]
  tool: string
  onToolChange: (value: string) => void
  languageOptions: FilterOption<string>[]
  language: string
  onLanguageChange: (value: string) => void
  functionOptions: FilterOption<string>[]
  functionValue: string
  onFunctionChange: (value: string) => void
  favoritesOn: boolean
  onFavoritesToggle: () => void
  onClear: () => void
  activeCount: number
}

export function FilterBottomSheet({
  open,
  onClose,
  toolOptions,
  tool,
  onToolChange,
  languageOptions,
  language,
  onLanguageChange,
  functionOptions,
  functionValue,
  onFunctionChange,
  favoritesOn,
  onFavoritesToggle,
  onClear,
  activeCount,
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

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] min-[1100px]:hidden"
      role="presentation"
      onPointerDown={(event) => {
        // Tap/click outside the sheet closes it.
        if (
          panelRef.current &&
          !panelRef.current.contains(event.target as Node)
        ) {
          onClose()
        }
      }}
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet-up absolute inset-x-0 bottom-0 flex max-h-[min(88dvh,40rem)] flex-col rounded-t-2xl border border-border bg-surface shadow-[0_-16px_48px_rgba(15,23,42,0.18)]"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col items-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-border-strong" aria-hidden="true" />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold tracking-tight text-ink">
              Filters
            </h2>
            <p className="text-xs text-ink-muted">
              {activeCount > 0
                ? `${activeCount} active · tap again to clear`
                : 'Tap to select · tap again to clear'}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {activeCount > 0 ? (
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
              options={toolOptions}
              value={tool}
              onChange={onToolChange}
              clearValue="all"
            />
          </SheetSection>

          <SheetSection label="Language">
            <OptionList
              options={languageOptions}
              value={language}
              onChange={onLanguageChange}
              clearValue="all"
            />
          </SheetSection>

          <SheetSection label="Function">
            <OptionList
              options={functionOptions}
              value={functionValue}
              onChange={onFunctionChange}
              clearValue="all"
            />
          </SheetSection>

          <SheetSection label="Favorites">
            <button
              type="button"
              aria-pressed={favoritesOn}
              onClick={onFavoritesToggle}
              className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none ${
                favoritesOn
                  ? 'border-ink bg-ink text-page'
                  : 'border-border bg-surface text-ink hover:bg-surface-muted'
              }`}
            >
              <span className="inline-flex items-center gap-2">
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
                Favorites only
              </span>
              <span className="text-xs opacity-70">
                {favoritesOn ? 'On · tap to clear' : 'Off'}
              </span>
            </button>
          </SheetSection>
        </div>
      </div>
    </div>
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
      <h3 className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-ink-subtle uppercase">
        {label}
      </h3>
      {children}
    </section>
  )
}

function OptionList({
  options,
  value,
  onChange,
  clearValue,
}: {
  options: FilterOption<string>[]
  value: string
  onChange: (value: string) => void
  clearValue: string
}) {
  return (
    <ul className="overflow-hidden rounded-xl border border-border">
      {options.map((option, index) => {
        const active = option.id === value
        return (
          <li
            key={option.id}
            className={index > 0 ? 'border-t border-border' : undefined}
          >
            <button
              type="button"
              aria-pressed={active}
              onClick={() => {
                // Tap selects; tap the active choice again clears back to "all".
                if (active && option.id !== clearValue) {
                  onChange(clearValue)
                  return
                }
                onChange(option.id)
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition focus-visible:bg-surface-muted focus-visible:outline-none active:bg-surface-muted ${
                active
                  ? 'bg-accent/10 font-medium text-accent'
                  : 'text-ink hover:bg-surface-muted'
              }`}
            >
              {option.icon ? (
                <span className="shrink-0 text-current opacity-80">{option.icon}</span>
              ) : null}
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {active ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M3.5 8.5 6.5 11.5 12.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
