import type { Command } from '../types/command'

/** Shown on cards when a prompt expects user-specific context. */
export const FILL_IN_CHIP = 'Add your details'

export const FILL_IN_HINT =
  'Fill the blank lines before you paste — examples in (parentheses) show what to write, not final answers.'

const FILL_BLOCK_RE = /FILL THIS IN BEFORE PASTING/i

/** True when the copied text includes a fill-in block the user must complete. */
export function commandNeedsFillIn(command: Command): boolean {
  if (command.needsFillIn === true) return true
  if (command.needsFillIn === false) return false
  if (typeof command.command !== 'string' || !command.command) return false
  return FILL_BLOCK_RE.test(command.command)
}

/**
 * Standard fill-in header for designers/PMs.
 * Keep labels short; put examples in parentheses on the next line.
 */
export function fillInHeader(fields: string[]): string {
  const body = fields.map((field) => `${field}\n`).join('')
  return `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
Write plain answers on the blank lines. Text in (parentheses) is just an example — replace it with yours.
══════════════════════════════════════
${body}══════════════════════════════════════

`
}
