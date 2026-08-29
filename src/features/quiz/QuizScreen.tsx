import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HaloOrb } from '@/components/HaloOrb'
import { ProgressBar } from '@/components/ProgressBar'
import { QUESTIONS } from '@/data/questions'
import { useAppStore } from '@/store/useAppStore'
import type { Language } from '@/types'
import { AnswerOption } from './AnswerOption'

const ADVANCE_DELAY_MS = 380
const MASCOT_CORE = '#b57cf9'
const MASCOT_GLOW = 'rgba(181,124,249,0.4)'

export function QuizScreen() {
  const { t } = useTranslation()
  const language = useAppStore((s) => s.language) as Language
  const currentQuestionIndex = useAppStore((s) => s.currentQuestionIndex)
  const answerQuestion = useAppStore((s) => s.answerQuestion)
  const goToPreviousQuestion = useAppStore((s) => s.goToPreviousQuestion)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const question = QUESTIONS[currentQuestionIndex]
  const activeExpression = question?.options.find((o) => o.id === selectedId)?.expression ?? 'neutral'

  function handleSelect(optionId: string) {
    if (selectedId) return
    setSelectedId(optionId)
    window.setTimeout(() => {
      answerQuestion(question.id, optionId)
      setSelectedId(null)
    }, ADVANCE_DELAY_MS)
  }

  function handleBack() {
    setSelectedId(null)
    goToPreviousQuestion()
  }

  if (!question) return null

  return (
    <div className="safe-top safe-bottom flex min-h-dvh flex-col px-6">
      <header className="flex items-center gap-3 py-2">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          aria-label={t('quiz.back')}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-dim transition-opacity disabled:opacity-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <ProgressBar current={currentQuestionIndex} total={QUESTIONS.length} />
      </header>

      <div className="flex justify-center pt-3">
        <HaloOrb core={MASCOT_CORE} glow={MASCOT_GLOW} size={100} expression={activeExpression} />
      </div>

      <p className="pt-3 text-center text-xs font-display font-semibold uppercase tracking-[0.2em] text-ink-faint">
        {t('quiz.question', { current: currentQuestionIndex + 1, total: QUESTIONS.length })}
      </p>

      <main className="flex flex-1 flex-col justify-center py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-8"
          >
            <h2 className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
              {question.prompt[language]}
            </h2>

            <div className="space-y-3">
              {question.options.map((option) => (
                <AnswerOption
                  key={option.id}
                  label={option.text[language]}
                  selected={selectedId === option.id}
                  disabled={selectedId !== null && selectedId !== option.id}
                  onSelect={() => handleSelect(option.id)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
