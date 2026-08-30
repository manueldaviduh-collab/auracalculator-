import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdSlot } from '@/components/AdSlot'
import { ConfettiBurst } from '@/components/ConfettiBurst'
import { GlowButton } from '@/components/GlowButton'
import { HaloOrb } from '@/components/HaloOrb'
import { APP_FULL_URL } from '@/config'
import { revealFeedback } from '@/lib/feedback'
import { shareAuraResult, type ShareOutcome } from '@/lib/share'
import { TIER_EXPRESSIONS, TRAIT_COLORS, formatDisplayScore } from '@/lib/scoring'
import { useCountUp } from '@/lib/useCountUp'
import { useAppStore } from '@/store/useAppStore'

const CELEBRATION_TIERS = new Set(['legendary', 'mythic'])

const SHARE_MESSAGE_KEY: Record<ShareOutcome, string> = {
  shared: 'share.success',
  copied: 'share.copied',
  downloaded: 'share.downloaded',
  error: 'share.error',
}

export function ResultScreen() {
  const { t } = useTranslation()
  const result = useAppStore((s) => s.result)
  const goHome = useAppStore((s) => s.goHome)
  const retake = useAppStore((s) => s.retake)
  const [shareStatus, setShareStatus] = useState<ShareOutcome | 'idle' | 'sharing'>('idle')

  const displayScore = useCountUp(result?.displayScore ?? 0)

  const revealTier = result?.tier
  useEffect(() => {
    if (revealTier) revealFeedback(revealTier)
  }, [revealTier])

  if (!result) {
    goHome()
    return null
  }

  const colors = TRAIT_COLORS[result.dominantTrait]
  const tierLabel = t(`result.tiers.${result.tier}`)
  const traitLabel = t(`result.traits.${result.dominantTrait}`)
  const tagline = t(`result.taglines.${result.tier}`)

  async function handleShare() {
    if (!result) return
    setShareStatus('sharing')
    const outcome = await shareAuraResult(result, {
      tierLabel,
      traitLabel,
      tagline,
      caption: t('share.caption', { score: formatDisplayScore(result.displayScore), tier: tierLabel, url: APP_FULL_URL }),
    })
    setShareStatus(outcome)
    window.setTimeout(() => setShareStatus('idle'), 2600)
  }

  return (
    <div className="safe-top safe-bottom relative flex min-h-dvh flex-col items-center px-6 py-10 text-center">
      {CELEBRATION_TIERS.has(result.tier) && <ConfettiBurst />}

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <HaloOrb core={colors.core} glow={colors.glow} size={200} expression={TIER_EXPRESSIONS[result.tier]} />
      </motion.div>

      <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
        {t('result.scoreLabel')}
      </p>

      <p className="mt-2 font-display text-5xl font-extrabold text-ink sm:text-6xl">
        {formatDisplayScore(displayScore)}
      </p>

      <p className="mt-1 font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl" style={{ color: colors.core }}>
        {tierLabel}
      </p>

      <p className="mx-auto mt-4 max-w-xs text-sm text-ink-dim sm:max-w-sm sm:text-base">{tagline}</p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-ink-dim">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: colors.core, boxShadow: `0 0 8px ${colors.core}` }}
        />
        {t('result.dominantTrait')}: {traitLabel}
      </div>

      <div className="mt-10 w-full max-w-xs space-y-4">
        <GlowButton size="xl" onClick={handleShare} disabled={shareStatus === 'sharing'} className="w-full">
          {t('result.share')}
        </GlowButton>
        <button type="button" onClick={retake} className="text-sm font-medium text-ink-dim underline-offset-4 hover:underline">
          {t('result.retake')}
        </button>
      </div>

      <AnimatePresence>
        {shareStatus !== 'idle' && shareStatus !== 'sharing' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs text-ink backdrop-blur"
          >
            {t(SHARE_MESSAGE_KEY[shareStatus])}
          </motion.div>
        )}
      </AnimatePresence>

      <AdSlot className="mt-10" />
    </div>
  )
}
