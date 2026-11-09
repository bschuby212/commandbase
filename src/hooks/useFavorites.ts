import { useCallback, useEffect, useState } from 'react'
import {
  FAVORITES_STORAGE_KEY,
  persistFavorites,
  readFavoritesFromStorage,
  readFavoritesFromUrl,
  readInitialFavorites,
} from '../lib/favoriteSync'

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(readInitialFavorites)

  const apply = useCallback((next: Set<string>) => {
    const frozen = new Set(next)
    setFavoriteIds(frozen)
    persistFavorites(frozen)
  }, [])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== FAVORITES_STORAGE_KEY) return
      apply(readFavoritesFromStorage())
    }

    const onHashChange = () => {
      const fromUrl = readFavoritesFromUrl()
      if (fromUrl) apply(fromUrl)
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [apply])

  const isFavorite = useCallback(
    (id: string) => favoriteIds.has(id),
    [favoriteIds],
  )

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((current) => {
        const next = new Set(current)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        persistFavorites(next)
        return next
      })
    },
    [],
  )

  const replaceFavorites = useCallback(
    (ids: Iterable<string>) => {
      apply(new Set([...ids].filter(Boolean)))
    },
    [apply],
  )

  return {
    favoriteIds,
    favoriteCount: favoriteIds.size,
    isFavorite,
    toggleFavorite,
    replaceFavorites,
  }
}
