import { useCallback, useEffect, useRef, useState } from 'react'

const SUCCESS_DURATION_MS = 1500

type ClipboardState = {
  copiedId: string | null
  error: string | null
  copy: (id: string, text: string) => Promise<void>
  clearError: () => void
}

export function useClipboard(): ClipboardState {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copy = useCallback(async (id: string, text: string) => {
    setError(null)

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable')
      }

      await navigator.clipboard.writeText(text)
      setCopiedId(id)

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopiedId(null)
        timeoutRef.current = null
      }, SUCCESS_DURATION_MS)
    } catch {
      setCopiedId(null)
      setError('Could not copy to clipboard. Please copy the command manually.')
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { copiedId, error, copy, clearError }
}
