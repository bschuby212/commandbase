type CopyIconButtonProps = {
  copied: boolean
}

export function CopyIconButton({ copied }: CopyIconButtonProps) {
  return (
    <span
      className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors duration-200 ${
        copied
          ? 'bg-success/12 text-success'
          : 'text-ink-subtle group-hover:bg-surface-muted group-hover:text-ink'
      }`}
      aria-hidden="true"
    >
      <span
        className={`absolute inset-0 grid place-items-center transition duration-200 ${
          copied
            ? 'scale-75 opacity-0'
            : 'scale-100 opacity-100'
        }`}
      >
        <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
          <rect
            x="6"
            y="6"
            width="9"
            height="9"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 6V4.5A1.5 1.5 0 0 0 10.5 3H4.5A1.5 1.5 0 0 0 3 4.5v6A1.5 1.5 0 0 0 4.5 12H6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </span>

      <span
        className={`absolute inset-0 grid place-items-center ${
          copied ? 'animate-check-pop opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path
            className={copied ? 'animate-check-draw' : undefined}
            d="M4 9.5L7.5 13L14 5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="24"
            strokeDashoffset={copied ? undefined : 24}
          />
        </svg>
      </span>
    </span>
  )
}
