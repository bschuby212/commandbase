import type { Command } from '../types/command'

/** Split a query into lowercase tokens; empty query → no tokens. */
export function tokenizeQuery(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9_+#.-]+/)
    .filter(Boolean)
}

function fieldText(value: string | undefined): string {
  return (value ?? '').toLowerCase()
}

function includesAll(haystack: string, tokens: string[]): boolean {
  return tokens.every((token) => haystack.includes(token))
}

/** Build the searchable blob for a command (same fields the UI can match on). */
export function getSearchHaystack(command: Command): string {
  return [
    command.title,
    command.description,
    command.command,
    command.category,
    command.platform,
    command.language,
    command.type,
    command.notes ?? '',
    command.shortcut?.mac ?? '',
    command.shortcut?.windows ?? '',
    ...(command.tags ?? []),
    ...command.keywords,
  ]
    .join(' ')
    .toLowerCase()
}

/**
 * Match when every query token appears somewhere in the command.
 * Multi-word queries like "push github" or "github push" both work.
 */
export function matchesSearch(command: Command, query: string): boolean {
  const tokens = tokenizeQuery(query)
  if (tokens.length === 0) return true
  return includesAll(getSearchHaystack(command), tokens)
}

/**
 * Higher score = better match. Prefer title/command hits so basics like
 * "Push Changes" surface above unrelated prompts that only mention "push".
 */
export function scoreSearchMatch(command: Command, query: string): number {
  const tokens = tokenizeQuery(query)
  if (tokens.length === 0) return 0

  const title = fieldText(command.title)
  const commandText = fieldText(command.command)
  const description = fieldText(command.description)
  const keywords = command.keywords.map((k) => k.toLowerCase()).join(' ')
  const tags = (command.tags ?? []).map((t) => t.toLowerCase()).join(' ')
  const platform = fieldText(command.platform)
  const category = fieldText(command.category)
  const language = fieldText(command.language)
  const notes = fieldText(command.notes)
  const full = getSearchHaystack(command)

  let score = 0

  for (const token of tokens) {
    if (title === token) score += 120
    else if (title.startsWith(token)) score += 80
    else if (title.includes(token)) score += 50

    if (commandText === token || commandText.startsWith(`${token} `)) score += 70
    else if (commandText.includes(token)) score += 40

    if (keywords.split(' ').includes(token)) score += 35
    else if (keywords.includes(token)) score += 20

    if (description.includes(token)) score += 12
    if (tags.includes(token)) score += 10
    if (platform === token) score += 8
    if (category.includes(token)) score += 6
    if (language === token) score += 6
    if (notes.includes(token)) score += 4
  }

  // Exact phrase bonus when the user typed words in title/command order.
  const phrase = tokens.join(' ')
  if (title.includes(phrase)) score += 60
  else if (commandText.includes(phrase)) score += 40
  else if (full.includes(phrase)) score += 15

  // Prefer short terminal/git cards over long AI prompts when scores tie-ish.
  if (command.type === 'terminal') score += 8
  if (command.type === 'prompt') score -= 5
  if (command.language === 'git' && tokens.some((t) => t === 'git' || t === 'github' || t === 'push' || t === 'pull' || t === 'commit' || t === 'clone' || t === 'branch' || t === 'repo')) {
    score += 10
  }

  return score
}

export function compareSearchRelevance(
  a: Command,
  b: Command,
  query: string,
): number {
  const scoreDiff = scoreSearchMatch(b, query) - scoreSearchMatch(a, query)
  if (scoreDiff !== 0) return scoreDiff
  return a.title.localeCompare(b.title)
}
