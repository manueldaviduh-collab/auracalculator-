import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/useAppStore'
import type { Language } from '@/types'

const LANGS: Language[] = ['en', 'es']

export function LanguageSwitcher() {
  const { t } = useTranslation()
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)

  return (
    <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs font-display font-semibold">
      {LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            language === lang ? 'bg-white text-[#08070d]' : 'text-ink-dim hover:text-ink'
          }`}
        >
          {t(`common.lang${lang === 'en' ? 'En' : 'Es'}`)}
        </button>
      ))}
    </div>
  )
}
