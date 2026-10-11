type ThemeToggleProps = {
  isDark: boolean
  onToggle: () => void
  className?: string
}

export function ThemeToggle({
  isDark,
  onToggle,
  className = '',
}: ThemeToggleProps) {
  return (
    <div className={`toolbar-shell shrink-0 ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="toolbar-shell-button justify-center gap-2 px-2.5 text-sm font-medium text-ink focus-visible:outline-none"
      >
        {isDark ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle
              cx="8"
              cy="8"
              r="3.25"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M8 1.5v1.4M8 13.1v1.4M1.5 8h1.4M13.1 8h1.4M3.4 3.4l1 1M11.6 11.6l1 1M12.6 3.4l-1 1M4.4 11.6l-1 1"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M13.2 9.6A5.6 5.6 0 1 1 6.4 2.8a4.4 4.4 0 1 0 6.8 6.8Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
      </button>
    </div>
  )
}
