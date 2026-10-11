import { useId, type KeyboardEvent, type MouseEvent } from 'react'
import { CopyIconButton } from './CopyIconButton'
import { FavoriteButton } from './FavoriteButton'
import { LANGUAGE_LABELS } from '../lib/platformLabels'
import type { Command } from '../types/command'

type CommandCardProps = {
  command: Command
  displayCommand: string
  copied: boolean
  favorited: boolean
  onCopy: () => void
  onToggleFavorite: () => void
}

export function CommandCard({
  command,
  displayCommand,
  copied,
  favorited,
  onCopy,
  onToggleFavorite,
}: CommandCardProps) {
  const descriptionId = useId()

  const handleActivate = () => {
    onCopy()
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    handleActivate()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleActivate()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-describedby={descriptionId}
      aria-label={`Copy command: ${command.title}`}
      aria-pressed={copied}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex h-full min-w-0 cursor-pointer flex-col rounded-xl border bg-surface p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-150 select-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none dark:border-transparent dark:shadow-[0_1px_2px_rgba(0,0,0,0.35)] dark:hover:border-transparent ${
        copied
          ? 'border-success/35 shadow-[0_0_0_1px_rgba(22,163,74,0.12)] dark:border-transparent dark:shadow-[0_0_0_1px_rgba(74,222,128,0.28)]'
          : 'border-border hover:-translate-y-px hover:border-border-strong hover:shadow-[0_6px_16px_rgba(15,23,42,0.05)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.35)]'
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="pointer-events-none min-w-0 flex-1">
          <h3 className="line-clamp-1 text-sm leading-5 font-semibold tracking-tight text-ink">
            {command.title}
          </h3>
          <p
            id={descriptionId}
            className="mt-0.5 line-clamp-2 min-h-8 text-xs leading-4 text-ink-muted"
          >
            {command.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <FavoriteButton
            favorited={favorited}
            onToggle={onToggleFavorite}
            title={command.title}
          />
          <span className="pointer-events-none">
            <CopyIconButton copied={copied} />
          </span>
        </div>
      </div>

      <pre className="pointer-events-none flex min-h-[3rem] max-w-full items-center overflow-x-auto rounded-lg bg-code-bg px-2.5 py-2 font-mono text-[12px] leading-snug text-code-text whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
        <code>{displayCommand}</code>
      </pre>

      <div className="pointer-events-none mt-auto flex min-w-0 flex-wrap gap-1 pt-2.5">
        {[LANGUAGE_LABELS[command.language], command.category].map((label) => (
          <span
            key={label}
            className="rounded-md bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink-muted"
          >
            {label}
          </span>
        ))}
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  )
}
