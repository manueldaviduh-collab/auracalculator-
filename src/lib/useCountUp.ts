import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Tweens 0 → target once, used for the big score reveal on the result screen. */
export function useCountUp(target: number, durationSeconds = 1.4): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, target, {
      duration: durationSeconds,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [target, durationSeconds])

  return value
}
