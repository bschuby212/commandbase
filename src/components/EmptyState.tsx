type EmptyStateProps = {
  onReset: () => void
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div
      className="animate-fade-up flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/70 px-6 py-16 text-center"
      role="status"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-ink-subtle">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M10 17.5A7.5 7.5 0 1 0 10 2.5a7.5 7.5 0 0 0 0 15ZM19.5 19.5 15.8 15.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-ink">No commands match</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
        Try a different search term, or clear filters to browse the full library.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ink/90 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
      >
        Reset filters
      </button>
    </div>
  )
}
