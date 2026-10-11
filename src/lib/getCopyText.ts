import type { Command } from '../types/command'

export function detectShortcutOs(): 'mac' | 'windows' {
  if (typeof navigator === 'undefined') return 'windows'
  const platform = navigator.platform?.toLowerCase() ?? ''
  const ua = navigator.userAgent?.toLowerCase() ?? ''
  if (platform.includes('mac') || ua.includes('mac')) return 'mac'
  return 'windows'
}

export function getDisplayCommand(
  command: Command,
  os: 'mac' | 'windows' = detectShortcutOs(),
): string {
  if (command.type === 'shortcut' && command.shortcut) {
    return os === 'mac' ? command.shortcut.mac : command.shortcut.windows
  }
  return command.command
}

export function getCopyText(
  command: Command,
  os: 'mac' | 'windows' = detectShortcutOs(),
): string {
  return getDisplayCommand(command, os)
}
