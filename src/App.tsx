import { CategoryFilters } from './components/CategoryFilters'
import { CommandGrid } from './components/CommandGrid'
import { CommandSearch } from './components/CommandSearch'
import { PageHeader } from './components/PageHeader'
import { useClipboard } from './hooks/useClipboard'
import { useCommandFilter } from './hooks/useCommandFilter'
import { useFavorites } from './hooks/useFavorites'
import { getCopyText } from './lib/getCopyText'
import type { Command } from './types/command'

function App() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()

  const {
    search,
    setSearch,
    language,
    setLanguage,
    tool,
    setTool,
    secondary,
    setSecondary,
    favoriteFilter,
    setFavoriteFilter,
    availableSecondary,
    filtered,
    resetFilters,
    getDisplayCommand,
  } = useCommandFilter(favoriteIds)

  const { copiedId, error, copy, clearError } = useClipboard()

  const handleCopy = (command: Command) => {
    void copy(command.id, getCopyText(command))
  }

  const handleReset = () => {
    resetFilters()
    clearError()
  }

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-page" />
        <div className="absolute top-[-12%] left-1/2 h-[320px] w-[min(820px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14),transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_72%)]" />
      </div>

      <main className="mx-auto w-full max-w-[1680px] px-3 pt-8 pb-14 sm:px-6 sm:pt-10 lg:px-8">
        <PageHeader />

        <section className="animate-fade-up animation-delay-1 relative z-30 mt-6 sm:mt-8">
          <div className="flex flex-col gap-2 min-[1100px]:flex-row min-[1100px]:items-center">
            <CommandSearch
              value={search}
              onChange={setSearch}
              resultCount={filtered.length}
              className="min-w-0 flex-1"
            />
            <CategoryFilters
              language={language}
              onLanguageChange={setLanguage}
              tool={tool}
              onToolChange={setTool}
              secondary={secondary}
              onSecondaryChange={setSecondary}
              favoriteFilter={favoriteFilter}
              onFavoriteFilterChange={setFavoriteFilter}
              availableSecondary={availableSecondary}
              className="w-full min-[1100px]:w-auto"
            />
          </div>
        </section>

        {error ? (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
          >
            {error}
          </div>
        ) : null}

        <section className="mt-5 sm:mt-6" aria-label="Command results">
          <CommandGrid
            commands={filtered}
            copiedId={copiedId}
            isFavorite={isFavorite}
            onCopy={handleCopy}
            onToggleFavorite={toggleFavorite}
            getDisplayCommand={getDisplayCommand}
            onReset={handleReset}
          />
        </section>
      </main>
    </div>
  )
}

export default App
