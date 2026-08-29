import type { Expression } from '@/types'

export type EyeShape = 'dot' | 'happy' | 'wide' | 'flat' | 'heart' | 'shades' | 'x' | 'up'
export type MouthShape = 'flat' | 'smile' | 'grin' | 'o' | 'smirk' | 'openLaugh' | 'frown' | 'wavy' | 'ellipsis'
export type EyebrowShape = 'none' | 'raised' | 'angry' | 'flat'

export interface FaceSpec {
  leftEye: EyeShape
  rightEye: EyeShape
  mouth: MouthShape
  eyebrows?: EyebrowShape
  blush?: boolean
  tears?: boolean
}

export const FACE_LAYOUT = { leftX: 36, rightX: 64, eyeY: 42, mouthY: 62 }
export const FACE_INK = '#140f24'

/**
 * One mascot mood per option (tapped live during the quiz) plus per tier
 * (the final reveal). Shared between components/AuraFace.tsx (SVG/JSX) and
 * lib/shareCard.ts (canvas) so both draw the exact same character instead of
 * two independently-drifting definitions.
 */
export const FACES: Record<Expression, FaceSpec> = {
  neutral: { leftEye: 'dot', rightEye: 'dot', mouth: 'flat' },
  shy: { leftEye: 'dot', rightEye: 'dot', mouth: 'wavy', blush: true },
  chaotic: { leftEye: 'dot', rightEye: 'happy', mouth: 'grin', eyebrows: 'raised' },
  friendly: { leftEye: 'happy', rightEye: 'happy', mouth: 'smile' },
  hype: { leftEye: 'happy', rightEye: 'happy', mouth: 'openLaugh' },
  smug: { leftEye: 'flat', rightEye: 'flat', mouth: 'smirk' },
  cool: { leftEye: 'shades', rightEye: 'shades', mouth: 'smirk' },
  deadpan: { leftEye: 'flat', rightEye: 'flat', mouth: 'flat' },
  love: { leftEye: 'heart', rightEye: 'heart', mouth: 'smile' },
  shocked: { leftEye: 'wide', rightEye: 'wide', mouth: 'o', eyebrows: 'raised' },
  sad: { leftEye: 'dot', rightEye: 'dot', mouth: 'frown', eyebrows: 'raised' },
  evil: { leftEye: 'flat', rightEye: 'flat', mouth: 'grin', eyebrows: 'angry' },
  'crying-laughing': { leftEye: 'x', rightEye: 'x', mouth: 'openLaugh', tears: true },
  thinking: { leftEye: 'up', rightEye: 'up', mouth: 'ellipsis' },
}
