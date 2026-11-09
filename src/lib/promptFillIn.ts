import type { Command } from '../types/command'

/** Shown on cards when a prompt expects user-specific context. */
export const FILL_IN_CHIP = 'Fill in first'

export const FILL_IN_HINT =
  'Name one specific product, screen, or feature before pasting — results are much better.'

const FILL_BLOCK_RE = /FILL THIS IN BEFORE PASTING/i

/** True when the copied text includes a fill-in block the user must complete. */
export function commandNeedsFillIn(command: Command): boolean {
  if (command.needsFillIn === true) return true
  if (command.needsFillIn === false) return false
  if (typeof command.command !== 'string' || !command.command) return false
  return FILL_BLOCK_RE.test(command.command)
}

/** Standard fill-in header. Keep fields short — one specific thing beats a novel. */
export function fillInHeader(fields: string[]): string {
  const body = fields.map((field) => `${field}\n`).join('')
  return `══════════════════════════════════════
FILL THIS IN BEFORE PASTING
══════════════════════════════════════
${body}══════════════════════════════════════

`
}
