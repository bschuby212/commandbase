import { CommandCard } from './CommandCard'
import { EmptyState } from './EmptyState'
import type { Command } from '../types/command'

type CommandGridProps = {
  commands: Command[]
  copiedId: string | null
  onCopy: (command: Command) => void
  getDisplayCommand: (command: Command) => string
  onReset: () => void
}

export function CommandGrid({
  commands,
  copiedId,
  onCopy,
  getDisplayCommand,
  onReset,
}: CommandGridProps) {
  if (commands.length === 0) {
    return <EmptyState onReset={onReset} />
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
            onCopy={() => onCopy(command)}
          />
        </div>
      ))}
    </div>
  )
}
