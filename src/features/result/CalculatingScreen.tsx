import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HaloOrb } from '@/components/HaloOrb'
import { TRAIT_COLORS } from '@/lib/scoring'
import { useAppStore } from '@/store/useAppStore'

const TOTAL_DURATION_MS = 2200
const LINE_INTERVAL_MS = 480

export function CalculatingScreen() {
  const { t } = useTranslation()
  const result = useAppStore((s) => s.result)
  const finishCalculating = useAppStore((s) => s.finishCalculating)
  const [lineIndex, setLineIndex] = useState(0)

  const lines = t('calculating.lines', { returnObjects: true }) as string[]
  const colors = result ? TRAIT_COLORS[result.dominantTrait] : TRAIT_COLORS.light
  const lineCount = lines.length

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setLineIndex((i) => (i + 1) % lineCount)
    }, LINE_INTERVAL_MS)
    const doneTimer = window.setTimeout(finishCalculating, TOTAL_DURATION_MS)
    return () => {
      window.clearInterval(lineTimer)
      window.clearTimeout(doneTimer)
    }
  }, [lineCount, finishCalculating])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center">
      <HaloOrb core={colors.core} glow={colors.glow} size={200} spin expression="thinking" />

      <div className="space-y-3">
        <h2 className="font-display text-2xl font-bold text-ink">{t('calculating.title')}</h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-ink-dim"
          >
            {lines[lineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
