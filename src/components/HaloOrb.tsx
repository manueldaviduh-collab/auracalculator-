import { motion } from 'framer-motion'
import { AuraFace } from '@/components/AuraFace'
import type { Expression } from '@/types'

interface HaloOrbProps {
  core: string
  glow: string
  size?: number
  pulse?: boolean
  spin?: boolean
  /** When set, the orb doubles as the mascot — a face pops onto the core. */
  expression?: Expression
}

/**
 * The reactive "aura" visual — a glowing core wrapped in a spinning gradient
 * ring and a soft ambient halo. Color is passed in so it can react to the
 * dominant trait (loading screen, result screen) or stay neutral (idle uses).
 */
export function HaloOrb({ core, glow, size = 220, pulse = true, spin = true, expression }: HaloOrbProps) {
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ background: glow }}
        animate={pulse ? { opacity: [0.55, 0.9, 0.55], scale: [0.95, 1.05, 0.95] } : undefined}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.82,
          height: size * 0.82,
          background: `conic-gradient(from 0deg, ${core}, transparent 30%, ${core}, transparent 70%, ${core})`,
          maskImage: 'radial-gradient(circle, transparent 62%, black 64%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 62%, black 64%, black 100%)',
        }}
        animate={spin ? { rotate: 360 } : undefined}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="relative rounded-full"
        style={{
          width: size * 0.56,
          height: size * 0.56,
          background: `radial-gradient(circle at 35% 30%, white 0%, ${core} 35%, ${core} 100%)`,
          boxShadow: `0 0 60px 10px ${glow}`,
        }}
        animate={pulse ? { scale: [1, 1.045, 1] } : undefined}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {expression && (
        <div className="absolute inset-0 grid place-items-center">
          <AuraFace expression={expression} size={size * 0.4} />
        </div>
      )}
    </div>
  )
}
