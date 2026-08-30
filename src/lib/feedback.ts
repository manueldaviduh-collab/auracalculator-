import { vibrate } from '@/lib/haptics'
import { playRevealChime, playTapBlip } from '@/lib/sound'
import { useAppStore } from '@/store/useAppStore'
import type { AuraTier } from '@/types'

/** Tap on a quiz answer: a short blip + a light buzz. */
export function tapFeedback() {
  if (!useAppStore.getState().soundEnabled) return
  playTapBlip()
  vibrate(12)
}

/** The result reveal: a bigger, more triumphant sting for the top tiers. */
export function revealFeedback(tier: AuraTier) {
  if (!useAppStore.getState().soundEnabled) return
  const big = tier === 'legendary' || tier === 'mythic'
  playRevealChime(big)
  vibrate(big ? [30, 40, 30, 40, 60] : [25])
}
