import { create } from 'zustand'
import { QUESTIONS } from '@/data/questions'
import i18n, { persistLanguage } from '@/i18n'
import { computeAuraResult } from '@/lib/scoring'
import { getSoundEnabled, saveResult, setSoundEnabled } from '@/lib/storage'
import type { AuraAnswer, AuraResult, Language, Screen } from '@/types'

interface AppState {
  language: Language
  screen: Screen
  currentQuestionIndex: number
  answers: AuraAnswer[]
  result: AuraResult | null
  soundEnabled: boolean

  setLanguage: (lang: Language) => void
  goHome: () => void
  startQuiz: () => void
  answerQuestion: (questionId: string, optionId: string) => void
  goToPreviousQuestion: () => void
  finishCalculating: () => void
  retake: () => void
  toggleSound: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  language: i18n.language === 'es' ? 'es' : 'en',
  screen: 'home',
  currentQuestionIndex: 0,
  answers: [],
  result: null,
  soundEnabled: getSoundEnabled(),

  setLanguage: (lang) => {
    void i18n.changeLanguage(lang)
    persistLanguage(lang)
    set({ language: lang })
  },

  goHome: () => set({ screen: 'home', currentQuestionIndex: 0, answers: [], result: null }),

  startQuiz: () => set({ screen: 'quiz', currentQuestionIndex: 0, answers: [] }),

  answerQuestion: (questionId, optionId) => {
    const state = get()
    const answers = [...state.answers.filter((a) => a.questionId !== questionId), { questionId, optionId }]
    const nextIndex = state.currentQuestionIndex + 1

    if (nextIndex >= QUESTIONS.length) {
      const result = computeAuraResult(answers)
      saveResult(result)
      set({ answers, result, screen: 'calculating' })
      return
    }

    set({ answers, currentQuestionIndex: nextIndex })
  },

  goToPreviousQuestion: () => {
    const state = get()
    if (state.currentQuestionIndex === 0) return
    const prevIndex = state.currentQuestionIndex - 1
    const prevQuestion = QUESTIONS[prevIndex]
    set({
      currentQuestionIndex: prevIndex,
      answers: state.answers.filter((a) => a.questionId !== prevQuestion.id),
    })
  },

  finishCalculating: () => set({ screen: 'result' }),

  retake: () => set({ screen: 'quiz', currentQuestionIndex: 0, answers: [], result: null }),

  toggleSound: () => {
    const next = !get().soundEnabled
    setSoundEnabled(next)
    set({ soundEnabled: next })
  },
}))
