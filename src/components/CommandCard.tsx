import { useId, type KeyboardEvent } from 'react'
import { CopyFeedback } from './CopyFeedback'
import { LANGUAGE_LABELS, PLATFORM_LABELS, TYPE_LABELS } from '../lib/platformLabels'
import type { Command } from '../types/command'

type CommandCardProps = {
  command: Command
  displayCommand: string
  copied: boolean
  onCopy: () => void
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 6V4.5A1.5 1.5 0 0 0 10.5 3H4.5A1.5 1.5 0 0 0 3 4.5v6A1.5 1.5 0 0 0 4.5 12H6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function CommandCard({
  command,
  displayCommand,
  copied,
  onCopy,
}: CommandCardProps) {
  const descriptionId = useId()

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onCopy()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-describedby={descriptionId}
      aria-label={`Copy command: ${command.title}`}
      onClick={onCopy}
      onKeyDown={handleKeyDown}
      className="group relative flex h-full min-w-0 cursor-pointer flex-col rounded-xl border border-border bg-surface p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition duration-150 hover:-translate-y-px hover:border-border-strong hover:shadow-[0_6px_16px_rgba(15,23,42,0.05)] focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
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
        <span
          className={`mt-0.5 shrink-0 rounded-md p-1 transition ${
            copied
              ? 'bg-accent/10 text-accent'
              : 'text-ink-subtle group-hover:bg-surface-muted group-hover:text-ink'
          }`}
          aria-hidden="true"
        >
          {copied ? (
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 9.5L7.5 13L14 5.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <CopyIcon />
          )}
        </span>
      </div>

      <div className="mt-auto min-w-0">
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

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <p className="min-w-0 truncate text-[11px] text-ink-subtle">
            <span className="text-ink-muted">{LANGUAGE_LABELS[command.language]}</span>
            <span aria-hidden="true"> · </span>
            <span>{PLATFORM_LABELS[command.platform]}</span>
            <span aria-hidden="true"> · </span>
            <span>{command.category}</span>
            {command.type !== 'terminal' ? (
              <>
                <span aria-hidden="true"> · </span>
                <span>{TYPE_LABELS[command.type]}</span>
              </>
            ) : null}
          </p>
          <CopyFeedback visible={copied} />
        </div>
      </div>
    </div>
  )
}
