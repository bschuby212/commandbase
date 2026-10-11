import type { ReactNode } from 'react'
import type { PrimaryFilter } from '../types/command'

type IconProps = {
  className?: string
}

function AllIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 3.5h10M2 7h10M2 10.5h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5.25 10.5 2.5 7.75 5.25 5M8.75 5 11.5 7.75 8.75 10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CursorIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3 2.5 11 7 6.2 8.1 4.8 12.5 3 2.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClaudeIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 2.2 11.3 11.2H2.7L7 2.2Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CodexIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M5.1 7h3.8M7 5.1v3.8"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  )
}

function VsCodeIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5.2 9.2 2.4 7.1l2.8-2.1M8.8 4.2 11.6 7l-2.8 2.8M5.8 11.4 9.3 2.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ICONS: Record<PrimaryFilter, (props: IconProps) => ReactNode> = {
  all: AllIcon,
  github: GitHubIcon,
  cursor: CursorIcon,
  claude: ClaudeIcon,
  codex: CodexIcon,
  vscode: VsCodeIcon,
}

export function PlatformIcon({
  platform,
  className,
}: {
  platform: PrimaryFilter
  className?: string
}) {
  const Icon = ICONS[platform]
  return <Icon className={className} />
}
