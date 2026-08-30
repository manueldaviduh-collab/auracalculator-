import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#7cf9d8', '#b57cf9', '#ffc26b', '#ff6ba3', '#7cd6f9']
const PARTICLE_COUNT = 32

interface Particle {
  id: number
  x: number
  y: number
  rotate: number
  color: string
  width: number
  height: number
  delay: number
}

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = 110 + Math.random() * 170
    const size = 5 + Math.random() * 6
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 30,
      rotate: Math.random() * 360,
      color: COLORS[i % COLORS.length],
      width: size,
      height: size * 0.4,
      delay: Math.random() * 0.12,
    }
  })
}

/** A one-shot particle burst for the rare, share-worthy tiers (Legendary/Mythic). */
export function ConfettiBurst() {
  const particles = useMemo(() => makeParticles(), [])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-1/3 block rounded-sm"
          style={{ width: p.width, height: p.height, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: 1 }}
          transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
