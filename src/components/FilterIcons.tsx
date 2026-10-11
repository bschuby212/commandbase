import type { ReactNode } from 'react'
import type { CommandLanguage, PrimaryFilter } from '../types/command'

type IconProps = { className?: string }

function LinesIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 3.5h10M2 7h10M2 10.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function GitIcon({ className }: IconProps) {
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
      <path d="M3 2.5 11 7 6.2 8.1 4.8 12.5 3 2.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
    </svg>
  )
}

function ClaudeIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2.2 11.3 11.2H2.7L7 2.2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
    </svg>
  )
}

function CodexIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.35" />
      <path d="M5.1 7h3.8M7 5.1v3.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
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

function ShellIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.75" y="2.5" width="10.5" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.35" />
      <path d="M4 6.2 5.6 7.5 4 8.8M7.2 9.2h2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function JsIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5.2 3.2v6.2c0 1.1-.5 1.6-1.5 1.6-.4 0-.8-.1-1.1-.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M7.2 8.4c.3.7.9 1.2 1.9 1.2 1 0 1.7-.5 1.7-1.3 0-.8-.5-1.1-1.5-1.5l-.5-.2c-1.3-.5-2.1-1.2-2.1-2.5C6.7 2.8 7.7 2 9.1 2c.9 0 1.6.3 2.1.9" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  )
}

function PythonIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 1.8c-2 0-2.3.9-2.3 2.1v1.4h4.5c.9 0 1.6.7 1.6 1.6v.2H7.3C5 7.1 3.6 8 3.6 10.1c0 2 1.2 3.1 3.4 3.1 2 0 2.4-.8 2.4-2.1V9.6H5.2c-.9 0-1.6-.7-1.6-1.6v-.2h6.1c2.2 0 3.1-1 3.1-3 0-2.1-1.1-3-3.4-3H7Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DockerIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1.8 8.2h10.4c0 1.8-1.5 3.2-3.8 3.2-1.7 0-2.7-.6-3.4-1.4-.7.2-1.5.1-2.1-.3-.4-.3-.7-.7-.8-1.2.1 0 .2 0 .3.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3 7.2h1.2V5.4H3v1.8Zm1.8 0h1.2V5.4H4.8v1.8Zm1.8 0h1.2V5.4H6.6v1.8Zm1.8 0h1.2V5.4H8.4v1.8ZM4.8 5h1.2V3.2H4.8V5Zm1.8 0h1.2V3.2H6.6V5Z" stroke="currentColor" strokeWidth="1.05" />
    </svg>
  )
}

function EditorIcon({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3.2h8v7.6H3V3.2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
      <path d="M5 6.2h4M5 8.2h2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

const PROGRAM_ICONS: Record<PrimaryFilter, (props: IconProps) => ReactNode> = {
  all: LinesIcon,
  github: GitIcon,
  cursor: CursorIcon,
  claude: ClaudeIcon,
  codex: CodexIcon,
  vscode: VsCodeIcon,
}

const LANGUAGE_ICONS: Record<'all' | CommandLanguage, (props: IconProps) => ReactNode> = {
  all: LinesIcon,
  git: GitIcon,
  shell: ShellIcon,
  javascript: JsIcon,
  python: PythonIcon,
  docker: DockerIcon,
  editor: EditorIcon,
}

export function ProgramIcon({
  platform,
  className,
}: {
  platform: PrimaryFilter
  className?: string
}) {
  const Icon = PROGRAM_ICONS[platform]
  return <Icon className={className} />
}

export function LanguageIcon({
  language,
  className,
}: {
  language: 'all' | CommandLanguage
  className?: string
}) {
  const Icon = LANGUAGE_ICONS[language]
  return <Icon className={className} />
}
