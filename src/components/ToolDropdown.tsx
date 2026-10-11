import { useEffect, useId, useRef, useState } from 'react'
import { ProgramIcon } from './FilterIcons'
import { PLATFORM_LABELS, PROGRAM_FILTERS } from '../lib/platformLabels'
import type { PrimaryFilter } from '../types/command'

type ToolDropdownProps = {
  value: PrimaryFilter
  onChange: (value: PrimaryFilter) => void
}

export function ToolDropdown({ value, onChange }: ToolDropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const selected = PROGRAM_FILTERS.find((filter) => filter.id === value) ?? PROGRAM_FILTERS[0]
  const label = value === 'all' ? 'All tools' : PLATFORM_LABELS[value]

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 text-sm font-medium text-ink ring-1 ring-border transition hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
      >
        <ProgramIcon platform={selected.id} />
        <span className="max-w-[9rem] truncate sm:max-w-none">{label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`text-ink-subtle transition ${open ? 'rotate-180' : ''}`}
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

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Tool"
          className="absolute top-[calc(100%+0.35rem)] right-0 z-50 min-w-[12.5rem] overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
        >
          {PROGRAM_FILTERS.map((filter) => {
            const active = filter.id === value
            const optionLabel = filter.id === 'all' ? 'All tools' : filter.label
            return (
              <li key={filter.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(filter.id)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition focus-visible:bg-surface-muted focus-visible:outline-none ${
                    active
                      ? 'bg-accent/10 font-medium text-accent'
                      : 'text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`}
                >
                  <ProgramIcon platform={filter.id} />
                  <span>{optionLabel}</span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
