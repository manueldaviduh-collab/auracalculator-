import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/useAppStore'

export function SoundToggle() {
  const { t } = useTranslation()
  const soundEnabled = useAppStore((s) => s.soundEnabled)
  const toggleSound = useAppStore((s) => s.toggleSound)

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={t(soundEnabled ? 'common.muteSound' : 'common.unmuteSound')}
      aria-pressed={!soundEnabled}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-ink-dim transition-colors hover:text-ink"
    >
      {soundEnabled ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 9v6h4l5 5V4L8 9H4Z" strokeLinejoin="round" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
          <path d="M19 6a9 9 0 0 1 0 12" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 9v6h4l5 5V4L8 9H4Z" strokeLinejoin="round" />
          <path d="M16 9l5 6M21 9l-5 6" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
