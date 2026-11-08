import type { Command } from '../types/command'

export function detectShortcutOs(): 'mac' | 'windows' {
  if (typeof navigator === 'undefined') return 'windows'
  const platform = navigator.platform?.toLowerCase() ?? ''
  const ua = navigator.userAgent?.toLowerCase() ?? ''
  if (platform.includes('mac') || ua.includes('mac')) return 'mac'
  return 'windows'
}

/** Lines that are scaffolding, not useful card preview text. */
function isPromptPreviewNoise(line: string): boolean {
  if (!line) return true
  // Box-drawing / rule separators from fill-in headers
  if (/^[═=\-─_•\s]+$/.test(line)) return true
  if (/^FILL THIS IN\b/i.test(line)) return true
  // Empty fill-in fields like "What's broken: "
  if (/^[^:]{1,80}:\s*$/.test(line)) return true
  // Short parenthetical hints inside the fill-in block
  if (/^\(.*\)\s*$/.test(line) && line.length < 160) return true
  return false
}

/**
 * Drop the leading "FILL THIS IN BEFORE PASTING" block so cards preview
 * real instruction text. Copied text still includes the full prompt.
 */
function stripLeadingFillInBlock(text: string): string {
  const lines = text.trim().split(/\n/)
  if (!/^[═=]+$/.test(lines[0]?.trim() ?? '')) return text.trim()

  let separators = 0
  let i = 0
  while (i < lines.length) {
    const trimmed = lines[i].trim()
    if (/^[═=]+$/.test(trimmed)) {
      separators += 1
      i += 1
      if (separators >= 3) break
      continue
    }
    i += 1
  }

  while (i < lines.length && !lines[i].trim()) i += 1
  return lines.slice(i).join('\n').trim() || text.trim()
}

/** Short card preview for long AI prompts — never truncates copied text. */
export function getPromptPreview(text: string, maxLength = 96): string {
  const firstLine =
    stripLeadingFillInBlock(text)
      .split(/\n/)
      .map((line) => line.trim())
      .find((line) => !isPromptPreviewNoise(line)) ?? ''

  if (!firstLine) {
    return '…'
  }

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
