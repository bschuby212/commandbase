import { CategoryFilters } from './components/CategoryFilters'
import { CommandGrid } from './components/CommandGrid'
import { CommandSearch } from './components/CommandSearch'
import { PageHeader } from './components/PageHeader'
import { useClipboard } from './hooks/useClipboard'
import { useCommandFilter } from './hooks/useCommandFilter'
import { getCopyText } from './lib/getCopyText'
import type { Command } from './types/command'

function App() {
  const {
    search,
    setSearch,
    primary,
    setPrimary,
    secondary,
    setSecondary,
    availableSecondary,
    filtered,
    getDisplayCommand,
  } = useCommandFilter()

  const { copiedId, error, copy, clearError } = useClipboard()

  const handleCopy = (command: Command) => {
    void copy(command.id, getCopyText(command))
  }

  const handleReset = () => {
    setSearch('')
    setPrimary('all')
    setSecondary(null)
    clearError()
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-page" />
        <div className="absolute top-[-12%] left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14),transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_72%)]" />
      </div>

      <main className="mx-auto w-full max-w-[1160px] px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:px-8">
        <PageHeader />

        <section className="mt-10 space-y-5 sm:mt-12">
          <CommandSearch
            value={search}
            onChange={setSearch}
            resultCount={filtered.length}
          />
          <CategoryFilters
            primary={primary}
            onPrimaryChange={setPrimary}
            secondary={secondary}
            onSecondaryChange={setSecondary}
            availableSecondary={availableSecondary}
          />
        </section>

        {error ? (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
          >
            {error}
          </div>
        ) : null}

        <section className="mt-8" aria-label="Command results">
          <CommandGrid
            commands={filtered}
            copiedId={copiedId}
            onCopy={handleCopy}
            getDisplayCommand={getDisplayCommand}
            onReset={handleReset}
          />
        </section>
      </main>
    </div>
  )
}

export default App
