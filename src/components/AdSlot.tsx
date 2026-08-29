import { useTranslation } from 'react-i18next'
import { FEATURES } from '@/config'

interface AdSlotProps {
  className?: string
}

/**
 * Reserved real estate for a future sponsor unit. Renders nothing while
 * FEATURES.ads is off (the MVP goal is validating the quiz + share loop, not
 * monetizing it) — flip the flag once a sponsor is wired up and this slot is
 * already positioned in the layout.
 */
export function AdSlot({ className = '' }: AdSlotProps) {
  const { t } = useTranslation()

  if (!FEATURES.ads) return null

  return (
    <div
      className={`flex h-20 w-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-xs text-ink-faint ${className}`}
    >
      {t('adSlot.label')}
    </div>
  )
}
