import { CategoryFilters } from './components/CategoryFilters'
import { CommandGrid } from './components/CommandGrid'
import { CommandSearch } from './components/CommandSearch'
import { PageHeader } from './components/PageHeader'
import { ThemeToggle } from './components/ThemeToggle'
import { useClipboard } from './hooks/useClipboard'
import { useCommandFilter } from './hooks/useCommandFilter'
import { useFavorites } from './hooks/useFavorites'
import { useTheme } from './hooks/useTheme'
import { getCopyText } from './lib/getCopyText'
import type { Command } from './types/command'

function App() {
  const { favoriteIds, favoriteCount, isFavorite, toggleFavorite } =
    useFavorites()
  const { isDark, toggleTheme } = useTheme()

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
    tools,
    languages,
    functions,
    toggleTool,
    toggleLanguage,
    toggleFunction,
    clearSheetFilters,
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

  const filterProps = {
    language,
    onLanguageChange: setLanguage,
    tool,
    onToolChange: setTool,
    secondary,
    onSecondaryChange: setSecondary,
    favoriteFilter,
    onFavoriteFilterChange: setFavoriteFilter,
    favoriteCount,
    availableSecondary,
    tools,
    languages,
    functions,
    onToggleTool: toggleTool,
    onToggleLanguage: toggleLanguage,
    onToggleFunction: toggleFunction,
    onClearSheetFilters: clearSheetFilters,
  }

  return (
    <div className="relative min-h-dvh">
      <div className="page-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="absolute top-3 right-3 z-40 sm:top-5 sm:right-5">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      <main className="mx-auto w-full max-w-[1680px] overflow-x-clip px-3 pt-8 pb-14 sm:px-6 sm:pt-10 lg:px-8">
        <PageHeader />

        <section className="animate-fade-up animation-delay-1 relative z-30 mt-6 sm:mt-8">
          <div className="flex w-full flex-col gap-2">
            <CommandSearch
              value={search}
              onChange={setSearch}
              resultCount={filtered.length}
              className="min-w-0 w-full"
            />
            <CategoryFilters
              {...filterProps}
              className="w-full min-[1024px]:hidden"
              mobileOnly
            />
            <CategoryFilters
              {...filterProps}
              className="hidden w-full min-[1024px]:flex"
              desktopOnly
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
