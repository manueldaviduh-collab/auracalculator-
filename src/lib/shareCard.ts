import { FACES, FACE_INK, FACE_LAYOUT, type EyeShape, type EyebrowShape, type MouthShape } from '@/lib/faceShapes'
import { APP_URL, SHARE_CARD_SIZE } from '@/config'
import { TIER_EXPRESSIONS, TRAIT_COLORS, formatDisplayScore } from '@/lib/scoring'
import type { AuraResult } from '@/types'

export interface ShareCardCopy {
  tierLabel: string
  traitLabel: string
  tagline: string
}

/**
 * Renders the shareable aura card to a PNG blob via canvas — no DOM
 * screenshot library needed, which keeps the bundle small and avoids
 * font/CORS quirks that come with html-to-image style tools.
 */
export async function renderAuraCardBlob(result: AuraResult, copy: ShareCardCopy): Promise<Blob> {
  await document.fonts.ready

  const { width, height } = SHARE_CARD_SIZE
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser')

  const colors = TRAIT_COLORS[result.dominantTrait]
  const cx = width / 2

  const orbCy = height * 0.32
  const orbRadius = width * 0.24

  drawBackground(ctx, width, height)
  drawOrb(ctx, cx, orbCy, orbRadius, colors.core)
  drawFace(ctx, cx, orbCy, orbRadius, TIER_EXPRESSIONS[result.tier])
  drawScoreBlock(ctx, cx, width, height, colors.core, result, copy)
  drawReservedFooterBand(ctx, width, height)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to encode the aura card image'))
    }, 'image/png')
  })
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const bg = ctx.createLinearGradient(0, 0, 0, height)
  bg.addColorStop(0, '#180f2c')
  bg.addColorStop(0.5, '#0b0a14')
  bg.addColorStop(1, '#05040a')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, width, height)
}

function drawOrb(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, core: string) {
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.6)
  glow.addColorStop(0, hexToRgba(core, 0.5))
  glow.addColorStop(1, hexToRgba(core, 0))
  ctx.fillStyle = glow
  ctx.fillRect(cx - radius * 2.6, cy - radius * 2.6, radius * 5.2, radius * 5.2)

  const orbGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, radius * 0.08, cx, cy, radius)
  orbGrad.addColorStop(0, '#ffffff')
  orbGrad.addColorStop(0.35, core)
  orbGrad.addColorStop(1, core)
  ctx.fillStyle = orbGrad
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2)
  ctx.stroke()
}

/**
 * Draws the mascot's final expression on the orb — mirrors the shape logic
 * in components/AuraFace.tsx (same FACES config) so the share card shows the
 * same character the app does, just via canvas paths instead of SVG/JSX.
 */
function drawFace(ctx: CanvasRenderingContext2D, cx: number, cy: number, ballRadius: number, expression: keyof typeof FACES) {
  const spec = FACES[expression]
  const scale = (ballRadius * 0.714) / 50
  const { leftX, rightX, eyeY, mouthY } = FACE_LAYOUT
  const toX = (sx: number) => cx + (sx - 50) * scale
  const toY = (sy: number) => cy + (sy - 50) * scale
  const s = (n: number) => n * scale

  ctx.save()
  ctx.strokeStyle = FACE_INK
  ctx.fillStyle = FACE_INK
  ctx.lineCap = 'round'

  drawEyebrows(ctx, spec.eyebrows ?? 'none', toX, toY, s, leftX, rightX, eyeY)

  if (spec.blush) {
    ctx.fillStyle = 'rgba(255,107,163,0.5)'
    ctx.beginPath()
    ctx.arc(toX(leftX - 3), toY(eyeY + 11), s(5), 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(toX(rightX + 3), toY(eyeY + 11), s(5), 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = FACE_INK
  }

  if (spec.leftEye === 'shades') {
    ctx.fillStyle = FACE_INK
    roundRect(ctx, toX(leftX - 11), toY(eyeY - 6), s(rightX - leftX + 22), s(12), s(6))
    ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    roundRect(ctx, toX(leftX - 7), toY(eyeY - 3), s(10), s(4), s(2))
    ctx.fill()
  } else {
    drawEye(ctx, spec.leftEye, toX(leftX), toY(eyeY), s)
    drawEye(ctx, spec.rightEye, toX(rightX), toY(eyeY), s)
  }

  ctx.fillStyle = FACE_INK
  ctx.strokeStyle = FACE_INK
  drawMouth(ctx, spec.mouth, toX(50), toY(mouthY), s)

  if (spec.tears) {
    ctx.fillStyle = '#7cd6f9'
    drawTear(ctx, toX(leftX - 2), toY(eyeY + 8), s)
    drawTear(ctx, toX(rightX + 2), toY(eyeY + 8), s)
  }

  ctx.restore()
}

function drawEye(ctx: CanvasRenderingContext2D, shape: EyeShape, cx: number, cy: number, s: (n: number) => number) {
  switch (shape) {
    case 'dot':
      ctx.beginPath()
      ctx.arc(cx, cy, s(4.5), 0, Math.PI * 2)
      ctx.fill()
      return
    case 'happy':
      ctx.lineWidth = s(4)
      ctx.beginPath()
      ctx.moveTo(cx - s(7), cy + s(3))
      ctx.quadraticCurveTo(cx, cy - s(7), cx + s(7), cy + s(3))
      ctx.stroke()
      return
    case 'wide':
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(cx, cy, s(7), 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = FACE_INK
      ctx.beginPath()
      ctx.arc(cx, cy, s(3.2), 0, Math.PI * 2)
      ctx.fill()
      return
    case 'flat':
      ctx.lineWidth = s(4)
      ctx.beginPath()
      ctx.moveTo(cx - s(7), cy)
      ctx.lineTo(cx + s(7), cy)
      ctx.stroke()
      return
    case 'heart':
      ctx.beginPath()
      ctx.moveTo(cx, cy + s(5))
      ctx.bezierCurveTo(cx - s(8), cy - s(4), cx - s(3), cy - s(9), cx, cy - s(4))
      ctx.bezierCurveTo(cx + s(3), cy - s(9), cx + s(8), cy - s(4), cx, cy + s(5))
      ctx.closePath()
      ctx.fill()
      return
    case 'x':
      ctx.lineWidth = s(3.4)
      ctx.beginPath()
      ctx.moveTo(cx - s(5), cy - s(5))
      ctx.lineTo(cx + s(5), cy + s(5))
      ctx.moveTo(cx - s(5), cy + s(5))
      ctx.lineTo(cx + s(5), cy - s(5))
      ctx.stroke()
      return
    case 'up':
      ctx.beginPath()
      ctx.arc(cx + s(1), cy - s(3), s(4), 0, Math.PI * 2)
      ctx.fill()
      return
    case 'shades':
      return
  }
}

function drawMouth(ctx: CanvasRenderingContext2D, shape: MouthShape, cx: number, cy: number, s: (n: number) => number) {
  switch (shape) {
    case 'flat':
      ctx.lineWidth = s(4)
      ctx.beginPath()
      ctx.moveTo(cx - s(9), cy)
      ctx.lineTo(cx + s(9), cy)
      ctx.stroke()
      return
    case 'smile':
      ctx.lineWidth = s(4)
      ctx.beginPath()
      ctx.moveTo(cx - s(10), cy - s(2))
      ctx.quadraticCurveTo(cx, cy + s(9), cx + s(10), cy - s(2))
      ctx.stroke()
      return
    case 'grin':
      ctx.beginPath()
      ctx.moveTo(cx - s(12), cy - s(2))
      ctx.quadraticCurveTo(cx, cy + s(14), cx + s(12), cy - s(2))
      ctx.quadraticCurveTo(cx, cy + s(6), cx - s(12), cy - s(2))
      ctx.closePath()
      ctx.fill()
      return
    case 'o':
      ctx.beginPath()
      ctx.ellipse(cx, cy + s(2), s(5), s(7), 0, 0, Math.PI * 2)
      ctx.fill()
      return
    case 'smirk':
      ctx.lineWidth = s(4)
      ctx.beginPath()
      ctx.moveTo(cx - s(8), cy)
      ctx.quadraticCurveTo(cx + s(4), cy + s(7), cx + s(12), cy - s(4))
      ctx.stroke()
      return
    case 'openLaugh':
      ctx.beginPath()
      ctx.moveTo(cx - s(13), cy - s(4))
      ctx.quadraticCurveTo(cx, cy + s(18), cx + s(13), cy - s(4))
      ctx.quadraticCurveTo(cx, cy + s(8), cx - s(13), cy - s(4))
      ctx.closePath()
      ctx.fill()
      return
    case 'frown':
      ctx.lineWidth = s(4)
      ctx.beginPath()
      ctx.moveTo(cx - s(9), cy + s(4))
      ctx.quadraticCurveTo(cx, cy - s(7), cx + s(9), cy + s(4))
      ctx.stroke()
      return
    case 'wavy':
      ctx.lineWidth = s(3.4)
      ctx.beginPath()
      ctx.moveTo(cx - s(9), cy)
      ctx.quadraticCurveTo(cx - s(4.5), cy - s(4), cx, cy)
      ctx.quadraticCurveTo(cx + s(4.5), cy + s(4), cx + s(9), cy)
      ctx.stroke()
      return
    case 'ellipsis':
      ctx.beginPath()
      for (const dx of [-8, 0, 8]) {
        ctx.moveTo(cx + s(dx) + s(2.4), cy)
        ctx.arc(cx + s(dx), cy, s(2.4), 0, Math.PI * 2)
      }
      ctx.fill()
      return
  }
}

function drawEyebrows(
  ctx: CanvasRenderingContext2D,
  shape: EyebrowShape,
  toX: (n: number) => number,
  toY: (n: number) => number,
  s: (n: number) => number,
  leftX: number,
  rightX: number,
  eyeY: number,
) {
  if (shape === 'none') return
  const y = eyeY - 11
  ctx.lineWidth = s(3.4)
  ctx.beginPath()
  if (shape === 'angry') {
    ctx.moveTo(toX(leftX - 7), toY(y - 2))
    ctx.lineTo(toX(leftX + 6), toY(y + 3))
    ctx.moveTo(toX(rightX + 7), toY(y - 2))
    ctx.lineTo(toX(rightX - 6), toY(y + 3))
  } else if (shape === 'raised') {
    ctx.moveTo(toX(leftX - 7), toY(y + 3))
    ctx.lineTo(toX(leftX + 6), toY(y - 2))
    ctx.moveTo(toX(rightX - 6), toY(y - 2))
    ctx.lineTo(toX(rightX + 7), toY(y + 3))
  } else {
    ctx.moveTo(toX(leftX - 7), toY(y))
    ctx.lineTo(toX(leftX + 7), toY(y))
    ctx.moveTo(toX(rightX - 7), toY(y))
    ctx.lineTo(toX(rightX + 7), toY(y))
  }
  ctx.stroke()
}

function drawTear(ctx: CanvasRenderingContext2D, x: number, y: number, s: (n: number) => number) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.quadraticCurveTo(x - s(3), y + s(6), x, y + s(10))
  ctx.quadraticCurveTo(x + s(3), y + s(6), x, y)
  ctx.fill()
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawScoreBlock(
  ctx: CanvasRenderingContext2D,
  cx: number,
  width: number,
  height: number,
  core: string,
  result: AuraResult,
  copy: ShareCardCopy,
) {
  ctx.textAlign = 'center'

  ctx.fillStyle = '#f4f2ff'
  ctx.font = '700 118px "Space Grotesk", sans-serif'
  ctx.shadowColor = hexToRgba(core, 0.65)
  ctx.shadowBlur = 44
  ctx.fillText(formatDisplayScore(result.displayScore), cx, height * 0.58)
  ctx.shadowBlur = 0

  ctx.font = '700 54px "Space Grotesk", sans-serif'
  ctx.fillStyle = core
  ctx.fillText(copy.tierLabel.toUpperCase(), cx, height * 0.635)

  ctx.font = '400 32px "Inter", sans-serif'
  ctx.fillStyle = '#a6a3bf'
  wrapText(ctx, copy.tagline, cx, height * 0.685, width * 0.72, 42)

  ctx.font = '600 26px "Inter", sans-serif'
  ctx.fillStyle = '#f4f2ff'
  ctx.fillText(copy.traitLabel.toUpperCase(), cx, height * 0.76)
}

function drawReservedFooterBand(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const bandHeight = height * 0.11
  const bandY = height - bandHeight
  ctx.fillStyle = 'rgba(255,255,255,0.03)'
  ctx.fillRect(0, bandY, width, bandHeight)
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.beginPath()
  ctx.moveTo(0, bandY)
  ctx.lineTo(width, bandY)
  ctx.stroke()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '600 28px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#f4f2ff'
  ctx.fillText(APP_URL, width / 2, bandY + bandHeight / 2)
  ctx.textBaseline = 'alphabetic'
}

function hexToRgba(hex: string, alpha: number): string {
  const parsed = hex.replace('#', '')
  const value = Number.parseInt(parsed, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY)
      line = word
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  if (line) ctx.fillText(line, x, currentY)
}
