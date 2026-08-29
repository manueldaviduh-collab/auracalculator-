import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlowButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'lg' | 'xl'
}

const sizeClasses = {
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

/** The one CTA style used everywhere: "Calculate My Aura" and "Share My Aura" both run through this. */
export function GlowButton({ children, variant = 'primary', size = 'lg', className = '', ...props }: GlowButtonProps) {
  const base = 'font-display font-semibold rounded-full tracking-wide transition-colors select-none w-full sm:w-auto'
  const variants = {
    primary:
      'text-[#08070d] bg-gradient-to-r from-[#7cf9d8] to-[#b57cf9] shadow-[0_0_30px_rgba(124,249,216,0.35),0_0_70px_rgba(181,124,249,0.25)]',
    ghost: 'text-ink bg-white/5 border border-white/15 hover:bg-white/10',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
