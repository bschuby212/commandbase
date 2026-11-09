import { useState } from 'react'
import { buildFavoritesShareUrl } from '../lib/favoriteSync'

type FavoritesSyncButtonProps = {
  favoriteIds: Set<string>
  className?: string
}

export function FavoritesSyncButton({
  favoriteIds,
  className = '',
}: FavoritesSyncButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const count = favoriteIds.size
  const disabled = count === 0

  const handleCopy = async () => {
    if (disabled) return
    const url = buildFavoritesShareUrl(favoriteIds)
    try {
      await navigator.clipboard.writeText(url)
      setStatus('copied')
      window.setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 2500)
    }
  }

  const label =
    status === 'copied'
      ? 'Link copied'
      : status === 'error'
        ? 'Copy failed'
        : 'Copy favorites link'

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      disabled={disabled}
      title={
        disabled
          ? 'Favorite a command first, then copy a link for your other devices.'
          : 'Copy a link that restores these favorites on any computer.'
      }
      aria-label={label}
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-xs font-medium text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M5.6 7.6a2.4 2.4 0 0 0 3.4.2l1.4-1.4a2.4 2.4 0 0 0-3.4-3.4L6.4 3.6M8.4 6.4a2.4 2.4 0 0 0-3.4-.2L3.6 7.6a2.4 2.4 0 0 0 3.4 3.4l.6-.6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="whitespace-nowrap">
        {status === 'copied'
          ? 'Copied — open on other device'
          : status === 'error'
            ? 'Couldn’t copy'
            : 'Sync link'}
      </span>
    </button>
  )
}
