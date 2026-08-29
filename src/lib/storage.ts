import type { AuraResult } from '@/types'

const ANON_ID_KEY = 'aura.anonId'
const HISTORY_KEY = 'aura.history'
const MAX_HISTORY = 20

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/**
 * Anonymous id persisted client-side. When accounts/avatars ship, this is the
 * key to migrate local history onto a real UserProfile without losing it.
 */
export function getAnonId(): string {
  let id = window.localStorage.getItem(ANON_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    window.localStorage.setItem(ANON_ID_KEY, id)
  }
  return id
}

export function getHistory(): AuraResult[] {
  return safeParse<AuraResult[]>(window.localStorage.getItem(HISTORY_KEY), [])
}

export function saveResult(result: AuraResult): void {
  const history = [result, ...getHistory()].slice(0, MAX_HISTORY)
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function clearHistory(): void {
  window.localStorage.removeItem(HISTORY_KEY)
}
