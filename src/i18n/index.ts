import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './resources/en'
import { es } from './resources/es'
import type { Language } from '@/types'

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'es']

const STORAGE_KEY = 'aura.lang'

function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'es') return stored
  const browserLang = window.navigator.language.slice(0, 2)
  return browserLang === 'es' ? 'es' : 'en'
}

export function persistLanguage(lang: Language) {
  window.localStorage.setItem(STORAGE_KEY, lang)
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
