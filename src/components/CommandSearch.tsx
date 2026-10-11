type CommandSearchProps = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function CommandSearch({
  value,
  onChange,
  className = '',
}: CommandSearchProps) {
  return (
    <div className={`relative min-w-0 ${className}`}>
      <label htmlFor="command-search" className="sr-only">
        Search commands
      </label>
      <div className="toolbar-shell relative">
        <svg
          className="pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-ink-subtle"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 15.5A6.5 6.5 0 1 0 9 2.5a6.5 6.5 0 0 0 0 13ZM17.5 17.5 14 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <input
          id="command-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search commands…"
          autoComplete="off"
          spellCheck={false}
          className="toolbar-shell-input px-9 text-[16px] text-ink placeholder:text-ink-subtle sm:text-sm"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  )
}
