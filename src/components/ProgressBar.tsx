import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
}

/** Segmented progress bar — filling it is the only "next" signal the quiz needs. */
export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex w-full gap-1.5" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7cf9d8, #b57cf9)' }}
            initial={{ width: '0%' }}
            animate={{ width: i < current ? '100%' : '0%' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      ))}
    </div>
  )
}
