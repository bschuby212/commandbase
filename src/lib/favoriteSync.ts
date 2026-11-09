/** URL + localStorage helpers so favorites travel across devices via the page link. */

export const FAVORITES_STORAGE_KEY = 'commandbase:favorites'
const HASH_PREFIX = 'fav='

function toBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + pad)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeFavoriteIds(ids: Iterable<string>): string {
  const list = [...new Set(ids)].filter(Boolean).sort()
  if (list.length === 0) return ''
  return toBase64Url(list.join('\n'))
}

export function decodeFavoriteIds(encoded: string): string[] {
  if (!encoded.trim()) return []
  try {
    const raw = fromBase64Url(encoded.trim())
    return [
      ...new Set(
        raw
          .split(/[\n,]/)
          .map((id) => id.trim())
          .filter(Boolean),
      ),
    ]
  } catch {
    return []
  }
}

export function readFavoritesFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

export function writeFavoritesToStorage(ids: Set<string>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...ids].sort()))
}

/** Returns null when the URL has no favorites payload. */
export function readFavoritesFromUrl(): Set<string> | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash.startsWith(HASH_PREFIX)) return null
  return new Set(decodeFavoriteIds(hash.slice(HASH_PREFIX.length)))
}

export function writeFavoritesToUrl(ids: Set<string>): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const encoded = encodeFavoriteIds(ids)
  url.hash = encoded ? `${HASH_PREFIX}${encoded}` : ''
  const next = `${url.pathname}${url.search}${url.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== current) {
    window.history.replaceState(window.history.state, '', next)
  }
}

export function buildFavoritesShareUrl(ids: Set<string>): string {
  if (typeof window === 'undefined') return ''
  const url = new URL(window.location.href)
  const encoded = encodeFavoriteIds(ids)
  url.hash = encoded ? `${HASH_PREFIX}${encoded}` : ''
  return url.toString()
}

/**
 * Prefer URL favorites when present (opening a sync link on another device).
 * Otherwise use localStorage and mirror into the URL so bookmarks stay current.
 */
export function readInitialFavorites(): Set<string> {
  const fromUrl = readFavoritesFromUrl()
  if (fromUrl) {
    writeFavoritesToStorage(fromUrl)
    return fromUrl
  }
  const fromStorage = readFavoritesFromStorage()
  if (fromStorage.size > 0) writeFavoritesToUrl(fromStorage)
  return fromStorage
}

export function persistFavorites(ids: Set<string>): void {
  writeFavoritesToStorage(ids)
  writeFavoritesToUrl(ids)
}
