import { motion } from 'framer-motion'
import { FACES, FACE_LAYOUT, FACE_INK, type EyeShape, type MouthShape, type EyebrowShape } from '@/lib/faceShapes'
import type { Expression } from '@/types'

const { leftX: LEFT_X, rightX: RIGHT_X, eyeY: EYE_Y, mouthY: MOUTH_Y } = FACE_LAYOUT
const INK = FACE_INK

function Eye({ shape, cx, cy }: { shape: EyeShape; cx: number; cy: number }) {
  switch (shape) {
    case 'dot':
      return <circle cx={cx} cy={cy} r={4.5} fill="currentColor" />
    case 'happy':
      return (
        <path
          d={`M ${cx - 7} ${cy + 3} Q ${cx} ${cy - 7} ${cx + 7} ${cy + 3}`}
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
      )
    case 'wide':
      return (
        <g>
          <circle cx={cx} cy={cy} r={7} fill="#ffffff" />
          <circle cx={cx} cy={cy} r={3.2} fill={INK} />
        </g>
      )
    case 'flat':
      return <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
    case 'heart':
      return (
        <path
          d={`M ${cx} ${cy + 5} C ${cx - 8} ${cy - 4}, ${cx - 3} ${cy - 9}, ${cx} ${cy - 4} C ${cx + 3} ${cy - 9}, ${cx + 8} ${cy - 4}, ${cx} ${cy + 5} Z`}
          fill="currentColor"
        />
      )
    case 'x':
      return (
        <g stroke="currentColor" strokeWidth={3.4} strokeLinecap="round">
          <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} />
          <line x1={cx - 5} y1={cy + 5} x2={cx + 5} y2={cy - 5} />
        </g>
      )
    case 'up':
      return <circle cx={cx + 1} cy={cy - 3} r={4} fill="currentColor" />
    case 'shades':
      return null
    default:
      return null
  }
}

function Mouth({ shape }: { shape: MouthShape }) {
  const cx = 50
  const cy = MOUTH_Y
  switch (shape) {
    case 'flat':
      return <line x1={cx - 9} y1={cy} x2={cx + 9} y2={cy} stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
    case 'smile':
      return (
        <path d={`M ${cx - 10} ${cy - 2} Q ${cx} ${cy + 9} ${cx + 10} ${cy - 2}`} stroke="currentColor" strokeWidth={4} strokeLinecap="round" fill="none" />
      )
    case 'grin':
      return (
        <path
          d={`M ${cx - 12} ${cy - 2} Q ${cx} ${cy + 14} ${cx + 12} ${cy - 2} Q ${cx} ${cy + 6} ${cx - 12} ${cy - 2} Z`}
          fill="currentColor"
        />
      )
    case 'o':
      return <ellipse cx={cx} cy={cy + 2} rx={5} ry={7} fill="currentColor" />
    case 'smirk':
      return <path d={`M ${cx - 8} ${cy} Q ${cx + 4} ${cy + 7} ${cx + 12} ${cy - 4}`} stroke="currentColor" strokeWidth={4} strokeLinecap="round" fill="none" />
    case 'openLaugh':
      return (
        <path
          d={`M ${cx - 13} ${cy - 4} Q ${cx} ${cy + 18} ${cx + 13} ${cy - 4} Q ${cx} ${cy + 8} ${cx - 13} ${cy - 4} Z`}
          fill="currentColor"
        />
      )
    case 'frown':
      return <path d={`M ${cx - 9} ${cy + 4} Q ${cx} ${cy - 7} ${cx + 9} ${cy + 4}`} stroke="currentColor" strokeWidth={4} strokeLinecap="round" fill="none" />
    case 'wavy':
      return (
        <path
          d={`M ${cx - 9} ${cy} Q ${cx - 4.5} ${cy - 4} ${cx} ${cy} Q ${cx + 4.5} ${cy + 4} ${cx + 9} ${cy}`}
          stroke="currentColor"
          strokeWidth={3.4}
          strokeLinecap="round"
          fill="none"
        />
      )
    case 'ellipsis':
      return (
        <g fill="currentColor">
          <circle cx={cx - 8} cy={cy} r={2.4} />
          <circle cx={cx} cy={cy} r={2.4} />
          <circle cx={cx + 8} cy={cy} r={2.4} />
        </g>
      )
    default:
      return null
  }
}

function Eyebrows({ shape }: { shape: EyebrowShape }) {
  if (shape === 'none') return null
  const y = EYE_Y - 11
  if (shape === 'angry') {
    return (
      <g stroke="currentColor" strokeWidth={3.4} strokeLinecap="round">
        <line x1={LEFT_X - 7} y1={y - 2} x2={LEFT_X + 6} y2={y + 3} />
        <line x1={RIGHT_X + 7} y1={y - 2} x2={RIGHT_X - 6} y2={y + 3} />
      </g>
    )
  }
  if (shape === 'raised') {
    return (
      <g stroke="currentColor" strokeWidth={3.4} strokeLinecap="round">
        <line x1={LEFT_X - 7} y1={y + 3} x2={LEFT_X + 6} y2={y - 2} />
        <line x1={RIGHT_X - 6} y1={y - 2} x2={RIGHT_X + 7} y2={y + 3} />
      </g>
    )
  }
  return (
    <g stroke="currentColor" strokeWidth={3.4} strokeLinecap="round">
      <line x1={LEFT_X - 7} y1={y} x2={LEFT_X + 7} y2={y} />
      <line x1={RIGHT_X - 7} y1={y} x2={RIGHT_X + 7} y2={y} />
    </g>
  )
}

interface AuraFaceProps {
  expression: Expression
  size: number
}

/** The quiz mascot — swaps expression instantly (a quick spring pop) whenever the answer changes. */
export function AuraFace({ expression, size }: AuraFaceProps) {
  const spec = FACES[expression]
  const usesShades = spec.leftEye === 'shades'

  return (
    <motion.svg
      key={expression}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ color: INK, overflow: 'visible' }}
      initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 16 }}
    >
      <Eyebrows shape={spec.eyebrows ?? 'none'} />
      {spec.blush && (
        <>
          <circle cx={LEFT_X - 3} cy={EYE_Y + 11} r={5} fill="#ff6ba3" opacity={0.5} />
          <circle cx={RIGHT_X + 3} cy={EYE_Y + 11} r={5} fill="#ff6ba3" opacity={0.5} />
        </>
      )}
      {usesShades ? (
        <g>
          <rect x={LEFT_X - 11} y={EYE_Y - 6} width={RIGHT_X - LEFT_X + 22} height={12} rx={6} fill={INK} />
          <rect x={LEFT_X - 7} y={EYE_Y - 3} width={10} height={4} rx={2} fill="#ffffff" opacity={0.5} />
        </g>
      ) : (
        <>
          <Eye shape={spec.leftEye} cx={LEFT_X} cy={EYE_Y} />
          <Eye shape={spec.rightEye} cx={RIGHT_X} cy={EYE_Y} />
        </>
      )}
      <Mouth shape={spec.mouth} />
      {spec.tears && (
        <>
          <path d={`M ${LEFT_X - 2} ${EYE_Y + 8} q -3 6 0 10 q 3 -4 0 -10`} fill="#7cd6f9" />
          <path d={`M ${RIGHT_X + 2} ${EYE_Y + 8} q -3 6 0 10 q 3 -4 0 -10`} fill="#7cd6f9" />
        </>
      )}
    </motion.svg>
  )
}
