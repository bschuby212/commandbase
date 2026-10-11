import { useCallback, useState } from 'react'

const STORAGE_KEY = 'commandbase:favorites'

function readFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(readFavorites)

  const persist = useCallback((next: Set<string>) => {
    setFavoriteIds(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
  }, [])

  const isFavorite = useCallback(
    (id: string) => favoriteIds.has(id),
    [favoriteIds],
  )

  const toggleFavorite = useCallback(
    (id: string) => {
      const next = new Set(favoriteIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      persist(next)
    },
    [favoriteIds, persist],
  )

  return { favoriteIds, isFavorite, toggleFavorite }
}
