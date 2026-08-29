import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ADSENSE, FEATURES } from '@/config'

interface AdSlotProps {
  className?: string
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

/**
 * A single, lightweight AdSense unit — no interstitials, no popups. Renders
 * nothing unless FEATURES.ads is on AND both ADSENSE values are filled in
 * (src/config.ts), so the MVP stays ad-free while the quiz + share loop is
 * still being validated. Flip the flag and paste the slot ID later — no
 * other code changes needed. (The adsbygoogle.js loader itself is already
 * in index.html's <head> for AdSense's site verification, so this component
 * only needs to push the ad request, not load the script.)
 */
export function AdSlot({ className = '' }: AdSlotProps) {
  const { t } = useTranslation()
  const enabled = FEATURES.ads && Boolean(ADSENSE.clientId) && Boolean(ADSENSE.slotId)

  useEffect(() => {
    if (!enabled) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // Blocked by an ad blocker or not loaded yet — fail silently, no broken UI.
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={`w-full ${className}`}>
      <p className="mb-1.5 text-center text-[10px] uppercase tracking-wide text-ink-faint">{t('adSlot.label')}</p>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE.clientId}
        data-ad-slot={ADSENSE.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
