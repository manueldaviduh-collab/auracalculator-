import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GlowButton } from '@/components/GlowButton'
import { HaloOrb } from '@/components/HaloOrb'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Logo } from '@/components/Logo'
import { useAppStore } from '@/store/useAppStore'

export function HomeScreen() {
  const { t } = useTranslation()
  const startQuiz = useAppStore((s) => s.startQuiz)

  return (
    <div className="safe-top safe-bottom flex min-h-dvh flex-col px-6">
      <header className="flex items-center justify-between py-2">
        <Logo size={30} />
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <HaloOrb core="#b57cf9" glow="rgba(181,124,249,0.4)" size={190} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-3"
        >
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-aura-mint">
            {t('home.eyebrow')}
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {t('home.title')}
          </h1>
          <p className="mx-auto max-w-xs text-sm text-ink-dim sm:max-w-sm sm:text-base">
            {t('home.subtitle')}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display text-lg font-bold text-ink sm:text-xl"
        >
          {t('home.hook')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-xs"
        >
          <GlowButton size="xl" onClick={startQuiz} className="w-full">
            {t('home.cta')}
          </GlowButton>
        </motion.div>
      </main>

      <footer className="space-y-1 pb-4 text-center text-xs text-ink-faint">
        <p>{t('home.footer')}</p>
        <a href="/privacy.html" className="underline underline-offset-2 hover:text-ink-dim">
          {t('home.privacy')}
        </a>
      </footer>
    </div>
  )
}
