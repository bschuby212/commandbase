import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

export type FilterOption<T extends string> = {
  id: T
  label: string
  description?: string
  icon?: ReactNode
}

type FilterDropdownProps<T extends string> = {
  label: string
  value: T
  options: FilterOption<T>[]
  onChange: (value: T) => void
  leadingIcon: ReactNode
  align?: 'left' | 'right'
  className?: string
}

type TooltipState = {
  text: string
  top: number
  left: number
  place: 'left' | 'right'
}

export function FilterDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  leadingIcon,
  align = 'left',
  className = '',
}: FilterDropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const selected = options.find((option) => option.id === value) ?? options[0]

  useEffect(() => {
    if (!open) {
      setTooltip(null)
      return
    }

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

  const showTooltipFor = (element: HTMLElement, text: string) => {
    const rect = element.getBoundingClientRect()
    const placeRight = rect.left < window.innerWidth / 2
    setTooltip({
      text,
      top: rect.top + rect.height / 2,
      left: placeRight ? rect.right + 10 : rect.left - 10,
      place: placeRight ? 'right' : 'left',
    })
  }

  return (
    <div ref={rootRef} className={`relative min-w-0 ${className}`}>
      <div className={`toolbar-shell ${open ? 'relative z-50' : ''}`}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={label}
          title={selected.description}
          onClick={() => setOpen((current) => !current)}
          className="toolbar-shell-button justify-between gap-1.5 px-2.5 text-sm font-medium text-ink focus-visible:outline-none"
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-ink-muted">{leadingIcon}</span>
            <span className="truncate">{selected.label}</span>
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 text-ink-subtle transition ${open ? 'rotate-180' : ''}`}
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

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={`absolute top-[calc(100%+0.35rem)] z-50 max-h-72 min-w-full overflow-y-auto rounded-xl border border-border bg-surface py-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:min-w-[12.5rem] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          onMouseLeave={() => setTooltip(null)}
        >
          {options.map((option) => {
            const active = option.id === value
            return (
              <li key={option.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  aria-description={option.description}
                  onMouseEnter={(event) => {
                    if (!option.description) {
                      setTooltip(null)
                      return
                    }
                    showTooltipFor(event.currentTarget, option.description)
                  }}
                  onFocus={(event) => {
                    if (!option.description) {
                      setTooltip(null)
                      return
                    }
                    showTooltipFor(event.currentTarget, option.description)
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onBlur={() => setTooltip(null)}
                  onClick={() => {
                    onChange(option.id)
                    setOpen(false)
                    setTooltip(null)
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition focus-visible:bg-surface-muted focus-visible:outline-none ${
                    active
                      ? 'bg-accent/10 font-medium text-accent'
                      : 'text-ink-muted hover:bg-surface-muted hover:text-ink'
                  }`}
                >
                  {option.icon}
                  <span className="truncate">{option.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}

      {tooltip && typeof document !== 'undefined'
        ? createPortal(
            <FilterTooltip
              text={tooltip.text}
              top={tooltip.top}
              left={tooltip.left}
              place={tooltip.place}
            />,
            document.body,
          )
        : null}
    </div>
  )
}

function FilterTooltip({
  text,
  top,
  left,
  place,
}: {
  text: string
  top: number
  left: number
  place: 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    let next = 0
    if (rect.top < 8) next = 8 - rect.top
    if (rect.bottom > window.innerHeight - 8) {
      next = window.innerHeight - 8 - rect.bottom
    }
    setOffsetY(next)
  }, [text, top, left])

  return (
    <div
      ref={ref}
      role="tooltip"
      className="pointer-events-none fixed z-[300] max-w-[16rem] rounded-lg bg-ink px-2.5 py-1.5 text-xs leading-snug text-page shadow-[0_1px_2px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.06)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.25)]"
      style={{
        top,
        left,
        transform:
          place === 'right'
            ? `translateY(calc(-50% + ${offsetY}px))`
            : `translate(-100%, calc(-50% + ${offsetY}px))`,
      }}
    >
      {text}
    </div>
  )
}
