export function PageHeader() {
  return (
    <header className="animate-fade-up mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-medium tracking-[0.14em] text-accent uppercase">
        Command Library
      </p>
      <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Commands, Simplified.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
        Your go-to collection of commands for GitHub, Cursor, Claude, Codex, and
        VS Code. Find what you need, copy it, and get back to building.
      </p>
    </header>
  )
}
