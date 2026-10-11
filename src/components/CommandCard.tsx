import { useId, type KeyboardEvent, type MouseEvent } from 'react'
import { CopyIconButton } from './CopyIconButton'
import { LANGUAGE_LABELS, PLATFORM_LABELS, TYPE_LABELS } from '../lib/platformLabels'
import type { Command } from '../types/command'

type CommandCardProps = {
  command: Command
  displayCommand: string
  copied: boolean
  onCopy: () => void
}

export function CommandCard({
  command,
  displayCommand,
  copied,
  onCopy,
}: CommandCardProps) {
  const descriptionId = useId()

  const handleActivate = () => {
    onCopy()
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    // Keep the whole card clickable even when interacting with nested content.
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
      className={`group relative flex h-full min-w-0 cursor-pointer flex-col rounded-xl border bg-surface p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-150 select-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none ${
        copied
          ? 'border-success/35 shadow-[0_0_0_1px_rgba(22,163,74,0.12)]'
          : 'border-border hover:-translate-y-px hover:border-border-strong hover:shadow-[0_6px_16px_rgba(15,23,42,0.05)]'
      }`}
    >
      <div className="pointer-events-none mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-ink">
            {command.title}
          </h3>
          <p
            id={descriptionId}
            className="mt-0.5 text-xs leading-snug text-ink-muted"
          >
            {command.description}
          </p>
        </div>
        <CopyIconButton copied={copied} />
      </div>

      <div className="pointer-events-none mt-auto min-w-0">
        <pre className="max-w-full overflow-x-auto rounded-lg bg-code-bg px-2.5 py-2 font-mono text-[12px] leading-snug text-code-text whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
          <code>{displayCommand}</code>
        </pre>

        {command.notes ? (
          <p className="mt-1.5 text-[11px] leading-snug text-ink-subtle">
            {command.notes}
          </p>
        ) : null}

        {command.destructive ? (
          <p className="mt-1.5 text-[11px] font-medium text-danger">
            Potentially destructive — review before running.
          </p>
        ) : null}

        <div className="mt-2.5 flex min-w-0 flex-wrap gap-1">
          {[
            LANGUAGE_LABELS[command.language],
            PLATFORM_LABELS[command.platform],
            command.category,
            ...(command.type !== 'terminal' ? [TYPE_LABELS[command.type]] : []),
          ].map((label) => (
            <span
              key={label}
              className="rounded-md bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink-subtle"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  )
}
