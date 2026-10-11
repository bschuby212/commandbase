function TerminalEyebrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.75"
        y="2.5"
        width="10.5"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M4 6.2 5.6 7.5 4 8.8M7.2 9.2h2.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PageHeader() {
  return (
    <header className="animate-fade-up mx-auto max-w-3xl text-center">
      <p className="mb-2 flex items-center justify-center gap-1.5 text-[11px] font-medium tracking-[0.14em] text-ink-subtle uppercase sm:mb-3 sm:text-xs">
        <TerminalEyebrowIcon className="shrink-0" />
        Command Library
      </p>
      <h1 className="text-balance text-[2rem] leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
        Commands, Simplified.
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
        Commands for Git, Shell, JavaScript, Python, Cursor, and Claude — find
        what you need, copy it, and get back to building.
      </p>
    </header>
  )
}
