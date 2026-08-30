/** Vibration API is Android-only (iOS Safari has no support) — this is a silent no-op there. */
export function vibrate(pattern: number | number[]) {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return
  try {
    navigator.vibrate(pattern)
  } catch {
    // Unsupported or blocked — no big deal, it's just a nice-to-have.
  }
}
