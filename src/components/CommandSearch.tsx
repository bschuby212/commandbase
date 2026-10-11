type CommandSearchProps = {
  value: string
  onChange: (value: string) => void
  resultCount: number
}

export function CommandSearch({
  value,
  onChange,
  resultCount,
}: CommandSearchProps) {
  return (
    <div className="animate-fade-up animation-delay-1 w-full">
      <label htmlFor="command-search" className="sr-only">
        Search commands
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-ink-subtle"
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
          placeholder="Search by name, description, syntax, or keyword…"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-xl border border-border bg-surface py-3 pr-16 pl-11 text-[16px] text-ink shadow-sm outline-none transition placeholder:text-ink-subtle focus:border-accent/40 focus:ring-4 focus:ring-accent/10 sm:py-3.5 sm:pr-20 sm:pl-12 sm:text-base"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-ink-muted" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'command' : 'commands'}
      </p>
    </div>
  )
}
