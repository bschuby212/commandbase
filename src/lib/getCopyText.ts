import type { Command } from '../types/command'

export function detectShortcutOs(): 'mac' | 'windows' {
  if (typeof navigator === 'undefined') return 'windows'
  const platform = navigator.platform?.toLowerCase() ?? ''
  const ua = navigator.userAgent?.toLowerCase() ?? ''
  if (platform.includes('mac') || ua.includes('mac')) return 'mac'
  return 'windows'
}

/** Short card preview for long AI prompts — never truncates copied text. */
export function getPromptPreview(text: string, maxLength = 96): string {
  const firstLine =
    text
      .trim()
      .split(/\n/)
      .map((line) => line.trim())
      .find((line) => line.length > 0) ?? ''

  if (firstLine.length <= maxLength) {
    return `${firstLine}…`
  }

  return `${firstLine.slice(0, maxLength).trimEnd()}…`
}

export function getDisplayCommand(
  command: Command,
  os: 'mac' | 'windows' = detectShortcutOs(),
): string {
  if (command.type === 'shortcut' && command.shortcut) {
    return os === 'mac' ? command.shortcut.mac : command.shortcut.windows
  }
  if (command.type === 'prompt') {
    return getPromptPreview(command.command)
  }
  return command.command
}

export function getCopyText(
  command: Command,
  os: 'mac' | 'windows' = detectShortcutOs(),
): string {
  if (command.type === 'prompt') {
    return command.command
  }
  return getDisplayCommand(command, os)
}
