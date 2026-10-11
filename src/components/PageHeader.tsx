export function PageHeader() {
  return (
    <header className="animate-fade-up mx-auto max-w-3xl text-center">
      <p className="mb-2 text-xs font-medium tracking-[0.14em] text-accent uppercase sm:mb-3 sm:text-sm">
        Command Library
      </p>
      <h1 className="text-balance text-[2rem] leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
        Commands, Simplified.
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
        Your go-to collection of commands for Git, Shell, JavaScript, Python,
        Docker, and your favorite editors. Find what you need, copy it, and get
        back to building.
      </p>
    </header>
  )
}
