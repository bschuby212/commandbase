import type { MouseEvent } from 'react'

type FavoriteButtonProps = {
  favorited: boolean
  onToggle: () => void
  title: string
}

export function FavoriteButton({
  favorited,
  onToggle,
  title,
}: FavoriteButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onToggle()
  }

  return (
    <button
      type="button"
      aria-label={favorited ? `Unfavorite ${title}` : `Favorite ${title}`}
      aria-pressed={favorited}
      onClick={handleClick}
      className={`pointer-events-auto relative grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none ${
        favorited
          ? 'bg-favorite/10 text-favorite'
          : 'text-ink-subtle hover:bg-surface-muted hover:text-ink'
      }`}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path
          d="M7.5 12.6S2.4 9.4 2.4 5.9A2.85 2.85 0 0 1 7.5 4.3 2.85 2.85 0 0 1 12.6 5.9c0 3.5-5.1 6.7-5.1 6.7Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
          fill={favorited ? 'currentColor' : 'none'}
        />
      </svg>
    </button>
  )
}
