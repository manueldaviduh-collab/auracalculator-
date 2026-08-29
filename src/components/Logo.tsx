import { motion } from 'framer-motion'

interface LogoProps {
  size?: number
  animated?: boolean
  className?: string
}

/** Minimalist ring-with-a-halo mark. Used standalone in headers and as the seed for the bigger HaloOrb. */
export function Logo({ size = 32, animated = false, className }: LogoProps) {
  const ring = (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-label="Aura Calculator">
      <defs>
        <radialGradient id="logoHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7cf9d8" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#b57cf9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#b57cf9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="logoRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7cf9d8" />
          <stop offset="100%" stopColor="#b57cf9" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#logoHalo)" />
      <circle cx="32" cy="32" r="15" stroke="url(#logoRing)" strokeWidth="3" fill="none" />
      <circle cx="32" cy="32" r="3.5" fill="#eafbf6" />
    </svg>
  )

  if (!animated) return <div className={className}>{ring}</div>

  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {ring}
    </motion.div>
  )
}
