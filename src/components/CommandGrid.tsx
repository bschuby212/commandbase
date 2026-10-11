import { CommandCard } from './CommandCard'
import { EmptyState } from './EmptyState'
import type { Command } from '../types/command'

type CommandGridProps = {
  commands: Command[]
  copiedId: string | null
  isFavorite: (id: string) => boolean
  onCopy: (command: Command) => void
  onToggleFavorite: (id: string) => void
  getDisplayCommand: (command: Command) => string
  onReset: () => void
}

export function CommandGrid({
  commands,
  copiedId,
  isFavorite,
  onCopy,
  onToggleFavorite,
  getDisplayCommand,
  onReset,
}: CommandGridProps) {
  if (commands.length === 0) {
    return <EmptyState onReset={onReset} />
  }

  return (
    <div className="grid grid-cols-1 gap-3 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-3 min-[1440px]:grid-cols-4">
      {commands.map((command, index) => (
        <div
          key={command.id}
          className="animate-fade-up h-full min-w-0"
          style={{ animationDelay: `${Math.min(index, 8) * 40 + 120}ms` }}
        >
          <CommandCard
            command={command}
            displayCommand={getDisplayCommand(command)}
            copied={copiedId === command.id}
            favorited={isFavorite(command.id)}
            onCopy={() => onCopy(command)}
            onToggleFavorite={() => onToggleFavorite(command.id)}
          />
        </div>
      ))}
    </div>
  )
}
