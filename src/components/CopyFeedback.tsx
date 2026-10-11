type CopyFeedbackProps = {
  visible: boolean
}

export function CopyFeedback({ visible }: CopyFeedbackProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${
        visible
          ? 'translate-y-0 text-accent opacity-100'
          : 'pointer-events-none translate-y-0.5 text-ink-muted opacity-0'
      }`}
      aria-live="polite"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3.5 8.5L6.5 11.5L12.5 4.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Copied!
    </span>
  )
}
