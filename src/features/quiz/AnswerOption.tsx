import { motion } from 'framer-motion'

interface AnswerOptionProps {
  label: string
  selected: boolean
  disabled: boolean
  onSelect: () => void
}

export function AnswerOption({ label, selected, disabled, onSelect }: AnswerOptionProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      animate={
        selected
          ? { scale: [1, 1.03, 1], borderColor: 'rgba(124,249,216,0.8)' }
          : { scale: 1, borderColor: 'rgba(255,255,255,0.12)' }
      }
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`card-surface w-full rounded-2xl border px-5 py-4 text-left text-sm font-medium text-ink shadow-lg transition-opacity duration-300 sm:text-base ${
        disabled && !selected ? 'opacity-30' : 'opacity-100'
      }`}
      style={{
        boxShadow: selected ? '0 0 24px rgba(124,249,216,0.3), 0 0 60px rgba(181,124,249,0.18)' : undefined,
      }}
    >
      {label}
    </motion.button>
  )
}
